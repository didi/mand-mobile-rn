//
//  MDPhotoPreviewController.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDPhotoPreviewController.h"
#import "MDPhotoPreviewCell.h"
#import "MDAssetModel.h"
#import "MDImagePickerController.h"
#import "MDImageCropManager.h"
#import "MDCommonTools.h"
#import "UIView+MDExtension.h"

@interface MDPhotoPreviewController ()<UICollectionViewDataSource,UICollectionViewDelegate,UIScrollViewDelegate>

@property (nonatomic, strong) UICollectionView *collectionView;
@property (nonatomic, strong) UICollectionViewFlowLayout *layout;
@property (nonatomic, strong) NSArray *photosTemp;
@property (nonatomic, strong) NSArray *assetsTemp;
/// NaviBar
@property (nonatomic, strong) UIView   *naviBar;
@property (nonatomic, strong) UIButton *backButton;
@property (nonatomic, strong) UIButton *selectButton;
@property (nonatomic, strong) UILabel  *indexLabel;
@property (nonatomic, strong) UILabel  *middleIndexLabel;
/// ToolBar
@property (nonatomic, strong) UIView   *toolBar;
@property (nonatomic, strong) UIButton *doneButton;

@property (nonatomic, strong) UIView *cropBgView;
@property (nonatomic, strong) UIView *cropView;
@property (nonatomic, assign) BOOL    isHideNaviBar;
@property (nonatomic, assign) CGFloat offsetItemCount;
@property (nonatomic, assign) double  progress;
@property (nonatomic, strong) UIAlertController       *alertView;
@property (nonatomic, strong) MDImagePickerController *mdImagePickerVC;

@end

@implementation MDPhotoPreviewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.mdImagePickerVC = (MDImagePickerController *)self.navigationController;
    [MDImageManager manager].shouldFixOrientation = YES;
    self.view.clipsToBounds = YES;
    [self configCollectionView];
    [self configCustomNaviBar];
    [self configBottomToolBar];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didChangeStatusBarOrientationNotification:) name:UIApplicationDidChangeStatusBarOrientationNotification object:nil];
}

- (void)setPhotos:(NSMutableArray *)photos {
    _photos = photos;
    _photosTemp = [NSArray arrayWithArray:photos];
}

- (void)setModels:(NSMutableArray *)models {
    _models = models;
    _assetsTemp = [NSMutableArray arrayWithArray:_mdImagePickerVC.selectedAssets];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
    [UIApplication sharedApplication].statusBarHidden = NO;
    if (_currentIndex) {
        [_collectionView setContentOffset:CGPointMake((self.view.md_width + 20) * self.currentIndex, 0) animated:NO];
    }
    [self refreshNaviBarAndBottomBarState];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [self.navigationController setNavigationBarHidden:NO animated:YES];
    if (_mdImagePickerVC.needShowStatusBar) {
        [UIApplication sharedApplication].statusBarHidden = NO;
    }
    [MDImageManager manager].shouldFixOrientation = NO;
}

- (BOOL)prefersStatusBarHidden {
    return NO;
}

