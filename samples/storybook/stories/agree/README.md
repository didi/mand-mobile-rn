# 勾选按钮

用于标记切换某种状态，如协议勾选

## 使用

**import**

```javascript
import { MDAgree } from 'mand-mobile-rn'
```

**jsx**

```jsx
render () {
  return (<MDAgree checked="true" disable="false" content={
    <Text>
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
      <Text style={{color: '#5878b4'}}>
      《投保须知》
      </Text>
      ,
      <Text style={{color: '#5878b4'}}>
      《保险条款》
      </Text>
    </Text>
  }></MDAgree>)
}
```

## API

### Props

| 属性     | 说明                      | 类型                     | 默认值        | 必须 | 备注                     |
| :------- | :------------------------ | :----------------------- | :------------ | :--- | :----------------------- |
| styles   | 自定义组件细节样式        | IMDAgreeStyle            | MDAgreeStyles | N    | -                        |
| checked  | 是否默认选中              | boolean                  | false         | N    | -                        |
| disabled | 是否不可修改              | boolean                  | false         | N    | -                        |
| content  | 内容                      | string \| ReactNode      | -             | Y    | -                        |
| size     | 尺寸                      | number \| MDIconSize     | medium        | N    | 参考 MDIconSize 内置尺寸 |
| onChange | change 事件触发的回调函数 | (param: boolean) => void | -             | N    | 勾选状态发生变化事件     |

### 类型

- IMDAgreeStyle

```js
{
  wrapper?: ViewStyle;
  content?: TextStyle | ViewStyle;
  disable?: ViewStyle;
}
```
