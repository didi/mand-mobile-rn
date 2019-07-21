import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import base from '../../_styles/themes/default.basic';
import MDIndicator from './indicator';

export type MDActivityIndicatorType = 'roller' | 'spinner' | 'carousel';

export type MDActivityIndicatorColorType = 'dark' | 'light';

export interface IMDActivityIndicatorProps {
  style?: ViewStyle;
  type?: MDActivityIndicatorType;
  column?: boolean; // 是否垂直排列, default is false
  color?: string | MDActivityIndicatorColorType;
  size?: number;
  textColor?: string;
  textSize?: number;
  textGap?: number;
  animating?: boolean;
}

export default class MDActivityIndicator extends React.Component<
  IMDActivityIndicatorProps
> {
  public static defaultProps = {
    type: 'roller',
    color: base.colors.primary,
    column: false, // 是否垂直排列, default is false
    size: 35,
    textColor: '#aaa',
    textSize: 35,
    textGap: 8,
    animating: true,
  };

  public render () {
    const { style, type, color: userColor, size, column, animating } = this.props;
    let count = 1;
    let color = userColor;

    if (color === 'dark') {
      color = 'black';
    } else if (color === 'light') {
      color = 'white';
    }

    if (type === 'carousel') {
      count = 3;
    } else if (type === 'spinner') {
      count = 12;
    }

    return (
      <View
        style={[
          style,
          {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: column ? 'column' : 'row',
          },
        ]}
      >
        <MDIndicator {...{ color, type, size, count, animating }} />
        {this.renderChildren()}
      </View>
    );
  }

  private renderChildren () {
    const { textColor, textSize, children, column, textGap } = this.props;
    if (!children) return null;
    if (typeof children === 'string') {
      return (
        <Text
          style={{
            color: textColor,
            fontSize: textSize,
            marginLeft: column ? 0 : textGap,
            marginTop: column ? textGap : 0,
          }}
        >
          {children}
        </Text>
      );
    } else {
      return <React.Fragment> {children} </React.Fragment>;
    }
  }
}
