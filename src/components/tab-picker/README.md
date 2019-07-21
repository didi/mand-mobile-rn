# TabPicker 多级联动选择器

底部级联选择的 tab 切换面板

## 使用

**import**

```javascript
import { MDTabPicker } from 'mand-mobile-rn'
```

### 使用指南

```js
return (
  <MDTabPicker
    visible={show}
    title="请选择"
    describe="请选择您所在的省份、城市、区县"
    data={data}
    change={this.handleChange.bind(this)}
  />
)
```

### API

#### [Component] Props

| 属性        | 说明               | 类型              | 默认值            | 必须 | 备注       |
| ----------- | ------------------ | ----------------- | ----------------- | ---- | ---------- |
| styles      | 自定义组件细节样式 | IMDTabPickerStyle | MDTabPickerStyles | N    | -          |
| title       | 弹窗标题           | String            | -                 | N    | -          |
| describe    | 弹窗描述文本       | String            | -                 | N    | -          |
| placeholder | 默认提示文本       | String            | `请选择`          | N    | -          |
| visible     | 显示或隐藏         | Boolean           | -                 | N    | -          |
| data        | 数据源             | Json              | -                 | N    | 格式见附录 |
| change      | 底部弹窗选中事件   | Function          | -                 | N    | -          |

### 类型

- IMDTabPickerStyle

```js
{
  wrapper?: ViewStyle;
  content?: ViewStyle;
  tabPickerContent?: ViewStyle;
}
```

### 附录

级联数据源数据格式

```
{
  // 唯一键名
  name: '',
  // 面板标签
  label: '',
  // 选项列表
  options: [
    {
      // 选项值
      value: "",
      // 选项标签
      label: "",
      // 级联子面板
      children: {
        name: '',
        label: '',
        options: [
          // ...
        ]
      }
    }
  ]
}
```
