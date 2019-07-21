//
//  MDRefreshRoller.h
//  MandMobileRN
//
//  Created by 任宏宇 on 2019/2/26.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface MDRefreshRoller : UIView

@property (nonatomic, assign, getter=isAnimating) BOOL animating;

- (void)setColor:(UIColor *)color;

- (void)setPercent:(CGFloat)percent;

- (void)startAnimating;

- (void)stopAnimating;

@end

NS_ASSUME_NONNULL_END
