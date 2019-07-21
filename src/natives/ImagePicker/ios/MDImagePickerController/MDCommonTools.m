//
//  MDCommonTools.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDCommonTools.h"

@implementation MDCommonTools

+ (BOOL)md_isIPhoneX {
    return (CGSizeEqualToSize([UIScreen mainScreen].bounds.size, CGSizeMake(375, 812)) ||
            CGSizeEqualToSize([UIScreen mainScreen].bounds.size, CGSizeMake(812, 375)) ||
            CGSizeEqualToSize([UIScreen mainScreen].bounds.size, CGSizeMake(414, 896)) ||
            CGSizeEqualToSize([UIScreen mainScreen].bounds.size, CGSizeMake(896, 414)));
}

+ (CGFloat)md_statusBarHeight {
    return [self md_isIPhoneX] ? 44 : 20;
}

+ (NSDictionary *)md_getInfoDictionary {
    NSDictionary *infoDict = [NSBundle mainBundle].localizedInfoDictionary;
    if (!infoDict || !infoDict.count) {
        infoDict = [NSBundle mainBundle].infoDictionary;
    }
    if (!infoDict || !infoDict.count) {
        NSString *path = [[NSBundle mainBundle] pathForResource:@"Info" ofType:@"plist"];
        infoDict = [NSDictionary dictionaryWithContentsOfFile:path];
    }
    return infoDict ? infoDict : @{};
}

+ (BOOL)isRightToLeftLayout {
    if (@available(iOS 9.0, *)) {
        if ([UIView userInterfaceLayoutDirectionForSemanticContentAttribute:UISemanticContentAttributeUnspecified] == UIUserInterfaceLayoutDirectionRightToLeft) {
            return YES;
        }
    }
    return NO;
}

+ (NSString *)md_localizedStringForKey:(NSString *)key {
    NSString * str= NSLocalizedString(key, @"");
    return str;
}

@end


@implementation MDImagePickerConfig

+ (instancetype)config {
    MDImagePickerConfig *config = nil;
    if (!config) {
        config = [[MDImagePickerConfig alloc] init];
        [config configDefaultSetting];
    }
    return config;
}

- (void)configDefaultSetting {
    self.timeout = 15;
    self.photoWidth = 828.0;
    self.maxImagesCount = 9;
    self.columnNumber = 4;
    self.allowTakePicture = YES;
    self.allowPickingGif = YES;
    self.showMiddleIndex = YES;
    self.sortAscendingByModificationDate = YES;
    self.gifPreviewMaxImagesCount = 50;
}

- (void)setMaxImagesCount:(NSInteger)maxImagesCount {
    _maxImagesCount = maxImagesCount;
    if (maxImagesCount > 1) {
        _showSelectBtn = YES;
        _allowCrop = NO;
    } else {
        _showMiddleIndex = NO;
    }
}

- (void)setShowSelectBtn:(BOOL)showSelectBtn {
    _showSelectBtn = showSelectBtn;
    if (!showSelectBtn && _maxImagesCount > 1) {
        _showSelectBtn = YES;
    }
}

- (void)setShowMiddleIndex:(BOOL)showMiddleIndex {
    _showMiddleIndex = showMiddleIndex;
    if (_maxImagesCount <= 1) {
        _showMiddleIndex = NO;
    }
}

- (void)setAllowCrop:(BOOL)allowCrop {
    _allowCrop = _maxImagesCount > 1 ? NO : allowCrop;
    if (allowCrop) {
        self.allowPickingGif = NO;
        self.showSelectBtn = NO;
    }
}

- (void)setCropRect:(CGRect)cropRect {
    _cropRect = cropRect;
}

- (void)setColumnNumber:(NSInteger)columnNumber {
    _columnNumber = columnNumber;
    if (columnNumber <= 2) {
        _columnNumber = 2;
    } else if (columnNumber >= 6) {
        _columnNumber = 6;
    }
}

