//
//  RCTConvert+Refresh.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2019/2/26.
//

#import "RCTConvert+Refresh.h"
#import "MDRefreshControl.h"

@implementation RCTConvert (Refresh)

RCT_ENUM_CONVERTER(MDRefreshControlType, (@{
    @"default": @(MDRefreshControlTypeDefault),
    @"roller": @(MDRefreshControlTypeRoller)
}), MDRefreshControlTypeRoller, integerValue)

@end
