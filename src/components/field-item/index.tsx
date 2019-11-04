import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MDIcon from '../icon';

import { fieldItem } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

export interface IMDFieldItemProps {
  styles?: IMDFieldItemStyle;
  title?: string;
  left?: React.ReactNode;
  placeholder?: string;
  content?: string;
  addon?: string;
  arrow?: boolean;
  solid?: boolean;
  alignRight?: boolean;
  disabled?: boolean;
  onPress?: (params: any) => void;
}

export interface IMDFieldItemStyle {
  wrapper?: ViewStyle;
  itemContent?: ViewStyle;
  itemLeft?: ViewStyle;
  itemRight?: ViewStyle;
  itemControl?: ViewStyle;
  itemTitle?: TextStyle;
  itemText?: TextStyle;
  addonText?: TextStyle;
  itemPlaceholder?: TextStyle;
  solidTitle?: TextStyle;
  childrenText?: TextStyle;
  disableText?: TextStyle;
  rightText?: TextStyle;
}

export const MDFieldItemStyles: IMDFieldItemStyle = {
  wrapper: {
    position: 'relative',
  },

  itemContent: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: fieldItem.minHeight,
    // paddingTop: fieldItem.paddingVertical,
    // paddingBottom: fieldItem.paddingVertical,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: fieldItem.borderColor,
  },

  itemTitle: {
    flexShrink: 0,
    marginRight: fieldItem.titleGap,
    fontSize: fieldItem.fontSize,
    lineHeight: fieldItem.fontSize,
  },

  solidTitle: {
    width: fieldItem.titleWidth,
  },

  itemLeft: {
    flexShrink: 0,
    marginRight: base.gapSize.hSmall,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  itemControl: {
    position: 'relative',
    flex: 1,
  },

  itemText: {
    color: fieldItem.color,
    fontSize: fieldItem.fontSize,
    fontWeight: fieldItem.fontWeight as TextStyle['fontWeight'],
    lineHeight: fieldItem.fontSize,
  },

  itemPlaceholder: {
    color: fieldItem.placeholderColor,
    fontWeight: base.fontWeight.normal as TextStyle['fontWeight'],
  },

  itemRight: {
    position: 'relative',
    flexShrink: 0,
    marginLeft: base.gapSize.hSmall,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  addonText: {
    color: fieldItem.addonColor,
    fontSize: fieldItem.addonFontSize,
  },

  childrenText: {
    fontSize: fieldItem.childrenFontSize,
  },

  disableText: {
    color: base.colors.textDisabled,
  },

  rightText: {
    textAlign: 'right',
  },
};

const styles = StyleSheet.create<IMDFieldItemStyle>(MDFieldItemStyles);

export default class MDFieldItem extends React.Component<IMDFieldItemProps> {
  public static defaultProps = {
    styles,
  };

  public render () {
    const sty = this.props.styles || {};
    const {
      title,
      left,
      placeholder,
      content,
      addon,
      arrow,
      solid,
      alignRight,
      disabled,
      onPress,
      children,
    } = this.props;
    const _control = this.renderControl(
      sty,
      content,
      placeholder,
      disabled,
      alignRight
    );
    const _right = this.renderRight(sty, arrow, addon);
    const _content = (
      <View style={sty.itemContent}>
        <Text style={[sty.itemTitle, solid ? sty.solidTitle : {}]}>
          {title}
        </Text>
        {left ? <View style={sty.itemLeft}>{left}</View> : null}
        <View style={sty.itemControl}>{_control}</View>
        {_right}
      </View>
    );
    if (!disabled && onPress) {
      return (
        <TouchableOpacity style={sty.wrapper} onPress={onPress}>
          {_content}
          {children}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={sty.wrapper}>
          {_content}
          {children}
        </View>
      );
    }
  }

  private renderControl (
    sty: IMDFieldItemStyle,
    content?: string,
    placeholder?: string,
    disabled?: boolean,
    alignRight?: boolean
  ) {
    return (
      <Text
        style={[
          sty.itemText,
          disabled ? sty.disableText : {},
          alignRight ? sty.rightText : {},
          placeholder ? sty.itemPlaceholder : {},
        ]}
      >
        {content || placeholder}
      </Text>
    );
  }

  private renderRight (sty: IMDFieldItemStyle, arrow?: boolean, addon?: string) {
    const _icon = !!arrow ? (
      <MDIcon
        name={'arrow-right'}
        size={base.fontSize.bodyNormal}
        style={sty.addonText}
      />
    ) : null;
    return (
      <View style={sty.itemRight}>
        {addon ? <Text style={sty.addonText}>{addon}</Text> : null}
        {_icon}
      </View>
    );
  }
}
