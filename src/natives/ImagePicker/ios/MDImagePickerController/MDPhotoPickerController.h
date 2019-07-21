//
//  MDPhotoPickerController.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <UIKit/UIKit.h>

@class MDAlbumModel;
@interface MDPhotoPickerController : UIViewController
@property (nonatomic, strong) MDAlbumModel *albumModel;
@end

@interface MDCollectionView : UICollectionView

@end
