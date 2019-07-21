//
//  MDImagePickerController.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDImagePickerController.h"
#import "MDPhotoPickerController.h"
#import "MDPhotoPreviewController.h"
#import "MDAssetModel.h"
#import "MDAssetCell.h"
#import "UIView+MDExtension.h"
#import "MDImageManager.h"
#import "MDAlbumPickerController.h"
#import "MDCommonTools.h"

#define pickerConfig [self pickerConfig]

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

@interface MDImagePickerController ()
/// 默认提示页
@property (nonatomic,strong) UILabel  *context;
@property (nonatomic,strong) UIButton *setting;

@property (nonatomic,assign) BOOL pushPhotoPickerVC;
@property (nonatomic,assign) UIStatusBarStyle originStatusBarStyle;
@property (nonatomic, assign) CGRect cropRectPortrait;                          /// 裁剪框的尺寸(竖屏)
@property (nonatomic, assign) CGRect cropRectLandscape;                         /// 裁剪框的尺寸(横屏)
@property (nonatomic, assign) NSInteger selectGIFCount;                          /// 选中GIF数量

@property (nonatomic,strong) UIButton *HUDProgress;
@property (nonatomic,strong) UIView   *HUDContainer;
@property (nonatomic,strong) UILabel  *HUDLabel;
@property (nonatomic,strong) UIActivityIndicatorView *HUDIndicatorView;

@end

@implementation MDImagePickerController

- (instancetype)init {
    self = [super init];
    if (self) {
        self = [self initWithDelegate:nil];
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.needShowStatusBar = ![UIApplication sharedApplication].statusBarHidden;
    if (self.needShowStatusBar) {
        [UIApplication sharedApplication].statusBarHidden = NO;
    }
    [MDImageManager manager].shouldFixOrientation = NO;
    _selectGIFCount = 0;
    [self configDefaultSetting];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    _originStatusBarStyle = [UIApplication sharedApplication].statusBarStyle;
    [UIApplication sharedApplication].statusBarStyle = self.statusBarStyle;
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [UIApplication sharedApplication].statusBarStyle = _originStatusBarStyle;
    [self hideProgressHUD];
}

#pragma mark -- init method

- (instancetype)initWithDelegate:(id<MDImagePickerControllerDelegate>)delegate {
    return [self initWithDelegate:delegate pushPhotoPickerVC:YES];
}

- (instancetype)initWithDelegate:(id<MDImagePickerControllerDelegate>)delegate
                     pushPhotoPickerVC:(BOOL)pushPhotoPickerVC {
    if ([PHPhotoLibrary authorizationStatus] == 0) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(observeAuthrizationStatusChange) name:AuthorizationComplettion object:nil];
    }
    _pickerConfig = [MDImagePickerConfig config];
    [MDImageManager manager].imagePicker = self;
    _pushPhotoPickerVC = pushPhotoPickerVC;
    MDAlbumPickerController *albumPickerVC = [[MDAlbumPickerController alloc] init];
    self = [super initWithRootViewController:albumPickerVC];
    if (self) {
        self.pickerDelegate = delegate;
        if (![[MDImageManager manager] authorizationStatusAuthorized]) {
            [self showDefaultView];
        } else {
            [self pushPhotoPickerVC];
        }
    }
    return self;
}

- (instancetype)initWithSelectedAssets:(NSMutableArray *)selectedAssets selectedPhotos:(NSMutableArray *)selectedPhotos index:(NSInteger)index{
    MDPhotoPreviewController *previewVC = [[MDPhotoPreviewController alloc] init];
    if (selectedAssets && selectedAssets.count > 0) {
        previewVC.sourceType = PreviewImageByAssets;
    } else if (selectedPhotos && selectedPhotos.count > 0) {
        previewVC.sourceType = PreviewImageByPhotos;
    }
    self = [super initWithRootViewController:previewVC];
    if (self) {
        self.selectedAssets = [NSMutableArray arrayWithArray:selectedAssets];
        
        previewVC.models = [NSMutableArray arrayWithArray:self.selectedModels];
        previewVC.photos = [NSMutableArray arrayWithArray:selectedPhotos];
        previewVC.currentIndex = index;
        __weak typeof(self) weakSelf = self;
        [previewVC setDoneButtonClickBlockWithPreviewType:^(NSArray<UIImage *> *photos, NSArray *assets) {
            __strong typeof(weakSelf) strongSelf = weakSelf;
            [strongSelf dismissViewControllerAnimated:YES completion:^{
                if (!strongSelf) return;
                if (strongSelf.didFinishPickingPhotosHandle) {
                    strongSelf.didFinishPickingPhotosHandle(photos,assets);
                }
            }];
        }];
    }
    return self;
}

