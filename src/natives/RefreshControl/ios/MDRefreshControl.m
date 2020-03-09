//
//  MDRefreshControl.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/17.
//

#import "MDRefreshControl.h"
#import "RCTUtils.h"
#import "MDRefreshRoller.h"

@interface MDRefreshControl()

@property (nonatomic, strong) MDRefreshRoller *indicator;

@end

@implementation MDRefreshControl {
    BOOL _currentRefreshingState;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)prepare {
    [super prepare];
    
    // 设置默认值
    self.lastUpdatedTimeLabel.hidden = YES;
    
    self.indicator = [[MDRefreshRoller alloc] initWithFrame:CGRectMake(0, 0, 15, 15)];
    [self.indicator sizeToFit];
    [self addSubview:self.indicator];
}

- (void)placeSubviews {
    self.mj_size = CGSizeMake(self.scrollView.mj_w, MJRefreshHeaderHeight);
    // 箭头的中心点
    CGFloat arrowCenterX = self.mj_w * 0.5;
    if (!self.stateLabel.hidden) {
        CGFloat stateWidth = self.stateLabel.mj_textWidth;
        CGFloat timeWidth = 0.0;
        if (!self.lastUpdatedTimeLabel.hidden) {
            timeWidth = self.lastUpdatedTimeLabel.mj_textWidth;
        }
        CGFloat textWidth = MAX(stateWidth, timeWidth);
        arrowCenterX -= textWidth / 2 + self.labelLeftInset;
    }
    CGFloat arrowCenterY = self.mj_h * 0.5;
    CGPoint arrowCenter = CGPointMake(arrowCenterX, arrowCenterY);
    
    if (self.indicator.constraints.count == 0) {
        self.indicator.center = arrowCenter;
    }
    
    [super placeSubviews];
}

- (void)setTitle:(NSString *)title {
    _title = title;
}

- (void)setOnRefresh:(RCTDirectEventBlock)onRefresh {
    _onRefresh = onRefresh;
    if (onRefresh) {
        self.refreshingBlock = ^(){
            onRefresh(nil);
        };
    }
}

- (void)setRefreshing:(BOOL)refreshing {
    if (_currentRefreshingState != refreshing) {
        _currentRefreshingState = refreshing;
        
        if (refreshing) {
            [self.indicator startAnimating];
            [self beginRefreshing];
        } else {
            [self.indicator stopAnimating];
            [self endRefreshing];
        }
    }
}

- (void)setRefreshText:(NSString *)idleTitle {
    [self setTitle:idleTitle forState:MJRefreshStateIdle];
}

- (void)setRefreshActiveText:(NSString *)pullingTitle {
    [self setTitle:pullingTitle forState:MJRefreshStatePulling];
}

- (void)setRefreshingText:(NSString *)refreshingTitle {
    [self setTitle:refreshingTitle forState:MJRefreshStateRefreshing];
}

- (void)setStateTextColor:(UIColor *)stateTextColor {
    self.stateLabel.textColor = stateTextColor;
}

- (void)setIndicatorColor:(UIColor *)indicatorColor {
    [self.indicator setColor:indicatorColor];
}

- (void)setTimeTextColor:(UIColor *)timeTextColor {
    self.lastUpdatedTimeLabel.textColor = timeTextColor;
}

- (void)setTimeHidden:(BOOL)timeHidden {
    self.lastUpdatedTimeLabel.hidden = timeHidden;
}

- (void)setStateHidden:(BOOL)stateHidden {
    self.stateLabel.hidden = stateHidden;
}

- (void)setStateFontSize:(CGFloat)stateFontSize {
    self.stateLabel.font = [UIFont systemFontOfSize:stateFontSize weight:UIFontWeightRegular];
}

- (void)setTimeFontSize:(CGFloat)timeFontSize {
    self.lastUpdatedTimeLabel.font = [UIFont systemFontOfSize:timeFontSize weight:UIFontWeightRegular];
}

- (void)setType:(MDRefreshControlType *)type {
    _type = type;
}

- (void)setPullingPercent:(CGFloat)pullingPercent {
    CGFloat loadingPercent = (pullingPercent - 0.5) / 0.5;
    [self.indicator setPercent:loadingPercent];
}

@end
