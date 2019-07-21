//
//  MDAssetCell.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDAssetCell.h"
#import "MDAssetModel.h"
#import "MDImageManager.h"
#import "MDImagePickerController.h"
#import "MDProgressView.h"
#import "MDCommonTools.h"
#import "UIView+MDExtension.h"

@interface MDAssetCell ()
@property (weak, nonatomic) UIImageView *imageView;
@property (weak, nonatomic) UIImageView *selectImageView;
@property (weak, nonatomic) UILabel     *indexLabel;
@property (nonatomic, strong) MDProgressView         *progressView;
@property (strong, nonatomic) UITapGestureRecognizer *tapGesture;
@property (nonatomic, assign) int32_t bigImageRequestID;
@end

@implementation MDAssetCell

- (void)setModel:(MDAssetModel *)model {
    _model = model;
    self.representedAssetIdentifier = model.asset.localIdentifier;
    int32_t imageRequestID = [[MDImageManager manager] getPhotoWithAsset:model.asset photoWidth:self.md_width completion:^(UIImage *photo, NSDictionary *info, BOOL isDegraded) {
        if ([self.representedAssetIdentifier isEqualToString:model.asset.localIdentifier]) {
            self.imageView.image = photo;
        } else {
            [[PHImageManager defaultManager] cancelImageRequest:self.imageRequestID];
        }
        if (!isDegraded) {
            [self hideProgressView];
            self.imageRequestID = 0;
        }
    }];
    if (imageRequestID && self.imageRequestID && imageRequestID != self.imageRequestID) {
        [[PHImageManager defaultManager] cancelImageRequest:self.imageRequestID];
    }
    self.imageRequestID = imageRequestID;
    
    self.selectPhotoButton.selected = model.isSelected;
    self.selectImageView.image = self.selectPhotoButton.isSelected ? self.photoSelImage : self.photoDefImage;
    [self handleNoti];
    if (model.isSelected) {
        [self requestBigImage];
    } else {
        [self cancelBigImageRequest];
    }
    if (model.needOscillatoryAnimation) {
        [UIView showOscillatoryAnimationWithLayer:self.selectImageView.layer type:MDOscillatoryAnimationToBigger];
    }
    model.needOscillatoryAnimation = NO;
    [self setNeedsLayout];
}

- (void)setShowSelectBtn:(BOOL)showSelectBtn {
    _showSelectBtn = showSelectBtn;
    if (!self.selectPhotoButton.hidden) {
        self.selectPhotoButton.hidden = !showSelectBtn;
    }
    if (!self.selectImageView.hidden) {
        self.selectImageView.hidden = !showSelectBtn;
    }
}

- (void)selectPhotoButtonClick:(UIButton *)sender {
    MDImagePickerController *mdImagePickerVC = [MDImageManager manager].imagePicker;
    if (!sender.isSelected && mdImagePickerVC.pickerConfig.allowPickingGif && ![mdImagePickerVC checkSelectedGifModel:_model]) {
        [mdImagePickerVC showAlertWithTitle:Theme.selectgGIFTip];
        return;
    }

    if (self.didSelectPhotoBlock) {
        self.didSelectPhotoBlock(sender.isSelected);
    }
    self.selectImageView.image = sender.isSelected ? self.photoSelImage : self.photoDefImage;
    if (sender.isSelected) {
        [self requestBigImage];
    } else {
        [self cancelBigImageRequest];
    }
    [self handleNoti];
}

- (void)handleNoti {
    MDImagePickerController *mdImagePickerVC = [MDImageManager manager].imagePicker;
    self.indexLabel.hidden = !self.selectPhotoButton.isSelected;
    if (self.selectPhotoButton.selected) {
        NSInteger index = [mdImagePickerVC.selectedAssetIds indexOfObject:_model.asset.localIdentifier] + 1;
        self.indexLabel.text = [NSString stringWithFormat:@"%zd", index];
        [self.contentView bringSubviewToFront:_indexLabel];
        [[NSNotificationCenter defaultCenter] removeObserver:self];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleNoti) name:DidCancleSelectAsset object:nil];
    } else {
        [[NSNotificationCenter defaultCenter] removeObserver:self];
        [[NSNotificationCenter defaultCenter] postNotificationName:DidCancleSelectAsset object:nil];
    }
    
}

- (void)hideProgressView {
    if (_progressView) {
        self.progressView.hidden = YES;
        self.imageView.alpha = 1.0;
    }
}

