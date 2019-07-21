//
//  MDPhotoPreviewController.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>
#import "MDImageManager.h"

@interface MDPhotoPreviewController : UIViewController

@property (nonatomic, strong) NSMutableArray *models;                  /// 所有图片模型数组
@property (nonatomic, strong) NSMutableArray *photos;                  /// 所有图片数组
@property (nonatomic, assign) NSInteger currentIndex;                  /// 用户点击的图片的索引
@property (nonatomic, assign) BOOL isCropImage;
@property (nonatomic, assign) PreviewImageSourceType sourceType;
@property (nonatomic, copy) void (^backButtonClickBlock)();
@property (nonatomic, copy) void (^doneButtonClickBlock)();
@property (nonatomic, copy) void (^doneButtonClickBlockCropMode)(UIImage *cropedImage,id asset);
@property (nonatomic, copy) void (^doneButtonClickBlockWithPreviewType)(NSArray<UIImage *> *photos,NSArray *assets);
    
@end

