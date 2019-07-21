import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import MDWaterMark from '../water-mark';

import { bill, fieldItem } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

export interface IMDBillProps {
  styles?: IMDBillStyle;
  title?: string; // 票据抬头
  no?: string; // 票据编号
  header?: ReactNode; // 头部内容插槽
  footer?: ReactNode; // 底部内容插槽
  waterMark?: string; // 水印内容
}

export interface IMDBillStyle {
  wrapper?: ViewStyle;
  bill?: ViewStyle;
  billHeader?: ViewStyle;
  billTitle?: TextStyle;
  billNo?: TextStyle;
  billNeck?: ViewStyle;
  neckSpan?: ViewStyle;
  billContent?: ViewStyle;
  billDetail?: ViewStyle;
}

export const MDBillStyles: IMDBillStyle = {
  wrapper: {
    position: 'relative',
    backgroundColor: bill.bg,
  },

  bill: {
    position: 'relative',
  },

  billHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: bill.paddingTop,
    paddingLeft: bill.paddingLeft,
    paddingRight: bill.paddingLeft,
    paddingBottom: bill.paddingBottom,
  },

  billTitle: {
    color: bill.nameColor,
    fontSize: bill.nameFontSize,
    fontWeight: base.fontWeight.medium as TextStyle['fontWeight'],
    // fontFamily: base.fontFamily.normal
  },

  billNo: {
    color: bill.noColor,
    fontSize: bill.noFontSize,
  },

  billNeck: {
    position: 'relative',
    height: bill.height,
    padding: bill.neckPadding,
    marginTop: bill.height,
    marginRight: bill.paddingTop,
    marginLeft: bill.paddingTop,
    borderTopColor: fieldItem.borderColor,
    borderTopWidth: 1,
  },

  billContent: {
    paddingRight: bill.paddingLeft,
    paddingLeft: bill.paddingLeft,
    paddingBottom: bill.conBottom,
  },

  billDetail: {
    paddingBottom: bill.detailBottom,
  },
};

const styles = StyleSheet.create<IMDBillStyle>(MDBillStyles);

export default class MDBill extends React.Component<IMDBillProps> {
  public static defaultProps = {
    styles,
  };

  public render () {
    const styl = this.props.styles || {};
    const { title, header, footer, waterMark, no, children } = this.props;
    const _title = this.renderTitle(styl, title, header, no);

    return (
      <View style={styl.wrapper}>
        <MDWaterMark content={waterMark}>
          {_title}
          {/* 下划线 */}
          <View style={styl.billNeck} />
          <View style={styl.billContent}>
            <View style={styl.billDetail}>{children}</View>
            {footer}
          </View>
        </MDWaterMark>
      </View>
    );
  }

  private renderTitle (
    styl: IMDBillStyle,
    title?: string,
    header?: ReactNode,
    no?: string
  ) {
    if (header) {
      return header;
    }
    const _number = !!no ? <Text style={styl.billNo}>NO.{no}</Text> : null;
    const _title = !!title ? <Text style={styl.billTitle}>{title}</Text> : null;

    return no || title ? (
      <View style={styl.billHeader}>
        {_number}
        {_title}
      </View>
    ) : null;
  }
}
