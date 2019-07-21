# 按钮

可配置多种不同样式的按钮。

## 使用

**import**

```js
import { MDButton } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDButton onPress={() => console.log('Pressed')}>Default</MDButton>)
}
```

## API

### Props

| 属性         | 说明       | 类型                      | 默认值  | 必须 | 备注                                                                                        |
| :----------- | :--------- | :------------------------ | :------ | :--- | :------------------------------------------------------------------------------------------ |
| style        | 自定义样式 | ViewStyle \| ViewStyle[]  | -       | N    | 自定义 Button 样式                                                                          |
| type         | 内置样式   | string                    | default | N    | `default/primary/warning/disabled/link`                                                     |
| size         | 尺寸       | string \| MDButtonSizeSet | large   | N    | `large/medium/small/`                                                                       |
| plain        | 朴素/线性  | boolean                   | `false` | N    | -                                                                                           |
| round        | 圆角       | boolean                   | `false` | N    | -                                                                                           |
| icon         | 图标       | string                    | -       | N    | 可选值参考组件 Icon                                                                         |
| iconPosition | 图标位置   | string                    | -       | N    | `left/right`                                                                                |
| inactive     | 未激活     | boolean                   | `false` | N    | inactive 为 true 用于表单校验无效等主观因素。<br> disabled 类型用于无权限或无库存等客观因素 |
| onPress      | 按压事件   | (params: any) => void     | -       | N    | 处理按压事件                                                                                |

### 类型

- MDButtonSizeSet

```js
{
  width?: number;
  height?: number;
  fontSize?: number;
}
```

## Tips

- Button 的样式可以通过传递 style 覆写。
- Button 本身的样式不包括 width，margin，padding 等属性。
- children 的类型为 string 或 ReactNode，若为空则默认为纯 Icon 图标。
