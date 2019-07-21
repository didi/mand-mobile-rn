import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MDActivityIndicator } from '../..';
import base from '../../_styles/themes/default.basic';
import { toast } from '../../_styles/themes/default.components';
import { MDActivityIndicatorType } from '../activity-indicator';
import MDIcon from '../icon';
export interface IMDToastViewProps {
  content: string;
  icon?: ReactNode;
}
export default class MDToastView extends React.Component<
  IMDToastViewProps,
  {}
> {
  public render () {
    const { icon, content } = this.props;
    let _icon = null;
    if (icon && typeof icon === 'string') {
      _icon = (
        <MDIcon
          name={icon}
          color={base.colors.textBaseInverse}
          size={base.fontSize.captionLarge}
          style={{ marginRight: base.gapSize.hXSmall }}
        />
      );
    } else if (React.isValidElement(icon)) {
      _icon = <View style={{ marginRight: base.gapSize.hXSmall }}>{icon}</View>;
    }

    return (
      <View style={styles.content}>
        {_icon}
        <Text style={styles.text}>{content}</Text>
      </View>
    );
  }
}
// 没有给出自定义样式的方案
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: toast.radius,
    backgroundColor: toast.fill,
    paddingHorizontal: toast.paddingHorizontal,
    paddingVertical: toast.paddingVertical,
  },
  text: {
    color: toast.color,
    fontSize: toast.fontSize,
  },
});
