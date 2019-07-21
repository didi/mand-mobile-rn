# Switch 开关

开关按钮，用于表示开关状态/两种状态之间的切换。

## 使用

**import**

```js
import { MDSwitch } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDSwitch
      checked={this.state.checked}
      onChange={(checked) => {
        this.setState({ checked: checked })
      }}
    />
  )
}
```

## API

#### Props

| 属性     | 说明               | 类型                     | 默认值         | 必须 | 备注 |
| :------- | :----------------- | :----------------------- | :------------- | :--- | :--- |
| styles   | 自定义组件细节样式 | IMDSwitchStyle           | IMDSwitchStyle | N    | -    |
| checked  | 是否默认选中       | boolean                  | false          | N    | --   |
| disabled | 是否不可修改       | boolean                  | false          | N    | --   |
| width    | 开关的宽度         | number                   | --             | N    | --   |
| height   | 开关的高度         | number                   | --             | N    | --   |
| onChange | 选中事件           | (param: boolean) => void | -              | N    | -    |

### 类型

- IMDSwitchStyle

```js
{
  container?: ViewStyle;
  thumb?: ViewStyle;
  active?: ViewStyle;
  thumbActive?: ViewStyle;
  disabled?: ViewStyle;
}
```
