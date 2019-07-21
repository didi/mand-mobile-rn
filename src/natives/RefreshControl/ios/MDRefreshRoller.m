//
//  MDRefreshRoller.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2019/2/26.
//

#import "MDRefreshRoller.h"

static const CGFloat MDRefreshCircleLineWidth = 2;


@interface MDRefreshRoller()

@property (nonatomic, strong) CAShapeLayer *circle;
@property (nonatomic, strong) CAShapeLayer *outer;

@end

@implementation MDRefreshRoller

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        [self setup];
    }
    return self;
}

- (void)setup {
    [self.layer addSublayer:self.outer];
    [self.layer addSublayer:self.circle];
}

- (CAShapeLayer *)outer {
    if (!_outer) {
        _outer = [CAShapeLayer layer];
        _outer.path = [UIBezierPath bezierPathWithOvalInRect:self.bounds].CGPath;
        _outer.lineWidth = MDRefreshCircleLineWidth;
        _outer.lineJoin = kCALineJoinRound;
        _outer.fillColor = UIColor.clearColor.CGColor;
        _outer.strokeColor = [UIColor colorWithRed:238 / 255.0 green:238 / 255.0 blue:238 / 255.0 alpha:1].CGColor;
    }
    return _outer;
}

- (CAShapeLayer *)circle {
    if (!_circle) {
        _circle = [CAShapeLayer layer];
        _circle.path = [UIBezierPath bezierPathWithOvalInRect:self.bounds].CGPath;
        _circle.lineWidth = MDRefreshCircleLineWidth;
        _circle.lineCap = kCALineCapRound;
        _circle.fillColor = UIColor.clearColor.CGColor;
        _circle.strokeColor = [UIColor colorWithRed:47 / 255.0 green:134 / 255.0 blue:246 / 255.0 alpha:1].CGColor;
        _circle.strokeStart = 0;
        _circle.strokeEnd = 0;
        
    }
    return _circle;
}

- (void)setColor:(UIColor *)color {
    _circle.strokeColor = color.CGColor;
}

- (void)setPercent:(CGFloat)percent {
    _circle.strokeEnd = percent;
}

- (void)startAnimating {
    if (_animating) {
        return;
    }
    _animating = YES;
    [self.layer addAnimation:self.rotationAnimation forKey:@"rotation"];
    [self.circle addAnimation:self.springAnimation forKey:@"spring"];
}

- (void)stopAnimating {
    _animating = NO;
    [self.circle removeAllAnimations];
    [self.layer removeAllAnimations];
}

#pragma mark - Animations

- (CABasicAnimation *)rotationAnimation {
    CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];
    animation.duration = 4;
    animation.fromValue = @0;
    animation.toValue = @(2 * M_PI);
    animation.repeatCount = INFINITY;
    
    return animation;
}

- (CABasicAnimation *)strokeStartAnimation {
    CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeStart"];
    animation.duration = 1;
    animation.fromValue = @0;
    animation.toValue = @0.15;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    
    return animation;
}

- (CABasicAnimation *)strokeEndAnimation {
    CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
    animation.duration = 1;
    animation.fromValue = @0;
    animation.toValue = @1;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    
    return animation;
}

- (CABasicAnimation *)strokeCatchAnimation {
    CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeStart"];
    animation.beginTime = 1;
    animation.duration = 0.5;
    animation.fromValue = @0.15;
    animation.toValue = @1;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    
    return animation;
}

- (CABasicAnimation *)strokeFreezeAnimation {
    CABasicAnimation *animation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
    animation.beginTime = 1;
    animation.duration = 0.5;
    animation.fromValue = @1;
    animation.toValue = @1;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    
    return animation;
}

- (CAAnimationGroup *)springAnimation {
    CAAnimationGroup *animation = [CAAnimationGroup animation];
    animation.duration = 1.5;
    animation.animations = @[
                             self.strokeStartAnimation,
                             self.strokeEndAnimation,
                             self.strokeCatchAnimation,
                             self.strokeFreezeAnimation,
                             ];
    animation.repeatCount = INFINITY;
    
    return animation;
}

@end
