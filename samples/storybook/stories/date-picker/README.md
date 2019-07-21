# 时间选择器

选择日期或者时间，支持年/月/日/时/分和按照范围选择

## 使用

**import**

```javascript
import { MDDatePicker } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDDatePicker
      todayText="今天"
      defaultDate={new Date()}
      isView
    />
  )
}
```

## API

### Props

| 属性         | 说明                                       | 类型                                                                                                   | 默认值                           | 必须 | 备注/可选值                          |
| :----------- | :----------------------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------- | :--- | :----------------------------------- |
| style        | 自定义样式                                 | ViewStyle                                                                                              | -                                | N    | -                                    |
| type         | 日期选择类型                               | string                                                                                                 | `date`                           | N    | `date`, `time`, `datetime`, `custom` |
| customTypes  | 自定义`日期元素`，`[yyyy, MM, dd, hh, mm]` | string[]                                                                                               | -                                | N    | 仅用于 type 为`custom`               |
| minDate      | 最小可选日期（时间）                       | Date                                                                                                   | -                                | N    | -                                    |
| maxDate      | 最大可选日期（时间）                       | Date                                                                                                   | -                                | N    | -                                    |
| defaultDate  | 分钟数递增步长                             | number                                                                                                 | `1`                              | N    | -                                    |
| minuteStep   | 附加文案                                   | string                                                                                                 | -                                | N    | -                                    |
| unitText     | 元素单位展示文案设置                       | string[]                                                                                               | `['年', '月', '日', '时', '分']` | -    | 复杂逻辑使用`text-render`            |
| todayText    | 今天展示文案设置                           | string                                                                                                 | `今天`                           | -    | 使用`&`可占位日期数字，如`&(今天)`   |
| isView       | 是否内嵌在页面内展示, 否则以弹层形式       | boolean                                                                                                | `false`                          | -    | -                                    |
| isVisable    | 控制弹层形式展示、隐藏                     | boolean                                                                                                | `false`                          | -    | -                                    |
| title        | 选择器标题                                 | string                                                                                                 | -                                | -    | -                                    |
| describe     | 选择器描述                                 | string                                                                                                 | -                                | -    | -                                    |
| okText       | 选择器确认文案                             | string                                                                                                 | `确认`                           | -    | -                                    |
| cancelText   | 选择器取消文案                             | string                                                                                                 | `取消`                           | -    | -                                    |
| maskClosable | 点击蒙层是否可关闭弹出层                   | boolean                                                                                                | `true`                           | -    | -                                    |
| textRender   | 自定义选项展示文案方法                     | () => string                                                                                           | undefined                        | -    | -                                    | 如果使用`text-render`则`unit-text`无效, 见示例 |
| onChange     | 选择器选中项更改事件                       | (columnIndex: number, itemIndex: number, value: { text: string; value: any; typeFormat: any }) => void | -                                | N    | -                                    |
| onConfirm    | 选择器确认选择事件（仅`isView`为`false`）  | (columnsValue: Array<{ text: string; value: any; typeFormat: any }>) => void                           | -                                | N    | -                                    |
| onCancel     | 选择器取消选择事件（仅`isView`为`false`）  | () => void                                                                                             | -                                | N    | -                                    |
| onShow       | 选择器显示事件（仅`isView`为`false`）      | () => void                                                                                             | -                                | N    | -                                    |
| onHide       | 选择器隐藏事件（仅`isView`为`false`）      | () => void                                                                                             | -                                | N    | -                                    |

### DatePicker Methods

#### getFormatDate(format): dateStr

获取特定格式的日期时间字符串（`format`中的`日期元素`需在列数据中存在），需在`initialed`事件触发之后或异步调用

| 参数   | 说明 | 类型   | 默认               |
| ------ | ---- | ------ | ------------------ |
| format | 格式 | String | `yyyy-MM-dd hh:mm` |

返回

| 属性    | 说明           | 类型   |
| ------- | -------------- | ------ |
| dateStr | 日期时间字符串 | string |

> 列表项值属性介绍见附录

#### getColumnValue(index): activeItemValue

| 参数  | 说明   | 类型   |
| ----- | ------ | ------ |
| index | 列索引 | Number |

返回

| 属性            | 说明       | 类型                              |
| --------------- | ---------- | --------------------------------- |
| activeItemValue | 选中项的值 | Object: {text, value, typeFormat} |

#### getColumnValues(): columnsValue

返回

| 属性         | 说明             | 类型                             |
| ------------ | ---------------- | -------------------------------- |
| columnsValue | 所有列选中项的值 | Array<{text, value, typeFormat}> |

#### getColumnIndex(index): activeItemIndex

| 参数  | 说明   | 类型   |
| ----- | ------ | ------ |
| index | 列索引 | number |

返回

| 属性            | 说明           | 类型   |
| --------------- | -------------- | ------ |
| activeItemIndex | 选中项的索引值 | number |

#### getColumnIndexs(): columnsIndex

返回

| 属性         | 说明                 | 类型  |
| ------------ | -------------------- | ----- |
| columnsIndex | 所有列选中项的索引值 | Array |
