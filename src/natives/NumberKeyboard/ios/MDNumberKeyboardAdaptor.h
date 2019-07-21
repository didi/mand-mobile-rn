//
//  MDNumberKeyboardAdaptor.h
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/14.
//

#import <Foundation/Foundation.h>
#import <React/RCTBackedTextInputViewProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface MDNumberKeyboardAdaptor : NSObject

+ (BOOL)shouldHandleInputView:(UIView<RCTBackedTextInputViewProtocol> *)inputView text:(NSString *)text;

+ (BOOL)shouldReturnHandleInputView:(UIView<RCTBackedTextInputViewProtocol> *)inputView;

@end

NS_ASSUME_NONNULL_END
