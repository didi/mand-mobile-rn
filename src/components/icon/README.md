# Icon 图标

IconFont、SVG 图标

## 使用

**import**

```js
import { MDIcon } from '../../../src'
```

**JSX**

```jsx
render () {
  return (<MDIcon name='scan' size={24} color='#666' />)
}
```

## API

### Props

| 属性       | 说明          | 类型                     | 默认值 | 必须 | 备注                                                                   |
| :--------- | :------------ | :----------------------- | :----- | :--- | :--------------------------------------------------------------------- |
| style      | 样式          | ViewStyle \| ViewStyle[] | -      | N    | 自定义 Icon 的样式。                                                   |
| name       | 图标名称      | string                   | -      | Y    | Mandmobile 库内置 54 个字体图标。<br/> RN 支持 2 个 svg 带颜色的图标。 |
| size       | 尺寸          | number \| MDIconSize     | medium | N    | `smaller/small/medium/large`                                           |
| color      | 颜色          | string                   | #000   | N    | -                                                                      |
| svg        | 是否 svg 图标 | boolean                  | false  | N    | -                                                                      |
| svgXmlData | svg 静态数据  | string                   | -      | N    | 当 svg 属性为 true 时候生效。<br>经处理过的 svg 静态字符串。           |
| source     | svg 的 source | ImageURISource           | -      | N    | 当 svg 属性为 true 时候生效。                                          |

## Tips

- 单色 Icon 建议使用字体图标。
- 内置 54 个精美图标。
- 内置两个带颜色 svg 图标，分别为`success-color/warn-color`，仅支持 RN。
- svg 图标可使用静态 svgXmlData 和 ImageURISource，仅支持 RN。
