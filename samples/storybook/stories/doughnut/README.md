# 模态窗

## 使用

**import**

```javascript
import { MDDoughaut } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDDoughaut />)
}
```

### API

#### MDDoughaut Props

| 属性        | 说明             | 类型                | 默认值 | 必须 | 备注    |
| ----------- | ---------------- | ------------------- | ------ | ---- | ------- |
| radius      | 圆环内半径       | number              | -      | Y    | -       |
| strokeWidth | 圆环描边宽度     | number              | -      | Y    | -       |
| animate     | 是否动画显示     | boolean             | false  | N    | -       |
| animateTime | 动画时长         | number              | 1000   | N    | 单位 ms |
| data        | 圆环个各部分数据 | IMDDoughnutArcSet[] | -      | N    | -       |

### 类型

- IMDDoughnutArcSet

```javascript
{
  color: string
  proportion: number
}
```
