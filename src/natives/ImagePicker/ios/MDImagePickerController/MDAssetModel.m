//
//  MDAssetModel.m
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import "MDAssetModel.h"
#import "MDImageManager.h"

@implementation MDAssetModel

+ (instancetype)modelWithAsset:(PHAsset *)asset type:(MDAssetMediaType)type{
    MDAssetModel *model = [[MDAssetModel alloc] init];
    model.asset = asset;
    model.isSelected = NO;
    model.type = type;
    return model;
}

@end

@implementation MDAlbumModel

- (void)setResult:(PHFetchResult *)result needFetchAssets:(BOOL)needFetchAssets {
    _result = result;
    if (needFetchAssets) {
        [[MDImageManager manager] getAssetsFromFetchResult:result completion:^(NSArray<MDAssetModel *> *models) {
            self.models = models;
            if (self.selectedModels) {
                [self checkSelectedModels];
            }
        }];
    }
}

- (void)setSelectedModels:(NSArray *)selectedModels {
    _selectedModels = selectedModels;
    if (_models) {
        [self checkSelectedModels];
    }
}

- (void)checkSelectedModels {
    self.selectedCount = 0;
    NSMutableArray *selectedAssets = [NSMutableArray array];
    for (MDAssetModel *model in _selectedModels) {
        [selectedAssets addObject:model.asset];
    }
    for (MDAssetModel *model in _models) {
        if ([selectedAssets containsObject:model.asset]) {
            self.selectedCount++;
        }
    }
}

- (NSString *)name {
    return _name?: @"";
}

@end
