# Cashier 收银台

业务支付弹窗，支持支付渠道选择和支付验证码发送

## 使用

**import**

```javascript
import { MDCashier } from 'mand-mobile-rn'
```

**jsx**

```js
render () {
  return (<MDCashier />)
}
```

## API

#### MDCashier Props

| 属性              | 说明               | 类型                                                              | 默认值         | 必须 | 备注                                       |
| ----------------- | ------------------ | ----------------------------------------------------------------- | -------------- | ---- | ------------------------------------------ |
| styles            | 自定义组件细节样式 | IMDCashierStyle                                                   | MDCashierStyle | N    | 通过覆写 MDCashierStyle 自定义样式         |
| visible           | 收银台是否显示     | boolean                                                           | `false`        | Y    | -                                          |
| channelLimit      | 支付渠道限制       | number                                                            | `2`            | N    | 支付渠道超出限制数目时展示更多支付渠道按钮 |
| defaultIndex      | 默认支付渠道       | number                                                            | `0`            | N    | -                                          |
| title             | 收银台弹窗标题     | string                                                            | `支付`         | N    | -                                          |
| paymentTitle      | 支付金额标题       | string                                                            | `支付金额(元)` | N    | -                                          |
| paymentAmount     | 支付金额           | number                                                            | `0`            | N    | -                                          |
| paymentDescribe   | 支付金额说明       | string                                                            | -              | N    | -                                          |
| payButtonText     | 确认支付按钮文案   | string                                                            | `确认支付`     | N    | -                                          |
| payButtonDisabled | 禁用支付按钮       | boolean                                                           | `false`        | N    | -                                          |
| moreButtonText    | 更多支付方式       | string                                                            | `更多支付方式` | N    | -                                          |
| header            | 顶部插槽           | ReactNode                                                         | -              | N    | -                                          |
| footer            | 底部插槽           | ReactNode                                                         | -              | N    | -                                          |
| custom            | custom 插槽        | ReactNode                                                         | -              | N    | scene 值为`custom`时渲染                   |
| channelData       | 支付渠道数据       | ItemT[]                                                           | -              | N    | -                                          |
| renderChannel     | 支付渠道渲染       | (channel: ItemT,index: number) => React.ReactElement<any> \| null | -              | N    | -                                          |
| onShow            | 显示回调           | () => void                                                        | -              | N    | -                                          |
| onDismiss         | 显示回调           | () => void                                                        | -              | N    | -                                          |
| onPay             | 显示回调           | () => void                                                        | -              | N    | -                                          |

#### MDCashier Methods

##### next(scene, option)

进入收银台下一步

| 参数   | 说明             | 类型   | 默认值                                                                                                                                                   | 备注 |
| ------ | ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| scene  | 步骤场景标识     | string | `choose`(支付渠道选择) `captcha`(发送验证码) <br/> `loading`(支付中)`success`(支付成功) <br/> `fail`(支付失败) `custom`(自定义，使用插槽 scene 填充内容) |
| option | 当前步骤场景配置 | object | 属性如下所示                                                                                                                                             | -    |

- `captcha` option

| 参数            | 说明                   | 类型                            | 默认值         | 备注                             |
| --------------- | ---------------------- | ------------------------------- | -------------- | -------------------------------- |
| text            | 发送验证码说明         | string                          | -              | -                                |
| brief           | 发送验证码简要描述     | string                          | -              | -                                |
| maxlength       | 验证码位数             | number                          | `4`            | 若为`-1`则不限制输入长度         |
| count           | 验证码重新发送倒计时   | number                          | `60`           | 若为`0`则不显示重新发送          |
| autoCountdown   | 自动开始倒计时         | boolean                         | `true`         | `false`时需要手动调用`countdown` |
| countNormalText | 发送验证码正常状态文字 | string                          | `发送验证码`   | -                                |
| countActiveText | 倒计时文案             | string                          | `{$1}秒后重发` | -                                |
| onSend          | 验证码发送回调         | (countdown: () => void) => void | `发送验证码`   | -                                |
| onSubmit        | 验证码提交回调         | (code: string) => void          | `发送验证码`   | -                                |

- `loading` option

| 参数 | 说明       | 类型   | 默认值              | 备注 |
| ---- | ---------- | ------ | ------------------- | ---- |
| text | 支付中说明 | string | `支付结果查询中...` | -    |

- `success` option

| 参数       | 说明         | 类型       | 默认值     | 备注 |
| ---------- | ------------ | ---------- | ---------- | ---- |
| text       | 支付成功说明 | string     | `支付成功` | -    |
| buttonText | 按钮文案     | string     | `我知道了` | -    |
| handler    | 按钮点击回调 | () => void | -          | -    |

- `fail` option

| 参数       | 说明         | 类型       | 默认值                 | 备注 |
| ---------- | ------------ | ---------- | ---------------------- | ---- |
| text       | 支付失败说明 | string     | `支付失败，请稍后重试` | -    |
| buttonText | 按钮文案     | string     | `我知道了`             | -    |
| handler    | 按钮点击回调 | () => void | -                      | -    |

### 类型

- IMDCashierStyle

```js
{
  wrapper?: ViewStyle;
  contentWrapper?: ViewStyle;
  sceneWrapper?: ViewStyle;
  bottomButton?: ViewStyle;
  resultWrappper?: ViewStyle;
  resultText?: TextStyle;
  loadingWrapper?: ViewStyle;
}
```
