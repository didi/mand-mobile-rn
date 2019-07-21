# TabBar 标签栏

用于创建不含内容区域的标签栏

## 使用

**import**

```javascript
import { MDTabBar } from 'mand-mobile-rn'
```

### 使用指南

```js
return <MDTabBar current={0} items={items} hasInk />
```

### API

#### [Component] Props

| 属性         | 说明               | 类型           | 默认值         | 必须 | 备注 |
| ------------ | ------------------ | -------------- | -------------- | ---- | ---- |
| styles       | 自定义组件细节样式 | IMDTabBarStyle | MDTabBarStyles | N    | -    |
| items        | 标签标题数组       | IMDTabBarItem  | -              | N    | -    |
| currentIndex | 当前选中项         | number         | -              | N    | -    |
| hasInk       | 是否显示下划线     | boolean        | `true`         | N    | -    |

### 类型

- IMDTabBarStyle

```js
{
  wrapper?: ViewStyle;
  tabbarList?: ViewStyle;
  tabbarItem?: ViewStyle;
  itemText?: TextStyle;
  isActive?: TextStyle;
  disabled?: TextStyle;
  tabBarInk?: ViewStyle;
  neckSpan?: ViewStyle;
}
```

- IMDTabBarItem

```js
{
  name?: number;
  label?: string;
  icon?: string;
  disabled?: boolean;
}
```