- (void)configCustomNaviBar {
    CGFloat statusBarHeight = [MDCommonTools md_statusBarHeight];
    CGFloat statusBarHeightInterval = statusBarHeight - 20;
    CGFloat naviBarHeight = statusBarHeight + _mdImagePickerVC.navigationBar.md_height;
    _naviBar = [[UIView alloc] initWithFrame:CGRectZero];
    _naviBar.backgroundColor = [UIColor whiteColor];
    _naviBar.frame = CGRectMake(0, 0, self.view.md_width, naviBarHeight);
    
    _backButton = [[UIButton alloc] initWithFrame:CGRectZero];
    _backButton.frame = CGRectMake(15, 37 + statusBarHeightInterval, 25, 25);
    [_backButton setImage:[UIImage imageNamed:Theme.naviBackImageName] forState:UIControlStateNormal];
    [_backButton setImageEdgeInsets:UIEdgeInsetsMake(4, 3, 4, 3)];
    [_backButton setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [_backButton addTarget:self action:@selector(backButtonClick) forControlEvents:UIControlEventTouchUpInside];
    
    _selectButton = [[UIButton alloc] initWithFrame:CGRectZero];
    _selectButton.frame = CGRectMake(self.view.md_width - 46, 27 + statusBarHeightInterval, 40, 40);
    [_selectButton setImage:[UIImage imageNamed:Theme.photoDefPreviewImageName] forState:UIControlStateNormal];
    [_selectButton setImage:[UIImage imageNamed:Theme.photoSelImageName] forState:UIControlStateSelected];
    _selectButton.imageView.clipsToBounds = YES;
    _selectButton.imageEdgeInsets = UIEdgeInsetsMake(10, 0, 10, 0);
    _selectButton.imageView.contentMode = UIViewContentModeScaleAspectFit;
    [_selectButton addTarget:self action:@selector(select:) forControlEvents:UIControlEventTouchUpInside];
    _selectButton.hidden = !PickerConfig.showSelectBtn && self.sourceType == PreviewImageByPhotos;

    _indexLabel = [[UILabel alloc] init];
    _indexLabel.font = [UIFont systemFontOfSize:14];
    _indexLabel.textColor = [UIColor whiteColor];
    _indexLabel.textAlignment = NSTextAlignmentCenter;
    _indexLabel.frame = _selectButton.frame;
    
    _middleIndexLabel = [[UILabel alloc] init];
    _middleIndexLabel.frame = CGRectMake((self.view.md_width - 72) / 2.0, 30 + statusBarHeightInterval, 72, 30);
    _middleIndexLabel.font = [UIFont systemFontOfSize:16];
    _middleIndexLabel.textColor = [UIColor blackColor];
    _middleIndexLabel.textAlignment = NSTextAlignmentCenter;
    _middleIndexLabel.hidden = self.sourceType == PreviewImageByAssets || !PickerConfig.showMiddleIndex;
    
    [_naviBar addSubview:_selectButton];
    [_naviBar addSubview:_indexLabel];
    [_naviBar addSubview:_middleIndexLabel];
    [_naviBar addSubview:_backButton];
    [self.view addSubview:_naviBar];
}

- (void)configBottomToolBar {
    CGFloat toolBarHeight = [MDCommonTools md_isIPhoneX] ? 44 + (83 - 49) : 44;
    CGFloat toolBarTop = self.view.md_height - toolBarHeight;
    
    _toolBar = [[UIView alloc] initWithFrame:CGRectZero];
    static CGFloat rgb = 255 / 255.0;
    _toolBar.backgroundColor = [UIColor colorWithRed:rgb green:rgb blue:rgb alpha:1.0];
    _toolBar.frame = CGRectMake(0, toolBarTop, self.view.md_width, toolBarHeight);

    _doneButton = [UIButton buttonWithType:UIButtonTypeCustom];
    NSString * doneTitle = [Theme.doneBtnTitle stringByAppendingString:[NSString stringWithFormat:@"(%zd/%zd)",_mdImagePickerVC.selectedModels.count,PickerConfig.maxImagesCount]];
    _doneButton.titleLabel.font = [UIFont systemFontOfSize:13];
    [_doneButton addTarget:self action:@selector(doneButtonClick) forControlEvents:UIControlEventTouchUpInside];
    [_doneButton setTitle:doneTitle forState:UIControlStateNormal];
    [_doneButton setTitleColor:Theme.oKButtonColorNormal forState:UIControlStateNormal];
    [_doneButton setBackgroundColor:Theme.themeColor];
    [_doneButton sizeToFit];
    _doneButton.frame = CGRectMake(self.view.md_width - 84, 11, 72, 26);
    _doneButton.layer.cornerRadius = 2;
    _selectButton.layer.masksToBounds = YES;

    [_toolBar addSubview:_doneButton];
    [self.view addSubview:_toolBar];
    
    if(self.sourceType == PreviewImageByPhotos) {
        _toolBar.hidden = YES;
    }
}

- (void)configCollectionView {
    _layout = [[UICollectionViewFlowLayout alloc] init];
    _layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    _collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:_layout];
    _collectionView.frame = CGRectMake(-10, 0, self.view.md_width + 20, self.view.md_height);
    _collectionView.backgroundColor = [UIColor blackColor];
    _collectionView.dataSource = self;
    _collectionView.delegate = self;
    _collectionView.pagingEnabled = YES;
    _collectionView.scrollsToTop = NO;
    _collectionView.showsHorizontalScrollIndicator = NO;
    _collectionView.contentOffset = CGPointMake(0, 0);
    _collectionView.contentSize = CGSizeMake(self.models.count * (self.view.md_width + 20), 0);
    [self.view addSubview:_collectionView];
    [_collectionView registerClass:[MDPhotoPreviewCell class] forCellWithReuseIdentifier:@"MDPhotoPreviewCell"];
    [_collectionView registerClass:[MDGifPreviewCell class] forCellWithReuseIdentifier:@"MDGifPreviewCell"];
    _layout.itemSize = CGSizeMake(self.view.md_width + 20, self.view.md_height);
    _layout.minimumInteritemSpacing = 0;
    _layout.minimumLineSpacing = 0;
    [_collectionView setCollectionViewLayout:_layout];

}

