//
//  MDPhotoPickerController.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDPhotoPickerController.h"
#import "MDImagePickerController.h"
#import "MDPhotoPreviewController.h"
#import "MDAssetCell.h"
#import "MDAssetModel.h"
#import "UIView+MDExtension.h"
#import "MDImageManager.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import "MDCommonTools.h"

@interface MDPhotoPickerController ()<UICollectionViewDataSource,UICollectionViewDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIAlertViewDelegate>

/// BottomToolBar
@property (strong, nonatomic) UIView   *bottomToolBar;
@property (strong, nonatomic) UIButton *previewBtn;
@property (strong, nonatomic) UIButton *doneBtn;
@property (strong, nonatomic) UIView   *divideLine;
/// CollectionView
@property (assign, nonatomic) CGFloat offsetItemCount;
@property (nonatomic, assign) CGRect  previousPreheatRect;
@property (nonatomic, strong) MDCollectionView           *collectionView;
@property (strong, nonatomic) UICollectionViewFlowLayout *layout;
/// Bool & Object
@property (assign, nonatomic) BOOL shouldScrollToBottom;
@property (assign, nonatomic) BOOL showTakePhotoBtn;
@property (nonatomic, assign) BOOL isFirstAppear;
@property (nonatomic, strong) UIImagePickerController *sysImagePickerVC;
@property (nonatomic, strong) MDImagePickerController *mdImagePickerVC;
@property (assign, nonatomic) CGSize         assetSize;
@property (copy, nonatomic)   NSMutableArray *models;

@end

static CGFloat itemMargin = 5;

@implementation MDPhotoPickerController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.mdImagePickerVC = (MDImagePickerController *)self.navigationController;
    self.isFirstAppear = YES;
    self.shouldScrollToBottom = YES;
    self.showTakePhotoBtn = _albumModel.isCameraRoll && PickerConfig.allowTakePicture;
    self.view.backgroundColor = [UIColor whiteColor];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didChangeStatusBarOrientationNotification:) name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
    [self initNavigationView];
    [self configCollectionView];
    [self configBottomToolBar];
    if (!_models) {
        [self fetchAssetModels];
    }
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    [self.collectionView reloadData];
}

#pragma mark -- init method

- (void)initNavigationView {
    self.navigationItem.title = _albumModel.name;
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:Theme.cancelBtnTitle style:UIBarButtonItemStylePlain target:_mdImagePickerVC action:@selector(cancelButtonClick)];
    if (_mdImagePickerVC.navLeftBarButtonSettingBlock) {
        UIButton *leftButton = [UIButton buttonWithType:UIButtonTypeCustom];
        leftButton.frame = CGRectMake(0, 0, 44, 44);
        [leftButton addTarget:self action:@selector(navLeftBarButtonClick) forControlEvents:UIControlEventTouchUpInside];
        self.mdImagePickerVC.navLeftBarButtonSettingBlock(leftButton);
        self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:leftButton];
    } else if (_mdImagePickerVC.childViewControllers.count) {
        [self.mdImagePickerVC.childViewControllers firstObject].navigationItem.backBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:Theme.backBarBtnTitle style:UIBarButtonItemStylePlain target:nil action:nil];
    }
}

- (void)initSubviews {
    [self checkSelectedModels];
    dispatch_async(dispatch_get_main_queue(), ^{
        self.collectionView.hidden = YES;
        [_mdImagePickerVC hideProgressHUD];
        [self scrollCollectionViewToBottom];
        [self.collectionView reloadData];
    });
}

- (void)fetchAssetModels {
    if (_isFirstAppear && !_albumModel.models.count) {
        [_mdImagePickerVC showProgressHUD];
    }
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        if (self.isFirstAppear && self.albumModel.isCameraRoll) {
            [[MDImageManager manager] getCameraRollAlbum:YES completion:^(MDAlbumModel *model) {
                self.albumModel = model;
                self.models = [NSMutableArray arrayWithArray:self.albumModel.models];
                [self initSubviews];
            }];
        } else {
            if (self.showTakePhotoBtn || self.isFirstAppear) {
                [[MDImageManager manager] getAssetsFromFetchResult:self.albumModel.result completion:^(NSArray<MDAssetModel *> *models) {
                    self.models = [NSMutableArray arrayWithArray:models];
                    [self initSubviews];
                }];
            } else {
                self.models = [NSMutableArray arrayWithArray:self.albumModel.models];
                [self initSubviews];
            }
        }
    });
}

