# MDStepper 步进器

增加，减少或修改当前数值

## 使用

**import**

```javascript
import { MDStepper } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
    return (<MDStepper disabled={true} onChange={value => this.handleChanged(value);}/>)
}
```

## API

### Props

| 属性         | 说明                     | 类型                    | 默认值            | 必须 | 备注 |
| :----------- | :----------------------- | :---------------------- | :---------------- | :--- | :--- |
| styles       | 自定义组件细节样式       | IMDStepperStyle         | MDStepperStyles   | N    | -    |
| defaultValue | 默认值                   | number                  | 0                 | N    |      |
| value        | 当前值                   | number \| string        | 0                 | N    |      |
| step         | 每次改变步数，可以为小数 | number                  | 1                 | N    |      |
| min          | 最小值                   | number                  | -Number.MAX_VALUE | N    |      |
| max          | 最大值                   | number                  | Number.MAX_VALUE  | N    |      |
| disabled     | 禁用                     | boolean                 | false             | N    |      |
| readOnly     | 只读                     | boolean                 | false             | N    |      |
| isInteger    | 只能输入整数             | boolean                 | false             | N    |      |
| onChange     | 值变化回调               | (value: number) => void | -                 | N    |      |

### 类型

- IMDStepperStyle

```js
{
  wrapper?: ViewStyle;
  button?: ViewStyle;
  buttonIcon?: ViewStyle;
  input?: TextStyle;
  disable?: any;
}
```