- (void)configCropView {
    if (PickerConfig.maxImagesCount <= 1 && PickerConfig.allowCrop) {
        [_cropView removeFromSuperview];
        [_cropBgView removeFromSuperview];
        
        _cropBgView = [UIView new];
        _cropBgView.userInteractionEnabled = NO;
        _cropBgView.frame = self.view.bounds;
        _cropBgView.backgroundColor = [UIColor clearColor];
        [self.view addSubview:_cropBgView];
        [MDImageCropManager overlayClippingWithView:_cropBgView cropRect:PickerConfig.cropRect containerView:self.view];
        
        _cropView = [UIView new];
        _cropView.userInteractionEnabled = NO;
        _cropView.frame = PickerConfig.cropRect;
        _cropView.backgroundColor = [UIColor clearColor];
        _cropView.layer.borderColor = [UIColor whiteColor].CGColor;
        _cropView.layer.borderWidth = 1.0;
        [self.view addSubview:_cropView];
                
        [self.view bringSubviewToFront:_naviBar];
        [self.view bringSubviewToFront:_toolBar];
    }
}

#pragma mark - Layout

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    if (_offsetItemCount > 0) {
        CGFloat offsetX = _offsetItemCount * _layout.itemSize.width;
        [_collectionView setContentOffset:CGPointMake(offsetX, 0)];
    }
    if (PickerConfig.allowCrop) {
        [_collectionView reloadData];
    }
    [self configCropView];
}

#pragma mark - Notification

- (void)didChangeStatusBarOrientationNotification:(NSNotification *)noti {
    _offsetItemCount = _collectionView.contentOffset.x / _layout.itemSize.width;
}

#pragma mark - Click Event

- (void)select:(UIButton *)selectButton {
    MDAssetModel *model = nil;
    if (self.currentIndex < _models.count) {
        model = _models[self.currentIndex];
    }
    
    if (!selectButton.isSelected) {
        if (PickerConfig.allowPickingGif && ![_mdImagePickerVC checkSelectedGifModel:model]) {
            [_mdImagePickerVC showAlertWithTitle:Theme.selectgGIFTip];
            return;
        }

        if (_mdImagePickerVC.selectedModels.count >= PickerConfig.maxImagesCount) {
            NSString *title = [NSString stringWithFormat:Theme.overMaxImageTitle, PickerConfig.maxImagesCount];
            [_mdImagePickerVC showAlertWithTitle:title];
            return;
        } else {
            [_mdImagePickerVC addSelectedModel:model];
            if (self.photos) {
                [_mdImagePickerVC.selectedAssets addObject:_assetsTemp[self.currentIndex]];
                [self.photos addObject:_photosTemp[self.currentIndex]];
            }
        }
    } else {
        NSArray *selectedModels = [NSArray arrayWithArray:_mdImagePickerVC.selectedModels];
        for (MDAssetModel *model_item in selectedModels) {
            if ([model.asset.localIdentifier isEqualToString:model_item.asset.localIdentifier]) {
                // 防止有多个一样的model,一次性被移除了
                NSArray *selectedModelsTmp = [NSArray arrayWithArray:_mdImagePickerVC.selectedModels];
                for (NSInteger i = 0; i < selectedModelsTmp.count; i++) {
                    MDAssetModel *model = selectedModelsTmp[i];
                    if ([model isEqual:model_item]) {
                        [_mdImagePickerVC removeSelectedModel:model];
                        break;
                    }
                }
                if (self.photos) {
                    // 防止有多个一样的asset,一次性被移除了
                    NSArray *selectedAssetsTmp = [NSArray arrayWithArray:_mdImagePickerVC.selectedAssets];
                    for (NSInteger i = 0; i < selectedAssetsTmp.count; i++) {
                        id asset = selectedAssetsTmp[i];
                        if ([asset isEqual:_assetsTemp[self.currentIndex]]) {
                            [_mdImagePickerVC.selectedAssets removeObjectAtIndex:i];
                            break;
                        }
                    }
                    [self.photos removeObject:_photosTemp[self.currentIndex]];
                }
                break;
            }
        }
    }
    model.isSelected = !selectButton.isSelected;
    [self refreshNaviBarAndBottomBarState];
    if (model.isSelected) {
        [UIView showOscillatoryAnimationWithLayer:selectButton.imageView.layer type:MDOscillatoryAnimationToBigger];
    }
}