- (BOOL)prefersStatusBarHidden {
    return NO;
}

- (void)configCollectionView {
    _layout = [[UICollectionViewFlowLayout alloc] init];
    _collectionView = [[MDCollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:_layout];
    _collectionView.backgroundColor = [UIColor whiteColor];
    _collectionView.dataSource = self;
    _collectionView.delegate = self;
    _collectionView.alwaysBounceHorizontal = NO;
    _collectionView.contentInset = UIEdgeInsetsMake(itemMargin, itemMargin, itemMargin, itemMargin);
    
    /// CollectionViewHeight
    CGFloat top = 0;
    CGFloat collectionViewHeight = 0;
    CGFloat naviBarHeight = self.navigationController.navigationBar.md_height;
    CGFloat toolBarHeight = [MDCommonTools md_isIPhoneX] ? 50 + (83 - 49) : 50;
    BOOL isStatusBarHidden = [UIApplication sharedApplication].isStatusBarHidden;
    
    if (self.navigationController.navigationBar.isTranslucent) {
        top = naviBarHeight;
        if (!isStatusBarHidden) {
            top += [MDCommonTools md_statusBarHeight];
        }
        collectionViewHeight = PickerConfig.showSelectBtn ? self.view.md_height - toolBarHeight - top : self.view.md_height - top;;
    } else {
        collectionViewHeight = PickerConfig.showSelectBtn ? self.view.md_height - toolBarHeight : self.view.md_height;
    }
    _collectionView.frame = CGRectMake(0, top, self.view.md_width, collectionViewHeight);
    
    /// Layout
    CGFloat itemWH = (self.view.md_width - (PickerConfig.columnNumber + 1) * itemMargin) / PickerConfig.columnNumber;
    _layout.itemSize = CGSizeMake(itemWH, itemWH);
    _layout.minimumInteritemSpacing = itemMargin;
    _layout.minimumLineSpacing = itemMargin;
    [_collectionView setCollectionViewLayout:_layout];
    
    if (_offsetItemCount > 0) {
        CGFloat offsetY = _offsetItemCount * (_layout.itemSize.height + _layout.minimumLineSpacing);
        [_collectionView setContentOffset:CGPointMake(0, offsetY)];
    }
    
    if (_showTakePhotoBtn) {
        _collectionView.contentSize = CGSizeMake(self.view.md_width, ((_albumModel.count + PickerConfig.columnNumber) / PickerConfig.columnNumber) * self.view.md_width);

    } else {
        _collectionView.contentSize = CGSizeMake(self.view.md_width, ((_albumModel.count + PickerConfig.columnNumber - 1) / PickerConfig.columnNumber) * self.view.md_width);
    }

    [self.view addSubview:_collectionView];
    [_collectionView registerClass:[MDAssetCell class] forCellWithReuseIdentifier:@"MDAssetCell"];
    [_collectionView registerClass:[MDAssetCameraCell class] forCellWithReuseIdentifier:@"MDAssetCameraCell"];
    
    CGFloat scale = [UIScreen mainScreen].scale;
    CGSize cellSize = ((UICollectionViewFlowLayout *)_collectionView.collectionViewLayout).itemSize;
    _assetSize = CGSizeMake(cellSize.width * scale, cellSize.height * scale);
}


- (void)configBottomToolBar {
    if (!PickerConfig.showSelectBtn) {
        return;
    }
    
    _bottomToolBar = [[UIView alloc] initWithFrame:CGRectZero];
    CGFloat rgb = 255 / 255.0;
    _bottomToolBar.backgroundColor = [UIColor colorWithRed:rgb green:rgb blue:rgb alpha:1.0];
    CGFloat toolBarTop = 0;
    CGFloat naviBarHeight = self.navigationController.navigationBar.md_height;
    CGFloat toolBarHeight = [MDCommonTools md_isIPhoneX] ? 50 + (83 - 49) : 50;
    if (!self.navigationController.navigationBar.isHidden) {
        toolBarTop = self.view.md_height - toolBarHeight;
    } else {
        CGFloat navigationHeight = naviBarHeight + [MDCommonTools md_statusBarHeight];
        toolBarTop = self.view.md_height - toolBarHeight - navigationHeight;
    }
    _bottomToolBar.frame = CGRectMake(0, toolBarTop, self.view.md_width, toolBarHeight);
    
    _previewBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    CGFloat previewWidth = [Theme.previewBtnTitle boundingRectWithSize:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX) options:NSStringDrawingUsesFontLeading attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:16]} context:nil].size.width + 2;
    _previewBtn.frame = CGRectMake(10, 3, previewWidth, 44);
    _previewBtn.md_width = !PickerConfig.showSelectBtn ? 0 : previewWidth;
    [_previewBtn addTarget:self action:@selector(previewButtonClick) forControlEvents:UIControlEventTouchUpInside];
    _previewBtn.titleLabel.font = [UIFont systemFontOfSize:14];
    [_previewBtn setTitle:Theme.previewBtnTitle forState:UIControlStateNormal];
    [_previewBtn setTitle:Theme.previewBtnTitle forState:UIControlStateDisabled];
    [_previewBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [_previewBtn setTitleColor:[UIColor lightGrayColor] forState:UIControlStateDisabled];
    _previewBtn.enabled = _mdImagePickerVC.selectedModels.count;
    
    NSString * doneTitle = [Theme.doneBtnTitle stringByAppendingString:[NSString stringWithFormat:@"(%d/%d)",_mdImagePickerVC.selectedModels.count,PickerConfig.maxImagesCount]];
    _doneBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    _doneBtn.titleLabel.font = [UIFont systemFontOfSize:13];
    [_doneBtn addTarget:self action:@selector(doneButtonClick) forControlEvents:UIControlEventTouchUpInside];
    [_doneBtn setTitle:doneTitle forState:UIControlStateNormal];
    [_doneBtn setTitle:doneTitle forState:UIControlStateDisabled];
    [_doneBtn setTitleColor:Theme.oKButtonColorNormal forState:UIControlStateNormal];
    [_doneBtn setTitleColor:Theme.oKButtonColorDisabled forState:UIControlStateDisabled];
    [_doneBtn setBackgroundColor:Theme.themeColor];
    [_doneBtn sizeToFit];
    _doneBtn.frame = CGRectMake(self.view.md_width - 72 - 12, 11, 72, 26);
    _doneBtn.enabled = _mdImagePickerVC.selectedModels.count || PickerConfig.alwaysEnableDoneBtn;
    _doneBtn.layer.cornerRadius = 2;
    _doneBtn.layer.masksToBounds = YES;

    _divideLine = [[UIView alloc] init];
    CGFloat rgb2 = 222 / 255.0;
    _divideLine.backgroundColor = [UIColor colorWithRed:rgb2 green:rgb2 blue:rgb2 alpha:1.0];
    _divideLine.frame = CGRectMake(0, 0, self.view.md_width, 1);
    
    [_bottomToolBar addSubview:_divideLine];
    [_bottomToolBar addSubview:_previewBtn];
    [_bottomToolBar addSubview:_doneBtn];
    [self.view addSubview:_bottomToolBar];
}

