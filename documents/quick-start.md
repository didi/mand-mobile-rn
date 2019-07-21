## 安装 & 使用

### 安装

在已有项目里手动安装 Mand Mobile RN 的包。

```bash
npm install mand-mobile-rn --save
```

**重要**

mand-mobile-rn 是基于最新的 React Native **0.59** 版开发。

### Link

使用 `react-native link` 将组件库添加到你的项目中:

```
react-native link mand-mobile-rn
```

### iOS 集成

##### react-native link

如果您的 React Native 版本高于 0.27.0，运行如下命令，会执行 mand-mobile-rn 的内置脚本，自动集成到你的 iOS 工程。

```
react-native link mand-mobile-rn
```

如果您的 React Native 版本低于 0.27.0，运行如下命令

```
rnpm link mand-mobile-rn
```

_Note: 如果你对集成原理感兴趣，可以了解[RNPM](https://github.com/rnpm/rnpm)，RNPM 已经在 React Native v0.27 合并到 React Native Cli，因为 React Native 官方并没有详细的文档介绍 RNPM 的功能，RNPM 项目还是你最好的文档。_

##### cocoapods

1. 将 ReactNative 和 MandMobileRn 的依赖添加到您的 Podfile 中，并指明您的 npm 依赖安装路径

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

_NOTE: MandMobileRn `.podspec` 依赖 `React` pod, 为了确保您的 APP 能依赖到正确的 React Native 版本，请确保将`React`依赖加入到您的`Podfile`。[参考文档](https://facebook.github.io/react-native/docs/integration-with-existing-apps.html#podfile)._

##### 手动集成

1. 打开您的项目

2. 在 `node_modules/mand-mobile-rn/ios` 目录中找到 `MDMandMobileRn.xcodeproj` ， 然后将其拖入 `Libraries` 目录中，如图所示

   ![Add MandMobileRn to project](https://pt-starimg.didistatic.com/static/starimg/img/Y9TfYvd5gL1553928260695.png)

### Android 集成

##### react-native link

运行如下命令，会执行 mand-mobile-rn 的内置脚本，自动集成到你的 Android 工程。

```
react-native link mand-mobile-rn
```

_Note: 如果你对集成原理感兴趣，可以了解 [RNPM](https://github.com/rnpm/rnpm)，RNPM 已经在 React Native v0.27 合并到 React Native Cli，因为 React Native 官方并没有详细的文档介绍 RNPM 的功能，RNPM 项目还是你最好的文档。_

##### 手动集成

1. 在你的 `android/build.gradle` 文件下，添加 `jitpack` 仓库：

   ```gradle
   allprojects {
       repositories {
           ...
           maven { url 'https://jitpack.io' }
           ...
       }
   }
   ```

   _Note: 因为项目中使用的部分第三方库，发布在 jitpack。_

2. 在你的 `android/settings.gradle` 文件下，添加引用外部 `module`:

   ```gradle
   // 图片选择器
   include ':mand-mobile-image-picker'
   project(':mand-mobile-image-picker').projectDir = new File(rootProject.projectDir, '../node_modules/mand-mobile-rn/src/natives/ImagePicker/android')
   // 金融数字键盘
   include ':mand-mobile-number-keyboard'
   project(':mand-mobile-number-keyboard').projectDir = new File(rootProject.projectDir, '../node_modules/mand-mobile-rn/src/natives/NumberKeyboard/android')
   // 下拉刷新
   include ':mand-mobile-refresh-control'
   project(':mand-mobile-refresh-control').projectDir = new File(rootProject.projectDir, '../node_modules/mand-mobile-rn/src/natives/RefreshControl/android')
   ```

3. 在你的 `android/app/build.gradle` 文件下，添加引用 `module`:

   ```gradle
   dependencies {
       ...
       implementation project(':mand-mobile-image-picker')
       implementation project(':mand-mobile-number-keyboard')
       implementation project(':mand-mobile-refresh-control')
   }
   // 如果你的 gradle 版本低于 3.0，请使用 compile
   dependencies {
       ...
       compile project(':mand-mobile-image-picker')
       compile project(':mand-mobile-number-keyboard')
       compile project(':mand-mobile-refresh-control')
   }
   ```

4. 在你的 `MainApplication.java` 文件中注册 mand-mobile-rn 组件到 react native 中：
   ```java
       @Override
       protected List<ReactPackage> getPackages() {
           return Arrays.<ReactPackage>asList(
                   new MainReactPackage(),
                   new MDImagePickerPackage(),
                   new MDNumberKeyboardPackage(),
                   new MDRefreshControlPackage()
           );
       }
   ```

### 使用

```javascript
import { MDButton } from 'mand-mobile-rn'
```