- (instancetype)initCropTypeWithAsset:(PHAsset *)asset photo:(UIImage *)photo completion:(void (^)(UIImage *cropImage,PHAsset *asset))completion {
    MDPhotoPreviewController *previewVc = [[MDPhotoPreviewController alloc] init];
    self = [super initWithRootViewController:previewVc];
    if (self) {
        [self updateCropRect];
        self.selectedAssets = [NSMutableArray arrayWithArray:@[asset]];
        
        previewVc.photos = [NSMutableArray arrayWithArray:@[photo]];
        previewVc.isCropImage = YES;
        previewVc.currentIndex = 0;
        __weak typeof(self) weakSelf = self;
        [previewVc setDoneButtonClickBlockCropMode:^(UIImage *cropImage, id asset) {
            __strong typeof(weakSelf) strongSelf = weakSelf;
            [strongSelf dismissViewControllerAnimated:YES completion:^{
                if (completion) {
                    completion(cropImage, asset);
                }
            }];
        }];
    }
    return self;
}

#pragma mark -- default setting

- (void)configDefaultSetting {
    [self configNaviBar];
    [self configBarButtonItem];
    self.selectedAssets = [NSMutableArray array];
    self.view.backgroundColor = [UIColor whiteColor];
    self.automaticallyAdjustsScrollViewInsets = NO;
    self.statusBarStyle = UIStatusBarStyleDefault;
}

- (void)configNaviBar {
    NSMutableDictionary *textAttrs = [NSMutableDictionary dictionary];
    if (Theme.naviTitleColor) {
        textAttrs[NSForegroundColorAttributeName] = Theme.naviTitleColor;
    }
    if (Theme.naviTitleFont) {
        textAttrs[NSFontAttributeName] = Theme.naviTitleFont;
    }
    self.navigationBar.titleTextAttributes = textAttrs;
    self.navigationBar.barStyle = UIBarStyleDefault;
    self.navigationBar.shadowImage=[UIImage new];
    self.navigationBar.tintColor = [UIColor blackColor];
    self.navigationBar.barTintColor = Theme.naviBgColor;
}

- (void)configBarButtonItem {
    UIBarButtonItem *barItem;
    if (@available(iOS 9, *)) {
        barItem = [UIBarButtonItem appearanceWhenContainedInInstancesOfClasses:@[[MDImagePickerController class]]];
    } else {
        barItem = [UIBarButtonItem appearanceWhenContainedIn:[MDImagePickerController class], nil];
    }
    NSMutableDictionary *textAttrs = [NSMutableDictionary dictionary];
    textAttrs[NSForegroundColorAttributeName] = Theme.barItemTextColor;
    textAttrs[NSFontAttributeName] = Theme.barItemTextFont;
    [barItem setTitleTextAttributes:textAttrs forState:UIControlStateNormal];
}

#pragma mark -- option

