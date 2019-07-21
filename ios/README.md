## iOS 集成

* [集成方式](#集成方式)

	* [react-native link](#react-native-link)
	* [cocoapods](#cocoapods)
	* [Manual](#手动集成)

* [使用的第三方库](#使用的第三方库)

### 集成方式

为了方便开发者（Js、Android、iOS），mand-mobile-rn 提供了三种集成方式：

1. [**react-native link**](#react-native-link)
2. [**cocoapods**](#cocoapods)
3. [**Manual**](#Manual) - 这种方式集成，需要手动修改 `iOS` 工程文件，需要你了解 `iOS` 开发。

#### react-native link

如果您的React Native版本高于0.27.0，运行如下命令，会执行 mand-mobile-rn 的内置脚本，自动集成到你的 iOS 工程。

```
react-native link mand-mobile-rn
```

如果您的React Native版本低于0.27.0，运行如下命令

```
rnpm link mand-mobile-rn
```

*Note: 如果你对集成原理感兴趣，可以了解[RNPM](https://github.com/rnpm/rnpm)，RNPM 已经在 React Native v0.27 合并到 React Native Cli，因为 React Native 官方并没有详细的文档介绍 RNPM 的功能，RNPM 项目还是你最好的文档。*

#### cocoapods
1. 将ReactNative和MandMobileRn的依赖添加到您的Podfile中，并指明您的npm依赖安装路径
   ```ruby
   # React Native requirements
   pod 'React', :path => '../node_modules/react-native', :subspecs => [
      'Core',
      'CxxBridge', # Include this for RN >= 0.47
      'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
      'RCTText',
      'RCTNetwork',
      'RCTWebSocket', # Needed for debugging
      'RCTAnimation', # Needed for FlatList and animations running on native UI thread
      # Add any other subspecs you want to use in your project
   ]
   # Explicitly include Yoga if you are using RN >= 0.42.0
   pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'
   pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
   pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
   pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

   # MandMobileRN plugin dependency
   pod 'MandMobileRN', :path => '../node_modules/mand-mobile-rn'
   ```

2. 运行 `pod install`

*NOTE: MandMobileRn `.podspec` 依赖 `React` pod, 为了确保您的APP能依赖到正确的React Native版本，请确保将`React`依赖加入到您的`Podfile`。[参考文档](https://facebook.github.io/react-native/docs/integration-with-existing-apps.html#podfile).*

#### Manual

1. 打开您的项目

2. 在 `node_modules/mand-mobile-rn/ios` 目录中找到 `MDMandMobileRn.xcodeproj` ， 然后将其拖入 `Libraries` 目录中，如图所示

    ![Add MandMobileRn to project](https://pt-starimg.didistatic.com/static/starimg/img/Y9TfYvd5gL1553928260695.png)




### 使用的第三方库

| 名称      | 协议 | 地址                                                         |
| --------- | ---- | ------------------------------------------------------------ |
| MJRefresh | MIT  | [https://github.com/CoderMJLee/MJRefresh](https://github.com/CoderMJLee/MJRefresh) |
| TZImagePickerController | MIT  | [https://github.com/banchichen/TZImagePickerController](https://github.com/banchichen/TZImagePickerController) |

