# 选择器

## 使用

**import**

```javascript
import { MDPicker } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDPicker />)
}
```

### API

#### MDPicker Props

| 属性         | 说明                   | 类型                                 | 默认值  | 必须 | 备注                                          |
| ------------ | ---------------------- | ------------------------------------ | ------- | ---- | --------------------------------------------- |
| defaultIndex | 默认选中行数           | number[]                             | [1,2,3] | N    | defaultIndex 和 defaultValue 同时只能传一个值 |
| defaultValue | 默认选中的值           | string[]                             | -       | N    | defaultIndex 和 defaultValue 同时只能传一个值 |
| invalidIndex | 无效的行数             | number[][]                           | -       | N    | -                                             |
| isView       | 是否不是是底部弹出     | boolean                              | true    | N    | -                                             |
| isCascade    | 是否级联               | boolean                              | -       | N    | -                                             |
| data         | 传入的数据             | any[][]                              | -       | N    | -                                             |
| cols         | 列的数量               | number                               | -       | N    | -                                             |
| itemHeight   | 每个 item 的高度       | number                               | -       | N    | -                                             |
| pickerWidth  | 选择器的宽度           | number                               | -       | N    | -                                             |
| pickerHeight | 选择器的高度           | number                               | -       | N    | -                                             |
| isVisible    | 是否显示               | boolean                              | -       | N    | 只在 tab 弹出是有效                           |
| okText       | tab 弹窗确认按钮内容   | string                               | -       | N    | 只在 tab 弹出是有效                           |
| cancelText   | tab 弹窗取消按钮内容   | string                               | -       | N    | 只在 tab 弹出是有效                           |
| title        | tab 弹窗的标题         | string                               | -       | N    | 只在 tab 弹出是有效                           |
| onChange     | 每次滚动完触发函数     | (a: number,b: number,c: any) => void | -       | N    | -                                             |
| onConfirm    | tab 弹窗的确认触发函数 | (a: any[]) => void                   | -       | N    | 只在 tab 弹出是有效                           |
| onCancel     | tab 弹窗的取消触发函数 | () => void                           | -       | N    | 只在 tab 弹出是有效                           |
| onShow       | tab 弹窗的显示触发函数 | () => void                           | -       | N    | 只在 tab 弹出是有效                           |
| onHide       | tab 弹窗的隐藏触发函数 | () => void                           | -       | N    | 只在 tab 弹出是有效                           |

#### MDPicker Methods

##### getCurValues()

######return ()

| 属性         | 说明             | 类型  |
| ------------ | ---------------- | ----- |
| activeValues | 当前选中的所有值 | any[] |

##### getCurIndexs()

######return ()

| 属性         | 说明               | 类型     |
| ------------ | ------------------ | -------- |
| activeIndexs | 当前选中的所有位置 | number[] |

##### refresh(callback)

| 参数     | 说明         | 类型       | 默认值 |
| -------- | ------------ | ---------- | ------ |
| callback | 刷新回调函数 | () => void | -      |

##### getColumnValue(index)

| 参数  | 说明   | 类型   | 默认值 |
| ----- | ------ | ------ | ------ |
| index | 指定列 | number | -      |

######return ()

| 属性        | 说明           | 类型 |
| ----------- | -------------- | ---- |
| activeValue | 指定列选中的值 | any  |

##### getColumnValues()

######return ()

| 属性         | 说明             | 类型  |
| ------------ | ---------------- | ----- |
| activeValues | 当前选中的所有值 | any[] |

##### getColumnIndex(index)

| 参数  | 说明   | 类型   | 默认值 |
| ----- | ------ | ------ | ------ |
| index | 指定列 | number | -      |

######return ()

| 属性        | 说明             | 类型   |
| ----------- | ---------------- | ------ |
| activeIndex | 指定列选中的行号 | number |

##### getColumnIndexs()

######return ()

| 属性         | 说明           | 类型     |
| ------------ | -------------- | -------- |
| activeIndexs | 选中的所有行号 | number[] |

##### setColumnValues(index,values,callback)

| 参数  | 说明       | 类型   | 默认值 |
| ----- | ---------- | ------ | ------ |
| index | 要设置的列 | number | -      |

| 参数   | 说明           | 类型  | 默认值 |
| ------ | -------------- | ----- | ------ |
| values | 给指定列传的值 | any[] | -      |

| 参数     | 说明               | 类型       | 默认值 |
| -------- | ------------------ | ---------- | ------ |
| callback | 设置值之后回调函数 | () => void | -      |
