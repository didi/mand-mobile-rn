//
//  MDNumberKeyboardView.h
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/12.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, MDNumberKeyboardViewType) {
    MDNumberKeyboardViewTypeProfessnal = 0,     // 有确认键和小数点常用于价格或金额输入
    MDNumberKeyboardViewTypeSimple,             // numeric
    MDNumberKeyboardViewTypeSystem,             // 系统键盘
};

@interface MDNumberKeyboardView : UIView

/**
 * 键盘类型， default is `MDNumberKeyboardViewTypeDefault`
 */
@property (nonatomic, assign) MDNumberKeyboardViewType type;

/**
 * 是否乱序，default is NO
 */
@property (nonatomic, assign) BOOL shuffle;

/**
 * 是否隐藏小数点，default is NO
 */
@property (nonatomic, assign) BOOL hideDot;

/**
 * 确认键文案，default is 确认
 */
@property (nonatomic, copy) NSString *okText;

/**
 * 弱引用Input对象
 */
@property (nonatomic, weak) UITextField *textFiled;

+ (instancetype)defaultKeyboard;

+ (instancetype)defaultKeyboardWithRenderText:(nullable NSString *)renderText;


@end

NS_ASSUME_NONNULL_END