- (void)backButtonClick {
    if (self.navigationController.childViewControllers.count < 2) {
        [self.navigationController dismissViewControllerAnimated:YES completion:nil];
        if ([self.navigationController isKindOfClass: [MDImagePickerController class]]) {
            MDImagePickerController *nav = (MDImagePickerController *)self.navigationController;
            if (nav.imagePickerControllerDidCancelHandle) {
                nav.imagePickerControllerDidCancelHandle();
            }
        }
        return;
    }
    [self.navigationController popViewControllerAnimated:YES];
    if (self.backButtonClickBlock) {
        self.backButtonClickBlock();
    }
}

- (void)doneButtonClick {    
    // 如果没有选中过照片 点击确定时选中当前预览的照片
    if (_mdImagePickerVC.selectedModels.count == 0 && self.currentIndex < _models.count) {
        MDAssetModel *model = _models[self.currentIndex];
        [_mdImagePickerVC addSelectedModel:model];
    }
    NSIndexPath *indexPath = [NSIndexPath indexPathForItem:self.currentIndex inSection:0];
    MDPhotoPreviewCell *cell = (MDPhotoPreviewCell *)[_collectionView cellForItemAtIndexPath:indexPath];
    if (PickerConfig.allowCrop && [cell isKindOfClass:[MDPhotoPreviewCell class]]) { // 裁剪状态
        _doneButton.enabled = NO;
        [_mdImagePickerVC showProgressHUD];
        UIImage *cropedImage = [MDImageCropManager cropImageView:cell.previewView.imageView toRect:PickerConfig.cropRect zoomScale:cell.previewView.scrollView.zoomScale containerView:self.view];
        
        _doneButton.enabled = YES;
        [_mdImagePickerVC hideProgressHUD];
        if (self.doneButtonClickBlockCropMode) {
            MDAssetModel *model = _models[self.currentIndex];
            self.doneButtonClickBlockCropMode(cropedImage,model.asset);
        }
    } else if (self.doneButtonClickBlock) { // 非裁剪状态
        self.doneButtonClickBlock();
    }
    if (self.doneButtonClickBlockWithPreviewType) {
        self.doneButtonClickBlockWithPreviewType(self.photos,_mdImagePickerVC.selectedAssets);
    }
}

- (void)didTapPreviewCell {
    self.isHideNaviBar = !self.isHideNaviBar;
    _naviBar.hidden = self.isHideNaviBar;
    _toolBar.hidden = self.isHideNaviBar || self.sourceType == PreviewImageByPhotos;
}

#pragma mark - UIScrollViewDelegate

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGFloat offSetWidth = scrollView.contentOffset.x;
    offSetWidth = offSetWidth +  ((self.view.md_width + 20) * 0.5);
    
    NSInteger currentIndex = offSetWidth / (self.view.md_width + 20);
    if ((currentIndex < _models.count || currentIndex < _photos.count) && _currentIndex != currentIndex) {
        _currentIndex = currentIndex;
        [self refreshNaviBarAndBottomBarState];
    }
    
    [[NSNotificationCenter defaultCenter] postNotificationName:@"photoPreviewCollectionViewDidScroll" object:nil];
}

