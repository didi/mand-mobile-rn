# NumberKeyboard 数字键盘

一般用于密码，验证码或支付金额输入等金融场景

## 使用

本组件需配合`MDTextInput`使用

**import**

```js
import { MDTextInput } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDTextInput keyboardType="standard" />)
}
```

### API

#### MDTextInput 属性

| 属性         | 说明               | 类型                                    | 默认值    | 备注                      | 必须 |
| ------------ | ------------------ | --------------------------------------- | --------- | ------------------------- | ---- |
| keyboardType | 键盘类型           | `KeyboardTypeOptions \| MDKeyboardType` | `default` | `standard`,`hide-dot`,`x` | N    |
| shuffle      | 键盘数字键是否乱序 | boolean                                 | `false`   | -                         | N    |
| okText       | 键盘确认键文案     | string                                  | `确认`    | -                         | N    |
| textRender   | 自定义指定按键的值 | (value: string) => string               | -         | 可替换键`0,1,...9,.`      | N    |

其他属性继承自`TextInput`组件， 且`clearButtonMode`同时支持`Android`和`iOS`， `Android`用法同`iOS`。

#### MDTextInput Methods

##### focus()

获取输入框焦点，功能同`TextInut`

#### MDTextInput Events

事件均继承自`TextInput`

### 类型

- MDKeyboardType

```js
  | 'text'
  | 'bank-card'
  | 'password'
  | 'phone'
  | 'money'
  | 'digit';
```