- (void)showDefaultView {
    _context = [[UILabel alloc] init];
    _context.frame = CGRectMake(8, 120, self.view.md_width - 16, 60);
    _context.textAlignment = NSTextAlignmentCenter;
    _context.font = [UIFont systemFontOfSize:16];
    _context.textColor = [UIColor blackColor];
    _context.numberOfLines = 0;

    NSDictionary *infoDict = [MDCommonTools md_getInfoDictionary];
    NSString *appName = [infoDict valueForKey:@"CFBundleDisplayName"];
    if (!appName) {
        appName = [infoDict valueForKey:@"CFBundleName"];
    }
    NSString *text = [NSString stringWithFormat:Theme.albumAuthorizationTitle,appName];
    _context.text = text;
    [self.view addSubview:_context];
    
    _setting = [UIButton buttonWithType:UIButtonTypeSystem];
    _setting.frame = CGRectMake(0, 180, self.view.md_width, 44);
    _setting.titleLabel.font = [UIFont systemFontOfSize:18];
    [_setting setTitle:Theme.settingBtnTitle forState:UIControlStateNormal];
    [_setting addTarget:self action:@selector(settingBtnClick) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_setting];
}

- (void)observeAuthrizationStatusChange {
    if ([[MDImageManager manager] authorizationStatusAuthorized]) {
        [_context removeFromSuperview];
        [_setting removeFromSuperview];
        [self pushPhotoPickerVC];
    }
}

- (void)pushPhotoPickerVC {
    if (_pushPhotoPickerVC) {
        MDPhotoPickerController *photoPickerVc = [[MDPhotoPickerController alloc] init];
        [[MDImageManager manager] getCameraRollAlbum:NO completion:^(MDAlbumModel *model) {
            photoPickerVc.albumModel = model;
            [self pushViewController:photoPickerVc animated:YES];
        }];
    }
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated {
    viewController.automaticallyAdjustsScrollViewInsets = NO;
    [super pushViewController:viewController animated:animated];
}

- (UIAlertController *)showAlertWithTitle:(NSString *)title {
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:title message:nil preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:[UIAlertAction actionWithTitle:Theme.OkTitle style:UIAlertActionStyleDefault handler:nil]];
    [self presentViewController:alertController animated:YES completion:nil];
    return alertController;
}

- (void)hideAlertView:(UIAlertController *)alertView {
    [alertView dismissViewControllerAnimated:YES completion:nil];
    alertView = nil;
}

- (void)showProgressHUD {
    if (!_HUDProgress) {
        _HUDProgress = [UIButton buttonWithType:UIButtonTypeCustom];
        [_HUDProgress setBackgroundColor:[UIColor clearColor]];
        
        _HUDContainer = [[UIView alloc] init];
        _HUDContainer.layer.cornerRadius = 8;
        _HUDContainer.clipsToBounds = YES;
        _HUDContainer.backgroundColor = [UIColor darkGrayColor];
        _HUDContainer.alpha = 0.7;
        
        _HUDIndicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
        
        _HUDLabel = [[UILabel alloc] init];
        _HUDLabel.textAlignment = NSTextAlignmentCenter;
        _HUDLabel.text = Theme.processHint;
        _HUDLabel.font = [UIFont systemFontOfSize:15];
        _HUDLabel.textColor = [UIColor whiteColor];
        
        [_HUDContainer addSubview:_HUDLabel];
        [_HUDContainer addSubview:_HUDIndicatorView];
        [_HUDProgress addSubview:_HUDContainer];
        
        CGFloat HUDYProgress = CGRectGetMaxY(self.navigationBar.frame);
        _HUDProgress.frame = CGRectMake(0, HUDYProgress, self.view.md_width, self.view.md_height - HUDYProgress);
        _HUDContainer.frame = CGRectMake((self.view.md_width - 120) / 2, (_HUDProgress.md_height - 90 - HUDYProgress) / 2, 120, 90);
        _HUDIndicatorView.frame = CGRectMake(45, 15, 30, 30);
        _HUDLabel.frame = CGRectMake(0,40, 120, 50);

    }
    [_HUDIndicatorView startAnimating];
    UIWindow *applicationWindow;
    if ([[[UIApplication sharedApplication] delegate] respondsToSelector:@selector(window)]) {
        applicationWindow = [[[UIApplication sharedApplication] delegate] window];
    } else {
        applicationWindow = [[UIApplication sharedApplication] keyWindow];
    }
    [applicationWindow addSubview:_HUDProgress];
    [self.view setNeedsLayout];
    
    __weak typeof(self) weakSelf = self;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(pickerConfig.timeout * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf hideProgressHUD];
    });
}

