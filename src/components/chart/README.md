# 折线图表

SVG 折线图表, 可绘制多条折线并配置不同的显示规则。

## 使用

**import**

```javascript
import { MDChart } from 'mand-mobilel-rn'
```

**JSX**

```jsx
return (
  <MDChart
    size={[width, height]}
    max={60}
    min={0}
    step={10}
    lines={5}
    format={(val) => val + '%'}
    labels={labels}
    datasets={datasets}
  />
)
```

## API

### Props

| 属性       | 说明                               | 类型                    | 默认值                                                                | 必须 | 备注 |
| :--------- | :--------------------------------- | :---------------------- | :-------------------------------------------------------------------- | :--- | :--- |
| size       | 图表绘制区域大小                   | number[]                | [480,320]                                                             | N    |      |
| max        | 纵坐标最大值                       | number                  | 若不填则会自动计算数据中最大值                                        | N    |      |
| min        | 纵坐标最表最小值, 建议设置为 0     | number                  | 若为空则会自动计算数据中最小值                                        | N    |      |
| lines      | 纵坐标最多画几条线                 | number                  | 5                                                                     | N    |      |
| step       | 纵坐标递减的单位值                 | number                  | 若为空则根据 lines, max, min 自动计算平均值                           | N    |      |
| fromat     | 纵坐标标签格式化函数               | (val: number) => string | `val => val`                                                          | N    |      |
| labels     | 横坐标的标签                       | string[]                | -                                                                     | Y    |      |
| datasets   | 数据值, 格式参考下面的说明         | IMDChartDataSet[]       | -                                                                     | Y    |      |
| lineProps  | 绘制坐标线属性, 格式参考下面的说明 | IMDLineProps            | `{stroke: '#ccc',strokeWidth: 0.5,strokeLinecap: "square"}`           | N    |      |
| pathProps  | 绘制走势线属性, 格式参考下面的说明 | IMDLineProps            | `{stroke: '#2F86F6',strokeWidth: 1,strokeLinecap: "butt"}`            | N    |      |
| textXProps | x 轴文本属性, 格式参考下面的说明   | IMDTextProps            | `{fill: '#666f83',fontSize: innerScaleFont(22),textAnchor: "middle"}` | N    |      |
| textYProps | y 轴文本属性, 格式参考下面的说明   | IMDTextProps            | `{fill: '#666f83',fontSize: innerScaleFont(20),textAnchor: "end"}`    | N    |      |

### 类型

- IMDChartDataSet

```js
{
  color: '#ff5858', // 颜色, 可选, 默认为橘色
  theme: 'heat',    // 主题, 可选heat, region, 默认为空
  width: 1,         // 宽度, 可选, 默认为1
  values: [15, 20]  // 数据数组
}
```

- IMDLineProps

```js
{
  stroke: '#ccc', //颜色
  strokeWidth: 0.5, // 宽度
  strokeLinecap: "square" // 可选 butt, square, round
}
```

- IMDTextProps

```js
{
  fill: '#ccc', //颜色
  fontSize: 0.5, // size
  textAnchor: "square" // 可选 start, middle, end
}
```