- (void)requestBigImage {
    if (_bigImageRequestID) {
        [[PHImageManager defaultManager] cancelImageRequest:_bigImageRequestID];
    }
    
    _bigImageRequestID = [[MDImageManager manager] requestImageDataForAsset:_model.asset completion:^(NSData *imageData, NSString *dataUTI, UIImageOrientation orientation, NSDictionary *info) {
        [self hideProgressView];
    } progressHandler:^(double progress, NSError *error, BOOL *stop, NSDictionary *info) {
        if (self.model.isSelected) {
            progress = progress > 0.02 ? progress : 0.02;;
            self.progressView.progress = progress;
            self.progressView.hidden = NO;
            self.imageView.alpha = 0.4;
            if (progress >= 1) {
                [self hideProgressView];
            }
        } else {
            *stop = YES;
            [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
            [self cancelBigImageRequest];
        }
    }];
}

- (void)cancelBigImageRequest {
    if (_bigImageRequestID) {
        [[PHImageManager defaultManager] cancelImageRequest:_bigImageRequestID];
    }
    [self hideProgressView];
}

#pragma mark - Lazy load

- (UIButton *)selectPhotoButton {
    if (_selectPhotoButton == nil) {
        UIButton *selectPhotoButton = [[UIButton alloc] init];
        [selectPhotoButton addTarget:self action:@selector(selectPhotoButtonClick:) forControlEvents:UIControlEventTouchUpInside];
        [self.contentView addSubview:selectPhotoButton];
        _selectPhotoButton = selectPhotoButton;
    }
    return _selectPhotoButton;
}

- (UIImageView *)imageView {
    if (_imageView == nil) {
        UIImageView *imageView = [[UIImageView alloc] init];
        imageView.contentMode = UIViewContentModeScaleAspectFill;
        imageView.clipsToBounds = YES;
        [self.contentView addSubview:imageView];
        _imageView = imageView;
    }
    return _imageView;
}

- (UIImageView *)selectImageView {
    if (_selectImageView == nil) {
        UIImageView *selectImageView = [[UIImageView alloc] init];
        selectImageView.contentMode = UIViewContentModeCenter;
        selectImageView.clipsToBounds = YES;
        [self.contentView addSubview:selectImageView];
        _selectImageView = selectImageView;
    }
    return _selectImageView;
}

- (UILabel *)indexLabel {
    if (_indexLabel == nil) {
        UILabel *indexLabel = [[UILabel alloc] init];
        indexLabel.font = [UIFont systemFontOfSize:14];
        indexLabel.textColor = [UIColor whiteColor];
        indexLabel.textAlignment = NSTextAlignmentCenter;
        [self.contentView addSubview:indexLabel];
        _indexLabel = indexLabel;
    }
    return _indexLabel;
}

- (MDProgressView *)progressView {
    if (_progressView == nil) {
        _progressView = [[MDProgressView alloc] init];
        _progressView.hidden = YES;
        [self addSubview:_progressView];
    }
    return _progressView;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _selectPhotoButton.frame = CGRectMake(self.md_width - 44, 0, 44, 44);
    _selectImageView.frame = CGRectMake(self.md_width - 23, 5, 18, 18);
    if (_selectImageView.image.size.width <= 27) {
        _selectImageView.contentMode = UIViewContentModeCenter;
    } else {
        _selectImageView.contentMode = UIViewContentModeScaleAspectFit;
    }
    _indexLabel.frame = _selectImageView.frame;
    _imageView.frame = CGRectMake(0, 0, self.md_width, self.md_height);
    
    static CGFloat progressWH = 20;
    CGFloat progressXY = (self.md_width - progressWH) / 2;
    _progressView.frame = CGRectMake(progressXY, progressXY, progressWH, progressWH);
    
    [self.contentView bringSubviewToFront:_selectPhotoButton];
    [self.contentView bringSubviewToFront:_selectImageView];
    [self.contentView bringSubviewToFront:_indexLabel];
}

@end

@implementation MDAssetCameraCell

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor whiteColor];
        _imageView = [[UIImageView alloc] init];
        _imageView.backgroundColor = [UIColor colorWithWhite:1.000 alpha:0.500];
        _imageView.contentMode = UIViewContentModeScaleAspectFill;
        [self.contentView addSubview:_imageView];
        self.clipsToBounds = YES;
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    _imageView.frame = self.bounds;
}

@end
