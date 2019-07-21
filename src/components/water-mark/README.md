# 水印

可自定义文本水印

### 使用

**import**

```javascript
import { MDWaterMark } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDWaterMark content="滴滴金融">
      <Text>昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否？知否？应是绿肥></Text>
      <Text>此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？></Text>
      <Text>行路难，行路难，多歧路，今安在？长风破浪会有时，直挂云帆济沧海。</Text>
    </MDWaterMark>
  );
}
```

## API

### Props

| 属性     | 说明     | 类型    | 默认值                   | 必须  | 备注                 |
| :------- | :------- | :------ | :----------------------- | :---- | :------------------- |
| content  | 水印内容 | string  | 'MandMobileRN'           | false | -                    |
| color    | 水印颜色 | string  | 'rgba(197,202,213, .48)' | false | 水印颜色需包含透明度 |
| fontSize | 水印大小 | number  | 13                       | false | -                    |
| spacing  | 水印间距 | number  | 90                       | false | -                    |
| rotate   | 旋转角度 | number  | -24                      | false | -                    |
| repeatX  | 横向重复 | boolean | true                     | false | -                    |
| repeatY  | 纵向重复 | boolean | true                     | false | -                    |

## Tips

- 需要被水印包裹的内容作为 MDWaterMark 的子元素传入即可加上水印
