//
//  MDImagePicker.m
//  MandMobileRN
//
//  Created by zhuochu on 2019/2/11.
//

#import "MDImagePicker.h"
#import "MDImagePickerController.h"
#import "MDImageManager.h"
#import "NSDictionary+MDExtension.h"
#import <AssetsLibrary/AssetsLibrary.h>
#import <React/RCTUtils.h>
#import "MDCommonTools.h"

@interface MDImagePicker ()

@property (nonatomic, strong) NSMutableArray *selectedAssets;
@property (nonatomic, strong) NSDictionary   *cameraOptions;
@property (nonatomic, assign) BOOL *saveSelected;
@property (nonatomic, strong) UIImagePickerController *imagePickerVc;
@property (nonatomic, copy) RCTPromiseResolveBlock resolveBlock;
@property (nonatomic, copy) RCTPromiseRejectBlock  rejectBlock;
@property (nonatomic, copy) RCTResponseSenderBlock callback;

@end

@implementation MDImagePicker

RCT_EXPORT_MODULE()

- (instancetype)init {
    self = [super init];
    if (self) {
        _selectedAssets = [NSMutableArray array];
        _saveSelected = YES;
    }
    return self;
}

- (void)dealloc {
    _selectedAssets = nil;
}

RCT_EXPORT_METHOD(showImagePicker:(NSDictionary *)options
                         callback:(RCTResponseSenderBlock)callback
                         errorCallback:(RCTResponseSenderBlock)errorCallback) {
	self.cameraOptions = options;
    self.callback = callback;
    self.resolveBlock = nil;
    self.rejectBlock = nil;
    [self openImagePicker];
}

RCT_REMAP_METHOD(asyncShowImagePicker,
                 options:(NSDictionary *)options
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
	self.cameraOptions = options;
    self.resolveBlock = resolve;
    self.rejectBlock = reject;
    self.callback = nil;
    [self openImagePicker];
}

RCT_EXPORT_METHOD(openCamera:(NSDictionary *)options
                  callback:(RCTResponseSenderBlock)callback) {
    self.cameraOptions = options;
    self.callback = callback;
    self.resolveBlock = nil;
    self.rejectBlock = nil;
    [self takePhoto];
}

    
RCT_EXPORT_METHOD(asyncOpenCamera:(NSDictionary *)options
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    self.cameraOptions = options;
    self.resolveBlock = resolve;
    self.rejectBlock = reject;
    [self takePhoto];
}

RCT_EXPORT_METHOD(deleteCache) {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    [fileManager removeItemAtPath: [NSString stringWithFormat:@"%@ImageCaches", NSTemporaryDirectory()] error:nil];
}

RCT_EXPORT_METHOD(removeImage:(NSInteger)index) {
    if (self.selectedAssets && self.selectedAssets.count > index) {
        [self.selectedAssets removeObjectAtIndex:index];
    }
}

RCT_EXPORT_METHOD(removeAll) {
    if (self.selectedAssets) {
        [self.selectedAssets removeAllObjects];
    }
}

RCT_EXPORT_METHOD(previewImage:(NSInteger)index
                  showTitle:(BOOL)showTitle) {
    if (self.selectedAssets.count > index) {
        [self previewImage:index photos:nil];
    }
}

RCT_EXPORT_METHOD(previewImageList:(NSArray *)imageList
                             index:(NSInteger)index
                         showTitle:(BOOL)showTitle) {
    if (imageList.count > index) {
        [self previewImage:index photos:imageList];
    }
}

#pragma mark -- method
/**
 * 打开相册
 */
