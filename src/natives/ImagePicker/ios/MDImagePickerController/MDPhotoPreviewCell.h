//
//  MDPhotoPreviewCell.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>
#import "MDImageManager.h"

@class MDAssetModel;
@interface MDAssetPreviewCell : UICollectionViewCell

@property (nonatomic, strong) MDAssetModel *model;
@property (nonatomic, strong) id object;
@property (nonatomic, assign) NSInteger index;
@property (nonatomic, assign) PreviewImageSourceType sourceType;
@property (nonatomic, copy) void (^replaceObjectBlock)(id object, index);
@property (nonatomic, copy) void (^singleTapGestureBlock)(void);

- (void)configSubviews;
- (void)photoPreviewCollectionViewDidScroll;

@end


@class MDAssetModel,MDProgressView,MDPhotoPreviewView;
@interface MDPhotoPreviewCell : MDAssetPreviewCell

@property (nonatomic, copy) void (^imageProgressUpdateBlock)(double progress);
@property (nonatomic, strong) MDPhotoPreviewView *previewView;
@property (nonatomic, strong) MDProgressView     *progressView;

- (void)recoverSubviews;

@end


@interface MDPhotoPreviewView : UIView

@property (nonatomic, strong) UIImageView *imageView;
@property (nonatomic, strong) UIScrollView *scrollView;
@property (nonatomic, strong) UIView *imageContainerView;
@property (nonatomic, strong) MDProgressView *progressView;
@property (nonatomic, strong) MDAssetModel *model;
@property (nonatomic, strong) id object;
@property (nonatomic, assign) NSInteger index;
@property (nonatomic, assign) PreviewImageSourceType sourceType;
@property (nonatomic, strong) id asset;
@property (nonatomic, assign) int32_t imageRequestID;
@property (nonatomic, copy) void (^replaceObjectBlock)(id object, int index);
@property (nonatomic, copy) void (^singleTapGestureBlock)(void);
@property (nonatomic, copy) void (^imageProgressUpdateBlock)(double progress);

- (void)recoverSubviews;

@end


@interface MDGifPreviewCell : MDAssetPreviewCell
@property (strong, nonatomic) MDPhotoPreviewView *previewView;
@end