- (void)hideProgressHUD {
    if (_HUDProgress) {
        [_HUDIndicatorView stopAnimating];
        [_HUDProgress removeFromSuperview];
    }
}

- (void)settingBtnClick {
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
}

- (void)addSelectedModel:(MDAssetModel *)model {
    if (!model) {
        return;
    }
    if (model.type == MDAssetMediaTypePhotoGif) {
        _selectGIFCount++;
    }
    [_selectedModels addObject:model];
    [_selectedAssetIds addObject:model.asset.localIdentifier];
}

- (void)removeSelectedModel:(MDAssetModel *)model {
    if (!model) {
        return;
    }
    if (model.type == MDAssetMediaTypePhotoGif) {
        _selectGIFCount--;
    }
    [_selectedModels removeObject:model];
    [_selectedAssetIds removeObject:model.asset.localIdentifier];
}

- (BOOL)checkSelectedGifModel:(MDAssetModel *)model {
    if (!_pickerConfig.allowPickingGif) {
        return YES;
    }
    
    if (_selectGIFCount > 0) {
        if(model.type == MDAssetMediaTypePhotoGif) {
            return YES;
        } else {
            return NO;
        }
    } else {
        if(model.type == MDAssetMediaTypePhotoGif && self.selectedModels.count > 0) {
            return NO;
        } else {
            return YES;
        }
    }
}

#pragma mark -- property

- (void)updateCropRect {
    if(pickerConfig.cropRect.size.width <= 0) {
        CGFloat cropViewWH = MIN(self.view.md_width, self.view.md_height) / 3 * 2;
        pickerConfig.cropRect = CGRectMake((self.view.md_width - cropViewWH) / 2, (self.view.md_height - cropViewWH) / 2, cropViewWH, cropViewWH);
    }
    _cropRectPortrait = pickerConfig.cropRect;
    CGFloat widthHeight = pickerConfig.cropRect.size.width;
    _cropRectLandscape = CGRectMake((self.view.md_height - widthHeight) / 2, pickerConfig.cropRect.origin.x, widthHeight, widthHeight);
}


- (void)setPickerDelegate:(id<MDImagePickerControllerDelegate>)pickerDelegate {
    _pickerDelegate = pickerDelegate;
    [MDImageManager manager].pickerDelegate = pickerDelegate;
}

- (void)setSelectedAssets:(NSMutableArray *)selectedAssets {
    _selectedAssets = selectedAssets;
    _selectedModels = [NSMutableArray array];
    _selectedAssetIds = [NSMutableArray array];
    for (PHAsset *asset in selectedAssets) {
        MDAssetModel *model = [MDAssetModel modelWithAsset:asset type:[[MDImageManager manager] getAssetType:asset]];
        model.isSelected = YES;
        [self addSelectedModel:model];
    }
}

#pragma mark - UIContentContainer

- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.02 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (![UIApplication sharedApplication].statusBarHidden) {
            if (self.needShowStatusBar) {
                [UIApplication sharedApplication].statusBarHidden = NO;
            }
        }
    });
    if (size.width > size.height) {
        pickerConfig.cropRect = _cropRectLandscape;
    } else {
        pickerConfig.cropRect = _cropRectPortrait;
    }
}

- (void)cancelButtonClick {
    [self dismissViewControllerAnimated:YES completion:^{
        [self callDelegateMethod];
    }];
}

- (void)callDelegateMethod {
    if ([self.pickerDelegate respondsToSelector:@selector(md_imagePickerControllerDidCancel:)]) {
        [self.pickerDelegate md_imagePickerControllerDidCancel:self];
    }
    if (self.imagePickerControllerDidCancelHandle) {
        self.imagePickerControllerDidCancelHandle();
    }
}

- (void)dealloc {
    [MDImageManager manager].imagePicker = nil;
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    NSLog(@"%@-----dealloc",NSStringFromClass(self.class));
}

@end
