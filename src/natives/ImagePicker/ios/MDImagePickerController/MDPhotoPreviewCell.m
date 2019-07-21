//
//  MDPhotoPreviewCell.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDPhotoPreviewCell.h"
#import "MDAssetModel.h"
#import "UIView+MDExtension.h"
#import "MDImageManager.h"
#import "MDProgressView.h"
#import "MDImageCropManager.h"
#import <MediaPlayer/MediaPlayer.h>
#import "MDImagePickerController.h"
#import "MDCommonTools.h"

@implementation MDAssetPreviewCell

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor blackColor];
        [self configSubviews];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(photoPreviewCollectionViewDidScroll) name:@"photoPreviewCollectionViewDidScroll" object:nil];
    }
    return self;
}

- (void)configSubviews {
    
}

#pragma mark - Notification

- (void)photoPreviewCollectionViewDidScroll {
    
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end


@implementation MDPhotoPreviewCell

- (void)configSubviews {
    self.previewView = [[MDPhotoPreviewView alloc] initWithFrame:CGRectZero];
    __weak typeof(self) weakSelf = self;
    [self.previewView setSingleTapGestureBlock:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (strongSelf.singleTapGestureBlock) {
            strongSelf.singleTapGestureBlock();
        }
    }];
    [self.previewView setImageProgressUpdateBlock:^(double progress) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (strongSelf.imageProgressUpdateBlock) {
            strongSelf.imageProgressUpdateBlock(progress);
        }
    }];
    [self addSubview:self.previewView];
}

- (void)setModel:(MDAssetModel *)model {
    [super setModel:model];
    _previewView.asset = model.asset;
}

- (void)setObject:(id)object {
    [super setObject:object];
    _previewView.object = object;
}

- (void)setReplaceObjectBlock:(void (^)(id, int))replaceObjectBlock {
    if (replaceObjectBlock) {
        _previewView.replaceObjectBlock = replaceObjectBlock;
    }
}

- (void)setIndex:(NSInteger)index {
    _previewView.index = index;
}

- (void)recoverSubviews {
    [_previewView recoverSubviews];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.previewView.frame = self.bounds;
}

@end

@interface MDPhotoPreviewView ()<UIScrollViewDelegate>
@property (assign, nonatomic) BOOL isRequestingGIF;
@end

@implementation MDPhotoPreviewView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        _scrollView = [[UIScrollView alloc] init];
        _scrollView.frame = CGRectMake(10, 0, self.md_width - 20, self.md_height);
        _scrollView.bouncesZoom = YES;
        _scrollView.maximumZoomScale = 2.5;
        _scrollView.minimumZoomScale = 1.0;
        _scrollView.multipleTouchEnabled = YES;
        _scrollView.delegate = self;
        _scrollView.scrollsToTop = NO;
        _scrollView.showsHorizontalScrollIndicator = NO;
        _scrollView.showsVerticalScrollIndicator = YES;
        _scrollView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        _scrollView.delaysContentTouches = NO;
        _scrollView.canCancelContentTouches = YES;
        _scrollView.alwaysBounceVertical = NO;
        if (@available(iOS 11, *)) {
            _scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        }
        [self addSubview:_scrollView];
        
        _imageContainerView = [[UIView alloc] init];
        _imageContainerView.clipsToBounds = YES;
        _imageContainerView.contentMode = UIViewContentModeScaleAspectFill;
        [_scrollView addSubview:_imageContainerView];
        
        _imageView = [[UIImageView alloc] init];
        _imageView.backgroundColor = [UIColor colorWithWhite:1.000 alpha:0.500];
        _imageView.contentMode = UIViewContentModeScaleAspectFill;
        _imageView.clipsToBounds = YES;
        [_imageContainerView addSubview:_imageView];
        
        UITapGestureRecognizer *tapSingle = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(singleTap:)];
        [self addGestureRecognizer:tapSingle];
        UITapGestureRecognizer *tapDouble = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doubleTap:)];
        tapDouble.numberOfTapsRequired = 2;
        [tapSingle requireGestureRecognizerToFail:tapDouble];
        [self addGestureRecognizer:tapDouble];
        
        [self configProgressView];
    }
    return self;
}

- (void)configProgressView {
    _progressView = [[MDProgressView alloc] init];
    _progressView.hidden = YES;
    static CGFloat progressWH = 40;
    CGFloat progressX = (self.md_width - progressWH) / 2;
    CGFloat progressY = (self.md_height - progressWH) / 2;
    _progressView.frame = CGRectMake(progressX, progressY, progressWH, progressWH);
    [self addSubview:_progressView];
}

