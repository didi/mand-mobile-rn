//
//  MDRefreshControl.h
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/17.
//

#import <UIKit/UIKit.h>

#import <MJRefresh/MJRefresh.h>
#import <React/RCTComponent.h>
#import <React/RCTScrollableProtocol.h>

typedef NS_ENUM(NSUInteger, MDRefreshControlType) {
    MDRefreshControlTypeDefault,
    MDRefreshControlTypeRoller,
};

NS_ASSUME_NONNULL_BEGIN

@interface MDRefreshControl : MJRefreshStateHeader <RCTCustomRefreshContolProtocol>

@property (nonatomic, copy) NSString *title;
@property (nonatomic, copy) RCTDirectEventBlock onRefresh;

@property (nonatomic, copy) NSString *refreshText;
@property (nonatomic, copy) NSString *refreshActiveText;
@property (nonatomic, copy) NSString *refreshingText;

@property (nonatomic, strong) UIColor *stateTextColor;
@property (nonatomic, strong) UIColor *timeTextColor;
@property (nonatomic, strong) UIColor *indicatorColor;

@property (nonatomic, assign) CGFloat stateFontSize;
@property (nonatomic, assign) CGFloat timeFontSize;
@property (nonatomic, assign) BOOL timeHidden;
@property (nonatomic, assign) BOOL stateHidden;

/// 刷新样式
@property(nonatomic, assign) MDRefreshControlType *type;

@end

NS_ASSUME_NONNULL_END
