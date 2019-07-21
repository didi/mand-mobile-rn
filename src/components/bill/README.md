# Bill 票据

电子账单或票据

### 引入

```javascript
import { MDBill } from 'mand-mobile-rn'
```

### 使用指南

```js
render () {
  return (<MDBill title="借款电子票据" no="12345689" waterMark="MAND-MOBILE-RN"/>)
}
```

### API

#### [Component] Props

| 属性      | 说明               | 类型         | 默认值       | 必须 | 备注 |
| --------- | ------------------ | ------------ | ------------ | ---- | ---- |
| styles    | 自定义组件细节样式 | IMDBillStyle | MDBillStyles | N    | -    |
| title     | 票据抬头           | string       | -            | N    | -    |
| no        | 票据编号           | string       | -            | N    | -    |
| waterMark | 水印内容           | string       | -            | N    | -    |
| header    | 头部插槽           | ReactNode    | -            | N    |      |
| footer    | 底部插槽           | ReactNode    | -            | N    |      |

### 类型

- IMDBillStyle

```js
{
  wrapper?: ViewStyle;
  bill?: ViewStyle;
  billHeader?: ViewStyle;
  billTitle?: TextStyle;
  billNo?: TextStyle;
  billNeck?: ViewStyle;
  neckSpan?: ViewStyle;
  billContent?: ViewStyle;
  billDetail?: ViewStyle;
}
```
