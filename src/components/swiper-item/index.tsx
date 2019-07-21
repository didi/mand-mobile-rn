import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface IMDSwiperItemProps {
  style?: ViewStyle;
  width?: number;
  height?: number;
}

export default class MDSwiperItem extends React.Component<IMDSwiperItemProps> {
  public render () {
    const { width, height, style } = this.props;

    const wrapperStyle: ViewStyle[] = [
      {
        justifyContent: 'center',
        flex: 1,
      },
      {
        ...style,
      },
    ];
    if (width && height) {
      wrapperStyle.push({
        width,
        height,
      });
    }

    return <View style={wrapperStyle}>{this.props.children}</View>;
  }
}
