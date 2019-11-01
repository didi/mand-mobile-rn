import * as React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { detailItem } from '../../_styles/themes/default.components';

export interface IMDDetailItemProps {
  styles?: IMDDetailItemStyle;
  title?: string;
  content?: string;
  bold?: boolean;
}

export interface IMDDetailItemStyle {
  wrapper?: ViewStyle;
  title?: TextStyle;
  content?: TextStyle;
  bold?: TextStyle;
}

export const MDDetailItemStyles: IMDDetailItemStyle = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: detailItem.gap,
    paddingBottom: detailItem.gap,
  },
  title: {
    flexShrink: 0,
    alignItems: 'center',
    color: detailItem.titleColor,
    fontSize: detailItem.fontSize,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    marginLeft: detailItem.gap,
    justifyContent: 'flex-end',
    color: detailItem.contentColor,
    fontSize: detailItem.fontSize,
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
    color: detailItem.contentColor,
  },
};

const styles = StyleSheet.create<IMDDetailItemStyle>(MDDetailItemStyles);

export default class MDDetailItem extends React.Component<IMDDetailItemProps> {
  public static defaultProps = {
    styles,
    bold: false,
  };

  constructor (props: IMDDetailItemProps) {
    super(props);
  }

  public render () {
    const _styles = this.props.styles || {};
    const { title, content, bold, children } = this.props;
    const contentView = content ? (
      <Text style={[_styles.content, bold ? _styles.bold : {}]}>{content}</Text>
    ) : null;
    return (
      <View style={_styles.wrapper}>
        <Text style={[_styles.title, bold ? _styles.bold : {}]}>{title}</Text>
        {contentView}
        {children}
      </View>
    );
  }
}
