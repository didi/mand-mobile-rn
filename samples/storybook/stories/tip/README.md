# MDTip 气泡

气泡

## 使用

**import**

```javascript
import { MDTip } from 'mand-mobile-rn'
```

**JSX**

```jsx
render() {
    return (
      <MDTip
        content="不错哟"
        placement="left"
        icon="">
          <MDButton type="default" style={{width:100}}>点击我</MDButton>
      </MDTip>
    );
  }
```

### API

#### [Component] Props

| 属性      | 说明               | 类型                           | 默认值      | 必须 | 备注                                                 |
| --------- | ------------------ | ------------------------------ | ----------- | ---- | ---------------------------------------------------- |
| styles    | 自定义组件细节样式 | IMDTipStyle                    | MDTipStyles | N    |                                                      |
| content   | tips 内容          | string \| number               | -           | Y    | -                                                    |
| placement | 位置               | top, left, bottom, right       | top         | N    |                                                      |
| icon      | 图标               | string                         | -           | N    | 可选值请参考组件 Icon                                |
| offset    | 偏移量             | {left?: number; top?: number;} | -           | N    | -                                                    |
| fill      | 充满子元素         | boolean                        | false       | N    | 如按钮提示，与按钮等宽(top/bottom)或等高(left/right) |

#### [Component] Events

事件说明

| 属性   | 说明                   | 类型 |
| ------ | ---------------------- | ---- |
| onShow | 提示框显示后触发的事件 | --   |
| onHide | 提示框隐藏后触发的事件 | --   |

### 类型

- IMDTagStyle

```js
{
  contentText?: TextStyle;
  tip?: ViewStyle;
  tipBg?: ViewStyle;
  tipArrow?: ViewStyle;
  arrowBottom?: ViewStyle;
  arrowLeft?: ViewStyle;
  arrowRight?: ViewStyle;
  tipsContent?: ViewStyle;
  iconClose?: ViewStyle;
  closeText?: TextStyle;
}
```
