# 操作栏

汇集若干文案或操作按钮的吸底边栏，可用于展示表单信息与提交按钮。

## 使用

**import**

```javascript
import { MDActionBar } from 'mand-mobile-rn'
```

**JSX**

```jsx
const actions = [
  {
    text: '主要按钮',
    onPress: this.props.onPress,
  },
]
return <MDActionBar actions={actions} />
```

## API

### Props

| 属性    | 说明               | 类型              | 默认值            | 必须 | 备注                               |
| :------ | :----------------- | :---------------- | :---------------- | :--- | :--------------------------------- |
| styles  | 自定义组件细节样式 | IMDActionBarStyle | MDActionBarStyles | N    | 通过覆写 MDCashierStyle 自定义样式 |
| actions | 按钮组             | IMDActonSet[]     | -                 | Y    | -                                  |

### 类型

- IMDActionBarStyle

```js
{
  wrapper?: ViewStyle;
  text?: ViewStyle;
  group?: ViewStyle;
  button?: ViewStyle;
  buttonGap?: ViewStyle;
}
```

- IMDActonSet

```js
{
  text?: string;
  disabled?: boolean;
  onPress?: (index?: number) => void;
}
```