- (void)setTimeout:(NSInteger)timeout {
    _timeout = timeout;
    if (timeout < 5) {
        _timeout = 5;
    } else if (_timeout > 60) {
        _timeout = 60;
    }
}

- (void)setPhotoWidth:(CGFloat)photoWidth {
    _photoWidth = photoWidth;
}
- (void)setSortAscendingByModificationDate:(BOOL)sortAscendingByModificationDate {
    _sortAscendingByModificationDate = sortAscendingByModificationDate;
}

@end


@implementation MDImagePickerTheme

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    static MDImagePickerTheme *theme = nil;
    dispatch_once(&onceToken, ^{
        if (theme == nil) {
            theme = [[MDImagePickerTheme alloc] init];
            [theme setImageNames];
            [theme setViewColors];
            [theme setBtnTitles];
        }
    });
    return theme;
}

- (void)setImageNames {
    self.naviBackImageName = @"md_image_picker_navi_back";
    self.takePictureImageName = @"md_image_picker_take_picture";
    self.photoSelImageName = @"md_image_picker_blue_icon";
    self.photoDefImageName = @"md_image_picker_unselect";
    self.photoDefPreviewImageName = @"md_image_picker_unselect_gray";
    self.photoNumberIconImageName = @"md_image_picker_blue_icon";
    self.photoPreviewOriginDefImageName = @"md_image_picker_original_default";
    self.photoOriginDefImageName = @"md_image_picker_original_default";
    self.photoOriginSelImageName = @"md_image_picker_original_select";
    self.cellArrowImageName = @"md_image_picker_arrow";
}
    
- (void)setViewColors {
    self.themeColor =   [UIColor colorWithRed:47 / 255.0 green:134 / 255.0 blue:246 / 255.0 alpha:1.0];
    self.naviTitleColor = [UIColor blackColor];
    self.naviTitleFont = [UIFont systemFontOfSize:18 weight:0.5];
    self.barItemTextFont = [UIFont systemFontOfSize:15];
    self.barItemTextColor = [UIColor blackColor];
    self.oKButtonColorNormal = [UIColor colorWithWhite:1 alpha:1.0];
    self.oKButtonColorDisabled = [UIColor colorWithWhite:1 alpha:0.5];

}

- (void)setBtnTitles {
    self.doneBtnTitle = [MDCommonTools md_localizedStringForKey:@"OK"];
    self.cancelBtnTitle = [MDCommonTools md_localizedStringForKey:@"Cancel"];
    self.previewBtnTitle = [MDCommonTools md_localizedStringForKey:@"Preview"];
    self.fullImageBtnTitle = [MDCommonTools md_localizedStringForKey:@"Full image"];
    self.settingBtnTitle = [MDCommonTools md_localizedStringForKey:@"Setting"];
    self.processHint = [MDCommonTools md_localizedStringForKey:@"Processing..."];
    self.backBarBtnTitle = [MDCommonTools md_localizedStringForKey:@"Back"];
    self.selectgGIFTip = [MDCommonTools md_localizedStringForKey:@"Can not choose both photo and GIF"];
    self.albumAuthorizationTitle = [MDCommonTools md_localizedStringForKey:@"Allow %@ to access your album in \"Settings . Privacy . Photos\""];
    self.cameraAuthorizationTitle = [MDCommonTools md_localizedStringForKey:@"Please allow %@ to access your camera in \"Settings -> Privacy -> Camera\""];
    self.OkTitle = [MDCommonTools md_localizedStringForKey:@"OK"];
    self.overMaxImageTitle = [MDCommonTools md_localizedStringForKey:@"Select a maximum of %zd photos"];
    self.photosTitle = [MDCommonTools md_localizedStringForKey:@"Photos"];
    self.cancelTitle = [MDCommonTools md_localizedStringForKey:@"Cancel"];
    self.settingTitle = [MDCommonTools md_localizedStringForKey:@"Setting"];
    self.canNotUseCamera = [MDCommonTools md_localizedStringForKey:@"Can not use camera"];
}

@end
