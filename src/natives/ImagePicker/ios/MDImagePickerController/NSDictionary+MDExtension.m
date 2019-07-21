//
//  NSDictionary+MDExtension.m
//  MandMobileRN
//
//  Created by zhuochu on 2019/5/5.
//

#import "NSDictionary+MDExtension.h"

@implementation NSDictionary (MDExtension)

- (BOOL)md_boolForKey:(NSString *)key {
    if (![self isKindOfClass:[NSDictionary class]]) {
        NSLog(@"类型有误，无法从非字典取值！");
        return nil;
    }
    
    id value = [self objectForKey:key];
    if ([value isKindOfClass:[NSNumber class]] || [value isKindOfClass:[NSString class]]) {
        return [value boolValue];
    }
    return NO;
}

- (NSInteger)md_integerForKey:(NSString *)key {
    if (![self isKindOfClass:[NSDictionary class]]) {
        NSLog(@"类型有误，无法从非字典取值！");
        return nil;
    }
    
    id value = [self objectForKey:key];
    if ([value isKindOfClass:[NSNumber class]] || [value isKindOfClass:[NSString class]]) {
        return [value integerValue];
    }
    return 0;
}

- (NSString *)md_stringForKey:(NSString *)key {
    if (![self isKindOfClass:[NSDictionary class]]) {
        NSLog(@"类型有误，无法从非字典取值！");
        return nil;
    }
    
    id value = [self objectForKey:key];
    if ([value isKindOfClass:[NSString class]]) {
        return (NSString *)value;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [value stringValue];
    }
    return nil;
}

@end
