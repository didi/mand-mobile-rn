//
//  MDImageManager.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDImageManager.h"
#import "MDAssetModel.h"
#import "MDCommonTools.h"

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

@interface MDImageManager ()

@property (assign, nonatomic)CGFloat screenWidth;
@property (assign, nonatomic)CGFloat screenScale;
@property (assign, nonatomic)CGSize  assetSize;
@property (assign, nonatomic)BOOL    hasReqAuth;

@end

@implementation MDImageManager

static MDImageManager *manager;
static dispatch_once_t onceToken;
+ (instancetype)manager {
    dispatch_once(&onceToken, ^{
        manager = [[self alloc] init];
        [manager initDefaultData];
    });
    return manager;
}

- (void)initDefaultData {
    _screenWidth = [UIScreen mainScreen].bounds.size.width;
    _screenScale = [UIScreen mainScreen].scale;
    _hasReqAuth = NO;
}

- (void)setImagePicker:(MDImagePickerController *)imagePicker {
    _imagePicker = imagePicker;
    CGFloat margin = 4;
    CGFloat itemWH = (_screenWidth - (PickerConfig.columnNumber + 1) * margin) / PickerConfig.columnNumber;
    _assetSize = CGSizeMake(itemWH * _screenScale, itemWH * _screenScale);
}

#pragma mark - Authorization

- (BOOL)authorizationStatusAuthorized {
    NSInteger status = [PHPhotoLibrary authorizationStatus];
    if (status == 0 && !_hasReqAuth) {
        _hasReqAuth = YES;
        [self requestAuthorizationWithCompletion:^{
            [[NSNotificationCenter defaultCenter] postNotificationName:AuthorizationComplettion object:nil];
        }];
    }
    return status == 3;
}

- (void)requestAuthorizationWithCompletion:(void (^)(void))completion {
    void (^callCompletionBlock)(void) = ^(){
        dispatch_async(dispatch_get_main_queue(), ^{
            if (completion) {
                completion();
            }
        });
    };
    
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
            callCompletionBlock();
        }];
    });
}

#pragma mark - Get Album

- (void)getCameraRollAlbum:(BOOL)needFetchAssets completion:(void (^)(MDAlbumModel *model))completion {
    __block MDAlbumModel *model;
    PHFetchOptions *option = [[PHFetchOptions alloc] init];
    option.predicate = [NSPredicate predicateWithFormat:@"mediaType == %ld", PHAssetMediaTypeImage];
    if (!PickerConfig.sortAscendingByModificationDate) {
        option.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:PickerConfig.sortAscendingByModificationDate]];
    }
    PHFetchResult *album = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeSmartAlbum subtype:PHAssetCollectionSubtypeAlbumRegular options:nil];
    for (PHAssetCollection *collection in album) {
        if (![collection isKindOfClass:[PHAssetCollection class]] || collection.estimatedAssetCount <= 0) {
            continue;
        }
        PHFetchResult *fetchResult = [PHAsset fetchAssetsInAssetCollection:collection options:option];
        if (fetchResult.count < 1) {
            continue;
        }
        if ([self isCameraRollAlbum:collection]) {
            model = [self albumModelWithResult:fetchResult name:collection.localizedTitle isCameraRoll:YES needFetchAssets:needFetchAssets];
            if (completion) {
                completion(model);
            }
            break;
        }
    }
}

- (void)getAllAlbums:(BOOL)needFetchAssets completion:(void (^)(NSArray<MDAlbumModel *> *))completion{
    NSMutableArray *allAlbums = [NSMutableArray array];
    PHFetchOptions *option = [[PHFetchOptions alloc] init];
    option.predicate = [NSPredicate predicateWithFormat:@"mediaType == %ld", PHAssetMediaTypeImage];
    if (!PickerConfig.sortAscendingByModificationDate) {
        option.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:PickerConfig.sortAscendingByModificationDate]];
    }
    PHFetchResult *myPhotoStreamAlbum = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:PHAssetCollectionSubtypeAlbumMyPhotoStream options:nil];
    PHFetchResult *smartAlbum = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeSmartAlbum subtype:PHAssetCollectionSubtypeAlbumRegular options:nil];
    PHFetchResult *topLevelAlbum = [PHCollectionList fetchTopLevelUserCollectionsWithOptions:nil];
    PHFetchResult *syncedAlbum = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:PHAssetCollectionSubtypeAlbumSyncedAlbum options:nil];
    PHFetchResult *sharedAlbum = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:PHAssetCollectionSubtypeAlbumCloudShared options:nil];
    NSArray *albums = @[myPhotoStreamAlbum,smartAlbum,topLevelAlbum,syncedAlbum,sharedAlbum];
    for (PHFetchResult *fetchResult in albums) {
        for (PHAssetCollection *collection in fetchResult) {
            if (![collection isKindOfClass:[PHAssetCollection class]]
                || collection.estimatedAssetCount <= 0
                || collection.assetCollectionSubtype == PHAssetCollectionSubtypeSmartAlbumAllHidden
                || collection.assetCollectionSubtype == 1000000201) {
                continue;
            }
            PHFetchResult *fetchResult = [PHAsset fetchAssetsInAssetCollection:collection options:option];
            if (fetchResult.count < 1) {
                continue;
            }
            if ([self isCameraRollAlbum:collection]) {
                [allAlbums insertObject:[self albumModelWithResult:fetchResult name:collection.localizedTitle isCameraRoll:YES needFetchAssets:needFetchAssets] atIndex:0];
            } else {
                [allAlbums addObject:[self albumModelWithResult:fetchResult name:collection.localizedTitle isCameraRoll:NO needFetchAssets:needFetchAssets]];
            }
        }
    }
    if (completion && allAlbums.count > 0) {
        completion(allAlbums);
    }
}

