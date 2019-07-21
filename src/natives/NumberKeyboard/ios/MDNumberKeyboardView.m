//
//  MDNumberKeyboardView.m
//  MandMobileRN
//
//  Created by 任宏宇 on 2018/12/12.
//

#import "MDNumberKeyboardView.h"
#import "UIColor+MDStyle.h"
#import "MDUtility.h"
#import "RCTBackedTextInputDelegate.h"
#import "MDNumberKeyboardAdaptor.h"

static const CGFloat MDNumberKeyboardViewHeight = 216;
static const CGSize MDNumberKeyboardViewConfimButtonSize = (CGSize){92.5, 108};
CGFloat safeAreaBottom = 71;

/// 乱序数组
NSArray *shuffle(NSArray *array) {
    NSArray *shuffled = [array sortedArrayUsingComparator:^NSComparisonResult(NSString *str1, NSString *str2) {
        int seed = arc4random_uniform(2);
        if (seed) {
            return [str1 compare:str2];
        } else {
            return [str2 compare:str1];
        }
    }];
    return shuffled;
}

@interface MDNumberKeyboardView() {
    NSArray<NSString *> *_values;
}

@end

@implementation MDNumberKeyboardView

+ (instancetype)defaultKeyboard {
    return [self defaultKeyboardWithRenderText:@"0,1,2,3,4,5,6,7,8,9,."];
}

+ (instancetype)defaultKeyboardWithRenderText:(NSString *)renderText {
    return [[self alloc] initWithRenderText:renderText];
}

- (instancetype)initWithRenderText:(NSString *)renderText {
    self = [super initWithFrame:(CGRect){0, 0, UIScreen.mainScreen.bounds.size.width, MDNumberKeyboardViewHeight + safeAreaBottom}];
    if (self) {
        _values = [renderText componentsSeparatedByString:@","];
        
        _shuffle = NO;
        _okText = @"确定";
        _hideDot = NO;
        [self setup];
    }
    return self;
}

- (void)layoutSubviews {
    [self relayout];
}

- (void)relayout {
    [self.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [obj removeFromSuperview];
    }];
    
    [self setup];
}

