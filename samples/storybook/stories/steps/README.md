# MDSteps 步骤条

可自定义文本水印

## 使用

**import**

```javascript
import { MDSteps } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  const steps = [
      {
        title: '登录/注册',
      },
      {
        title: '申请征信报告',
      },
      {
        title: '提取征信报告',
      },
    ]
    return <MDSteps steps={steps} />
}
```

### API

#### MDSteps Props

| 属性        | 说明               | 类型                                               | 默认值        | 必须 | 备注 |
| ----------- | ------------------ | -------------------------------------------------- | ------------- | ---- | ---- |
| styles      | 自定义组件细节样式 | IMDStepsStyle                                      | MDStepsStyles | N    | -    |
| steps       | 步进说明           | IMDStepsItem[]                                     | -             | N    | -    |
| current     | 当前进度           | number                                             | 0             | N    | -    |
| direction   | 方向               | 'horizontal' \| 'vertical'                         | 'horizontal'  | N    | -    |
| transition  | 过渡               | boolean                                            | false         | N    | -    |
| iconRender  | 自定义 icon        | (status: MDStepStatus, index: number) => ReactNode | -             | N    | -    |
| titleRender | 自定义 title       | (status: MDStepStatus, index: number) => ReactNode | -             | N    | -    |
| briefRender | 自定义 brief       | (status: MDStepStatus, index: number) => ReactNode | -             | N    | -    |

### 类型

- IMDStepperStyle

```js
{
  wrapper?: ViewStyle;
  backgroundBar?: ViewStyle;
  nodeWrapper?: ViewStyle;
  defaultIconWrapper?: ViewStyle;
  defaultIcon?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  unactive?: ViewStyle;
  active?: ViewStyle;
}
```

- IMDStepsItem

```js
{
  title: string;
  brief?: string;
}
```

- MDStepStatus

```js
  | 'current'
  | 'reached'
  | 'unreached'
```