- (UIImagePickerController *)sysImagePickerVC {
    if (_sysImagePickerVC == nil) {
        _sysImagePickerVC = [[UIImagePickerController alloc] init];
        _sysImagePickerVC.delegate = self;
        _sysImagePickerVC.navigationBar.barTintColor = self.navigationController.navigationBar.barTintColor;
        _sysImagePickerVC.navigationBar.tintColor = self.navigationController.navigationBar.tintColor;
        UIBarButtonItem *mdBarItem, *BarItem;
        if (@available(iOS 9, *)) {
            mdBarItem = [UIBarButtonItem appearanceWhenContainedInInstancesOfClasses:@[[MDImagePickerController class]]];
            BarItem = [UIBarButtonItem appearanceWhenContainedInInstancesOfClasses:@[[UIImagePickerController class]]];
        } else {
            mdBarItem = [UIBarButtonItem appearanceWhenContainedIn:[MDImagePickerController class], nil];
            BarItem = [UIBarButtonItem appearanceWhenContainedIn:[UIImagePickerController class], nil];
        }
        NSDictionary *titleAttributes = [mdBarItem titleTextAttributesForState:UIControlStateNormal];
        [BarItem setTitleTextAttributes:titleAttributes forState:UIControlStateNormal];
    }
    return _sysImagePickerVC;
}

