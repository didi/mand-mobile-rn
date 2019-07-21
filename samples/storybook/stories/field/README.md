# Field 区域列表组合

区域列表垂直排列，显示当前的内容、状态和可进行的操作。

### 引入

```javascript
import { MDField, MDFieldItem } from 'mand-mobile-rn'
```

### 使用指南

```js
render () {
  return (<MDField
            title="区域标题"
            brief="区域描述性文本，可根据具体场景配置"
          >
            <MDFieldItem solid title="标题区域" placeholder="提示文本" />
          </MDField>)
}
```

### API

#### [Field] Props

| 属性     | 说明               | 类型               | 默认值        | 必须 | 备注 |
| -------- | ------------------ | ------------------ | ------------- | ---- | ---- |
| styles   | 自定义组件细节样式 | IMDFieldStyle      | MDFieldStyles | N    | -    |
| title    | 标题               | string             | -             | N    | -    |
| brief    | 描述内容           | string             | -             | N    | -    |
| isPlain  | 镂空样式           | boolean            | `false`       | N    | -    |
| disabled | 是否禁用区域       | boolean            | `false`       | N    | -    |
| action   | 页眉操作区域       | string , ReactNode | -             | N    | -    |
| footer   | 页脚内容           | string , ReactNode | -             | N    | -    |

#### [FieldItem] Props

| 属性        | 说明                             | 类型               | 默认值            | 必须 | 备注                   |
| ----------- | -------------------------------- | ------------------ | ----------------- | ---- | ---------------------- |
| styles      | 自定义组件细节样式               | IMDFieldItemStyle  | MDFieldItemStyles | N    | -                      |
| title       | 标题                             | string             | -                 | N    | -                      |
| placeholder | 占位符                           | string             | -                 | N    | -                      |
| content     | 描述内容                         | string             | -                 | N    | 有占位符则没有描述内容 |
| addon       | 附加文案                         | string             | -                 | N    | -                      |
| arrow       | 动作箭头标识                     | boolean            | `false`           | N    | -                      |
| solid       | 是否固定标题宽度，超出会自动换行 | boolean            | `false`           | N    | -                      |
| disabled    | 是否禁用区域                     | boolean            | `false`           | N    | -                      |
| alignRight  | 描述内容是否靠右侧               | boolean            | `false`           | N    | -                      |
| left        | 起始区域                         | string , ReactNode | -                 | N    | -                      |
| onPress     | 非禁用状态下的点击事件           | () => void         | -                 | N    | -                      |

### 类型

- IMDFieldStyle

```javascript
{
  wrapper?: ViewStyle;
  isPlain?: ViewStyle;
  fieldHeader?: ViewStyle;
  fieldHeading?: ViewStyle;
  fieldAction?: ViewStyle;
  fieldTitle?: TextStyle;
  fieldBrief?: TextStyle;
  fieldFooter?: ViewStyle;
  disableText?: TextStyle;
}
```

- IMDFieldItemStyle

```javascript
{
  wrapper?: ViewStyle;
  itemContent?: ViewStyle;
  itemLeft?: ViewStyle;
  itemRight?: ViewStyle;
  itemControl?: ViewStyle;
  itemTitle?: TextStyle;
  itemText?: TextStyle;
  addonText?: TextStyle;
  itemPlaceholder?: TextStyle;
  solidTitle?: TextStyle;
  childrenText?: TextStyle;
  disableText?: TextStyle;
  rightText?: TextStyle;
}
```
