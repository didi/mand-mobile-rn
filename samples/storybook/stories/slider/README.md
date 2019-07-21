# MDSlider 滑块

滑块

## 使用

**import**

```javascript
import { MDSlider } from 'mand-mobile-rn'
```

**JSX**

```jsx
render() {
    return (
      <View>
        <Text style={styles.sliderDesc}>{'基本'}</Text>
        <View style={styles.sliderWrapper}>
          <MDSlider
            width={sliderWidth}
            onChange={this._onChange.bind(this)}
          />
        </View>
      </View>
    )
  }
```

### API

#### [MDSlider] IMDSliderProps

| 属性        | 说明               | 类型                                            | 默认值             | 必须 | 备注 |
| :---------- | :----------------- | :---------------------------------------------- | :----------------- | :--- | :--- |
| styles      | 自定义组件细节样式 | IMDSliderStyle                                  | MDSelectorStyles   | N    | -    |
| width       | 宽度               | number                                          | screenWidth - 40   | N    | -    |
| bothway     | 是否启用双向滑动   | boolean                                         | false              | N    | -    |
| range       | 范围,从 0 开始     | number                                          | 100                | N    | -    |
| startValue  | 起始值             | number                                          | 0                  | N    | -    |
| endValue    | 结束值             | number                                          | 50                 | N    | -    |
| min         | 可拖动的最小值     | number                                          | 0                  | N    | -    |
| max         | 可拖动的最大值     | number                                          | -                  | N    | -    |
| step        | 步长               | number                                          | 1                  | N    | -    |
| format      | 格式化             | string                                          | ''                 | N    | -    |
| formatColor | 格式化颜色         | string                                          | slider.formatColor | N    | -    |
| disabled    | 是否可滑动         | boolean                                         | false              | N    | -    |
| onChange    | 回调               | (startValue: number, endAmount: number) => void | -                  | Y    | -    |

### 类型

- IMDSliderStyle

```js
{
  container?: ViewStyle;
  hanlder?: ViewStyle;
  hanlderDisabled?: ViewStyle;
  circle?: ViewStyle;
}
```
