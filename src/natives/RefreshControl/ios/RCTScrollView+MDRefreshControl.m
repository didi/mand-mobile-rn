//
//  RCTScrollView+MDRefreshControl.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/17.
//

#import "RCTScrollView+MDRefreshControl.h"
#import "MDUtility.h"
#import "MDRefreshControl.h"
#import <React/RCTRefreshControl.h>

@implementation RCTScrollView (MDRefreshControl)

+ (void)load {
    MDSwizzleIntanceMethod(self, NSSelectorFromString(@"setCustomRefreshControl:"), @selector(md_setCustomRefreshControl:));
}

- (void)md_setCustomRefreshControl:(UIView<RCTCustomRefreshContolProtocol> *)refreshControl {
    
    if ([refreshControl isKindOfClass:MDRefreshControl.self]) {
        UIScrollView *scrollView = self.scrollView;
        scrollView.mj_header = (MJRefreshHeader *)refreshControl;
        return;
    }

    [self md_setCustomRefreshControl:refreshControl];
}

@end
