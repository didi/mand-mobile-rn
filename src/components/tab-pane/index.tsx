import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import base from '../../_styles/themes/default.basic';

export interface IMDTabPaneProps {
  styles?: IMDTabPaneStyle;
  curName?: number | string;
  name?: number | string;
  label?: string;
  disabled?: boolean;
}

export interface IMDTabPaneStyle {
  wrapper?: ViewStyle;
  tabPane?: ViewStyle;
}

export const MDTabPaneStyles: IMDTabPaneStyle = {
  wrapper: {
    position: 'relative',
    backgroundColor: base.colors.bgBase,
  },
  tabPane: {
    position: 'relative',
    width: '100%',
  },
};

const styles = StyleSheet.create<IMDTabPaneStyle>(MDTabPaneStyles);

export default class MDTabPane extends React.Component<IMDTabPaneProps> {
  public static defaultProps = {
    styles,
  };

  public render () {
    const sty = this.props.styles || {};
    const { name, curName, children } = this.props;
    return (
      <View style={sty.wrapper}>
        {curName === name ? <View style={sty.tabPane}>{children}</View> : null}
      </View>
    );
  }
}
