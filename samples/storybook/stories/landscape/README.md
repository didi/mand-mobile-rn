# Landscape

用于在浮层中显示广告或说明。

## 使用

**import**

```js
import { MDLandscape } from 'mand-mobile-rn'
```

**JSX**

```js
render () {
  return (
    <MDLandscape isVisible={this.state.show}>
      <Image
        source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
        style={{width: 252, height: 328}}
      />
    </MDLandscape>
  )
}
```

## API

### Props

| 属性         | 说明                   | 类型              | 默认值            | 必须 | 备注         |
| :----------- | :--------------------- | :---------------- | :---------------- | :--- | :----------- |
| styles       | 自定义组件细节样式     | IMDLandscapeStyle | MDLandscapeStyles | N    |              |
| isVisible    | 是否展示               | boolean           | false             | N    | 空信息图片   |
| hasMask      | 是否有蒙层             | boolean           | true              | N    |              |
| maskClosable | 是否可通过点击蒙层关闭 | boolean           | false             | N    |              |
| fullScreen   | 是否全屏               | boolean           | false             | N    | 按钮对象数组 |
| onShow       | 弹出层展示事件         | () => void        | -                 | N    | 按钮对象数组 |
| onHide       | 弹出层隐藏事件         | () => void        | -                 | N    | 按钮对象数组 |

### 类型

- IMDLandscapeStyle

```js
{
  closeWrapper?: ViewStyle;
  fullScreeWrapper?: ViewStyle;
}
```

## Tips

- 所有样式都可以更改。
- 若页面有其他特定操作需用户自行处理。