- (BOOL)isCameraRollAlbum:(PHAssetCollection *)metadata {
    NSString *versionStr = [[UIDevice currentDevice].systemVersion stringByReplacingOccurrencesOfString:@"." withString:@""];
    if (versionStr.length <= 1) {
        versionStr = [versionStr stringByAppendingString:@"00"];
    } else if (versionStr.length <= 2) {
        versionStr = [versionStr stringByAppendingString:@"0"];
    }
    CGFloat version = versionStr.floatValue;
    // 目前已知8.0.0 ~ 8.0.2系统，拍照后的图片会保存在最近添加中
    if (version >= 800 && version <= 802) {
        return ((PHAssetCollection *)metadata).assetCollectionSubtype == PHAssetCollectionSubtypeSmartAlbumRecentlyAdded;
    } else {
        return ((PHAssetCollection *)metadata).assetCollectionSubtype == PHAssetCollectionSubtypeSmartAlbumUserLibrary;
    }
}

#pragma mark - Get Assets

- (void)getAssetsFromFetchResult:(PHFetchResult *)result completion:(void (^)(NSArray<MDAssetModel *> *))completion {
    NSMutableArray *photoArr = [NSMutableArray array];
    [result enumerateObjectsUsingBlock:^(PHAsset *asset, NSUInteger idx, BOOL * _Nonnull stop) {
        MDAssetModel *model = [self assetModelWithAsset:asset];
        if (model) {
            [photoArr addObject:model];
        }
    }];
    if (completion) {
        completion(photoArr);
    }
}

- (void)getAssetFromFetchResult:(PHFetchResult *)result atIndex:(NSInteger)index completion:(void (^)(MDAssetModel *))completion {
    PHAsset *asset = nil;
    @try {
        asset = result[index];
    }
    @catch (NSException* e) {
        if (completion) {
            completion(nil);
        }
        return;
    }
    MDAssetModel *model = [self assetModelWithAsset:asset];
    if (completion)
        completion(model);
}

- (MDAssetModel *)assetModelWithAsset:(PHAsset *)asset {
    MDAssetModel *model = nil;
    MDAssetMediaType type = [self getAssetType:asset];
    if (type == MDAssetMediaTypeVideo || type == MDAssetMediaTypeAudio) {
        return model;
    }
    
    model = [MDAssetModel modelWithAsset:asset type:type];
    return model;
}

- (MDAssetMediaType)getAssetType:(PHAsset *)asset {
    MDAssetMediaType type = MDAssetMediaTypePhoto;
    switch (asset.mediaType) {
        case PHAssetMediaTypeVideo:
            type = MDAssetMediaTypeVideo;
            break;
        case PHAssetMediaTypeAudio:
            type = MDAssetMediaTypeAudio;
            break;
        case PHAssetMediaTypeImage:
            if ([[asset valueForKey:@"filename"] hasSuffix:@"GIF"]) {
                type = MDAssetMediaTypePhotoGif;
            }
            break;
        default:
            break;
    }
    return type;
}

#pragma mark - Get Photo

/// 获得照片本身
- (int32_t)getPhotoWithAsset:(PHAsset *)asset completion:(void (^)(UIImage *photo,NSDictionary *info,BOOL isDegraded))completion {
    return [self getPhotoWithAsset:asset photoWidth:_screenWidth completion:completion];
}

