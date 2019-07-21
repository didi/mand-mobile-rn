## Android 集成

* [集成方式](#集成方式)
    * [react-native link](#react-native-link)
    * [手动集成](#手动集成)
* [使用的第三方库](#使用的第三方库)

### 集成方式

为了方便开发者（Js、Android、iOS），mand-mobile-rn 提供了两种集成方式：

1. [**react-native link**](#react-native-link) - 通过 `postlink` 钩子，运行 mand-mobile-rn 内置的脚本来执行集成，推荐纯 react-native 工程使用。
2. [**手动集成**](#手动集成) - 手动修改 `Android` 工程文件，需要你了解 `Android` 开发。

#### react-native link

运行如下命令，会执行 mand-mobile-rn 的内置脚本，自动集成到你的 Android 工程。

```
react-native link mand-mobile-rn
```
*Note: 如果你对集成原理感兴趣，可以了解 [RNPM](https://github.com/rnpm/rnpm)，RNPM 已经在 React Native v0.27 合并到 React Native Cli，因为 React Native 官方并没有详细的文档介绍 RNPM 的功能，RNPM 项目还是你最好的文档。*

#### 手动集成

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
    *Note: 因为项目中使用的部分第三方库，发布在 jitpack。*

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

### 使用的第三方库

|名称  |协议  |地址|
| :---: | :--- |:--|
| Glide |BSD, part MIT and Apache 2.0.|[https://github.com/bumptech/glide](https://github.com/bumptech/glide)|
|PhotoView|Apache 2.0|[https://github.com/chrisbanes/PhotoView](https://github.com/chrisbanes/PhotoView)|
|RxJava|Apache 2.0|[https://github.com/ReactiveX/RxJava](https://github.com/ReactiveX/RxJava)|
|RxAndroid|Apache 2.0|[https://github.com/ReactiveX/RxAndroid](https://github.com/ReactiveX/RxAndroid)|
|Subsampling Scale Image View|Apache 2.0|[https://github.com/davemorrissey/subsampling-scale-image-view](https://github.com/davemorrissey/subsampling-scale-image-view)|
|RxPermissions|Apache 2.0|[https://github.com/tbruyelle/RxPermissions](https://github.com/tbruyelle/RxPermissions)|
|Luban|Apache 2.0|[https://github.com/Curzibn/Luban](https://github.com/Curzibn/Luban)|
|uCrop|Apache 2.0|[https://github.com/Yalantis/uCrop](https://github.com/Yalantis/uCrop)|
