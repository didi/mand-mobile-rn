# 金融数字

一般用于金额，数量等需要特殊格式化的显示场景。

## 使用

**引入**

```js
import { MDAmount } from 'mand-mobile-rn'
```

**JSX**

```js
render () {
  return (
    <MDAmount amount={120983.8928} precision={3} symbol='$' format='%v %s' thousand=',' fontSize={24} color='gray' />
  )
}
```

## API

### Props

| 属性            | 说明           | 类型                     | 默认值     | 必须 | 备注                                       |
| :-------------- | :------------- | :----------------------- | :--------- | :--- | :----------------------------------------- |
| style           | 字体样式       | TextStyle \| TextStyle[] | -          | N    |                                            |
| amount          | 金额/数        | number \| string         | -          | Y    |                                            |
| precision       | 数字精度       | number                   | 2          | N    | 小数点后保留多少位，四舍五入               |
| symbol          | 货币标志       | string                   | -          | N    | 人民币`￥`，美元`$`，欧元`€` 等            |
| thousand        | 千分位         | string                   | `,`        | N    | 千分位分隔符                               |
| decimal         | 十进制分割     | string                   | `.`        | N    |                                            |
| format          | 格式           | string                   | `%s%v`     | N    | `%s`表示货币标志，`%v`表示 value           |
| fontFamily      | 数字字体       | string                   | DIDIFD-Medium | N    | 用于数字特殊字体                           |
| fontSize        | 字体大小       | number                   | -          | N    |                                            |
| color           | 字体颜色       | string                   | -          | N    |                                            |
| mask            | 是否掩码       | boolean                  | false      | N    |                                            |
| transition      | 是否有过度动效 | boolean                  | false      | N    |                                            |
| fontHeight      | 字体高度       | number                   | -          | N    | 有过渡动效和 mask 最好设置，否则效果有瑕疵 |
| containerHeight | 容器高度       | number                   | -          | N    | 有过渡动效和 mask 最好设置，否则效果有瑕疵 |
| duration        | 动效过渡时间   | number                   | -          | N    | 有过渡动效和时设置，否则效果有瑕疵         |
| startAnim       | 启动动效       | boolean                  | -          | N    |                                            |

## Tips

- 动画效果暂不支持自定义。
- mask 默认`****`，暂不支持自定义。
- fontFamily 需设置为视图所处环境中存在的字体。
