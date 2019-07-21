//
//  MDImageCropManager.h
//  MandMobileRN
//
//  Created by zhuochu on 2018/12/28.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface MDImageCropManager : NSObject

/**
 * 裁剪框背景的处理
 */
+ (void)overlayClippingWithView:(UIView *)view cropRect:(CGRect)cropRect containerView:(UIView *)containerView;

/**
 * 获得裁剪后的图片
 */
+ (UIImage *)cropImageView:(UIImageView *)imageView toRect:(CGRect)rect zoomScale:(double)zoomScale containerView:(UIView *)containerView;

@end


@interface UIImage (MDGif)

+ (BOOL)sd_md_GIFWithData:(NSData *)data;
+ (UIImage *)sd_md_animatedGIFWithData:(NSData *)data;

@end
