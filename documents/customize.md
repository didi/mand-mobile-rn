## 自定义

`Mand Mobile RN` 支持自定义主题和修改单个组件样式。同时提供了两个 `API` 和两个配置项，用于在 `RN` 项目中使用前端同学属性的 `rem` 方式的响应式布局方案。

### 主题自定义

主题自定义使用的是通过设置全局变量的方式，覆盖组件库的默认注意。后期会提供 `context` 方式的自定义主题方案。

1. 在项目 `src` 目录下创建 `custome-ui.js`。

```ts
// 自定义组件库主题
global.MD_CUSTOM_THEMES = {
  colors: { primary: 'red', textHighlight: 'red' },
}

// 自定义单个组件库主题
global.MD_CUSTOM_COMPONENTS_THEMES = {
  button: { primaryColor: 'gold' },
}
```

**注意**： 自定义主题可修改的参数请查看源码 `src/_styles/default.basic.ts` 和 `src/_styles/default.components.ts` 两个文件。

2. 在 `src` 目录下的 `index.js`（ 如果是使用的是 TypeScript 作为开发语言，则为 `index.ts`） 中引入 `custom-ui.js` 文件。**注意一定要在引入 `App` 之前。**

```ts
import { AppRegistry } from 'react-native'
import './custom-ui' // 在引入 `App` 之前引入自定义主题文件。
import App from './app'

AppRegistry.registerComponent('RNSamples', () => App)
```

如上，修改 `custom-ui.js` 查看变化。

### 响应式布局配置

1. 修改 `custome-ui.js`，在此文件主添加如下两句代码。

```ts
// 配置响应式布局
global.MD_DESIGN_WIDTH = 750 // 设计稿宽度单位 px
global.MD_OPEN_RESPONSIVE_SCALE = true // 是否开启响应式布局
```

2. 在项目中将设计尺寸换算为需要显示的实际尺寸。

```ts
import { scaleFont, scaleSize } from 'mand-mobile-rn'
import * as React from 'react';
import { Text, View } from 'react-native';

class Demo extends React.Component {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Mand Mobile RN</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    width: scaleSize(300),
    height: scaleSize(300),
    backgroundColor: '#333',
  },
  text: {
    fontSize: scaleFont(44),
    fontWeight: '700',
    color: '#aaa',
  },
});
```

**注意**：`scaleSize` 用于换算高宽、边距、定位等位置、大小相关的尺寸。字体的缩放要使用 `scaleFont`。

### 细调组件样式

和自定义主题类似，细调单个组件的样式的方案，也是通过覆盖默认样式的方式完成。具体如下：

```ts
// 从 `mand-mobile-rn` 中引入组件的原始样式
import MDCheck, { MDCheckStyles } from 'mand-mobile-rn'

// 修改想要细调的位置
const styles = {
  ...MDCheckStyles,
  wrapper: {
    ...MDCheckStyles.wrapper,
    backgroundColor: 'red',
  },
  icon: {
    ...MDCheckStyles.wrapper,
    backgroundColor: 'green',
  },
  label: {
    ...MDCheckStyles.wrapper,
    backgroundColor: 'gold',
  },
}


class Demo extends React.Component {
  return (
    // 将新的样式赋值给组件的 `styles` 属性
    <MDCheck styles={styles} value="day" checked={true} label="日缴" />
  )
}
```

此方案参考了 `antd-rn` ，后期会提供 `context` 方式的自定义主题方案。