- (int32_t)getPhotoWithAsset:(PHAsset *)asset photoWidth:(CGFloat)photoWidth completion:(void (^)(UIImage *photo,NSDictionary *info,BOOL isDegraded))completion {
    CGSize imageSize;
    if (photoWidth < _screenWidth) {
        imageSize = _assetSize;
    } else {
        CGFloat aspectRatio = asset.pixelWidth / (CGFloat)asset.pixelHeight;
        CGFloat pixelWidth = photoWidth * _screenScale * 1.5;
        // 超宽图片
        if (aspectRatio > 1.8) {
            pixelWidth = pixelWidth * aspectRatio;
        }
        // 超高图片
        if (aspectRatio < 0.2) {
            pixelWidth = pixelWidth * 0.5;
        }
        CGFloat pixelHeight = pixelWidth / aspectRatio;
        imageSize = CGSizeMake(pixelWidth, pixelHeight);
    }
    
    PHImageRequestOptions *option = [[PHImageRequestOptions alloc] init];
    option.resizeMode = PHImageRequestOptionsResizeModeFast;
    int32_t imageRequestID = [[PHImageManager defaultManager] requestImageForAsset:asset targetSize:imageSize contentMode:PHImageContentModeAspectFill options:option resultHandler:^(UIImage *result, NSDictionary *info) {
        if (result) {
            UIImage *resultImage = result;
            resultImage = [self fixOrientation:resultImage];
            if (completion) {
                completion(resultImage,info,NO);
            };
        }
    }];
    return imageRequestID;
}

/// 获取封面图
- (void)getPostImageWithAlbumModel:(MDAlbumModel *)model completion:(void (^)(UIImage *))completion {
    id asset = [model.result lastObject];
    if (!PickerConfig.sortAscendingByModificationDate) {
        asset = [model.result firstObject];
    }
    [[MDImageManager manager] getPhotoWithAsset:asset photoWidth:80 completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
        if (completion) completion(photo);
    }];
}

- (void)getOriginalPhotoDataWithAsset:(PHAsset *)asset completion:(void (^)(NSData *data,NSDictionary *info,BOOL isDegraded))completion {
    [self getOriginalPhotoDataWithAsset:asset progressHandler:nil completion:completion];
}

- (void)getOriginalPhotoDataWithAsset:(PHAsset *)asset progressHandler:(void (^)(double progress, NSError *error, BOOL *stop, NSDictionary *info))progressHandler completion:(void (^)(NSData *data,NSDictionary *info,BOOL isDegraded))completion {
    PHImageRequestOptions *option = [[PHImageRequestOptions alloc] init];
    option.networkAccessAllowed = YES;
    if ([[asset valueForKey:@"filename"] hasSuffix:@"GIF"]) {
        // if version isn't PHImageRequestOptionsVersionOriginal, the gif may cann't play
        option.version = PHImageRequestOptionsVersionOriginal;
    }
    [option setProgressHandler:progressHandler];
    option.deliveryMode = PHImageRequestOptionsDeliveryModeHighQualityFormat;
    [[PHImageManager defaultManager] requestImageDataForAsset:asset options:option resultHandler:^(NSData *imageData, NSString *dataUTI, UIImageOrientation orientation, NSDictionary *info) {
        BOOL downloadFinined = (![[info objectForKey:PHImageCancelledKey] boolValue] && ![info objectForKey:PHImageErrorKey]);
        if (downloadFinined && imageData) {
            if (completion) completion(imageData,info,NO);
        }
    }];
}

- (int32_t)requestImageDataForAsset:(PHAsset *)asset completion:(void (^)(NSData *imageData, NSString *dataUTI, UIImageOrientation orientation, NSDictionary *info))completion progressHandler:(void (^)(double progress, NSError *error, BOOL *stop, NSDictionary *info))progressHandler {
    PHImageRequestOptions *options = [[PHImageRequestOptions alloc] init];
    options.progressHandler = ^(double progress, NSError *error, BOOL *stop, NSDictionary *info) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (progressHandler) {
                progressHandler(progress, error, stop, info);
            }
        });
    };
    options.networkAccessAllowed = YES;
    options.resizeMode = PHImageRequestOptionsResizeModeFast;
    int32_t imageRequestID = [[PHImageManager defaultManager] requestImageDataForAsset:asset options:options resultHandler:^(NSData *imageData, NSString *dataUTI, UIImageOrientation orientation, NSDictionary *info) {
        if (completion) completion(imageData,dataUTI,orientation,info);
    }];
    return imageRequestID;
}


#pragma mark - Save Photo