- (void)scrollCollectionViewToBottom {
    if (_shouldScrollToBottom && _models.count > 0) {
        NSInteger itemCount = 0;
        if (PickerConfig.sortAscendingByModificationDate) {
            itemCount = _models.count - 1;
            if (_showTakePhotoBtn) {
                itemCount += 1;
            }
        }
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.01 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self.collectionView scrollToItemAtIndexPath:[NSIndexPath indexPathForItem:itemCount inSection:0] atScrollPosition:UICollectionViewScrollPositionBottom animated:NO];
            self.shouldScrollToBottom = NO;
            self.collectionView.hidden = NO;
        });
    } else {
        _collectionView.hidden = NO;
    }
}

- (void)checkSelectedModels {
    NSMutableArray *selectedAssets = [NSMutableArray array];
    for (MDAssetModel * model in _mdImagePickerVC.selectedModels) {
        [selectedAssets addObject:model.asset];
    }
    if (selectedAssets.count > 0) {
        for (MDAssetModel *model in _models) {
            model.isSelected = NO;
            if ([selectedAssets containsObject:model.asset]) {
                model.isSelected = YES;
            }
        }
    }
}

#pragma mark - Notification

- (void)didChangeStatusBarOrientationNotification:(NSNotification *)noti {
    _offsetItemCount = _collectionView.contentOffset.y / (_layout.itemSize.height + _layout.minimumLineSpacing);
}

#pragma mark - Click Event
- (void)navLeftBarButtonClick{
    [self.navigationController popViewControllerAnimated:YES];
}
- (void)previewButtonClick {
    MDPhotoPreviewController *photoPreviewVC = [[MDPhotoPreviewController alloc] init];
    photoPreviewVC.sourceType = PreviewImageByAssets;
    photoPreviewVC.models = [NSMutableArray arrayWithArray:_mdImagePickerVC.selectedModels];
    [self pushPhotoPrevireViewController:photoPreviewVC needCheckSelectedModels:YES];
}

- (void)doneButtonClick {
    [_mdImagePickerVC showProgressHUD];
    NSMutableArray *assets = [NSMutableArray array];
    NSMutableArray *photos;
    NSMutableArray *infoArr;
    if (PickerConfig.onlyReturnAsset) {
        // not fetch image
        for (NSInteger i = 0; i < _mdImagePickerVC.selectedModels.count; i++) {
            MDAssetModel *model = _mdImagePickerVC.selectedModels[i];
            [assets addObject:model.asset];
        }
    } else {
        // fetch image
        photos = [NSMutableArray array];
        infoArr = [NSMutableArray array];
        for (NSInteger i = 0; i < _mdImagePickerVC.selectedModels.count; i++) {
            [photos addObject:@1];
            [assets addObject:@1];
            [infoArr addObject:@1];
        }
        __block BOOL havenotShowAlert = YES;
        [MDImageManager manager].shouldFixOrientation = YES;
        __block UIAlertController *alertView;
        for (NSInteger i = 0; i < _mdImagePickerVC.selectedModels.count; i++) {
            MDAssetModel *model = _mdImagePickerVC.selectedModels[i];
            [[MDImageManager manager] getPhotoWithAsset:model.asset completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
                if (isDegraded) {
                    return;
                }
                if (photo) {
                    [photos replaceObjectAtIndex:i withObject:photo];
                }
                if (info) {
                    [infoArr replaceObjectAtIndex:i withObject:info];
                }
                [assets replaceObjectAtIndex:i withObject:model.asset];
                
                for (id item in photos) {
                    if ([item isKindOfClass:[NSNumber class]]) {
                        return;
                    }
                }
                
                if (havenotShowAlert) {
                    [_mdImagePickerVC hideAlertView:alertView];
                    [self didGetAllPhotos:photos assets:assets infoArr:infoArr];
                }
            }];
        }
    }
    if (_mdImagePickerVC.selectedModels.count <= 0 || PickerConfig.onlyReturnAsset) {
        [self didGetAllPhotos:photos assets:assets infoArr:infoArr];
    }
}

