# MDTextInput 输入框

输入框

## 使用

**import**

```javascript
import { MDTextInput } from 'mand-mobile-rn'
```

### 使用指南

**JSX**

```jsx
render() {
    return (
      <MDTextInput
        {...inputProps}
        style={[_styles!.inputText, inputStyle]}
        ref={(ref) => (this.inputRef = ref)}
      />
    );
  }
```

### API

#### [Component] Props

| 属性       | 说明               | 类型                                   | 默认值       | 必须 | 备注 |
| ---------- | ------------------ | -------------------------------------- | ------------ | ---- | ---- |
| shuffle    | 自定义组件细节样式 | boolean                                | false        | N    |      |
| okText     | ok 键文案          | string                                 | '确认'       | N    | -    |
| type       | 类型               | 'professional' \| 'simple' \| 'system' | professional | N    | -    |
| hideDot    | 是否隐藏 . 键      | boolean                                | false        | N    | -    |
| textRender | textRender         | (value: MDTextInputRenderKeys) => void | -            | N    | -    |

### MDTextInput Methods

#### focus: void

获取焦点

#### blur: void

失去焦点

#### [Component] Events

事件说明

| 属性       | 说明             | 类型 |
| ---------- | ---------------- | ---- |
| textRender | 自定义文案渲染器 | --   |
