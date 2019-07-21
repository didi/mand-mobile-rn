# 结果页

用于展示流程结束页面的控件

## 使用

**import**

```js
import { MDResultPage } from 'mand-mobile-rn'
```

**JSX**

```js
render () {
  return (
    <MDResultPage />
  )
}
```

## API

### Props

| 属性    | 说明               | 类型                                               | 默认值             | 必须 | 备注         |
| :------ | :----------------- | :------------------------------------------------- | :----------------- | :--- | :----------- |
| styles  | 自定义组件细节样式 | IMDResultPageStyle                                 | MDResultPageStyles | N    | -            |
| type    | 类型               | string                                             | empty              | N    | 结果页类型   |
| imgUrl  | 图片链接           | string                                             | -                  | N    | 空信息图片   |
| text    | 主文案             | string                                             | 暂无信息           | N    |              |
| subtext | 副文案             | string                                             | -                  | N    |              |
| buttons | 样式               | IMDResultPageButtonSet \| IMDResultPageButtonSet[] | -                  | N    | 按钮对象数组 |

### 类型

- IMDResultPageStyle

```js
{
  wrapper: ViewStyle
  text: TextStyle
  subtext: TextStyle
  image: ImageStyle
  buttonWrapper: ViewStyle
}
```

- IMDResultPageButtonSet

```js
{
  type: MDButtonType | string,
  text: string,
  handler: () => void,
}
```

## Tips

- 所有样式都可以更改。
- 若页面有其他特定操作需用户自行处理。
