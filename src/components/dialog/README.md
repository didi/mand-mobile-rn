# 模态窗

## 使用

**import**

```javascript
import { MDDialog } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  return (<MDDialog />)
}
```

### API

#### MDDialog Props

| 属性      | 说明             | 类型                | 默认值 | 必须 | 备注                                      |
| --------- | ---------------- | ------------------- | ------ | ---- | ----------------------------------------- |
| isVisible | 弹窗显示与否     | boolean             | -      | Y    | -                                         |
| closeable | 是否带有关闭按钮 | boolean             | -      | Y    | -                                         |
| icon      | 标题图标         | string \| ReactNode | -      | N    | 如果为 `string` 表示为 `MDIcon` 的 `name` |
| iconColor | 标题图标颜色     | string              | -      | N    | -                                         |
| title     | 标题             | string              | -      | N    | -                                         |
| context   | 内容             | string              | -      | Y    | -                                         |
| btns      | 按钮数据         | IMDDialogBtnModel[] | -      | Y    | 至少传一个                                |

#### MDDialog Methods

##### alert(prams)

| 参数  | 说明               | 类型          | 默认值 |
| ----- | ------------------ | ------------- | ------ |
| prams | 直接调用函数所需值 | IConfirmPrams | -      |

##### confirm(prams)

| 参数  | 说明               | 类型          | 默认值 |
| ----- | ------------------ | ------------- | ------ |
| prams | 直接调用函数所需值 | IConfirmPrams | -      |

##### succeed(prams)

| 参数  | 说明     | 类型           | 默认值 |
| ----- | -------- | -------------- | ------ |
| props | 组件属性 | IMDDialogProps | -      |

##### failed(prams)

| 参数  | 说明     | 类型           | 默认值 |
| ----- | -------- | -------------- | ------ |
| props | 组件属性 | IMDDialogProps | -      |

### 类型

- IConfirmPrams

```js
{
  isVisible: boolean;
  closeable: boolean;
  icon?: string;
  iconColor?: string;
  title?: string;
  context: string;
  cancelText?: string;
  confirmText: string;
  onConfirm?: () => void;
}
```

- IMDDialogProps

```js
{
  isVisible: boolean;
  closeable: boolean;
  icon?: ReactNode;
  iconColor?: string;
  title?: string;
  context: string;
  btns: any[];
}
```

- IMDDialogBtnModel

```js
{
  color?: string;
  text: string;
  handle: () => void;
}
```
