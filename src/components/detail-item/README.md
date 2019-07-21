# 清单项

清单列表用于展示一些列表信息，如账单。

## 使用

**import**

```js
import { MDDetailItem } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDDetailItem title={"承保公司"} content={"众安"} bold={true} />)
}
```

## API

### Props

| 属性    | 说明               | 类型               | 默认值             | 必须 | 备注 |
| :------ | :----------------- | :----------------- | :----------------- | :--- | :--- |
| styles  | 自定义组件细节样式 | IMDDetailItemStyle | MDDetailItemStyles | N    | -    |
| title   | 标题               | string             | -                  | N    |      |
| content | 描述内容           | string             | -                  | N    |      |
| bold    | 是否加粗显示       | boolean            | false              | N    |      |

### 类型

- IMDDetailItemStyle

```js
{
  wrapper?: ViewStyle;
  title?: TextStyle;
  content?: TextStyle;
  bold?: TextStyle;
}
```
