# 标签

用于表示区域的状态的标签

## 使用

**import**

```js
import { MDTag } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDTag>Default</MDTag>)
}
```

### API

#### 属性

| 属性          | 说明                            | 类型                                                        | 默认值      | 必须 | 备注 |
| :------------ | :------------------------------ | :---------------------------------------------------------- | :---------- | :--- | ---- |
| styles        | 自定义组件细节样式              | IMDTagStyle                                                 | MDTagStyles | N    | -    |
| size          | 标签大小                        | `tiny`, `small`, `large`                                    | `large`     | N    | -    |
| shape         | 标签形状                        | `square`, `circle`, `fillet`, `quarter`, `coupon`, `bubble` | `square`    | N    | -    |
| sharp         | 标签尖角                        | `top-left`, `top-right`, `bottom-left`, `bottom-right`      | -           | N    | -    |
| type          | 标签样式                        | `fill(填充)`, `ghost(线框)`                                 | `ghost`     | N    | -    |
| fillColor     | 标签颜色 `rgba` or `hex number` | string                                                      | `#ffffff`   | N    | -    |
| textColor     | 字体颜色 `rgba` or `hex number` | string                                                      | `#fc9153`   | N    | -    |
| fonWeight     | 字体粗细                        | TextStyle.fontWeight                                        | `normal`    | N    | -    |
| gradientStyle | 梯度                            | any                                                         | -           | N    | -    |

### 类型

- IMDTagStyle

```js
{
  wrapper: ViewStyle
  text: TextStyle
  tiny: TextStyle
  small: TextStyle
  large: TextStyle
  fill: ViewStyle
  ghost: ViewStyle
  fillText: TextStyle
  ghostText: TextStyle
  fillet: ViewStyle
  square: ViewStyle
}
```

## Tips

- Tag 的样式可以通过传递 style 覆写。
- children 的类型为 ReactNode。
