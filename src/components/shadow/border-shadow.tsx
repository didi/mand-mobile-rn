import React, { Fragment, PureComponent, ReactNode } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export interface IMDBorderShadowProps {
  side?: 'bottom' | 'top';
  width?: number;
  color?: string;
  border?: number;
  opacity?: number;
  inset?: boolean;
  style?: ViewStyle;
}

export default class MDBorderShadow extends PureComponent<
  IMDBorderShadowProps
> {
  public static defaultProps = {
    side: 'bottom',
    width: 0,
    color: '#000',
    border: 0,
    opacity: 1,
    inset: false,
  };

  public render () {
    const { width, style, children } = this.props;

    return (
      <View style={[{ position: 'relative', width }, style]}>
        {this.renderShadow(children)}
      </View>
    );
  }

  private linear (key: string) {
    const { color, opacity } = this.props;
    const element1 = (
      <Stop
        offset='0'
        stopColor={color}
        stopOpacity={opacity}
        key={key + 'Linear0'}
      />
    );
    const element2 = (
      <Stop
        offset='1'
        stopColor={color}
        stopOpacity='0'
        key={key + 'Linear1'}
      />
    );
    return [element1, element2];
  }

  private renderShadow (children?: ReactNode) {
    const { width, inset, border, side } = this.props;
    const lineWidth = border!;

    if (side === 'top') {
      return (
        <Fragment>
          <Svg
            height={lineWidth}
            width={width! + lineWidth}
            style={{ position: 'absolute', top: inset ? 0 : -lineWidth }}
            key={side}
          >
            <Defs>
              <LinearGradient id='top' x1='0%' x2='0%' y1='100%' y2='0%'>
                {this.linear('BorderTop')}
              </LinearGradient>
              <LinearGradient id='top-inset' x1='0%' x2='0%' y1='0%' y2='100%'>
                {this.linear('BorderTopInset')}
              </LinearGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={width}
              height={lineWidth}
              fill={`url(#top${inset ? '-inset' : ''})`}
            />
          </Svg>
          {typeof children === 'string' ? <Text>children</Text> : children}
        </Fragment>
      );
    } else if (side === 'bottom') {
      return (
        <Fragment>
          {typeof children === 'string' ? <Text>children</Text> : children}
          <Svg
            height={lineWidth}
            width={width! + lineWidth}
            style={{ position: 'absolute', bottom: inset ? -lineWidth : 0 }}
            key={side}
          >
            <Defs>
              <LinearGradient id='bottom' x1='0%' x2='0%' y1='0%' y2='100%'>
                {this.linear('BorderBottom')}
              </LinearGradient>
              <LinearGradient
                id='bottom-inset'
                x1='0%'
                x2='0%'
                y1='100%'
                y2='0%'
              >
                {this.linear('BorderBottomInset')}
              </LinearGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={width}
              height={lineWidth}
              fill={`url(#bottom${inset ? '-inset' : ''})`}
            />
          </Svg>
        </Fragment>
      );
    } else {
      throw new Error('Wrong Type of Side! We just support \'top\' and \'bottom\'');
    }
  }
}
