import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { button as btn } from '../../_styles/themes/default.components';
import { innerScaleFont, innerScaleSize } from '../../_styles/themes/responsive';
import MDIcon from '../icon';

export type MDButtonType =
  | 'default'
  | 'primary'
  | 'warning'
  | 'disabled'
  | 'link';

export type MDButtonSize = 'large' | 'medium' | 'small';

export type MDIconPosition = 'left' | 'right';

export interface MDButtonSizeSet {
  width?: number;
  height?: number;
  fontSize?: number;
}

export interface IMDButtonProps {
  style?: ViewStyle | ViewStyle[];
  type?: MDButtonType;
  size?: MDButtonSize | MDButtonSizeSet;
  plain?: boolean;
  round?: boolean;
  inactive?: boolean;
  icon?: string;
  iconPosition?: MDIconPosition;
  onPress?: (params: any) => void;
  children?: React.ReactNode;
  gradientStyle?: any;
}

const styleByType = (type: MDButtonType | undefined, plain: boolean) => {
  let underlayColor = base.colors.bg;
  let iconColor = base.colors.bg;
  switch (type) {
    case 'primary':
      underlayColor = plain ? btn.primaryPlainActiveFill : btn.primaryActiveFill;
      iconColor = plain ? base.colors.textHighlight : btn.primaryColor;
      break;
    case 'default':
      underlayColor = plain ? btn.defaultPlainActiveFill : btn.defaultActiveFill;
      iconColor = plain ? base.colors.textBody : btn.defaultColor;
      break;
    case 'warning':
      underlayColor = plain ? btn.warningPlainActiveFill : btn.warningActiveFill;
      iconColor = plain ? base.colors.textError : btn.warningColor;
      break;
    case 'disabled':
      iconColor = plain ? base.colors.textPlaceholder : btn.disabledColor;
      break;
    case 'link':
      iconColor = plain ? base.colors.textBody : base.colors.primary;
      break;
    default:
      break;
  }
  return { underlayColor, iconColor };
};

export class MDButton extends React.Component<IMDButtonProps, {}> {
  public static defaultProps = {
    type: 'default',
    size: 'large',
    plain: false,
    round: false,
    inactive: false,
    iconPosition: 'left',
  };

  constructor (props: IMDButtonProps) {
    super(props);
    if (typeof props.children === 'string' && !props.children) {
      console.warn('[MDButton] props children as string could\'t empty');
    }
  }

  protected wrapperStyle: ViewStyle = {};
  public render () {
    const content = this.renderContent();
    return content;
  }

  /**
   * renderContent
   */
  public renderContent () {
    const {
      type,
      onPress,
      size,
      round,
      inactive,
      plain,
      style,
      icon,
      iconPosition,
      children,
      gradientStyle,
    } = this.props;

    const wrapperStyle: any = [styles.wrapper];
    const contentStyle: any = [];

    if (round) {
      wrapperStyle.push(styles.round);
    }
    if (inactive) {
      wrapperStyle.push(styles.inactive);
    }

    let iconSize = base.fontSize.bodyNormal;
    if (size === 'large') {
      iconSize = btn.fontSize;
      wrapperStyle.push(!children ? styles.largeIconOnly : styles.large);
      contentStyle.push(styles.largeContent);
    } else if (size === 'small') {
      iconSize = btn.smallFontSize;
      wrapperStyle.push(!children ? styles.smallIconOnly : styles.small);
      contentStyle.push(styles.smallContent);
    } else {
      const { width, height, fontSize } = size as MDButtonSizeSet;
      if (fontSize) {
        iconSize = innerScaleFont(fontSize);
        contentStyle.push({ iconSize });
      }
      if (width) {
        wrapperStyle.push({ width: innerScaleSize(width) });
      }
      if (height) {
        wrapperStyle.push({ height: innerScaleSize(height) });
      }
    }

    if (!gradientStyle) {
      wrapperStyle.push(styles[`${type}`]);
    }

    if (!gradientStyle && plain) {
      wrapperStyle.push(styles.plain);
      contentStyle.push(styles[`${type}PlainContent`]);
    } else {
      contentStyle.push(styles[`${type}Content`]);
    }

    const { iconColor } = styleByType(type, !!plain);
    let { underlayColor } = styleByType(type, !!plain);
    const flattenStyle: ViewStyle = StyleSheet.flatten(wrapperStyle);

    // 用户传递React.React.ReactNode时，清除掉预设的backgroundColor以及borderWidth
    // if (children && typeof children !== 'string') {
    //   delete flattenStyle.backgroundColor;
    //   delete flattenStyle.borderWidth;
    //   underlayColor = 'transparent';
    // }
    if (gradientStyle) {
      delete flattenStyle.borderWidth;
      underlayColor = 'transparent';
    }
    // 保留用户传递的style
    const wrapper: ViewStyle = StyleSheet.flatten([flattenStyle, style]);
    this.wrapperStyle = wrapper;

    const iconComponent = icon ? (
      <MDIcon name={icon} color={iconColor} size={iconSize} />
    ) : null;

    if (!onPress || inactive || type === 'disabled') {
      return this.renderButtonComponent(
        children,
        contentStyle,
        wrapper,
        iconComponent,
        iconPosition,
        false
      );
    }
    return (
      <TouchableHighlight
        style={wrapper}
        underlayColor={underlayColor}
        onPress={this.props.onPress}
      >
        {this.renderButtonComponent(
          children,
          contentStyle,
          wrapper,
          iconComponent,
          iconPosition,
          true
        )}
      </TouchableHighlight>
    );
  }

