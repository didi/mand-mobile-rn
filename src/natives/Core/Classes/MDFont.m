//
//  MDFont.m
//  Pods
//
//  Created by 任宏宇 on 2018/11/30.
//

#import "MDFont.h"
@import CoreText.CTFontManager;

@implementation MDFont

+ (void)load {
    NSDirectoryEnumerator *directory = [NSFileManager.defaultManager enumeratorAtPath:NSBundle.mainBundle.bundlePath];
    for (NSString *url in directory.allObjects) {
        if ([url hasSuffix:@"ttf"] ||
            [url hasSuffix:@"otf"]) {
            NSString *fontName = url.lastPathComponent;
            [self loadFont:fontName size:16];
        }
    }    
}

+ (UIFont *)loadFont:(NSString *)fontName size:(CGFloat)fontSize {
    NSString *name = [fontName componentsSeparatedByString:@"."].firstObject;
    UIFont *font = [UIFont fontWithName:fontName size:fontSize];
    if (!font) {
        [self registerFont:fontName];
    }
    return font;
}

+ (void)registerFont:(NSString *)fontName {
    NSURL *fontPath = [NSBundle.mainBundle URLForResource:fontName withExtension:nil];
    if (!fontPath) {
        NSLog(@"Font file doesn't exist");
        return;
    }
    CGDataProviderRef fontDataProvider = CGDataProviderCreateWithURL((__bridge CFURLRef)fontPath);
    CGFontRef newFont = CGFontCreateWithDataProvider(fontDataProvider);
    CGDataProviderRelease(fontDataProvider);
    CTFontManagerRegisterGraphicsFont(newFont, nil);
    CGFontRelease(newFont);
}

@end
