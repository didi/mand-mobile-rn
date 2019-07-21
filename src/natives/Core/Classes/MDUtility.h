//
//  MDUtility.h
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/12.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 方法替换
 **/
void MDSwizzleIntanceMethod(Class cls, SEL original, SEL replacement);

#pragma mark convert
/// 将像素转为 point 值
CGFloat MDPixelToFloat(CGFloat value);
/// 将 point 值转为像素
CGFloat MDPixelFromFloat(CGFloat value);

@interface MDUtility : NSObject

@end

NS_ASSUME_NONNULL_END
