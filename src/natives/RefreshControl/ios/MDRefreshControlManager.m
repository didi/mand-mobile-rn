//
//  MDRefreshControlManager.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/17.
//

#import "MDRefreshControlManager.h"
#import "MDRefreshControl.h"

#import <React/RCTUIManager.h>

@implementation MDRefreshControlManager

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (UIView *)view {
    return [MDRefreshControl headerWithRefreshingBlock:nil];
}

- (NSDictionary *)constantsToExport {
    return @{
             @"default": @(MDRefreshControlTypeDefault),
             @"roller": @(MDRefreshControlTypeRoller)
             };
}

RCT_EXPORT_VIEW_PROPERTY(type, MDRefreshControlType)
RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL)

RCT_EXPORT_VIEW_PROPERTY(stateHidden, BOOL)
RCT_EXPORT_VIEW_PROPERTY(timeHidden, BOOL)
RCT_EXPORT_VIEW_PROPERTY(stateFontSize, float)
RCT_EXPORT_VIEW_PROPERTY(timeFontSize, float)
RCT_EXPORT_VIEW_PROPERTY(stateTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(timeTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(indicatorColor, UIColor)

RCT_EXPORT_VIEW_PROPERTY(refreshText, NSString)
RCT_EXPORT_VIEW_PROPERTY(refreshActiveText, NSString)
RCT_EXPORT_VIEW_PROPERTY(refreshingText, NSString)

RCT_EXPORT_METHOD(beginRefreshing:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        MDRefreshControl *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[MDRefreshControl class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view beginRefreshing];
    }];
}

RCT_EXPORT_METHOD(endRefreshing:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        MDRefreshControl *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[MDRefreshControl class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view endRefreshing];
    }];
}

@end
