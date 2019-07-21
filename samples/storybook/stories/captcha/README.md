# Captcha 验证码

验证码校验窗口

## 使用

**import**

```javascript
import { MDCaptcha } from 'mand-mobile-rn'
```

**JSX**

```js
render () {
  return (<MDCaptcha />)
}
```

### API

#### MDCaptcha Props

| 属性            | 说明                                 | 类型                          | 默认值         | 必须 | 备注                                 |
| :-------------- | :----------------------------------- | :---------------------------- | :------------- | :--- | ------------------------------------ |
| styles          | 自定义组件细节样式                   | IMDCaptchaStyle               | MDCaptchaStyle | N    | 通过重写 MDCaptchaStyle 覆盖默认样式 |
| isVisible       | 验证码窗口是否显示                   | boolean                       | `false`        | N    | -                                    |
| isView          | 是否内嵌在页面内展示，否则以弹层形式 | boolean                       | `false`        | N    | -                                    |
| maxlength       | 字符最大输入长度                     | number                        | `4`            | N    | 若为`-1`则不限制输入长度             |
| title           | 标题                                 | string                        | -              | N    | -                                    |
| brief           | 描述                                 | string                        | -              | N    | -                                    |
| error           | 错误描述                             | string                        | -              | N    | -                                    |
| countdownNumber | 倒计时时长                           | number                        | `60`           | N    | 设置为 0 的时候不显示倒计时按钮      |
| security        | 掩码                                 | boolean                       | `false`        | N    | -                                    |
| system          | 系统键盘                             | boolean                       | `false`        | N    | -                                    |
| autoCountdown   | 自动开启倒计时                       | boolean                       | `false`        | N    | false 时需手动调用`countdown`        |
| countNormalText | 发送验证码正常状态文字               | string                        | -              | N    | `发送验证码`                         |
| countActiveText | 发送验证码及倒计时按钮文案配置项     | string                        | -              | N    | `{$1}秒后重发`                       |
| children        | 标题下方组件                         | ReactNode                     | -              | N    | -                                    |
| onShow          | 显示回调                             | () => void                    | -              | N    | -                                    |
| onDismiss       | 消失回调                             | () => void                    | -              | N    | -                                    |
| onClose         | 关闭回调                             | () => void                    | -              | N    | -                                    |
| onSend          | 发送验证码回调                       | (countdown: () => void): void | -              | N    | -                                    |
| onSubmit        | 提交回调                             | (text: string): void          | -              | N    | -                                    |

#### MDCaptcha Methods

##### countDown()

开始倒计时

##### resetcount()

重置倒计时

##### setError(message)

设置报错信息并显示

### 类型

- IMDCaptchaStyle

```js
{
  wrapper?: ViewStyle;
  codeboxWrapper?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  error?: TextStyle;
  children?: TextStyle;
  countNormal?: TextStyle;
  countActive?: TextStyle;
  footer?: ViewStyle;
}
```
