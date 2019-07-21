# CodeBox 验证码输入框

验证码输入框

## 使用

**import**

```javascript
import { MDCodeBox } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDCodeBox />)
}
```

## API

#### MDCodeBox Props

| 属性         | 说明               | 类型                   | 默认值          | 备注                     |
| ------------ | ------------------ | ---------------------- | --------------- | ------------------------ |
| styles       | 自定义组件细节样式 | IMDCodeBoxStyle        | MDCodeBoxStyles | -                        |
| defaultValue | 用于初始化的默认值 | string                 | -               | -                        |
| value        | 设定值             | string                 | -               | -                        |
| maxlength    | 字符最大长度       | number                 | `4`             | 若为`-1`则不限制输入长度 |
| autofocus    | 自动获得焦点       | boolean                | `false`         | -                        |
| security     | 掩码               | boolean                | `false`         | -                        |
| disabled     | 禁用输入           | boolean                | `false`         | -                        |
| shuffle      | 数字键盘是否乱序   | boolean                | `false`         | -                        |
| system       | 使用系统默认键盘   | boolean                | `false`         | -                        |
| okText       | 键盘确认键文案     | string                 | `确认`          | -                        |
| onFocus      | 取得焦点回调       | () => void             | -               | -                        |
| onBlur       | 失去焦点回调       | () => void             | -               | -                        |
| onChangeText | 输入内容回调       | (text: string) => void | -               | -                        |

### 类型

- IMDCodeBoxStyle

```js
{
  wrapper?: ViewStyle;
  input?: TextStyle;
  fakeInput?: TextStyle;
  fakeText?: TextStyle;
  cursor?: ViewStyle;
}
```
