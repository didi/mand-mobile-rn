# Tabs 标签页

用于创建包含内容区域的标签页

## 使用

**import**

```javascript
import { MDTabs, MDTabPane } from 'mand-mobile-rn'
```

**JSX**

```jsx
<MDTabs hasInk>
  <MDTabPane name={0} label="第一章">
    <View style={styles.content}>
      <Text style={styles.text}>
        她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
      </Text>
    </View>
  </MDTabPane>
  <MDTabPane name={1} label="第二章">
    <View style={styles.content}>
      <Text style={styles.text}>
        又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
      </Text>
    </View>
  </MDTabPane>
  <MDTabPane name={2} label="第三章" disabled>
    <View style={styles.content}>
      <Text style={styles.text}>
        你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
      </Text>
    </View>
  </MDTabPane>
</MDTabs>
```

### API

#### [IMDTabsProps] Props

| 属性         | 说明               | 类型         | 默认值       | 必须 | 备注 |
| ------------ | ------------------ | ------------ | ------------ | ---- | ---- |
| styles       | 自定义组件细节样式 | IMDTabsStyle | MDTabsStyles | N    | -    |
| currentIndex | 选中项标识         | number       | -            | N    | -    |
| hasInk       | 是否有下划线       | boolean      | `false`      | N    | -    |

#### [IMDTabPaneProps] Props

| 属性     | 说明               | 类型             | 默认值          | 必须 | 备注 |
| -------- | ------------------ | ---------------- | --------------- | ---- | ---- |
| styles   | 自定义组件细节样式 | IMDTabPaneStyle  | MDTabPaneStyles | N    | -    |
| curName  | 选中项标识         | number \| string | -               | N    | -    |
| name     | 当前项标识         | number \| string | -               | N    | -    |
| label    | 菜单标题           | string           | -               | N    | -    |
| disabled | 是否禁用           | boolean          | `false`         | N    | -    |

### 类型

- IMDTabsStyle

```js
{
  wrapper?: ViewStyle;
  content?: ViewStyle;
}
```

- IMDTabPaneStyle

```js
{
  wrapper?: ViewStyle;
  tabPane?: ViewStyle;
}
```