- (void)setModel:(MDAssetModel *)model {
    _model = model;
    self.isRequestingGIF = NO;
    [_scrollView setZoomScale:1.0 animated:NO];
    if (model.type == MDAssetMediaTypePhotoGif) {
        // 先显示缩略图
        [[MDImageManager manager] getPhotoWithAsset:model.asset completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
            self.imageView.image = photo;
            [self resizeSubviews];
            if (self.isRequestingGIF) {
                return;
            }
            // 再显示gif动图
            self.isRequestingGIF = YES;
            [[MDImageManager manager] getOriginalPhotoDataWithAsset:model.asset progressHandler:^(double progress, NSError *error, BOOL *stop, NSDictionary *info) {
                progress = progress > 0.02 ? progress : 0.02;
                dispatch_async(dispatch_get_main_queue(), ^{
                    self.progressView.progress = progress;
                    if (progress >= 1) {
                        self.progressView.hidden = YES;
                    } else {
                        self.progressView.hidden = NO;
                    }
                });
            } completion:^(NSData *data, NSDictionary *info, BOOL isDegraded) {
                if (!isDegraded) {
                    self.isRequestingGIF = NO;
                    self.progressView.hidden = YES;
                    self.imageView.image = [UIImage sd_md_animatedGIFWithData:data];
                    [self resizeSubviews];
                }
            }];
        }];
    } else {
        self.asset = model.asset;
    }
}

- (void)setAsset:(PHAsset *)asset {
    if (_asset && self.imageRequestID) {
        [[PHImageManager defaultManager] cancelImageRequest:self.imageRequestID];
    }
    
    _asset = asset;
    self.imageRequestID = [[MDImageManager manager] getPhotoWithAsset:asset completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
        if (![asset isEqual:self->_asset]) {
            return;
        }
        self.imageView.image = photo;
        [self resizeSubviews];
        if (!isDegraded) {
            self.imageRequestID = 0;
        }
    }];
}

- (void)setObject:(id)object {
    self.imageView.image = nil;
    if ([object isKindOfClass:[UIImage class]]) {
        self.imageView.image = (UIImage *)object;
    } else if([object isKindOfClass:[NSData class]]) {
        [self showImage:(NSData *)object];
    } else {
        NSString * uri = (NSString *)object;
        if ([uri hasPrefix:@"http"]) {
            [[MDImageManager manager] loadImageByUrl:uri key:@(_index) completion:^(NSData *data, NSString *key) {
                [self showImage:data];
                [self resizeSubviews];
                [self repalaceSoucePhoros:data index:[key integerValue]];
            }];
        } else {
            [[MDImageManager manager] loadImageByPath:uri key:@(_index) completion:^(NSData *data, NSString *key) {
                [self repalaceSoucePhoros:data index:[key integerValue]];
                [self showImage:data];
                [self resizeSubviews];
            }];
        }
    }
    [self resizeSubviews];
}

- (void)showImage:(NSData *)data {
    if ([UIImage sd_md_GIFWithData:data]) {
       self.imageView.image = [UIImage sd_md_animatedGIFWithData:data];
    } else {
        self.imageView.image = [UIImage imageWithData:data];
    }
}

- (void)repalaceSoucePhoros:(id)object index:(int)index {
    if (_replaceObjectBlock) {
        _replaceObjectBlock(object, index);
        self.replaceObjectBlock = nil;
    }
}

- (void)recoverSubviews {
    [_scrollView setZoomScale:1.0 animated:NO];
    [self resizeSubviews];
}

- (void)resizeSubviews {
    _imageContainerView.md_origin = CGPointZero;
    _imageContainerView.md_width = self.scrollView.md_width;
    
    UIImage *image = _imageView.image;
    if(!image) {
        return;
    }
    
    if (image.size.height / image.size.width > self.md_height / self.scrollView.md_width) {
        _imageContainerView.md_height = floor(image.size.height / (image.size.width / self.scrollView.md_width));
    } else {
        CGFloat height = image.size.height / image.size.width * self.scrollView.md_width;
        if (height < 1 || isnan(height)) height = self.md_height;
        height = floor(height);
        _imageContainerView.md_height = height;
        _imageContainerView.md_centerY = self.md_height / 2;
    }
    if (_imageContainerView.md_height > self.md_height && _imageContainerView.md_height - self.md_height <= 1) {
        _imageContainerView.md_height = self.md_height;
    }
    CGFloat contentSizeH = MAX(_imageContainerView.md_height, self.md_height);
    _scrollView.contentSize = CGSizeMake(self.scrollView.md_width, contentSizeH);
    [_scrollView scrollRectToVisible:self.bounds animated:NO];
    _scrollView.alwaysBounceVertical = _imageContainerView.md_height <= self.md_height ? NO : YES;
    _imageView.frame = _imageContainerView.bounds;
    
    [self refreshScrollViewContentSize];
}

