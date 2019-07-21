# 图片查看器

用于浏览多张图片，并可对图片进行滑动切换。

## 使用

**import**

```javascript
import { MDImageViewer } from 'mand-mobile-rn'
```

## API

```jsx
MDImageViewer.show(imgs, index, false)
```

### 参数说明

| 属性         | 说明               | 类型     | 默认值 | 必须 | 备注 |
| :----------- | :----------------- | :------- | :----- | :--- | :--- |
| list         | 展示图片 uri 列表  | string[] | -      | Y    |      |
| initialIndex | 初始索引值         | number   | 0      | N    |      |
| hasDots      | 是否展示图片索引值 | boolean  | false  | N    |      |