- (void)didGetAllPhotos:(NSArray *)photos assets:(NSArray *)assets infoArr:(NSArray *)infoArr {
    [_mdImagePickerVC hideProgressHUD];
    [self.navigationController dismissViewControllerAnimated:YES completion:^{
        [self callDelegateMethodWithPhotos:photos assets:assets infoArr:infoArr];
    }];
}

- (void)callDelegateMethodWithPhotos:(NSArray *)photos assets:(NSArray *)assets infoArr:(NSArray *)infoArr {
    if ([_mdImagePickerVC.pickerDelegate respondsToSelector:@selector(imagePickerController:didFinishPickingPhotos:sourceAssets:isSelectOriginalPhoto:)]) {
        [_mdImagePickerVC.pickerDelegate imagePickerController:_mdImagePickerVC didFinishPickingPhotos:photos sourceAssets:assets];
    }
    if ([_mdImagePickerVC.pickerDelegate respondsToSelector:@selector(imagePickerController:didFinishPickingPhotos:sourceAssets:infos:)]) {
        [_mdImagePickerVC.pickerDelegate imagePickerController:_mdImagePickerVC didFinishPickingPhotos:photos sourceAssets:assets infos:infoArr];
    }
    if (_mdImagePickerVC.didFinishPickingPhotosHandle) {
        _mdImagePickerVC.didFinishPickingPhotosHandle(photos,assets);
    }
    if (_mdImagePickerVC.didFinishPickingPhotosWithInfosHandle) {
        _mdImagePickerVC.didFinishPickingPhotosWithInfosHandle(photos,assets,infoArr);
    }
}

#pragma mark - UICollectionViewDataSource && Delegate

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    if (_showTakePhotoBtn) {
        return _models.count + 1;
    }
    return _models.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    /// take photo
    if ((indexPath.item == 0) && _showTakePhotoBtn) {
        MDAssetCameraCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MDAssetCameraCell" forIndexPath:indexPath];
        cell.imageView.image = [UIImage imageNamed:Theme.takePictureImageName];
        if ([Theme.takePictureImageName isEqualToString:@"takePicture80"]) {
            cell.imageView.contentMode = UIViewContentModeCenter;
            CGFloat rgb = 223 / 255.0;
            cell.imageView.backgroundColor = [UIColor colorWithRed:rgb green:rgb blue:rgb alpha:1.0];
        } else {
            cell.imageView.backgroundColor = [UIColor colorWithWhite:1.000 alpha:0.500];
        }
        return cell;
    }

    MDAssetCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MDAssetCell" forIndexPath:indexPath];
    cell.photoDefImage = [UIImage imageNamed:Theme.photoDefImageName];
    cell.photoSelImage = [UIImage imageNamed:Theme.photoSelImageName];
    MDAssetModel *model;
    if (!_showTakePhotoBtn) {
        if (indexPath.item < _models.count) {
            model = _models[indexPath.item];
        }
    } else {
        if (indexPath.item - 1 < _models.count) {
            model = _models[indexPath.item - 1];
        }
    }
    cell.allowPickingGif = PickerConfig.allowPickingGif;
    cell.model = model;
    cell.showSelectBtn = PickerConfig.showSelectBtn;
    
    __weak typeof(cell) weakCell = cell;
    __weak typeof(self) weakSelf = self;
    cell.didSelectPhotoBlock = ^(BOOL isSelected) {
        __strong typeof(weakCell) strongCell = weakCell;
        __strong typeof(weakSelf) strongSelf = weakSelf;
        MDImagePickerController *_mdImagePickerVC = (MDImagePickerController *)strongSelf.navigationController;
        // 1. 取消选择
        if (isSelected) {
            strongCell.selectPhotoButton.selected = NO;
            model.isSelected = NO;
            NSArray *selectedModels = [NSArray arrayWithArray:_mdImagePickerVC.selectedModels];
            for (MDAssetModel *model_item in selectedModels) {
                if ([model.asset.localIdentifier isEqualToString:model_item.asset.localIdentifier]) {
                    [_mdImagePickerVC removeSelectedModel:model_item];
                    break;
                }
            }
            [strongSelf refreshBottomToolBarStatus];
        } else {
            // 2. 选择照片,检查是否超过了最大个数的限制
            if (_mdImagePickerVC.selectedModels.count < PickerConfig.maxImagesCount) {
                strongCell.selectPhotoButton.selected = YES;
                model.isSelected = YES;
                model.needOscillatoryAnimation = YES;
                [_mdImagePickerVC addSelectedModel:model];
                [strongSelf refreshBottomToolBarStatus];
            } else {
                NSString *title = [NSString stringWithFormat:Theme.overMaxImageTitle, PickerConfig.maxImagesCount];
                [_mdImagePickerVC showAlertWithTitle:title];
            }
        }
    };
    return cell;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    if ((indexPath.item == 0) && _showTakePhotoBtn)  {
        [self takePhoto];
        return;
    }
    NSInteger index = indexPath.item;
    if (self.showTakePhotoBtn) {
        index = indexPath.item - 1;
    }
    MDPhotoPreviewController *photoPreviewVC = [[MDPhotoPreviewController alloc] init];
    photoPreviewVC.sourceType = PreviewImageByAssets;
    photoPreviewVC.currentIndex = index;
    photoPreviewVC.models = _models;
    [self pushPhotoPrevireViewController:photoPreviewVC];
}

