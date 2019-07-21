## 快速开发

`react-native` 的 `packager` 不支持通过 `npm link` 引入的包，具体的参考[这里](https://stackoverflow.com/questions/44061155/react-native-npm-link-local-dependency-unable-to-resolve-module)，所以项目中使用[haul](https://github.com/callstack/haul)进行启动，以便写组件的同时编写对应的示例。

`react-native-web` 或者 `reactjs-app` 项目也支持通过 `yarn link` 引入的包，**此问题待解决**。

## 克隆/安装依赖

- clone

```
# clone
git clone https://didi.github.io/mand-mobile-rn

# cd
cd mand-mobile-rn
```

- 安装依赖

```
# install
npm install && npm run tsc

# link
yarn link
```

## 启动 Example

- 安装/链接依赖

```
# install
cd samples && npm install

# link
yarn link "mand-mobile-rn"
```

- 启动 bundle 服务

```
# 启动iOS对应的bundle服务
yarn start:ios
```

- 启动 APP

```
yarn ios # yarn android
```

第 1 次启动时间会比较慢。
