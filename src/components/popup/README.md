# 弹出层

由其他控件触发，屏幕滑出或弹出一块自定义内容区域

## 使用

**import**

```javascript
import { MDPopup } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDPopup
      position="center"
      transition="zoom"
      isVisible={this.state.isPopupShow === 'center'}
    >
      <Text style={styles.text}>Popup Center</Text>
    </MDPopup>
  )
}
```

## API

### MDPopup Props

| 属性         | 说明                     | 类型                                       | 默认值   | 必须 | 备注 |
| :----------- | :----------------------- | :----------------------------------------- | :------- | :--- | :--- |
| isVisible    | 弹出层是否可见           | boolean                                    | `false`  | N    | -    |
| hasMask      | 是否有蒙层               | boolean                                    | `false`  | N    | -    |
| maskOpacity  | 蒙层透明度               | number                                     | `0.7`    | N    | -    |
| maskClosable | 点击蒙层是否可关闭弹出层 | boolean                                    | `false`  | N    | -    |
| position     | 弹出层位置               | 'center', 'top', 'bottom', 'left', 'right' | 'center' | N    | -    |
| transition   | 弹出层过度动画           | MDPopupTrans                               | -        | N    | -    |
| onBeforeShow | 弹出层即将展示事件       | () => void                                 | -        | N    | -    |
| onShow       | 弹出层展示事件           | () => void                                 | -        | N    | -    |
| onBeforeHide | 弹出层即将隐藏事件       | () => void                                 | -        | N    | -    |
| onHide       | 弹出层隐藏事件           | () => void                                 | -        | N    | -    |

### MDPopupTitleBar Props

| 属性       | 说明               | 类型                  | 默认值                | 必须 | 备注               |
| :--------- | :----------------- | :-------------------- | :-------------------- | :--- | :----------------- |
| styles     | 自定义组件细节样式 | IMDPopupTitleBarStyle | MDPopupTitleBarStyles | N    | 自定义细节样式     |
| title      | 标题               | string                | -                     | N    | -                  |
| describe   | 描述               | string                | -                     | N    | -                  |
| okText     | 确认按钮文案       | string \| ReactNode   | -                     | N    | 为空则没有确认按钮 |
| cancelText | 取消按钮文案       | string \| ReactNode   | -                     | N    | 为空则没有取消按钮 |
| onConfirm  | 确认选择事件       | () => void            | -                     | N    | -                  |
| onCancel   | 取消选择事件       | () => void            | -                     | N    | -                  |

### 类型

- MDPopupTrans

```js
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'bounce'
  | 'punch'
  | 'zoom'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';
```

- IMDPopupTitleBarStyle

```js
{
  wrapper?: ViewStyle;
  titleWrapper?: ViewStyle;
  title?: TextStyle | ViewStyle;
  describe?: TextStyle | ViewStyle;
  left?: TextStyle;
  right?: TextStyle;
  leftWrapper?: TextStyle | ViewStyle;
  rightWrapper?: TextStyle | ViewStyle;
}
```