- (void)setAllowCrop:(BOOL)allowCrop {
    _scrollView.maximumZoomScale = allowCrop ? 4.0 : 2.5;
    
    if ([self.asset isKindOfClass:[PHAsset class]]) {
        PHAsset *phAsset = (PHAsset *)self.asset;
        CGFloat aspectRatio = phAsset.pixelWidth / (CGFloat)phAsset.pixelHeight;
        // 优化超宽图片的显示
        if (aspectRatio > 1.5) {
            self.scrollView.maximumZoomScale *= aspectRatio / 1.5;
        }
    }
}

- (void)refreshScrollViewContentSize {
    if (PickerConfig.allowCrop) {
        // 允许裁剪处理
        CGFloat contentWidthAdd = self.scrollView.md_width - CGRectGetMaxX(PickerConfig.cropRect);
        CGFloat contentHeightAdd = (MIN(_imageContainerView.md_height, self.md_height) - PickerConfig.cropRect.size.height) / 2;
        CGFloat newSizeW = self.scrollView.contentSize.width + contentWidthAdd;
        CGFloat newSizeH = MAX(self.scrollView.contentSize.height, self.md_height) + contentHeightAdd;
        _scrollView.contentSize = CGSizeMake(newSizeW, newSizeH);
        _scrollView.alwaysBounceVertical = YES;
        if (contentHeightAdd > 0 || contentWidthAdd > 0) {
            _scrollView.contentInset = UIEdgeInsetsMake(contentHeightAdd, PickerConfig.cropRect.origin.x, 0, 0);
        } else {
            _scrollView.contentInset = UIEdgeInsetsZero;
        }
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self recoverSubviews];
}

#pragma mark - UITapGestureRecognizer Event

- (void)doubleTap:(UITapGestureRecognizer *)tap {
    if (_scrollView.zoomScale > 1.0) {
        _scrollView.contentInset = UIEdgeInsetsZero;
        [_scrollView setZoomScale:1.0 animated:YES];
    } else {
        CGPoint touchPoint = [tap locationInView:self.imageView];
        CGFloat newZoomScale = _scrollView.maximumZoomScale;
        CGFloat xsize = self.frame.size.width / newZoomScale;
        CGFloat ysize = self.frame.size.height / newZoomScale;
        [_scrollView zoomToRect:CGRectMake(touchPoint.x - xsize/2, touchPoint.y - ysize/2, xsize, ysize) animated:YES];
    }
}

- (void)singleTap:(UITapGestureRecognizer *)tap {
    if (self.singleTapGestureBlock) {
        self.singleTapGestureBlock();
    }
}

#pragma mark - UIScrollViewDelegate

- (UIView *)viewForZoomingInScrollView:(UIScrollView *)scrollView {
    return _imageContainerView;
}

- (void)scrollViewWillBeginZooming:(UIScrollView *)scrollView withView:(UIView *)view {
    scrollView.contentInset = UIEdgeInsetsZero;
}

- (void)scrollViewDidZoom:(UIScrollView *)scrollView {
    [self refreshImageContainerViewCenter];
}

- (void)scrollViewDidEndZooming:(UIScrollView *)scrollView withView:(UIView *)view atScale:(CGFloat)scale {
    [self refreshScrollViewContentSize];
}

#pragma mark - Private

- (void)refreshImageContainerViewCenter {
    CGFloat offsetX = (_scrollView.md_width > _scrollView.contentSize.width) ? ((_scrollView.md_width - _scrollView.contentSize.width) * 0.5) : 0.0;
    CGFloat offsetY = (_scrollView.md_height > _scrollView.contentSize.height) ? ((_scrollView.md_height - _scrollView.contentSize.height) * 0.5) : 0.0;
    self.imageContainerView.center = CGPointMake(_scrollView.contentSize.width * 0.5 + offsetX, _scrollView.contentSize.height * 0.5 + offsetY);
}

@end


@implementation MDGifPreviewCell

- (void)configSubviews {
    [self configPreviewView];
}

- (void)configPreviewView {
    _previewView = [[MDPhotoPreviewView alloc] initWithFrame:CGRectZero];
    __weak typeof(self) weakSelf = self;
    [_previewView setSingleTapGestureBlock:^{
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [strongSelf signleTapAction];
    }];
    [self addSubview:_previewView];
}

- (void)setModel:(MDAssetModel *)model {
    [super setModel:model];
    _previewView.model = self.model;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _previewView.frame = self.bounds;
}

#pragma mark - Click Event

- (void)signleTapAction {
    if (self.singleTapGestureBlock) {
        self.singleTapGestureBlock();
    }
}

@end
