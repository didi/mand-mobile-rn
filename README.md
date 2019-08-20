<div align="center"><img width="80" src="https://manhattan.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg" alt="LOGO"></div>
<h2 align="center">mand-mobile-rn</h2> 
<p align="center">面向金融场景的移动端UI组件库，基于React Native实现</p>
<div align="center"><img src="https://pt-starimg.didistatic.com/static/starimg/img/toa8XOspJG1555486253802.png" width="800"></div>
<br/>

## 链接

- [首页](https://didi.github.io/mand-mobile-rn/)
- [开发指南](documents/development.md)
- [更新日志](CHANGELOG.md)
- [更多](https://github.com/mand-mobile-rn)

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

### 手动集成

[iOS 集成](ios/README.md)

[Android 集成](android/README.md)

### 使用

```javascript
import { MDButton } from 'mand-mobile-rn'
```

## 开发

```bash
git clone git@github.com:didi/mand-mobile-rn.git
cd mand-mobile-rn
npm install
yarn link
npm run tsc
```

新开一个命令行窗口，运行 sample 的 RN Bundle 服务

```bash
cd mand-mobile-rn/sample
npm install
yarn link mand-mobile-rn
npm run start:ios
```

再新开一个命令行窗口，编译 Mand Mobile 示例 App

```bash
cd mand-mobile-rn/sample
npm run ios
```

在模拟器中打开组件库示例 App： `Mand Mobile`，详细内容请查看[开发指南](docs/development.md)。

## 自定义

`Mand Mobile RN` 组件库提供了一套简洁的自定义主题方案，参见文档[自定义](docs/customize.md)

## 贡献

如有任何的意见或建议，欢迎您通过创建 Issue 或 Pull Request 的方式告知我们，请先阅读[贡献指南](CONTRIBUTING.md)。

## 证书

Mand Mobile RN 使用 Apache License 2.0，查看[证书](LICENSE)。
