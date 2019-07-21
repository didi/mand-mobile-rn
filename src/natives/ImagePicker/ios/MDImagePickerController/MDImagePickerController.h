//
//  MDImagePickerController.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>
#import "MDAssetModel.h"
#import "MDImageManager.h"

@class MDAlbumCell, MDAssetCell, MDImagePickerConfig;
@protocol MDImagePickerControllerDelegate;
@interface MDImagePickerController : UINavigationController

- (instancetype)initWithDelegate:(id<MDImagePickerControllerDelegate>)delegate;
- (instancetype)initWithDelegate:(id<MDImagePickerControllerDelegate>)delegate pushPhotoPickerVC:(BOOL)pushPhotoPickerVC;

/**
 * 预览图片 init
 */
- (instancetype)initWithSelectedAssets:(NSMutableArray *)selectedAssets selectedPhotos:(NSMutableArray *)selectedPhotos index:(NSInteger)index;

/**
 * 裁剪图片 init
 */
- (instancetype)initCropTypeWithAsset:(PHAsset *)asset photo:(UIImage *)photo completion:(void (^)(UIImage *cropImage,PHAsset *asset))completion API_AVAILABLE(ios(8.0));

- (void)addSelectedModel:(MDAssetModel *)model;
- (void)removeSelectedModel:(MDAssetModel *)model;
- (BOOL)checkSelectedGifModel:(MDAssetModel *)model;
- (void)cancelButtonClick;

@property (nonatomic, strong) MDImagePickerConfig *pickerConfig;
@property (nonatomic, strong) NSMutableArray      *selectedAssets;
@property (nonatomic, strong) NSMutableArray      *selectedAssetIds;
@property (nonatomic, strong) NSMutableArray<MDAssetModel *> *selectedModels;
@property (nonatomic, assign) UIStatusBarStyle statusBarStyle;
@property (nonatomic, assign) BOOL needShowStatusBar;
@property (nonatomic, weak) id<MDImagePickerControllerDelegate> pickerDelegate;

@property (nonatomic, copy) void (^navLeftBarButtonSettingBlock)(UIButton *leftButton);     /// 自定义返回按钮样式及其属性
@property (nonatomic, copy) void (^didFinishPickingPhotosHandle)(NSArray<UIImage *> *photos,NSArray *assets);
@property (nonatomic, copy) void (^didFinishPickingPhotosWithInfosHandle)(NSArray<UIImage *> *photos,NSArray *assets,NSArray<NSDictionary *> *infos);
@property (nonatomic, copy) void (^imagePickerControllerDidCancelHandle)(void);

- (UIAlertController *)showAlertWithTitle:(NSString *)title;
- (void)hideAlertView:(UIAlertController *)alertView;
- (void)showProgressHUD;
- (void)hideProgressHUD;

@end

@protocol MDImagePickerControllerDelegate <NSObject>

- (void)imagePickerController:(MDImagePickerController *)picker didFinishPickingPhotos:(NSArray<UIImage *> *)photos sourceAssets:(NSArray *)assets;
- (void)imagePickerController:(MDImagePickerController *)picker didFinishPickingPhotos:(NSArray<UIImage *> *)photos sourceAssets:(NSArray *)assets infos:(NSArray<NSDictionary *> *)infos;
- (void)md_imagePickerControllerDidCancel:(MDImagePickerController *)picker;

@end