- (void)openImagePicker {
    _saveSelected = ![self.cameraOptions md_integerForKey:@"removeSelected"];
    NSInteger quality = [self.cameraOptions md_integerForKey:@"cropQuality"];
    NSInteger imageCount = [self.cameraOptions md_integerForKey:@"imageCount"];
    BOOL allowCrop = [self.cameraOptions md_boolForKey:@"cropEnable"];
    
    MDImagePickerController *imagePickerVC = [[MDImagePickerController alloc] initWithDelegate:nil];
    MDImagePickerConfig * pickerConfig = imagePickerVC.pickerConfig;
    pickerConfig.maxImagesCount = imageCount;
    pickerConfig.columnNumber = [self.cameraOptions md_integerForKey:@"imageSpanCount"];
    pickerConfig.allowPickingGif = [self.cameraOptions md_boolForKey:@"showGif"];
    pickerConfig.allowTakePicture = [self.cameraOptions md_boolForKey:@"showCamera"];
    pickerConfig.allowCrop = allowCrop;
    if (_saveSelected) {
        imagePickerVC.selectedAssets = self.selectedAssets;
    }
    
    if (imageCount == 1) {
        pickerConfig.showSelectBtn = NO;
        if(allowCrop){
            NSInteger cropWidth = [self.cameraOptions md_integerForKey:@"cropWidth"];
            NSInteger cropHeight = [self.cameraOptions md_integerForKey:@"cropHeight"];
            CGFloat x = ([[UIScreen mainScreen] bounds].size.width - cropWidth) / 2;
            CGFloat y = ([[UIScreen mainScreen] bounds].size.height - cropHeight) / 2;
            pickerConfig.cropRect = CGRectMake(x, y, cropWidth, cropHeight);
        }
    } else {
        pickerConfig.showSelectBtn = YES;
    }
    

    __block MDImagePickerController *weakPicker = imagePickerVC;
    [imagePickerVC setDidFinishPickingPhotosWithInfosHandle:^(NSArray<UIImage *> *photos,NSArray *assets,NSArray<NSDictionary *> *infos) {
        if (_saveSelected) {
            self.selectedAssets = [NSMutableArray arrayWithArray:assets];
        }
        NSMutableArray *selectedPhotos = [NSMutableArray array];
        if (imageCount == 1 && allowCrop) {
            [selectedPhotos addObject:[self handleImageData:photos[0] quality:quality]];
        } else {
            [infos enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                [selectedPhotos addObject:[self handleImageData:photos[idx] quality:quality]];
            }];
        }
        [self invokeSuccessWithResult:selectedPhotos];
    }];

    __block MDImagePickerController *weakPickerVc = imagePickerVC;
    [imagePickerVC setImagePickerControllerDidCancelHandle:^{
        [self invokeError];
    }];
    /// 跳转
    [[self topViewController] presentViewController:imagePickerVC animated:YES completion:nil];
}

/**
 * 拍照
 */
- (void)takePhoto {
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if (authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied) {
        UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法使用相机" message:@"请在iPhone的""设置-隐私-相机""中允许访问相机" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"设置", nil];
        [alert show];
    } else if (authStatus == AVAuthorizationStatusNotDetermined) {
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
            if (granted) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [self takePhoto];
                });
            }
        }];
    } else if ([PHPhotoLibrary authorizationStatus] == 2) {
        UIAlertView * alert = [[UIAlertView alloc]initWithTitle:@"无法访问相册" message:@"请在iPhone的""设置-隐私-相册""中允许访问相册" delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"设置", nil];
        [alert show];
    } else if ([PHPhotoLibrary authorizationStatus] == 0) {
        [[MDImageManager manager] requestAuthorizationWithCompletion:^{
            [self takePhoto];
        }];
    } else {
        [self pushImagePickerController];
    }
}

/**
 * 预览 / ImageVeiw组件
 */
- (void)previewImage:(NSInteger)index photos:(NSArray *)photos {
    if (!photos || photos.count <= 0) {
        return;
    }
    MDImagePickerController *imagePickerVc = [[MDImagePickerController alloc] initWithSelectedAssets:self.selectedAssets selectedPhotos:photos index:index];
    [[self topViewController] presentViewController:imagePickerVc animated:YES completion:nil];
}

/**
 * 调用相机
 */
- (void)pushImagePickerController {
    UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
    if ([UIImagePickerController isSourceTypeAvailable: UIImagePickerControllerSourceTypeCamera]) {
        self.imagePickerVc.sourceType = sourceType;
        [[self topViewController] presentViewController:self.imagePickerVc animated:YES completion:nil];
    } else {
        NSLog(@"模拟器中无法打开照相机,请在真机中使用");
    }
}

- (UIImagePickerController *)imagePickerVc {
    if (_imagePickerVc == nil) {
        _imagePickerVc = [[UIImagePickerController alloc] init];
        _imagePickerVc.delegate = self;
    }
    return _imagePickerVc;
}

#pragma mark -- UIImagePickerController delegate

