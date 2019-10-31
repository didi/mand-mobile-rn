import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { G, Text as SvgText } from 'react-native-svg';
const { width, height } = Dimensions.get('window');

export interface IMDWaterMarkProps {
  content?: string; // 水印内容
  color?: string; // 文字颜色
  fontSize?: number; // 文字大小
  spacing?: number; // 行间距
  rotate?: number; // 旋转角度
  repeatX?: boolean; // 是否横向重复
  repeatY?: boolean; // 是否纵向重复
}
export default class MDWaterMark extends React.Component<IMDWaterMarkProps> {
  public render () {
    const { children, rotate } = this.props;
    const _rotate = !rotate || !isNaN(rotate) ? -24 : rotate;
    const markList = this.initMarkList();
    return (
      <View style={{ overflow: 'hidden' }}>
        <Svg
          pointerEvents='none'
          width={width}
          height={height}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
          }}
        >
          <G rotation={_rotate}>{markList}</G>
        </Svg>
        {children}
      </View>
    );
  }

  private initMarkList () {
    const markList = [];
    const {
      color = 'rgba(197,202,213, 0.48)',
      fontSize,
      spacing,
      content = 'MandMobileRN',
      repeatX = true,
      repeatY = true,
    } = this.props;
    const _spacing = spacing && !isNaN(spacing) && spacing > 0 ? spacing : 90; // 默认行间距90
    const _fontSize =
      fontSize && !isNaN(fontSize) && fontSize > 0 ? fontSize : 13; // 默认字体大小13
    const rowNum = repeatY ? Math.ceil(height / _spacing) : 1;
    let startY = repeatY ? 0 : height / 2;
    for (let i = 0; i < rowNum; i++) {
      const space = ' '.repeat(40);
      const line = repeatX ? (content + space).repeat(10) : content;
      const mark = (
        <G key={i}>
          <SvgText
            y={startY}
            stroke='transparent'
            fill={color}
            textAnchor='middle'
            fontSize={_fontSize}
          >
            {line}
          </SvgText>
        </G>
      );
      markList.push(mark);
      startY = startY + _spacing;
    }
    return markList;
  }
}
