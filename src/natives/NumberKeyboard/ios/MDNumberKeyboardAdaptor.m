//
//  MDNumberKeyboardAdaptor.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/14.
//

#import "MDNumberKeyboardAdaptor.h"
#import <React/RCTLog.h>

@implementation MDNumberKeyboardAdaptor

+ (BOOL)shouldHandleInputView:(UIView<RCTBackedTextInputViewProtocol> *)inputView text:(NSString *)text {
    BOOL result = NO;
    // UITextField
    if ([inputView isKindOfClass:UITextField.self]) {
        UITextField *textField = (UITextField *)inputView;
        if ([textField.delegate respondsToSelector:@selector(textField:shouldChangeCharactersInRange:replacementString:)]) {
            NSUInteger location = text.length > 0 ? textField.text.length : textField.text.length - 1;
            NSUInteger length = text.length > 0 ? 0 : 1;
            result = [textField.delegate textField:textField shouldChangeCharactersInRange:NSMakeRange(location, length) replacementString:text];
        }
    }
    
    // UITextView
    if ([inputView isKindOfClass:UITextView.self]) {
        UITextView *textView = (UITextView *)inputView;
        if ([textView.delegate respondsToSelector:@selector(textView:shouldChangeTextInRange:replacementText:)]) {
            NSUInteger location = text.length > 0 ? textView.text.length : textView.text.length - 1;
            NSUInteger length = text.length > 0 ? 0 : 1;
            result = [textView.delegate textView:textView shouldChangeTextInRange:NSMakeRange(location, length) replacementText:text];
        }
    }
    
    return result;
}

+ (BOOL)shouldReturnHandleInputView:(UIView<RCTBackedTextInputViewProtocol> *)inputView {
    BOOL result = NO;
    // UITextField
    if ([inputView isKindOfClass:UITextField.self]) {
        UITextField *textField = (UITextField *)inputView;
        if ([textField.delegate respondsToSelector:@selector(textFieldShouldReturn:)]) {
            result = [textField.delegate textFieldShouldReturn:textField];
        }
    }
    // UITextView already hanlde in `textView:shouldChangeTextInRange:replacementText:`
    return result;
}

@end
