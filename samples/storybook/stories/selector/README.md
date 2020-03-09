# MDSelector 动作面板

用于提供场景相关的多个操作动作

### 使用

**import**

```javascript
import { MDSelector } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDSelector options={datas}></MDSelector>)
}
```

#### [Component] Props

| 属性         | 说明                     | 类型                                            | 默认值           | 必须 | 备注 |
| :----------- | :----------------------- | :---------------------------------------------- | :--------------- | :--- | :--- |
| styles       | 选择器样式               | IMDOptionItemStyle                              | MDSelectorStyles | N    | -    |
| type         | 类型                     | string                                          | -                | N    | -    |
| title        | 选择器标题               | string                                          | 标题             | N    | -    |
| okText       | 选择器确认文案           | string                                          | 确定             | N    | -    |
| cancelText   | 选择器取消文案           | string                                          | 取消             | N    | -    |
| maskClosable | 点击蒙层是否可关闭弹出层 | boolean                                         | false            | N    | -    |
| icon         | 非选中项的图标           | MDIcon                                          | -                | N    | -    |
| iconInverse  | 选中项的图标             | MDIcon                                          | -                | N    | -    |
| iconDisabled | 禁用项的图标             | MDIcon                                          | -                | N    | -    |
| options      | 数据源                   | IMDActionOptionSet[]                              | -                | N    | -    |
| isVisible    | 是否可见                 | boolean                                         | false            | N    | -    |
| defaultIndex | 默认选中项               | number                                          | -1               | N    | -    |
| iconPosition | 图标位置                 | 'right' \| 'left'                               | right            | N    | -    |
| onChoose     | 选项点击回调             | (index: number, data: IMDActionOptionSet) => void | -                | N    | -    |
| onCancel     | 取消选择回调             | () => void                                      | -                | N    | -    |
| onConfirm    | 确认选择回调             | (index: number, data: IMDActionOptionSet) => void | -                | N    | -    |
| renderItem   | 自定义渲染               | (index: number, data: IMDActionOptionSet) => void | -                | N    | -    |

### 类型

- IMDOptionItemStyle

```js
{
  itemWrapper?: ViewStyle;
  item?: TextStyle;
  itemInverse?: TextStyle;
  itemDisabled?: TextStyle;
  itemDescribe?: TextStyle;
}
```
