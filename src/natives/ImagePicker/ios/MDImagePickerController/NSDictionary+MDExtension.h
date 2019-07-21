//
//  NSDictionary+MDExtension.h
//  MandMobileRN
//
//  Created by zhuochu on 2019/5/5.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSDictionary (MDExtension)

- (NSString *)md_stringForKey:(NSString *)key;
- (NSInteger)md_integerForKey:(NSString *)key;
- (BOOL)md_boolForKey:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