  private renderButtonComponent = (
    children: any,
    contentStyle: any,
    wrapper: ViewStyle,
    iconComponent?: any,
    iconPos?: MDIconPosition,
    canPress?: boolean
  ) => {
    const childrenComponent =
      typeof children === 'string' ? (
        <Text style={contentStyle}>{children}</Text>
      ) : (
        children
      );
    return (
      <View style={!canPress ? wrapper : { flexDirection: 'row' }}>
        {iconPos === 'left' ? iconComponent : null}
        {childrenComponent}
        {iconPos === 'right' ? iconComponent : null}
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: base.borderWidth.base,
    borderStyle: 'solid',
    borderRadius: base.radius.normal,
    alignItems: 'center',
  },
  large: {
    height: btn.height,
    // paddingHorizontal: base.gapSize.hLarge,
  },
  largeIconOnly: {
    width: btn.height,
    height: btn.height,
  },
  small: {
    height: btn.smallHeight,
    // paddingHorizontal: base.gapSize.hSmall,
  },
  smallIconOnly: {
    width: btn.smallHeight,
    height: btn.smallHeight,
  },
  largeContent: {
    fontSize: btn.fontSize,
    paddingHorizontal: 3,
  },
  smallContent: {
    fontSize: btn.smallFontSize,
    paddingHorizontal: 2,
  },

  /* default */
  default: {
    backgroundColor: btn.defaultFill,
    borderColor: base.colors.borderElement,
  },
  defaultContent: {
    color: btn.defaultColor,
  },
  defaultPlainContent: {
    color: base.colors.textBody,
  },

  /* primary */
  primary: {
    backgroundColor: btn.primaryFill,
    borderColor: btn.primaryFill,
  },
  primaryContent: {
    color: btn.primaryColor,
  },
  primaryPlainContent: {
    color: base.colors.textHighlight,
  },

  /* warning */
  warning: {
    backgroundColor: btn.warningFill,
    borderColor: btn.warningFill,
  },
  warningContent: {
    color: btn.warningColor,
  },
  warningPlainContent: {
    color: base.colors.textError,
  },

  /* disabled */
  disabled: {
    backgroundColor: btn.disabledFill,
    borderColor: btn.disabledFill,
  },
  disabledContent: {
    color: btn.disabledColor,
  },
  disabledPlainContent: {
    color: base.colors.textPlaceholder,
  },

  /* link */
  link: {
    backgroundColor: base.colors.bg,
    borderColor: base.colors.bg,
  },
  linkContent: {
    color: base.colors.primary,
  },
  linkPlainContent: {
    color: base.colors.textBody,
  },

  inactive: {
    opacity: base.opacity.disabled,
  },
  round: {
    borderRadius: base.radius.circle,
  },
  plain: {
    backgroundColor: base.colors.bg,
  },
  icon: {
    // marginTop: 2
  },
});
