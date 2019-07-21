//
//  MDAssetModel.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>

typedef enum : NSUInteger {
    MDAssetMediaTypePhoto = 0,
    MDAssetMediaTypeLivePhoto,
    MDAssetMediaTypePhotoGif,
    MDAssetMediaTypeVideo,
    MDAssetMediaTypeAudio
} MDAssetMediaType;

@class PHAsset;
@interface MDAssetModel : NSObject

+ (instancetype)modelWithAsset:(PHAsset *)asset type:(MDAssetMediaType)type;

@property (nonatomic, strong) PHAsset *asset;
@property (nonatomic, assign) MDAssetMediaType type;
@property (nonatomic, assign) BOOL isSelected;
@property (assign, nonatomic) BOOL needOscillatoryAnimation;
@property (strong, nonatomic) UIImage *image;

@end


@class PHFetchResult;
@interface MDAlbumModel : NSObject

@property (nonatomic, strong) NSString   *name;
@property (nonatomic, assign) NSInteger  count;
@property (nonatomic, assign) NSUInteger selectedCount;
@property (nonatomic, strong) NSArray *models;
@property (nonatomic, strong) NSArray *selectedModels;
@property (nonatomic, strong) PHFetchResult *result;
@property (nonatomic, assign) BOOL isCameraRoll;

- (void)setResult:(PHFetchResult *)result needFetchAssets:(BOOL)needFetchAssets;

@end
