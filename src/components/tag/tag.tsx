import React, { PureComponent } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import base from '../../_styles/themes/default.basic';
import { tag } from '../../_styles/themes/default.components';

type MDTagShape =
  | 'square'
  | 'circle'
  | 'fillet'
  | 'quarter'
  | 'coupon'
  | 'bubble';
type MDTagSize = 'tiny' | 'small' | 'large';
type MDTagType = 'fill' | 'ghost';
type MDTagSharpType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface IMDTagProps {
  styles?: IMDTagStyle;
  size?: MDTagSize;
  shape?: MDTagShape;
  type?: MDTagType;
  sharp?: MDTagSharpType;
  fillColor?: string;
  textColor?: string;
  fontWeight?: TextStyle['fontWeight'];
  gradientStyle?: any;
}

export interface IMDTagStyle {
  wrapper: ViewStyle;
  text: TextStyle;
  tiny: TextStyle;
  small: TextStyle;
  large: TextStyle;
  fill: ViewStyle;
  ghost: ViewStyle;
  fillText: TextStyle;
  ghostText: TextStyle;
  fillet: ViewStyle;
  square: ViewStyle;
}

export const MDTagStyles: IMDTagStyle = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 2,
  },
  text: {
    color: '#fc9153',
    fontWeight: 'normal',
    textAlign: 'center',
  },

  // size
  tiny: {
    fontSize: tag.tinyFontSize,
    padding: 2.5,
  },
  small: {
    fontSize: tag.smallFontSize,
    padding: 4,
  },
  large: {
    fontSize: tag.largeFontSize,
    padding: 5,
  },

  // type
  fill: {
    backgroundColor: tag.color,
    borderWidth: 0,
  },
  ghost: {
    borderWidth: 1,
    borderColor: tag.color,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  fillText: {
    color: base.colors.textBaseInverse,
  },
  ghostText: {
    color: tag.color,
  },

  // shape
  fillet: {
    borderRadius: tag.filletRadius,
  },
  square: {
    borderRadius: 0,
  },
};

const styles = StyleSheet.create<IMDTagStyle>(MDTagStyles);

export class MDTag extends PureComponent<IMDTagProps> {
  public static defaultProps = {
    styles,
    size: 'large',
    shape: 'square',
    type: 'ghost',
    fillColor: '#FFFFFF',
    textColor: '#fc9153',
    fontWeight: 'normal',
  };

  protected wrapperStyle: ViewStyle[] = [];

  public render () {
    const content = this.renderContent();
    return <View style={this.wrapperStyle}>{content}</View>;
  }

