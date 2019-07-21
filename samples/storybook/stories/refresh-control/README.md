# RefreshControl 滚动区域/下拉刷新

用于模拟原生的滚动区域，并支持下拉刷新和加载更多

## 使用

**import**

```js
import { MDRefreshControl } from 'mand-mobile-rn'
```

**jsx**

```jsx
render () {
  <ScrollView
    refreshControl={
      <MDRefreshControl
        refreshText="下拉刷新"
        refreshActiveText="释放刷新"
        refreshingText="刷新中..."
        stateTextColor="#2ecc71"
        timeTextColor="#e74c3c"
        indicatorColor="#2F86F6"
      />
    }
  >
  </ScrollView>
}
```

### API

#### 属性

| 属性              | 说明             | 类型       | 默认值      | 备注                   |
| ----------------- | ---------------- | ---------- | ----------- | ---------------------- |
| refreshText       | 待刷新文案       | string     | `下拉刷新`  | -                      |
| refreshActiveText | 释放可刷新文案   | string     | `释放刷新`  | -                      |
| refreshingText    | 刷新中文案       | string     | `刷新中...` | -                      |
| stateTextColor    | 刷新文案颜色     | string     | `#aaaaaa`   | -                      |
| timeTextColor     | 刷新时间颜色     | string     | `#aaaaaa`   | -                      |
| indicatorColor    | 指示器颜色       | string     | `#2F86F6`   | -                      |
| stateHidden       | 刷新文案隐藏     | boolean    | `false`     | -                      |
| timeHidden        | 刷新时间隐藏     | boolean    | `false`     | -                      |
| stateFontSize     | 刷新文案字体大小 | number     | `14`        | 单位`dp`               |
| timeFontSize      | 刷新时间字体大小 | number     | `14`        | 单位`dp`               |
| refreshing        | 刷新状态         | boolean    | `false`     | -                      |
| onRefresh         | 刷新回调         | () => void |             | 在视图开始刷新时调用。 |
