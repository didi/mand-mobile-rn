//
//  MDImageManager.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Photos/Photos.h>
#import "MDAssetModel.h"
#import "MDImagePickerController.h"

#define AuthorizationComplettion @"AuthorizationComplettion"
#define DidCancleSelectAsset     @"DidCancleSelectAsset"

typedef NS_ENUM(NSInteger,PreviewImageSourceType) {
    PreviewImageByPhotos = 1,
    PreviewImageByAssets = 2,
    PreviewImageByPhotosAndAssets = 3,
};

@class MDAlbumModel,MDAssetModel,MDImagePickerController;
@protocol MDImagePickerControllerDelegate;

API_AVAILABLE(ios(8.0))
@interface MDImageManager : NSObject

+ (instancetype)manager NS_SWIFT_NAME(default());
- (BOOL)authorizationStatusAuthorized;
- (void)requestAuthorizationWithCompletion:(void (^)(void))completion;
- (BOOL)isCameraRollAlbum:(PHAssetCollection *)metadata;

@property (nonatomic, strong) PHCachingImageManager *cachingImageManager;
@property (nonatomic, strong) MDImagePickerController *imagePicker;
@property (nonatomic, assign) BOOL shouldFixOrientation;
@property (nonatomic, weak) id<MDImagePickerControllerDelegate> pickerDelegate;

/**
 * 获取 Album
 */
- (void)getCameraRollAlbum:(BOOL)needFetchAssets completion:(void (^)(MDAlbumModel *model))completion;
- (void)getAllAlbums:(BOOL)needFetchAssets completion:(void (^)(NSArray<MDAlbumModel *> *models))completion;

/**
 * 获取 Assets
 */
- (void)getAssetsFromFetchResult:(PHFetchResult *)result completion:(void (^)(NSArray<MDAssetModel *> *models))completion;
- (void)getAssetFromFetchResult:(PHFetchResult *)result atIndex:(NSInteger)index completion:(void (^)(MDAssetModel *model))completion;

/**
 * 获取图片
 */
- (void)getPostImageWithAlbumModel:(MDAlbumModel *)model completion:(void (^)(UIImage *postImage))completion;
- (int32_t)getPhotoWithAsset:(PHAsset *)asset completion:(void (^)(UIImage *photo,NSDictionary *info,BOOL isDegraded))completion;
- (int32_t)getPhotoWithAsset:(PHAsset *)asset photoWidth:(CGFloat)photoWidth completion:(void (^)(UIImage *photo,NSDictionary *info,BOOL isDegraded))completion;
- (int32_t)requestImageDataForAsset:(PHAsset *)asset completion:(void (^)(NSData *imageData, NSString *dataUTI, UIImageOrientation orientation, NSDictionary *info))completion progressHandler:(void (^)(double progress, NSError *error, BOOL *stop, NSDictionary *info))progressHandler;

/**
 * 获取原图
 */
- (void)getOriginalPhotoDataWithAsset:(PHAsset *)asset completion:(void (^)(NSData *data,NSDictionary *info,BOOL isDegraded))completion;
- (void)getOriginalPhotoDataWithAsset:(PHAsset *)asset progressHandler:(void (^)(double progress, NSError *error, BOOL *stop, NSDictionary *info))progressHandler completion:(void (^)(NSData *data,NSDictionary *info,BOOL isDegraded))completion;

/**
 * 保存照片
 */
- (void)savePhotoWithImage:(UIImage *)image completion:(void (^)(PHAsset *asset, NSError *error))completion;

/**
 * 修正图片转向
 */
- (UIImage *)fixOrientation:(UIImage *)aImage;

/**
 * 获取asset的资源类型
 */
- (MDAssetMediaType)getAssetType:(PHAsset *)asset;
- (MDAssetModel *)assetModelWithAsset:(PHAsset *)asset;

/**
 * 获取网络资源
 */
- (void)loadImageByUrl:(NSString *)url key:(NSString *)key completion:(void (^)(NSData *image, NSString *key))completion;

/**
 * 获取本地资源
 */
- (void)loadImageByPath:(NSString *)path key:(NSString *)key completion:(void (^)(NSData *image, NSString *key))completion;

@end