#pragma mark - UICollectionViewDataSource && Delegate

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    if (self.sourceType == PreviewImageByAssets) {
        return _models.count;
    } else {
        return _photos.count;
    }
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    MDAssetPreviewCell *cell;
    if (self.sourceType == PreviewImageByAssets) {
        cell = [self dequeueReusableCellByModel:collectionView cellForItemAtIndexPath:indexPath];
    } else {
        cell = [self dequeueReusableCellByPhoto:collectionView cellForItemAtIndexPath:indexPath];
    }
    __weak typeof(self) weakSelf = self;
    [cell setSingleTapGestureBlock:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf didTapPreviewCell];
    }];
    cell.sourceType = self.sourceType;
    return cell;
}

- (MDAssetPreviewCell *)dequeueReusableCellByModel:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    MDAssetPreviewCell *cell;
    MDAssetModel *model = nil;
    if (indexPath.row <_models.count) {
       model = _models[indexPath.item];
    }
    if (model.type == MDAssetMediaTypePhotoGif && PickerConfig.allowPickingGif) {
        cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MDGifPreviewCell" forIndexPath:indexPath];
    } else {
        cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MDPhotoPreviewCell" forIndexPath:indexPath];
    }
    cell.model = model;
    return cell;
}

- (MDAssetPreviewCell *)dequeueReusableCellByPhoto:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    MDAssetPreviewCell *cell;
    id obj = nil;
    cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"MDPhotoPreviewCell" forIndexPath:indexPath];
    if (indexPath.row <_photos.count) {
        obj = _photos[indexPath.item];
    }
    cell.index = indexPath.item;
    cell.replaceObjectBlock = ^(id object, int index) {
        [_photos replaceObjectAtIndex:index withObject:object];
    };

    cell.object = obj;
    return cell;
}

- (void)collectionView:(UICollectionView *)collectionView willDisplayCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath {
    if ([cell isKindOfClass:[MDPhotoPreviewCell class]]) {
        [(MDPhotoPreviewCell *)cell recoverSubviews];
    }
}

- (void)collectionView:(UICollectionView *)collectionView didEndDisplayingCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath {
    if ([cell isKindOfClass:[MDPhotoPreviewCell class]]) {
        [(MDPhotoPreviewCell *)cell recoverSubviews];
    }
}

#pragma mark - Private Method

- (void)dealloc {
     NSLog(@"%@-----dealloc",NSStringFromClass(self.class));
}

- (void)refreshNaviBarAndBottomBarState {
    if (!self.middleIndexLabel.hidden) {
        _middleIndexLabel.text = [NSString stringWithFormat:@"%d/%d", (_currentIndex + 1), (_models.count > 0 ?: _photos.count)];
    }
    
    if (self.sourceType == PreviewImageByPhotos) {
        _selectButton.hidden = YES;
        return;
    }
    MDAssetModel *model = nil;
    if (self.currentIndex < _models.count) {
        model = _models[self.currentIndex];
    }
    
    _selectButton.selected = model.isSelected;
    [self refreshSelectButtonImageViewContentMode];
    if (_selectButton.isSelected && PickerConfig.showSelectBtn) {
        NSString *index = [NSString stringWithFormat:@"%d", (int)([_mdImagePickerVC.selectedAssetIds indexOfObject:model.asset.localIdentifier] + 1)];
        _indexLabel.text = index;
        _indexLabel.hidden = NO;
    } else {
        _indexLabel.hidden = YES;
    }
    
    NSString * doneTitle = [Theme.doneBtnTitle stringByAppendingString:[NSString stringWithFormat:@"(%zd/%zd)",_mdImagePickerVC.selectedModels.count,PickerConfig.maxImagesCount]];
    [_doneButton setTitle:doneTitle forState:UIControlStateNormal];
    _selectButton.hidden = !PickerConfig.showSelectBtn;
    
}

- (void)refreshSelectButtonImageViewContentMode {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (self->_selectButton.imageView.image.size.width <= 27) {
            self->_selectButton.imageView.contentMode = UIViewContentModeCenter;
        } else {
            self->_selectButton.imageView.contentMode = UIViewContentModeScaleAspectFit;
        }
    });
}

- (NSInteger)currentIndex {
    return [MDCommonTools isRightToLeftLayout] ? self.models.count - _currentIndex - 1 : _currentIndex;
}

@end
