# mand-mobile-rn 多 Android Module link 实现

> mand-mobile-rn 是滴滴金融 FE 团队开发的面向金融场景的 react-native 组件库。

使用 react-native 的小伙伴，一定对下面列出的 react-native library 项目比较熟悉，这些组件都是通过封装原生模块或源生 UI 组件提供 react-native 侧调用。

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-svg](https://github.com/react-native-community/react-native-svg)
* [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)

上述列出的项目在 `package.json` 依赖 `yarn` 之后，调用 `react-native link` 命令，会在 Android 侧依赖引入相应的  library module，提供 react-native 依赖 Android 源生模块或者组件。
```gradle
rootProject.name = 'samples'
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
include ':react-native-svg'
project(':react-native-svg').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-svg/android')
include ':react-native-linear-gradient'
project(':react-native-linear-gradient').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-linear-gradient/android')
include ':app'
```
通过 link 这三个项目，可以看出都是添加 android 目录的相对路径到 `settings.gradle` 提供外部依赖。

**在 react-native 生态中，包含原生 android 代码的 library 项目，都是通过项目的根文件夹中的 android 文件夹或者 android 文件夹下的 app 文件夹作为 library module 提供外部依赖。**

在 mand-mobile-rn 中，分别对 ImagePicker，RefreshControl，NumberKerboard 三个原生模块创建了三个原生 android module 提供外部依赖，有别于传统的 react-native library 项目，这三个 module 文件夹并没有放在 android 文件夹下（即使放在 android 文件夹下，也无法同时 link 这个三个module）。
```
.
├── android
├── build
├── docs
├── gradle
├── ios
├── samples
├── scripts
├── sites
├── src
│   ├── _styles
│   ├── _utils
│   ├── assets
│   ├── components
│   └── natives
│       ├── Core
│       ├── ImagePicker
│       │   ├── android
│       │   └── ios 
│       ├── NumberKeyboard
│       │   ├── android
│       │   └── ios
│       └── RefreshControl
│           ├── android
│           └── ios
├── template
└── tests

mand-mobile-rn 是如何提供使用方集成的？通过下面的文章，来一步一步介绍。

```
## react-native link 命令是如何实现的？

在上文中写到 “即使放在 android 文件夹下，也无法同时 link 这个三个module” ，真的是这样吗？下面通过 [react-native-cli](https://github.com/react-native-community/react-native-cli) 项目的源码来证实。


在 `packages/cli/src/core/android/findAndroidAppFolder.js` 文件中，定义了如下代码，用来寻找 link 的 library 项目中的 android 目录。
```js
export default function findAndroidAppFolder(folder) {
  const flat = 'android';
  const nested = path.join('android', 'app');

  if (fs.existsSync(path.join(folder, nested))) {
    return nested;
  }

  if (fs.existsSync(path.join(folder, flat))) {
    return flat;
  }

  return null;
}
```

这段代码可以看出，首先判断 `android/app` 文件夹是否存在，如果不存在，继续判断 `android` 文件夹是否存在。通过代码也就说明了，`react-native link` 命令，只会调用 library 项目根下的 `android/app` 或者 `android` 文件夹作为 library module，提供外部依赖。

## react-native-code-push 引发的思考

在集成 [react-native-code-push](https://github.com/Microsoft/react-native-code-push) 时，code push 会让你输入
”deployment key“，这和其他的 react-native library 项目的行为并不一致。在阅读 react-native-code-push 源码时， 发现 `package.json` 中有如下声明。

```json
  "rnpm": {
    "android": {
      "packageInstance": "new CodePush(${androidDeploymentKey}, getApplicationContext(), BuildConfig.DEBUG)"
    },
    "ios": {
      "sharedLibraries": [
        "libz"
      ]
    },
    "params": [
      {
        "type": "input",
        "name": "androidDeploymentKey",
        "message": "What is your CodePush deployment key for Android (hit <ENTER> to ignore)"
      }
    ],
    "commands": {
      "postlink": "node node_modules/react-native-code-push/scripts/postlink/run"
    }
  }
```
这段声明，看起来就是让输入”deployment key“的原因。

通过 Google，可以搜索到 `rnpm` 项目（https://github.com/rnpm/rnpm ），在 react-native v0.27 版本时，合并进入 react-native-cli，但是 react-native-cli 文档中并没有详细介绍 `rnpm`，具体介绍和使用还要看 https://github.com/rnpm/rnpm 。

通过阅读文档，可知 `commands prelink/postlink` 可以指定脚本，用来 hook `react-native link` 命令执行前和执行后。

`react-native-code-push` 利用 `postlink` 来执行 node 脚本进行依赖代码的写入。

`react-native-code-push` 脚本代码：https://github.com/Microsoft/react-native-code-push/blob/master/scripts/postlink/android/postlink.js

## mand-mobile-rn 实现

为了实现一次调用 `link` 命令，集成三个 android module，mand-mobile-rn 使用和 react-native-code-push 同样的原理，通过在 `commands postlink` 指定脚本，写入代码实现依赖。

注册一个 library 原生模块或原生组件到 react-native Android 工程中，大概需要如下三个步骤：

1. 注册组件 module 到 `./android/settings.gradle`
2. 在 `./android/app/build.gradle` 中声明依赖 `module`
3. 在 `ReactNativeHost.getPackages()` 中注册组件的 package


### `applyPatch.js`

上述的三个步骤，都要写入代码到文件中，因此定义一个 `applyPatch.js` 文件作为写入代码工具方法，代码如下：

```js
var fs = require('fs')

function applyPatch(patch) {
  if (!fs.existsSync(patch.path)) {
    return Promise.reject(patch.noExistNotice)
  }
  var content = fs.readFileSync(patch.path, 'utf-8')

  console.log(`Writing ${patch.path}`)

  if (~content.indexOf(patch.patch)) {
    console.log(patch.alreadyAddedNotice)
  } else {
    fs.writeFileSync(
      patch.path,
      content.replace(patch.pattern, (match) => `${match}${patch.patch}`),
    )
  }
  return Promise.resolve()
}

module.exports = applyPatch
```

读取目标文件内容，然后替换匹配的内容，最终再次写回到文件当中。

### `natives.json`

因为每个模块的命名和路径肯定是不同的，同时为了方便 js 读取，定义 `natives.json` 文件来声明每个原生模块的全路径名和 module 位置。代码如下：

```json
[
  {
    "moduleName": "mand-mobile-image-picker",
    "packageName": "com.mandmobile.react.imagepicker.MDImagePickerPackage",
    "modulePath": "src/natives/ImagePicker/android"
  },
  {
    "moduleName": "mand-mobile-number-keyboard",
    "packageName": "com.mandmobile.MDNumberKeyboardPackage",
    "modulePath": "src/natives/NumberKeyboard/android"
  },
  {
    "moduleName": "mand-mobile-refresh-control",
    "packageName": "com.mandmobile.react.refreshcontrol.MDRefreshControlPackage",
    "modulePath": "src/natives/RefreshControl/android"
  }
]
```

### `android/postlink.js`

通过读取 `natives.json` 获取需要写入的组件，然后通过 `Promise` 顺序分别写入 `settings.gralde`，`app/build.gradle`，`MainApplication`。 

```js
module.exports = () => {
  console.log('Running android postlink script')
  if (!nativeModules || nativeModules.lenght == 0) {
    return Promise.reject()
  }
  // node_modules/@didi/mand-mobile-rn/
  // or
  // node_modules/mand-mobile-rn/
  var mandMobilPath = path.join('.', 'node_modules', '@didi', 'mand-mobile-rn')
  if (!fs.existsSync(mandMobilPath)) {
    mandMobilPath = path.join('.', 'node_modules', 'mand-mobile-rn')
  }
  return applyPatch(rootBuildGradlePatch())
    .then(() => applyPatch(settingGradlePatch(mandMobilPath, nativeModules)))
    .then(() => applyPatch(appBuildGradlePatch(nativeModules)))
    .then(() => applyPatch(importApplicationPatch(nativeModules)))
    .then(() => applyPatch(packagePatch(nativeModules)))
}
```

### `settingGradlePatch.js`

`settingGradlePatch.js` 负责组织写入数据，以符合 [``applyPatch.js``](#`applyPatch.js`) 执行写入。代码如下：

```js
function settingGradlePatch(mandMobilPath,natives) {
  var patch = ''

  for (native of natives) {
    patch += `
include ':${native.moduleName}'
project(':${native.moduleName}').projectDir = new File(rootProject.projectDir, '../${mandMobilPath}/${native.modulePath}')`
  }

  return {
    path: path.join('android', 'settings.gradle'),
    pattern: /include\s* \'\:app\'/,
    patch,
    noExistNotice: `Couldn't find "settings.gradle" file. Please see Doc`,
    alreadyAddedNotice: `"settings.gradle" is already linked`,
  }
}
```
`appBuildGradlePatch`，`importApplicationPatch` 等原理大同小异，都是通过正则匹配之后写入代码，不在重复。这里是[源码入口](../scripts/postlink/run.js)


# 总结

rnpm 极大方便了 react-native library 开发方，把复杂的依赖方式，写成脚本注入到代码中。通过 `rnpm` ，未来 mand-mobile-rn 可以扩展在 `link` 命令集成时，在命令行中选择是否依赖源生模块，以及依赖那个原生模块。




