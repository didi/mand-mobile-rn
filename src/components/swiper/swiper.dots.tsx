import * as React from 'react';
import { View } from 'react-native';
import { IMDSwiperStyle } from './swiper.base';

export default (props: {
  index: number
  itemCount: number
  style: IMDSwiperStyle
  isVertical?: boolean
}) => {
  const { index, itemCount, style, isVertical } = props;
  let dotsStyle = style.dots;
  let dotStyle = [style.dot];
  if (isVertical === true) {
    dotsStyle = style.dotsVertical;
    dotStyle = [style.dotVertical];
  }

  const dots = [];
  for (let i = 0; i < itemCount; i++) {
    const _dotStyle = Array.prototype.concat.call([], dotStyle);
    if (i === index) {
      _dotStyle.push(style.dotActive!);
    }
    dots.push(<View key={i} style={_dotStyle} />);
  }

  return <View style={dotsStyle}>{dots}</View>;
};
