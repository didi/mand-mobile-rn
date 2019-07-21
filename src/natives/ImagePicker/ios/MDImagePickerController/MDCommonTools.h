//
//  MDCommonTools.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>
#import "MDPhotoPreviewCell.h"


@interface MDCommonTools : NSObject
    
+ (BOOL)md_isIPhoneX;
+ (CGFloat)md_statusBarHeight;
+ (NSDictionary *)md_getInfoDictionary;
+ (BOOL)isRightToLeftLayout;
+ (NSString *)md_localizedStringForKey:(NSString *)key;

@end

@interface MDImagePickerConfig : NSObject

#define PickerConfig [MDImageManager manager].imagePicker.pickerConfig

+ (instancetype)config;

#pragma mark - outer property
@property (nonatomic, assign) NSInteger maxImagesCount;                     /// 默认最大可选9张图片
@property (nonatomic, assign) NSInteger columnNumber;                       /// 默认4列
@property (nonatomic, assign) BOOL allowPickingGif;
@property (nonatomic, assign) BOOL allowTakePicture;
@property (nonatomic, assign) BOOL alwaysEnableDoneBtn;                     /// 让完成按钮一直可以点击，无须最少选择一张图片
@property (nonatomic, assign) BOOL showSelectBtn;                           /// 在单选模式下，照片列表页中，显示选择按钮,默认为NO
@property (nonatomic, assign) BOOL showMiddleIndex;                         /// 显示顶部索引
@property (nonatomic, assign) BOOL sortAscendingByModificationDate;
@property (nonatomic, assign) BOOL onlyReturnAsset;                         /// 代理方法里photos和infos会是nil，只返回assets
@property (nonatomic, assign) BOOL allowCrop;                               /// 允许裁剪,默认为YES，showSelectBtn为NO才生效
@property (nonatomic, assign) CGRect  cropRect;                             /// 裁剪框的尺寸
@property (nonatomic, assign) CGFloat photoWidth;                           /// 导出图片的宽度，默认828像素宽
@property (nonatomic, assign) NSInteger timeout;                            /// 默认为15秒
@property (copy, nonatomic) NSString    *preferredLanguage;
@property (strong, nonatomic) NSBundle  *languageBundle;
@property (assign, nonatomic) BOOL      needFixComposition;
@property (assign, nonatomic) NSInteger gifPreviewMaxImagesCount;           /// 默认是50，防止GIF过大，内存飙升

@end

@interface MDImagePickerTheme : NSObject

#define Theme [MDImagePickerTheme sharedInstance]
+ (instancetype)sharedInstance;

#pragma mark - image name
@property (nonatomic, copy) NSString *takePictureImageName;
@property (nonatomic, copy) NSString *naviBackImageName;
@property (nonatomic, copy) NSString *photoSelImageName;
@property (nonatomic, copy) NSString *photoDefImageName;
@property (nonatomic, copy) NSString *photoDefPreviewImageName;
@property (nonatomic, copy) NSString *photoOriginSelImageName;
@property (nonatomic, copy) NSString *photoOriginDefImageName;
@property (nonatomic, copy) NSString *photoPreviewOriginDefImageName;
@property (nonatomic, copy) NSString *photoNumberIconImageName;
@property (nonatomic, copy) NSString *cellArrowImageName;

#pragma mark - Appearance
@property (nonatomic, strong) UIColor *oKButtonColorNormal;
@property (nonatomic, strong) UIColor *oKButtonColorDisabled;
@property (nonatomic, strong) UIColor *naviBgColor;
@property (nonatomic, strong) UIColor *naviTitleColor;
@property (nonatomic, strong) UIFont *naviTitleFont;
@property (nonatomic, strong) UIColor *barItemTextColor;
@property (nonatomic, strong) UIFont *barItemTextFont;
@property (strong, nonatomic) UIColor *themeColor;

#pragma mark - Text
@property (nonatomic, copy) NSString *doneBtnTitle;
@property (nonatomic, copy) NSString *cancelBtnTitle;
@property (nonatomic, copy) NSString *previewBtnTitle;
@property (nonatomic, copy) NSString *fullImageBtnTitle;
@property (nonatomic, copy) NSString *settingBtnTitle;
@property (nonatomic, copy) NSString *processHint;
@property (nonatomic, copy) NSString *backBarBtnTitle;
@property (nonatomic, copy) NSString *selectgGIFTip;
@property (nonatomic, copy) NSString *albumAuthorizationTitle;
@property (nonatomic, copy) NSString *cameraAuthorizationTitle;
@property (nonatomic, copy) NSString *OkTitle;
@property (nonatomic, copy) NSString *photosTitle;
@property (nonatomic, copy) NSString *overMaxImageTitle;
@property (nonatomic, copy) NSString *cancelTitle;
@property (nonatomic, copy) NSString *settingTitle;
@property (nonatomic, copy) NSString *canNotUseCamera;

@end
