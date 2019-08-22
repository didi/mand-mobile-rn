# InputItem 输入框

单行文本输入框，支持特殊场景文本格式化

## 使用

**import**

```javascript
import { MDInputItem } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDInputItem />)
}
```

## API

### MDInputItem Props

| 属性         | 说明                             | 类型                                  | 默认值            | 必须 | 备注                                                                                                                           |
| ------------ | -------------------------------- | ------------------------------------- | ----------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| styles       | 自定义组件细节样式               | IMDInputItemStyles                    | MDInputItemStyles | N    | -                                                                                                                              |
| title        | 表单左侧标题                     | string                                | -                 | N    | 表单左侧标题 可用left代替                                                                                                                              |
| name        | 表单名称                     | string                                | -                 | N    | 表单名称 区分表单组件                                                                                                                             |
| brief        | 表单描述                         | string                                | -                 | N    | -                                                                                                                              |
| value        | 输入框初始值                     | string                                | -                 | N    | -                                                                                                                              |
| keyboardType | 键盘类型                         | KeyboardTypeOptions \| MDKeyboardType | `default`         | N    | -                                                                                                                              |
| placeholder  | 表单占位符                       | string                                | -                 | N    | -                                                                                                                              |
| maxlength    | 表单最大字符数                   | number                                | -1                | N    | `phone`类型固定为 11                                                                                                           |
| type         | 表单类型，特殊类型自带文本格式化 | string                                | `text`            | N    | `text(文本)`,`bankCard(银行卡号)`,`phone(手机号)`, `money(金额)`,`digit(数字)`,`password(密码)`,以及其他的标准`Html Input`类型 |
| size         | 表单尺寸                         | string                                | `normal`          | N    | `large`,`normal`                                                                                                               |
| align        | 表单文本对齐方式                 | string                                | `left`            | N    | `left`,`center`,`right`                                                                                                        |
| error        | 表单错误提示信息                 | string                                | -                 | N    | -                                                                                                                              |
| amount       | 表单内容为金融数字               | boolean                               | `false`           | N    | -                                                                                                                              |
| readonly     | 表单是否只读                     | boolean                               | `false`           | N    | -                                                                                                                              |
| disabled     | 表单是否禁用                     | boolean                               | `false`           | N    | -                                                                                                                              |
| highlight    | 表单是否高亮                     | boolean                               | `false`           | N    | -                                                                                                                              |
| material     | material design                  | boolean                               | `false`           | N    | -                                                                                                                              |
| clearable    | 表单是否使用清除控件             | boolean                               | `false`           | N    | -                                                                                                                              |
| errorSlot    | 错误提示控件                     | ReactNode                             | -                 | N    | -                                                                                                                              |
| left         | 输入框左侧控件                   | ReactNode                             | -                 | N    | -                                                                                                                              |
| right        | 输入框右侧控件                   | ReactNode                             | -                 | N    | -                                                                                                                              |
| onChangeText | 文本变化回调                     | (name: string  \| undefined, text: string) => void                | -           | N    | -                                                                                                                              |
| onFocus      | 获取焦点回调                     | () => void                            | -                 | N    | -                                                                                                                              |
| onBlur       | 失去焦点回调                     | () => void                            | -                 | N    | -                                                                                                                              |
| onConfirm | confirm回调                     | (name: string  \| undefined, text: string) => void                | -           | N    | -                                                                                                                              |

### 类型

- IMDInputItemStyles

```js
{
  container?: ViewStyle;
  wrapper?: ViewStyle;
  inputText?: TextStyle;
  titleText?: TextStyle;
  errorText?: TextStyle;
  briefText?: TextStyle;
}
```

- MDKeyboardType

```js
  | 'text'
  | 'bank-card'
  | 'password'
  | 'phone'
  | 'money'
  | 'digit';
```
