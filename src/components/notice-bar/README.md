# NoticeBar 通知栏

通常用于系统提醒、活动提醒等通知

### 引入

```javascript
import { MDNoticeBar } from 'mand-mobile-rn'
```

### 使用指南

```js
render () {
  return (<MDNoticeBar />)
}
```

### API

#### [Component] Props

| 属性       | 说明               | 类型                | 默认值            | 必须 | 备注                                      |
| ---------- | ------------------ | ------------------- | ----------------- | ---- | ----------------------------------------- |
| styles     | 自定义组件细节样式 | IMDNoticeBarStyle   | MDNoticeBarStyles | N    | -                                         |
| type       | 类型               | string              | `default`         | N    | `default` , `activity` , `warning`        |
| round      | 圆角               | boolean             | `fasle`           | N    |                                           |
| left       | 左侧插槽           | string \| ReactNode | -                 | N    | 如果为 `String` 表示为 `MDIcon` 的 `name` |
| right      | 右侧插槽           | ReactNode           | -                 | N    |                                           |
| mode       | 右边提示类型       | string              | -                 | N    | `close`,`link`                            |
| time       | 显示时长           | number              | -                 | N    | -                                         |
| multiRows  | 内容超出多行展示   | boolean             | `false`           | N    | -                                         |
| scrollable | 内容超出滚动展示   | boolean             | `false`           | N    | -                                         |
| onPress    | 右侧图标点击事件   | () => void          | -                 | N    | mode='close'时关闭 noticeBar              |

### 类型

- IMDNoticeBarStyle

```js
{
  wrapper?: ViewStyle;
  noticeBar?: ViewStyle;
  noticeBarRound?: ViewStyle;
  noticeBarText?: TextStyle;
  activityText?: TextStyle;
  activity?: ViewStyle;
  warning?: ViewStyle;
  warnText?: TextStyle;
  noticeBarLeft?: ViewStyle;
  noticeBarRight?: ViewStyle;
  noticeBarEmpty?: ViewStyle;
  noticeBarContent?: ViewStyle;
  noticeBarMultiContent?: TextStyle;
}
```