- (void)setup {
    self.backgroundColor = UIColor.whiteColor;
    CGFloat width = CGRectGetWidth(self.bounds);
    CGFloat height = CGRectGetHeight(self.bounds) - safeAreaBottom;
    CGFloat buttonWidth = (width - MDNumberKeyboardViewConfimButtonSize.width) / 3;
    CGFloat buttonHeight = height / 4;
    
    NSMutableArray *numbers = _values.mutableCopy;
    [numbers removeLastObject];
    
    NSArray *arry = _shuffle ? shuffle(numbers) : numbers;
    NSString *dotString = _values.lastObject;
    //    NSString *zeroString = _values.firstObject;
    
    NSMutableArray *renderButtons = [NSMutableArray arrayWithCapacity:10];
    
    UIButton *zero = [self buttonWithTitle:nil imgae:nil];
    if (self.hideDot) {
        zero.frame = CGRectMake(0, buttonHeight * 3, buttonWidth * 2, buttonHeight);
    } else {
        zero.frame = CGRectMake(buttonWidth, buttonHeight * 3, buttonWidth, buttonHeight);
    }
    [zero addTarget:self action:@selector(onInput:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:zero];
    [renderButtons addObject:zero];
    
    for (int i = 0; i < 9; i++) {
        CGFloat x = buttonWidth * (i % 3);
        CGFloat y = buttonHeight * (i / 3);
        UIButton *button = [self buttonWithTitle:nil imgae:nil];
        button.frame = CGRectMake(x, y, buttonWidth, buttonHeight);
        [button addTarget:self action:@selector(onInput:) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:button];
        [renderButtons addObject:button];
    }
    
    if (!self.hideDot) {
        UIButton *custom = [self buttonWithTitle:dotString imgae:nil];
        custom.titleLabel.font = [UIFont systemFontOfSize:28 weight:UIFontWeightRegular];
        [custom addTarget:self action:@selector(onInput:) forControlEvents:UIControlEventTouchUpInside];
        custom.frame = CGRectMake(0, buttonHeight * 3, buttonWidth, buttonHeight);
        [self addSubview:custom];
    }
    
    UIButton *pack = [self buttonWithTitle:nil imgae:[UIImage imageNamed:@"md_keyboard_pack"]];
    pack.frame = CGRectMake(buttonWidth * 2, buttonHeight * 3, buttonWidth, buttonHeight);
    pack.titleLabel.font = [UIFont systemFontOfSize:18 weight:UIFontWeightRegular];
    [pack addTarget:self action:@selector(onDismiss:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:pack];
    
    UIButton *delete = [self buttonWithTitle:nil imgae:[UIImage imageNamed:@"md_keyboard_delete"]];
    delete.frame = CGRectMake(buttonWidth * 3, 0, MDNumberKeyboardViewConfimButtonSize.width, MDNumberKeyboardViewConfimButtonSize.height);
    delete.titleLabel.font = [UIFont systemFontOfSize:18 weight:UIFontWeightRegular];
    [delete addTarget:self action:@selector(onDelete:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:delete];
    
    UIButton *confirm = [self buttonWithTitle:self.okText ?: @"OK" imgae:nil];
    confirm.frame = CGRectMake(buttonWidth * 3, buttonHeight * 2, MDNumberKeyboardViewConfimButtonSize.width, MDNumberKeyboardViewConfimButtonSize.height);
    confirm.backgroundColor = UIColor.blue;
    confirm.titleLabel.font = [UIFont systemFontOfSize:18 weight:UIFontWeightRegular];
    [confirm setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    [confirm addTarget:self action:@selector(onConfirm:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:confirm];
    
    for (int i = 0; i < arry.count; i++) {
        UIButton *button = renderButtons[i];
        NSString *text = arry[i];
        [button setTitle:text forState:UIControlStateNormal];
    }
    
    // 绘制grid
    UIView *horizonLine = [[UIView alloc] initWithFrame:CGRectMake(0, 0, width, MDPixelToFloat(1))];
    horizonLine.backgroundColor = UIColor.line;
    [self addSubview:horizonLine];
    
    for (int i = 0; i < 4; i++) {
        CGFloat y = buttonHeight * (i + 1);
        UIView *horizonLine = [[UIView alloc] initWithFrame:CGRectMake(0, y, buttonWidth * 3, MDPixelToFloat(1))];
        horizonLine.backgroundColor = UIColor.line;
        [self addSubview:horizonLine];
        
        if (i < 3) {
            CGFloat x = buttonWidth * (i + 1);
            CGFloat lineHeight = (i == 0 && self.hideDot) ? buttonHeight * 3 : height;
            
            UIView *verticalLine = [[UIView alloc] initWithFrame:CGRectMake(x, 0, MDPixelToFloat(1), lineHeight)];
            verticalLine.backgroundColor = UIColor.line;
            [self addSubview:verticalLine];
        }
    }
}

- (UIButton *)buttonWithTitle:(NSString *)title imgae:(UIImage *)image {
    UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
    UIFont *font = [UIFont fontWithName:@"DIDI_FD+_Medium03-Regular" size:28] ?: [UIFont systemFontOfSize:28 weight:UIFontWeightRegular];
    button.titleLabel.font = font;
    [button setTitle:title forState:UIControlStateNormal];
    [button setImage:[image imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate] forState:UIControlStateNormal];
    [button setTitleColor:UIColor.black forState:UIControlStateNormal];
    button.tintColor = UIColor.black;
    return button;
}

- (void)setType:(MDNumberKeyboardViewType)type {
    _type = type;
    [self setNeedsLayout];
}

- (void)setShuffle:(BOOL)shuffle {
    _shuffle = shuffle;
    [self setNeedsLayout];
}

- (void)setOkText:(NSString *)okText {
    _okText = okText;
    [self setNeedsLayout];
}

- (void)handleInput:(NSString *)input {
    if (![MDNumberKeyboardAdaptor shouldHandleInputView:self.textFiled text:input]) {
        return;
    }
    
    if (input.length > 0) {
        self.textFiled.text = [self.textFiled.text stringByAppendingString:input];
    } else {
        if (self.textFiled.text.length > 0) {
            self.textFiled.text = [self.textFiled.text substringToIndex:self.textFiled.text.length - 1];
        } else {
            self.textFiled.text = nil;
        }
    }
    
    if ([self.textFiled respondsToSelector:@selector(sendActionsForControlEvents:)]) {
        [self.textFiled sendActionsForControlEvents:UIControlEventEditingChanged];
    }
}

#pragma mark - Actions

- (void)onInput:(UIButton *)sender {
    [self handleInput:sender.currentTitle];
}

- (void)onDelete:(UIButton *)sender {
    [self handleInput:@""];
}

- (void)onConfirm:(UIButton *)sender {
    if ([self.textFiled isKindOfClass:UITextView.self]) {
        [self handleInput:@"\n"];
        return;
    }
    
    if (![MDNumberKeyboardAdaptor shouldReturnHandleInputView:self.textFiled]) {
        return;
    }
    
    [self.textFiled resignFirstResponder];
    
    if ([self.textFiled respondsToSelector:@selector(sendActionsForControlEvents:)]) {
        [self.textFiled sendActionsForControlEvents:UIControlEventEditingDidEndOnExit];
    }
}

- (void)onDismiss:(UIButton *)sender {
    [self.textFiled resignFirstResponder];
    
    if ([self.textFiled respondsToSelector:@selector(sendActionsForControlEvents:)]) {
        [self.textFiled sendActionsForControlEvents:UIControlEventEditingDidEndOnExit];
    }
    
}

@end
