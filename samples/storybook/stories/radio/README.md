# 复选项

## 使用

**import**

```javascript
import { MDRadio, MDRadioList } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDRadio
      value="email"
      label="Email"
      selected={this.state.selected}
      onChange={(checked, value) => { this.setState({ selected: value}) }}
    />
  )
}
```

## API

### MDRadio Props

| 属性         | 说明               | 类型                        | 默认值        | 必须 | 备注                                      |
| :----------- | :----------------- | :-------------------------- | :------------ | :--- | :---------------------------------------- |
| styles       | 自定义组件细节样式 | IMDRadioStyle               | MDRadioStyles | N    | -                                         |
| label        | 复选框标题         | string                      | -             | Y    | -                                         |
| disabled     | 是否禁用项目       | boolean                     | `false`       | N    | -                                         |
| selected     | 是否选中项目       | boolean                     | `false`       | N    | -                                         |
| value        | 唯一键值           | boolean \| string \| number | -             | N    | -                                         |
| icon         | 默认状态 icon      | string \| ReactNode         | -             | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconInverse  | 选中状态 icon      | string \| ReactNode         | -             | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconDisabled | 禁用状态 icon      | string \| ReactNode         | -             | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| onChange     | 选中事件           | Function                    | -             | N    | -                                         |

**NOTE** onChange: (checked: boolean, value?: boolean | string | number) => void;

### MDRadioList Props

| 属性             | 说明               | 类型                                | 默认值  | 必须 | 备注                                      |
| :--------------- | :----------------- | :---------------------------------- | :------ | :--- | :---------------------------------------- |
| style            | 自定义组件样式     | ViewStyle \| ViewStyle[]            | -       | N    | -                                         |
| defaultValue     | 默认选中键值       | boolean \| string \| number         | -       | N    | -                                         |
| options          | 选项数据源         | IMDOptionSet[]                      | -       | N    | -                                         |
| icon             | 默认状态 icon      | string                              | -       | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconInverse      | 选中状态 icon      | string                              | -       | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconDisabled     | 禁用状态 icon      | string                              | -       | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconPosition     | icon 的位置        | string                              | `left`  | N    | `left`, `right`                           |
| hasInput         | 是否具有可编辑项   | boolean                             | `false` | N    | -                                         |
| inputLabel       | 可编辑项的名称     | string                              | -       | N    | -                                         |
| inputPlaceHolder | 可编辑项的占位提示 | string                              | -       | N    | -                                         |
| optionRender     | icon 的位置        | (option: IMDOptionSet) => ReactNode | -       | N    | -                                         |
| onChange         | 选中事件           | Function                            | -       | N    | -                                         |

**NOTE** onChange?: (value: boolean | string | number, index: number) => void;

#### Radio List Methods

##### select(value)

设置选中项

| 参数  | 说明           | 类型   |
| ----- | -------------- | ------ |
| value | 选中项的 value | string |

### 类型

- IMDRadioStyle

```js
  {
    wrapper?: ViewStyle;
    icon?: TextStyle;
    label?: TextStyle | ViewStyle;
  }
```

- IMDOptionSet

```js
{
  value: boolean | string | number;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}
```