  public renderContent () {
    this.wrapperStyle = [
      this.props.styles!.wrapper,
      this.typeStyle(),
      this.shapeStyle(),
    ];

    const { leftCoupon, rightCoupon } = this.renderCoupon();
    const _children = this.renderChileren();
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {leftCoupon}
        {_children}
        {rightCoupon}
      </View>
    );
  }

  private renderChileren () {
    const { children, styles: _styles } = this.props;
    const contentStyle = this.contentStyle();
    if (typeof children === 'string') {
      return <Text style={[_styles!.text, contentStyle]}>{children}</Text>;
    } else {
      // fontSize fontWeight color 这三个属性不支持非text组件
      delete contentStyle.fontSize;
      delete contentStyle.fontWeight;
      delete contentStyle.color;
      return <View style={contentStyle}>{children}</View>;
    }
  }

  private renderCoupon () {
    const { styles: _styles, size } = this.props;
    const padding = Number(_styles![size!].padding);

    let leftCoupon = null;
    let rightCoupon = null;
    if (this.props.shape === 'coupon') {
      const leftCouponStyle = this.couponStyle('left', padding);
      const rightCouponStyle = this.couponStyle('right', padding);
      leftCoupon = <View style={leftCouponStyle} />;
      rightCoupon = <View style={rightCouponStyle} />;
    }
    return { leftCoupon, rightCoupon };
  }

  private sharpStyle (sharp?: MDTagSharpType) {
    const sharpStyle: ViewStyle = {};
    switch (sharp) {
      case 'top-left':
        sharpStyle.borderTopLeftRadius = 0;
        break;
      case 'top-right':
        sharpStyle.borderTopRightRadius = 0;
        break;
      case 'bottom-left':
        sharpStyle.borderBottomLeftRadius = 0;
        break;
      case 'bottom-right':
        sharpStyle.borderBottomRightRadius = 0;
        break;
      default:
        break;
    }
    return sharpStyle;
  }

  private shapeStyle () {
    const { shape, sharp, styles: _styles, size } = this.props;
    const shapeStyle: ViewStyle = {};

    const { height } = _styles!.wrapper;
    const viewHeight =
      typeof height === 'number' ? height : tag.viewHeight[size!];

    // 手动设置高度
    shapeStyle.height = viewHeight;

    if (shape === 'circle') {
      shapeStyle.borderRadius = viewHeight / 2;
      const sharpStyle = this.sharpStyle(sharp);
      Object.assign(shapeStyle, sharpStyle);
    }

    if (shape === 'fillet') {
      Object.assign(shapeStyle, _styles!.fillet);
    }

    if (shape === 'quarter') {
      shapeStyle.borderBottomLeftRadius = viewHeight;
      shapeStyle.overflow = 'hidden';
      shapeStyle.width = viewHeight;
    }

    if (shape === 'coupon') {
      shapeStyle.paddingHorizontal = 0;
    }

    if (shape === 'bubble') {
      shapeStyle.borderRadius = viewHeight / 2;
      shapeStyle.borderBottomLeftRadius = 0;
      shapeStyle.width = viewHeight;
    }

    if (shape === 'square') {
      Object.assign(shapeStyle, _styles!.square);
    }

    return shapeStyle;
  }

  private typeStyle () {
    const {
      type,
      textColor,
      fillColor,
      gradientStyle,
      styles: _styles,
    } = this.props;
    const typeStyle: ViewStyle = {};

    if (type === 'ghost') {
      Object.assign(typeStyle, _styles!.ghost);
      if (textColor) {
        typeStyle.borderColor = textColor;
      }
    }

    if (type === 'fill' && !gradientStyle) {
      Object.assign(typeStyle, _styles!.fill);
      if (fillColor) {
        typeStyle.backgroundColor = fillColor;
      }
    }
    return typeStyle;
  }

  private couponStyle (orientation: 'left' | 'right', padding: number) {
    const { type, textColor } = this.props;

    const left = orientation === 'left';
    const couponStyle: ViewStyle = {
      position: 'absolute',
      width: padding,
      height: padding * 2,
      backgroundColor: 'white',
      borderTopColor: textColor,
      borderBottomColor: textColor,
      borderWidth: type === 'ghost' ? 1 : 0,
      borderRightColor: left ? textColor : 'white',
      borderLeftColor: left ? 'white' : textColor,
      borderTopRightRadius: left ? padding : 0,
      borderBottomRightRadius: left ? padding : 0,
      borderTopLeftRadius: left ? 0 : padding,
      borderBottomLeftRadius: left ? 0 : padding,
    };

    if (left) {
      couponStyle.left = -1;
    } else {
      couponStyle.right = -1;
    }

    return couponStyle;
  }

  private contentStyle () {
    const {
      type,
      fontWeight,
      textColor,
      shape,
      size,
      styles: _styles,
    } = this.props;

    const padding = Number(_styles![size!].padding);
    const contentStyles: TextStyle = {};

    Object.assign(contentStyles, _styles![size!]);
    contentStyles.fontWeight = fontWeight;
    const typeText = `${type!}Text` as 'fillText' | 'ghostText';
    contentStyles.color = textColor || _styles![typeText].color;

    if (shape === 'coupon') {
      contentStyles.paddingHorizontal = padding * 2;
    }

    if (shape === 'circle') {
      // contentStyles.paddingVertical = padding / 2;
      contentStyles.paddingHorizontal = padding * 2;
    }

    if (shape === 'quarter') {
      contentStyles.position = 'absolute';
      contentStyles.right = 0;
      contentStyles.top = padding / 2;
      contentStyles.padding = 0;
    }

    return contentStyles;
  }
}
