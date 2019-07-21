# MDShadow 阴影

阴影

### 使用

**import**

```javascript
import { MDShadow } from 'mand-mobile-rn'
```

### 使用指南

```jsx
render () {
  <MDBoxShadow {...BoxShadowOpt}>
      <View
        style={{ width: 100, height: 100, backgroundColor: 'white' }}
      />
    </MDBoxShadow>
}
```

### API

#### [MDBoxShadow] Props

| 属性    | 说明   | 类型      | 默认值 | 必须 | 备注 |
| ------- | ------ | --------- | ------ | ---- | ---- |
| style   | 样式   | ViewStyle | -      | N    | -    |
| width   | 宽度   | number    | 0      | N    | -    |
| height  | 高度   | number    | 0      | N    | -    |
| color   | 颜色   | string    | '#000' | N    | -    |
| border  | 边框   | number    | 0      | N    | -    |
| radius  | 圆角   | number    | 0      | N    | -    |
| opacity | 透明度 | number    | 1      | N    | -    |
| x       | x 坐标 | number    | 0      | N    | -    |
| y       | y 坐标 | number    | 0      | N    | -    |
