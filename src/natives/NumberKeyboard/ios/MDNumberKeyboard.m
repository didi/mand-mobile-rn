//
//  MDNumberKeyboard.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/11.
//

#import "MDNumberKeyboard.h"
#import <React/RCTUIManager.h>
#import "RCTBaseTextInputView.h"
#import "MDNumberKeyboardView.h"

@implementation MDNumberKeyboard {
    NSNumber *_rootTag;
}

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

/**
 * 根据rootTag获取输入框，此处返回值可能是UITextField，也可能是UITextView
 */
- (UIView<RCTBackedTextInputViewProtocol> *)inputViewByRootTag:(NSNumber *)rootTag {
    UIView *textInput = nil;
    RCTBaseTextInputView *inputView = [_bridge.uiManager viewForReactTag:rootTag];
    if ([inputView respondsToSelector:@selector(backedTextInputView)]) {
        textInput = inputView.backedTextInputView;
    }
    return textInput;
}

- (MDNumberKeyboardViewType)keyboardTypeByText:(NSString *)text {
    if ([text isEqualToString:@"professional"]) {
        return MDNumberKeyboardViewTypeProfessnal;
    } else if ([text isEqualToString:@"simple"]) {
        return MDNumberKeyboardViewTypeSimple;
    }
    return MDNumberKeyboardViewTypeProfessnal;
}

RCT_EXPORT_MODULE(MDNumberKeyboard);

/**
 * 设置数字键盘
 */
RCT_EXPORT_METHOD(setup:(nonnull NSNumber *)rootTag
                  type:(nonnull NSString *)type
                  shuffle:(BOOL)shuffle
                  okText:(nullable NSString *)okText
                  hideDot:(BOOL)hideDot
                  renderText:(nullable NSString *)renderText
                  ) {
    MDNumberKeyboardViewType keyboardType = [self keyboardTypeByText:type];
    if (keyboardType == MDNumberKeyboardViewTypeSimple ||
        keyboardType == MDNumberKeyboardViewTypeSystem) {
        return;
    }
    
    _rootTag = rootTag;
    UIView<RCTBackedTextInputViewProtocol> *textInput = [self inputViewByRootTag:rootTag];
    if (textInput) {
        MDNumberKeyboardView *keyboard = [MDNumberKeyboardView defaultKeyboardWithRenderText:renderText];
        keyboard.type = keyboardType;
        keyboard.shuffle = shuffle;
        keyboard.okText = okText;
        keyboard.hideDot = hideDot;
        if ([textInput respondsToSelector:@selector(setInputView:)]) {
            [textInput setValue:keyboard forKey:@"inputView"];
        }
        keyboard.textFiled = textInput;
        
        [textInput reloadInputViews];
    }
}

/**
 * 移除数字键盘
 */
RCT_EXPORT_METHOD(remove) {
    UITextField *textField = [self inputViewByRootTag:_rootTag];
    if (textField) {
        textField.inputView = nil;
        [textField reloadInputViews];
    }
}

@end
