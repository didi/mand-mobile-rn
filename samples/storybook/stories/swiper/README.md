# MDSwiper 轮播

走马灯，用于一组图片或卡片轮播

## 使用

**import**

```javascript
import { MDSwiper, MDSwiperItem } from 'mand-mobile-rn'
```

**JSX**

```jsx
render () {
  const items = data.map((item, index) => {
    return (
      <MDSwiperItem key={index}>
        <Text style={[{backgroundColor: item.color}, styles.text]} >{item.text}</Text>
      </MDSwiperItem>
    )
  });

  return (
    <View style={{width: 300, height: 200}}>
      <MDSwiper
        ref={this.swiper}
        width={300}
        height={200}
        onBeforeChange={this._beforeChange.bind(this)}
        onAfterChange={this._afterChange.bind(this)}
      >
        {items}
      </MDSwiper>
    </View>
  )
}
```

## API

### MDSwiper Props

| 属性           | 说明                                    | 类型                               | 默认值         | 必须 | 可选值/备注            |
| :------------- | :-------------------------------------- | :--------------------------------- | :------------- | :--- | :--------------------- |
| styles         | 自定义组件细节样式                      | IMDSwiperStyle                     | MDSwiperStyles | N    | -                      |
| width          | 滚动区域宽度                            | number                             | -              | Y    | -                      |
| height         | 滚动区域高度                            | number                             | -              | Y    | -                      |
| autoplay       | 自动切换间隔时长(毫秒), 禁用可设置为`0` | number                             | `3000`         | N    | `0`, `[500, +Int.Max)` |
| transition     | 面板切换动画效果                        | 'slide' \| 'slideY' \| 'fade'      | 'slide'        | N    | -                      |
| defaultIndex   | 第一屏面板索引值                        | number                             | -              | N    | `[0, length - 1]`      |
| hasDots        |  控制面板指示点                         | boolean                            | `true`         | N    | -                      |
| isLoop         | 循环播放                                | boolean                            | `true`         | N    | -                      |
| dragable       | 触摸滑动                                | boolean                            | `true`         | N    | -                      |
| onBeforeChange | 轮播器将要切换前的事件                  | (from: number, to: number) => void | -              | N    | -                      |
| onAfterChange  | 轮播器切换完成时的事件                  | (from: number, to: number) => void | -              | N    | -                      |

### MDSwiperItem Props

| 属性   | 说明               | 类型               | 默认值             | 必须 | 可选值/备注    |
| :----- | :----------------- | :----------------- | :----------------- | :--- | :------------- |
| styles | 自定义组件细节样式 | IMDSwiperItemStyle | MDSwiperItemStyles | N    | 自定义细节样式 |
| width  | 滚动区域宽度       | number             | -                  | Y    | -              |
| height | 滚动区域高度       | number             | -                  | Y    | -              |

### MDSwiper Methods

#### play(autoplay)

打开自动切换

| 参数     | 说明                   | 类型   | 默认值 | 可选值            |
| -------- | ---------------------- | ------ | ------ | ----------------- |
| autoplay | 自动切换间隔时长(毫秒) | number | `3000` | `[500, +Int.Max)` |

#### stop()

停止自动切换

#### prev()

切换到前一个 item

#### next()

切换到后一个 item

#### goto(index)

切换到某一个 index

| 参数  | 说明       | 类型   | 默认值 | 可选值            |
| ----- | ---------- | ------ | ------ | ----------------- |
| index | 面板索引值 | number | `0`    | `[0, length - 1]` |

#### getIndex()

获取当前显示的 index

| 参数  | 说明             | 类型   |
| ----- | ---------------- | ------ |
| index | 当前显示的 index | number |

### 类型

- IMDSwiperStyle

```js
{
  wrapper?: ViewStyle;
  dots?: ViewStyle;
  dotsVertical?: ViewStyle;
  dot?: ViewStyle;
  dotVertical?: ViewStyle;
  dotActive?: ViewStyle;
}
```

- IMDSwiperItemStyle

```js
{
  style?: ViewStyle;
  width?: number;
  height?: number;
}
```
