# 进度条

## 使用

**import**

```javascript
import { MDProgress } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDProgress />)
}
```

### API

#### MDProgress Props

| 属性       | 说明         | 类型    | 默认值 | 必须 | 备注       |
| ---------- | ------------ | ------- | ------ | ---- | ---------- |
| progress   | 进度值       | number  | 0.9    | N    | 0 ~ 1 取值 |
| animate    | 自动播放动画 | boolean | false  | N    | -          |
| height     | 样式         | number  | 5      | N    | -          |
| itemWidth  | 是否动画     | number  | -      | N    | -          |
| upperColor | 进度条颜色   | string  | -      | N    | -          |
| underColor | 底部控件颜色 | string  | -      | N    | -          |