- (void)savePhotoWithImage:(UIImage *)image completion:(void (^)(PHAsset *asset, NSError *error))completion {
    __block NSString *localIdentifier = nil;
    [[PHPhotoLibrary sharedPhotoLibrary] performChanges:^{
        PHAssetChangeRequest *request = [PHAssetChangeRequest creationRequestForAssetFromImage:image];
        localIdentifier = request.placeholderForCreatedAsset.localIdentifier;
        request.creationDate = [NSDate date];
    } completionHandler:^(BOOL success, NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (success && completion) {
                PHAsset *asset = [[PHAsset fetchAssetsWithLocalIdentifiers:@[localIdentifier] options:nil] firstObject];
                completion(asset, nil);
            } else if (error) {
                NSLog(@"保存照片出错:%@",error.localizedDescription);
                if (completion) {
                    completion(nil, error);
                }
            }
        });
    }];
}

#pragma mark - Private Method

- (MDAlbumModel *)albumModelWithResult:(PHFetchResult *)result name:(NSString *)name isCameraRoll:(BOOL)isCameraRoll needFetchAssets:(BOOL)needFetchAssets {
    MDAlbumModel *model = [[MDAlbumModel alloc] init];
    [model setResult:result needFetchAssets:needFetchAssets];
    model.name = name;
    model.isCameraRoll = isCameraRoll;
    model.count = result.count;
    return model;
}

/// 修正图片转向
- (UIImage *)fixOrientation:(UIImage *)aImage {
    if (!self.shouldFixOrientation) {
        return aImage;
    }
    
    // No-op if the orientation is already correct
    if (aImage.imageOrientation == UIImageOrientationUp) {
        return aImage;
    }
    
    // We need to calculate the proper transformation to make the image upright.
    // We do it in 2 steps: Rotate if Left/Right/Down, and then flip if Mirrored.
    CGAffineTransform transform = CGAffineTransformIdentity;
    
    switch (aImage.imageOrientation) {
        case UIImageOrientationDown:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, aImage.size.height);
            transform = CGAffineTransformRotate(transform, M_PI);
            break;
            
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, 0);
            transform = CGAffineTransformRotate(transform, M_PI_2);
            break;
            
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, 0, aImage.size.height);
            transform = CGAffineTransformRotate(transform, -M_PI_2);
            break;
        default:
            break;
    }
    
    switch (aImage.imageOrientation) {
        case UIImageOrientationUpMirrored:
        case UIImageOrientationDownMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.width, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
            
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRightMirrored:
            transform = CGAffineTransformTranslate(transform, aImage.size.height, 0);
            transform = CGAffineTransformScale(transform, -1, 1);
            break;
        default:
            break;
    }
    
    // Now we draw the underlying CGImage into a new context, applying the transform
    // calculated above.
    CGContextRef ctx = CGBitmapContextCreate(NULL, aImage.size.width, aImage.size.height,
                                             CGImageGetBitsPerComponent(aImage.CGImage), 0,
                                             CGImageGetColorSpace(aImage.CGImage),
                                             CGImageGetBitmapInfo(aImage.CGImage));
    CGContextConcatCTM(ctx, transform);
    switch (aImage.imageOrientation) {
        case UIImageOrientationLeft:
        case UIImageOrientationLeftMirrored:
        case UIImageOrientationRight:
        case UIImageOrientationRightMirrored:
            // Grr...
            CGContextDrawImage(ctx, CGRectMake(0,0,aImage.size.height,aImage.size.width), aImage.CGImage);
            break;
            
        default:
            CGContextDrawImage(ctx, CGRectMake(0,0,aImage.size.width,aImage.size.height), aImage.CGImage);
            break;
    }
    
    // And now we just create a new UIImage from the drawing context
    CGImageRef cgimg = CGBitmapContextCreateImage(ctx);
    UIImage *img = [UIImage imageWithCGImage:cgimg];
    CGContextRelease(ctx);
    CGImageRelease(cgimg);
    return img;
}

#pragma mark -- download

- (void)loadImageByUrl:(NSString *)url key:(NSString *)key completion:(void (^)(NSData *data, NSString *key))completion {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
        dispatch_async(dispatch_get_main_queue(), ^{
            if (completion) {
                completion(data, key);
            }
        });
    });
}

- (void)loadImageByPath:(NSString *)path key:(NSString *)key completion:(void (^)(NSData *data, NSString *key))completion {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSData * data = [NSData dataWithContentsOfFile:path];
        dispatch_async(dispatch_get_main_queue(), ^{
            if (completion) {
                completion(data, key);
            }
        });
    });
}

#pragma clang diagnostic pop

@end

