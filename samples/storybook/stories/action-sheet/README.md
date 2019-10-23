#动作面板

用于提供场景相关的多个操作动作

### 使用

```javascript
import { MDActionSheet } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDActionSheet onPress={() => console.log('Pressed')}>Default</MDActionSheet>)
}
```

#### [Component] Props

| 属性         | 说明               | 类型                                            | 默认值              | 必须 | 备注 |
| ------------ | ------------------ | ----------------------------------------------- | ------------------- | ---- | ---- |
| styles       | 自定义组件细节样式 | IMDActionSheetStyle                             | MDActionSheetStyles | N    | -    |
| title        | 面板标题           | string                                          | -                   | N    | -    |
| options      | 面板选项           | IMDActionOptionSet[]                              | -                   | Y    | -    |
| isVisible    | 是否可见           | boolean                                         | `false`             | N    | -    |
| cancelText   | 取消按钮文案       | string                                          | 取消                | N    | -    |
| defaultIndex | 默认选中项         | number                                          | -                   | N    | -    |
| onChoose     | 选项点击回调       | (index: number, data: IMDActionOptionSet) => void | -                   | N    | -    |
| onCancel     | 取消选择回调       | () => void                                      | -                   | N    | -    |

### 类型

- IMDActionSheetStyle

```js
{
  itemWrapper?: ViewStyle;
  item?: TextStyle;
  itemInverse?: TextStyle;
  itemDisabled?: TextStyle;
  itemDescribe?: TextStyle;
  itemCancle: TextStyle;
}
```

- IMDActionOptionSet

```js
{
  optionContent: string;
  optionDescribe?: string;
  disabled?: boolean;
}
```