#pragma mark - Private Method

/// 拍照按钮点击事件
- (void)takePhoto {
    AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if ((authStatus == AVAuthorizationStatusRestricted || authStatus ==AVAuthorizationStatusDenied)) {
        NSDictionary *infoDict = [MDCommonTools md_getInfoDictionary];
        // 无权限做一个友好的提示
        NSString *appName = [infoDict valueForKey:@"CFBundleDisplayName"];
        if (!appName) {
            appName = [infoDict valueForKey:@"CFBundleName"];
        }
        NSString *message = [NSString stringWithFormat:Theme.cameraAuthorizationTitle,appName];
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:Theme.canNotUseCamera message:message delegate:self cancelButtonTitle:Theme.cancelTitle otherButtonTitles:Theme.settingTitle, nil];
        [alert show];
    } else if (authStatus == AVAuthorizationStatusNotDetermined) {
        // 防止用户首次拍照拒绝授权时相机页黑屏
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
            if (granted) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [self pushImagePickerController];
                });
            }
        }];
    } else {
        [self pushImagePickerController];
    }
}

// 调用相机
- (void)pushImagePickerController {
    UIImagePickerControllerSourceType sourceType = UIImagePickerControllerSourceTypeCamera;
    if ([UIImagePickerController isSourceTypeAvailable:sourceType]) {
        self.sysImagePickerVC.sourceType = sourceType;
        NSMutableArray *mediaTypes = [NSMutableArray array];
        if (PickerConfig.allowTakePicture) {
            [mediaTypes addObject:(NSString *)kUTTypeImage];
        }
        self.sysImagePickerVC.mediaTypes= mediaTypes;
        [self presentViewController:_sysImagePickerVC animated:YES completion:nil];
    } else {
        NSLog(@"模拟器中无法打开照相机,请在真机中使用");
    }
}

- (void)refreshBottomToolBarStatus {
    _previewBtn.enabled = _mdImagePickerVC.selectedModels.count > 0;
    _doneBtn.enabled = _mdImagePickerVC.selectedModels.count > 0 || PickerConfig.alwaysEnableDoneBtn;
    NSString * doneTitle = [Theme.doneBtnTitle stringByAppendingString:[NSString stringWithFormat:@"(%d/%d)",_mdImagePickerVC.selectedModels.count,PickerConfig.maxImagesCount]];
    [_doneBtn setTitle:doneTitle forState:UIControlStateNormal];
    [_doneBtn setTitle:doneTitle forState:UIControlStateDisabled];
}

- (void)pushPhotoPrevireViewController:(MDPhotoPreviewController *)photoPreviewVc {
    [self pushPhotoPrevireViewController:photoPreviewVc needCheckSelectedModels:NO];
}

