# 列表单元

列表用于展现并列层级的信息内容，列表可承载功能入口、功能操作、信息展示等功能。

## 使用

**import**

```javascript
import { MDCellItem } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDCellItem
      title="普通条目"
      onPress={() => console.log('Pressed')}
    />)
}
```

## API

### Props

| 属性     | 说明               | 类型             | 默认值           | 必须 | 备注         |
| :------- | :----------------- | :--------------- | :--------------- | :--- | :----------- |
| styles   | 自定义组件细节样式 | IMDCellItemStyle | MDCellItemStyles | N    | -            |
| title    | 标题               | string           | -                | N    | -            |
| brief    | 描述文案           | string           | -                | N    | -            |
| addon    | 附加文案           | string           | -                | N    | -            |
| disabled | 是否禁用项目       | boolean          | `false`          | N    | -            |
| arrow    | 动作箭头标识       | boolean          | `false`          | N    | -            |
| left     | 左侧插槽           | ReactNode        | -                | N    | -            |
| right    | 右侧插槽           | ReactNode        | -                | N    | -            |
| below    | 下侧插槽           | ReactNode        | -                | N    | -            |
| onPress  | 按压事件           | () => void       | -                | N    | 处理按压事件 |

### 类型

- IMDCellItemStyle

```js
{
  wrapper?: ViewStyle;
  body?: ViewStyle;
  multilines?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  left?: ViewStyle;
  right?: ViewStyle;
  arrowRight?: TextStyle;
  addon?: TextStyle;
  below?: ViewStyle;
}
```
