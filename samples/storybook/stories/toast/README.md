# Toast 轻提示

弹出式消息提示

## 使用

**import**

```js
import { MDToast } from 'mand-mobile-rn'
```

**JS**

```js
MDToast.info('操作反馈')
```

## API

### MDToast(params: IMDToastProps)

显示自定义提示

| 属性     | 说明                                           | 类型    | 默认值 | 必须 | 备注 |
| :------- | :--------------------------------------------- | :------ | :----- | :--- | :--- |
| content  | 提示内容                                       | string  | -      | Y    | -    |
| icon     | Icon 组件图标名称                              | string  | -      | N    | -    |
| duration | 显示多少毫秒后自动消失，<br/>若为 0 则一直显示 | number  | 3000   | N    | -    |
| position | 展示位置                                       | string  | center | N    | -    |
| hasMask  | 是否显示半透明遮罩                             | boolean | true   | N    | -    |

### MDToast.info(content, duration, hasMask)

显示纯文本提示

| 属性     | 说明               | 类型    | 默认值 | 必须 | 备注 |
| :------- | :----------------- | :------ | :----- | :--- | :--- |
| content  | 提示内容           | string  | -      | Y    | -    |
| position | 展示位置           | string  | center | N    | -    |
| hasMask  | 是否显示半透明遮罩 | boolean | true   | N    | -    |

### MDToast.succeed(content, duration, hasMask)

显示成功提示

| 属性     | 说明               | 类型    | 默认值 | 必须 | 备注 |
| :------- | :----------------- | :------ | :----- | :--- | :--- |
| content  | 提示内容           | string  | -      | Y    | -    |
| position | 展示位置           | string  | center | N    | -    |
| hasMask  | 是否显示半透明遮罩 | boolean | true   | N    | -    |

### MDToast.failed(content, duration, hasMask)

显示失败提示

| 属性     | 说明               | 类型    | 默认值 | 必须 | 备注 |
| :------- | :----------------- | :------ | :----- | :--- | :--- |
| content  | 提示内容           | string  | -      | Y    | -    |
| position | 展示位置           | string  | center | N    | -    |
| hasMask  | 是否显示半透明遮罩 | boolean | true   | N    | -    |

### MDToast.loading(content, duration, hasMask)

显示载入提示

| 属性     | 说明               | 类型    | 默认值 | 必须 | 备注 |
| :------- | :----------------- | :------ | :----- | :--- | :--- |
| content  | 提示内容           | string  | -      | Y    | -    |
| position | 展示位置           | string  | center | N    | -    |
| hasMask  | 是否显示半透明遮罩 | boolean | true   | N    | -    |

### MDToast.hide()

隐藏提示
