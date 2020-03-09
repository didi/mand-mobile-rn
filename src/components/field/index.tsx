import * as React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { field } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

export interface IMDFieldProps {
  styles?: IMDFieldStyle;
  title?: string; // 标题
  isPlain?: boolean; // 镂空样式
  action?: React.ReactNode; // 非禁用状态下的点击模块
  brief?: string; // 描述内容
  footer?: React.ReactNode; // 末尾区域插槽
  disabled?: boolean; // 是否禁用区域
}

export interface IMDFieldStyle {
  wrapper?: ViewStyle;
  isPlain?: ViewStyle;
  fieldHeader?: ViewStyle;
  fieldHeading?: ViewStyle;
  fieldAction?: ViewStyle;
  fieldTitle?: TextStyle;
  fieldBrief?: TextStyle;
  fieldFooter?: ViewStyle;
  disableText?: TextStyle;
}

export const MDFieldStyles: IMDFieldStyle = {
  wrapper: {
    paddingTop: field.paddingVertical,
    paddingBottom: field.paddingVertical,
    paddingLeft: field.paddingHorizontal,
    paddingRight: field.paddingHorizontal,
    backgroundColor: field.bgColor,
    borderWidth: 0,
    width: '100%',
  },

  isPlain: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
  },

  fieldHeader: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: field.headerGap,
  },

  fieldHeading: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  fieldAction: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: base.gapSize.hSmall,
  },

  fieldTitle: {
    color: field.titleColor,
    fontSize: field.titleFontSize,
    fontWeight: 'normal',
    lineHeight: field.titleFontSize,
  },

  fieldBrief: {
    marginTop: base.gapSize.hSmall,
    color: field.briefColor,
    fontSize: field.briefFontSize,
    lineHeight: base.fontSize.captionLarge,
  },

  fieldFooter: {
    marginTop: field.footerGap,
  },

  disableText: {
    color: base.colors.textDisabled,
  },
};

const styles = StyleSheet.create<IMDFieldStyle>(MDFieldStyles);

export default class MDField extends React.Component<IMDFieldProps> {
  public static defaultProps = {
    styles,
  };

  public render () {
    const sty = this.props.styles || {};
    const {
      title,
      isPlain,
      brief,
      disabled,
      action,
      footer,
      children,
    } = this.props;

    return (
      <View style={[sty.wrapper, isPlain ? sty.isPlain : {}]}>
        <View style={sty.fieldHeader}>
          <View style={sty.fieldHeading}>
            <Text style={[sty.fieldTitle, disabled ? sty.disableText : {}]}>
              {title}
            </Text>
            <Text style={[sty.fieldBrief, disabled ? sty.disableText : {}]}>
              {brief}
            </Text>
          </View>
          <View style={sty.fieldAction}>{action}</View>
        </View>
        {children}
        <View style={sty.fieldFooter}>{footer}</View>
      </View>
    );
  }
}