- (void)pushPhotoPrevireViewController:(MDPhotoPreviewController *)photoPreviewVc
               needCheckSelectedModels:(BOOL)needCheckSelectedModels {
    __weak typeof(self) weakSelf = self;
    [photoPreviewVc setBackButtonClickBlock:^ {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (needCheckSelectedModels) {
            [strongSelf checkSelectedModels];
        }
        [strongSelf.collectionView reloadData];
        [strongSelf refreshBottomToolBarStatus];
    }];
    [photoPreviewVc setDoneButtonClickBlock:^ {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf doneButtonClick];
    }];
    [photoPreviewVc setDoneButtonClickBlockCropMode:^(UIImage *cropedImage, id asset) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf didGetAllPhotos:@[cropedImage] assets:@[asset] infoArr:nil];
    }];
    [self.navigationController pushViewController:photoPreviewVc animated:YES];
}

#pragma mark - UIAlertViewDelegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    if (buttonIndex == 1) {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
    }
}

#pragma mark - UIImagePickerControllerDelegate

- (void)imagePickerController:(UIImagePickerController*)picker didFinishPickingMediaWithInfo:(NSDictionary *)info {
    [picker dismissViewControllerAnimated:YES completion:nil];
    NSString *type = [info objectForKey:UIImagePickerControllerMediaType];
    if ([type isEqualToString:@"public.image"]) {
        [_mdImagePickerVC showProgressHUD];
        UIImage *photo = [info objectForKey:UIImagePickerControllerOriginalImage];
        if (photo) {
            [[MDImageManager manager] savePhotoWithImage:photo completion:^(PHAsset *asset, NSError *error){
                if (!error) {
                    [self addPHAsset:asset];
                }
            }];
        }
    }
}

- (void)addPHAsset:(PHAsset *)asset {
    MDAssetModel *assetModel = [[MDImageManager manager] assetModelWithAsset:asset];
    [_mdImagePickerVC hideProgressHUD];
    if (PickerConfig.sortAscendingByModificationDate) {
        NSMutableArray * tmpArr = _models.mutableCopy;
        [tmpArr addObject:assetModel];
        _models = tmpArr;
    } else {
        NSMutableArray * tmpArr = _models.mutableCopy;
        [tmpArr insertObject:assetModel atIndex:0];
        _models = tmpArr;
    }
    
    if (PickerConfig.maxImagesCount <= 1) {
        if (PickerConfig.allowCrop && asset.mediaType == PHAssetMediaTypeImage) {
            MDPhotoPreviewController *photoPreviewVC = [[MDPhotoPreviewController alloc] init];
            photoPreviewVC.sourceType = PreviewImageByAssets;
            if (PickerConfig.sortAscendingByModificationDate) {
                photoPreviewVC.currentIndex = _models.count - 1;
            } else {
                photoPreviewVC.currentIndex = 0;
            }
            photoPreviewVC.models = _models;
            [self pushPhotoPrevireViewController:photoPreviewVC];
        } else {
            [_mdImagePickerVC addSelectedModel:assetModel];
            [self doneButtonClick];
        }
        return;
    }
    
    if (_mdImagePickerVC.selectedModels.count < PickerConfig.maxImagesCount) {
        if (assetModel.type == MDAssetMediaTypeVideo) {
            // 不能多选视频的情况下,不选中拍摄的视频
        } else {
            assetModel.isSelected = YES;
            [_mdImagePickerVC addSelectedModel:assetModel];
            [self refreshBottomToolBarStatus];
        }
    }
    _collectionView.hidden = YES;
    [_collectionView reloadData];
    _shouldScrollToBottom = YES;
    [self scrollCollectionViewToBottom];
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker {
    [picker dismissViewControllerAnimated:YES completion:nil];
}

- (void)dealloc {
     NSLog(@"%@-----dealloc",NSStringFromClass(self.class));
}

@end

@implementation MDCollectionView

- (BOOL)touchesShouldCancelInContentView:(UIView *)view {
    if ([view isKindOfClass:[UIControl class]]) {
        return YES;
    }
    return [super touchesShouldCancelInContentView:view];
}

@end
