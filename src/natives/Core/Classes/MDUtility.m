//
//  MDUtility.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/12.
//

#import "MDUtility.h"
#import <objc/runtime.h>

void MDSwizzleIntanceMethod(Class cls, SEL original, SEL replacement)
{
    Method originalMethod = class_getInstanceMethod(cls, original);
    IMP originalImplementation = method_getImplementation(originalMethod);
    const char *originalArgTypes = method_getTypeEncoding(originalMethod);
    
    Method replacementMethod = class_getInstanceMethod(cls, replacement);
    IMP replacementImplementation = method_getImplementation(replacementMethod);
    const char *replacementArgTypes = method_getTypeEncoding(replacementMethod);
    
    if (class_addMethod(cls, original, replacementImplementation, replacementArgTypes)) {
        class_replaceMethod(cls, replacement, originalImplementation, originalArgTypes);
    } else {
        method_exchangeImplementations(originalMethod, replacementMethod);
    }
}

static CGFloat MDScreenScale() {
    static CGFloat scale;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        scale = [UIScreen mainScreen].scale;
    });
    return scale;
}

#pragma mark convert

CGFloat MDPixelToFloat(CGFloat value) {
    return value / MDScreenScale();
}

CGFloat MDPixelFromFloat(CGFloat value) {
    return value * MDScreenScale();
}

@implementation MDUtility

@end