- (void)imagePickerController:(UIImagePickerController*)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    [picker dismissViewControllerAnimated:YES completion:^{
        NSString *type = [info objectForKey:UIImagePickerControllerMediaType];
        if ([type isEqualToString:@"public.image"]) {
            UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
            [[MDImageManager manager] savePhotoWithImage:image completion:^(PHAsset *asset, NSError *error){
                if (error) {
                    NSLog(@"图片保存失败 %@",error);
                } else {
                    NSInteger quality = [self.cameraOptions md_integerForKey:@"quality"];
                    [self invokeSuccessWithResult:@[[self handleImageData:image quality:quality]]];
                }
            }];
        }
    }];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
    [self invokeError];
    if ([picker isKindOfClass:[UIImagePickerController class]]) {
        [picker dismissViewControllerAnimated:YES completion:nil];
    }
}

#pragma mark - UIAlertViewDelegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 1) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
    }
}

#pragma mark -- image data

//- (NSArray *)getImageByPaths:(NSArray *)photoPaths {
//    NSMutableArray * photos = [[NSMutableArray alloc] init];
//    for (NSString * uri in photoPaths) {
//        UIImage * image = [UIImage imageWithContentsOfFile:uri];
//        [photos addObject:image];
//    }
//    return photos;
//}

-(void)loadImageByURL:(NSArray *)photoUrls completion:(void (^)(NSArray * photos))completion {
    NSMutableArray * photos = [NSMutableArray arrayWithArray:photoUrls];
    __block reCount = photoUrls.count;
    for (NSInteger index = 0; index < photoUrls.count; index++) {
        [self loadImageByUrl:photoUrls[index] index:index completion:^(UIImage *image, NSInteger index) {
            @synchronized(photos) {
                [photos replaceObjectAtIndex:index withObject:image];
                reCount--;
                if (reCount == 0) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        if (completion) {
                            completion(photos);
                        }
                    });
                }
            }
        }];
    }
}

- (void)loadImageByUrl:(NSString *)url index:(NSInteger)index completion:(void (^)(UIImage *image, NSInteger index))completion {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
        UIImage * image = [UIImage imageWithData:data];
        if (completion) {
            completion(image, index);
        }
    });
}
    
- (NSDictionary *)handleImageData:(UIImage *) image quality:(NSInteger)quality {
    NSMutableDictionary *photo = [NSMutableDictionary dictionary];
	NSData *imageData = UIImageJPEGRepresentation(image, quality * 1.0 / 100);

    photo[@"width"] = @(image.size.width);
    photo[@"height"] = @(image.size.height);
	photo[@"size"] = @(imageData.length);

    NSString *fileName = [NSString stringWithFormat:@"%@.jpg", [[NSUUID UUID] UUIDString]];
    [self createDirection];
    NSString *filePath = [NSString stringWithFormat:@"%@ImageCaches/%@", NSTemporaryDirectory(), fileName];
    if ([imageData writeToFile:filePath atomically:YES]) {
        photo[@"uri"] = filePath;
    } else {
        NSLog(@"保存压缩图片失败%@", filePath);
    }

    if ([self.cameraOptions md_boolForKey:@"enableBase64"]) {
        photo[@"base64"] = [NSString stringWithFormat:@"data:image/jpeg;base64,%@", [imageData base64EncodedStringWithOptions:0]];
    }
    return photo;
}

- (BOOL)createDirection {
    NSString * path = [NSString stringWithFormat:@"%@ImageCaches", NSTemporaryDirectory()];;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL isDir;
    if  (![fileManager fileExistsAtPath:path isDirectory:&isDir]) {//先判断目录是否存在，不存在才创建
        BOOL res=[fileManager createDirectoryAtPath:path withIntermediateDirectories:YES attributes:nil error:nil];
        return res;
    } else return NO;
}

#pragma mark -- CallBack

- (void)invokeSuccessWithResult:(NSArray *)photos {
    if (!photos) {
        return;
    }
    if (self.callback) {
        self.callback(@[photos]);
        self.callback = nil;
    }
    if (self.resolveBlock) {
        self.resolveBlock(photos);
        self.resolveBlock = nil;
    }
}

- (void)invokeError {
    if (self.rejectBlock) {
        self.rejectBlock(@"", @"取消", nil);
        self.rejectBlock = nil;
    }
}

- (UIViewController *)topViewController {
    UIViewController *rootViewController = RCTPresentedViewController();
    return rootViewController;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

@end
