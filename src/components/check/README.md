# 复选项

## 使用

**import**

```javascript
import { MDCheck, MDCheckBox, MDCheckGroup, MDCheckList } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (
    <MDCheck
      label="复选项"
      checked={this.state.checked}
      onChange={(checked) => {
        this.setState({ checked: checked })
      }}
    />
  )
}
```

## API

### MDCheck Props

| 属性         | 说明               | 类型                                                            | 默认值        | 必须 | 备注                                      |
| :----------- | :----------------- | :-------------------------------------------------------------- | :------------ | :--- | :---------------------------------------- |
| styles       | 自定义组件细节样式 | IMDCheckStyle                                                   | MDCheckStyles | N    | -                                         |
| label        | 复选框标题         | string                                                          | -             | Y    | -                                         |
| disabled     | 是否禁用项目       | boolean                                                         | `false`       | N    | -                                         |
| checked      | 是否选中项目       | boolean                                                         | `false`       | N    | -                                         |
| value        | 唯一键值           | boolean \| string \| number                                     | -             | N    | -                                         |
| icon         | 默认状态 icon      | string \| ReactNode                                             | -             | N    | 如果为 `String` 表示为 `MDIcon` 的 `name` |
| iconInverse  | 选中状态 icon      | string \| ReactNode                                             | -             | N    | 如果为 `String` 表示为 `MDIcon` 的 `name  |
| iconDisabled | 禁用状态 icon      | string \| ReactNode                                             | -             | N    | 如果为 `String` 表示为 `MDIcon` 的 `name  |
| onChange     | 选中事件           | (checked: boolean, value?: boolean \| string \| number) => void | -             | N    | -                                         |

### MDCheckBox Props

| 属性     | 说明               | 类型                                                            | 默认值           | 必须 | 备注 |
| :------- | :----------------- | :-------------------------------------------------------------- | :--------------- | :--- | :--- |
| styles   | 自定义组件细节样式 | IMDCheckBoxStyle                                                | MDCheckBoxStyles | N    | -    |
| label    | 复选框标题         | string                                                          | -                | Y    | -    |
| disabled | 是否禁用项目       | boolean                                                         | `false`          | N    | -    |
| checked  | 是否选中项目       | boolean                                                         | `false`          | N    | -    |
| value    | 唯一键值           | boolean \| string \| number                                     | -                | N    | -    |
| onChange | 选中事件           | (checked: boolean, value?: boolean \| string \| number) => void | -                | N    | -    |

**NOTE** onChange: (checked: boolean, value?: boolean | string | number) => void;

### MDCheckGroup Props

| 属性          | 说明         | 类型                                                 | 默认值 | 必须 | 备注 |
| :------------ | :----------- | :--------------------------------------------------- | :----- | :--- | :--- |
| style         | 自定义样式   | ViewStyle                                            | -      | N    | -    |  |
| defaultValues | 默认选中键值 | boolean[] \| string[] \| number[]                    | -      | N    | -    |
| onChange      | 选中事件     | (values?: boolean[] \| string[] \| number[]) => void | -      | N    | -    |

**NOTE** 只有 `children` 中的 `MDCheck` 和 `MDCheckBox` 才会触发 `onChange`。

### MDCheckGroup Methods

##### check(name)

| 参数 | 说明           | 类型   | 默认值 |
| ---- | -------------- | ------ | ------ |
| name | 需要选中的键值 | string | -      |

##### uncheck(name)

| 参数 | 说明           | 类型   | 默认值 |
| ---- | -------------- | ------ | ------ |
| name | 需要去掉的键值 | string | -      |

##### toggle(name)

| 参数 | 说明           | 类型   | 默认值 |
| ---- | -------------- | ------ | ------ |
| name | 需要反选的键值 | string | -      |

### MDCheckList Props

| 属性          | 说明               | 类型                                                 | 默认值            | 必须 | 备注         |
| :------------ | :----------------- | :--------------------------------------------------- | :---------------- | :--- | :----------- |
| styles        | 自定义组件细节样式 | IMDCheckListStyle                                    | MDCheckListStyles | N    | -            |  |
| defaultValues | 默认选中键值       | boolean[] \| string[] \| number[]                    | -                 | N    | -            |
| options       | 选项数据源         | IMDOptionSet[]                                       | -                 | N    | -            |
| onChange      | 选中事件           | (values?: boolean[] \| string[] \| number[]) => void | -                 | N    | 处理按压事件 |

### 类型

- IMDCheckStyle

```js
{
  wrapper?: ViewStyle;
  icon?: TextStyle;
  label?: TextStyle;
}
```

- IMDCheckBoxStyle

```js
{
  wrapper?: ViewStyle;
  tag?: ViewStyle;
  label?: TextStyle;
}
```

- IMDCheckListStyle

```js
{
  wrapper?: ViewStyle;
  icon?: TextStyle;
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
