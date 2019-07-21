---
title: [NAME] 下拉菜单
preview: https://didi.github.io/mand-mobile/examples/#/drop-menu
---

[下拉菜单可用于列表筛选]

### 引入

```javascript
import { MDDropMenu } from 'mand-mobile-rn'
```

### 使用指南

[此处填写组件使用特殊说明，如使用其他依赖或项目配置，如无可缺省(如缺省删去标题)]

### API

#### [MDDropMenu] Props

| 属性         | 说明                               | 类型                              | 默认值 | 必须 | 备注 |
| ------------ | ---------------------------------- | --------------------------------- | ------ | ---- | ---- |
| style        | View 的样式                        | ViewStyle                         | -      | N    | -    |
| data         | DrapMenu 数据                      | DropMenusData                     | -      | Y    | 必填 |
| alignCenter  | 下拉列表内容是否居中 true 表示居中 | boolean                           | false  | N    | -    |
| defaultValue | 初始值                             | Array                             | []     | N    | -    |
| optionRender | 返回各选项渲染内容                 | ({text, disabled, ...}) => string | -      | N    | -    |

#### [MDDropMenu] Methods

方法说明

#### Method 1、getSelectedValue(index:number): (selectedOption:IMDOptionSet | undefined)

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| index | 菜单项索引值 | number | -      |

返回（如有）

| 属性           | 说明         | 类型                      |
| -------------- | ------------ | ------------------------- |
| selectedOption | 选中的数据项 | IMDOptionSet \| undefined |

#### Method 2、getSelectedValues(): (selectedOptions:IMDOptionSet[] | undefined)

返回（如有）

| 属性            | 说明         | 类型                        |
| --------------- | ------------ | --------------------------- |
| selectedOptions | 选中的数据项 | IMDOptionSet[] \| undefined |

### 类型

- DropMenusData

```javascript
{
  text: string; // 下拉列表Menu的文案
  options: IMDOptionSet[]; // 下拉列表数据
  disabled?: boolean; // 下拉列表Menu是否可用
  selectedOption?: IMDOptionSet;
}
```

- IMDOptionSet

```javascript
{
  value: boolean | string | number;
  label: string;
  checked?: boolean;
  disabled?: boolean;
}
```
