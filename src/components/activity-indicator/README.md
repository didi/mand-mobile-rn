# ActivityIndicator 活动指示器

活动指示器，一般用于正在进行中的任务示意

## 使用

**import**

```js
import { MDActivityIndicator } from 'mand-mobile-rn'
```

**JSX**

```js
render () {
  return (<MDActivityIndicator />)
}
```

## API

#### 属性

| 属性      | 说明                 | 类型      | 默认值       | 必须 | 备注                                                |
| --------- | -------------------- | --------- | ------------ | ---- | --------------------------------------------------- |
| style     | 自定义样式           | ViewStyle | -            | N    | -                                                   |
| type      | 类型                 | string    | `roller`     | N    | `roller`, `spinner`, `carousel`                     |
| size      | 图标大小             | number    | 35           | N    | -                                                   |
| color     | 图标颜色             | string    | #fc9153/dark | N    | `spinner` 无法自定义色值，可选值只有`dark`和`light` |
| column    | 图标文字是否垂直排列 | boolean   | `false`      | N    | -                                                   |
| textColor | 文字颜色             | string    | `#aaa`       | N    | -                                                   |
| textSize  | 字体大小             | number    | 35           | N    | -                                                   |
| textGap   | 文字图标间距         | number    | 8            | N    | -                                                   |
| animating | 自动开始动画         | boolean   | `true`       | N    | -                                                   |
