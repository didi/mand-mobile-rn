//
//  UIView+MDExtension.h
//  MandMobileRN
//
//  Created by zhuochu on 2019/4/30.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef enum : NSUInteger {
    MDOscillatoryAnimationToBigger,
    MDOscillatoryAnimationToSmaller,
} MDOscillatoryAnimationType;

@interface UIView (MDExtension)

@property (nonatomic) CGFloat md_left;
@property (nonatomic) CGFloat md_top;
@property (nonatomic) CGFloat md_right;
@property (nonatomic) CGFloat md_bottom;
@property (nonatomic) CGFloat md_width;
@property (nonatomic) CGFloat md_height;
@property (nonatomic) CGFloat md_centerX;
@property (nonatomic) CGFloat md_centerY;
@property (nonatomic) CGPoint md_origin;
@property (nonatomic) CGSize  md_size;

+ (void)showOscillatoryAnimationWithLayer:(CALayer *)layer type:(MDOscillatoryAnimationType)type;

@end

NS_ASSUME_NONNULL_END
