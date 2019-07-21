//
//  MDImagePicker.h
//  MandMobileRN
//
//  Created by zhuochu on 2019/2/11.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>
@interface MDImagePicker : NSObject <RCTBridgeModule, UIImagePickerControllerDelegate, UIActionSheetDelegate>

@end
  
