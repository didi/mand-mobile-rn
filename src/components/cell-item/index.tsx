import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { cellItem } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDIcon from '../icon';

export interface IMDCellItemProps {
  styles?: IMDCellItemStyle;
  title?: string;
  brief?: string;
  addon?: string;
  arrow?: boolean;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  below?: React.ReactNode;
  onPress?: () => void;
}

export interface IMDCellItemStyle {
  wrapper?: ViewStyle;
  body?: ViewStyle;
  multilines?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  left?: ViewStyle;
  right?: ViewStyle;
  arrowRight?: TextStyle;
  addon?: TextStyle;
  below?: ViewStyle;
}

export const MDCellItemStyles: IMDCellItemStyle = {
  wrapper: {
    width: '100%',
  },
  body: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: base.borderWidth.base,
    borderStyle: 'solid',
    borderBottomColor: cellItem.borderColor,
    paddingVertical: cellItem.paddingVertical,
  },
  multilines: {
    paddingVertical: cellItem.multilinesPaddingVertical,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
  },
  title: {
    color: cellItem.titleColor,
    fontSize: cellItem.titleFontSize,
    lineHeight: cellItem.titleFontSize * 1.2,
  },
  brief: {
    color: cellItem.briefColor,
    fontSize: cellItem.briefFontSize,
    marginTop: base.gapSize.hXSmall,
    lineHeight: cellItem.briefFontSize * 1.4,
  },
  left: {
    flexShrink: 0,
    marginRight: base.gapSize.hLarge,
  },
  right: {
    flexShrink: 0,
    marginLeft: base.gapSize.hSmall,
    flexDirection: 'row',
  },
  arrowRight: {
    marginLeft: innerScaleSize(6),
    marginRight: innerScaleSize(-6),
    color: base.colors.textPlaceholder,
  },
  addon: {
    color: cellItem.rightColor,
    fontSize: cellItem.rightFontSize,
  },
  below: {
    paddingVertical: cellItem.paddingVertical,
  },
};

const defaultStyles = StyleSheet.create<IMDCellItemStyle>(MDCellItemStyles);

export default class MDCellItem extends React.Component<IMDCellItemProps> {
  public static defaultProps = {
    styles: defaultStyles,
  };

  constructor (props: IMDCellItemProps) {
    super(props);
    this.state = {
      text: 'MDCellItem',
    };
  }

  public render () {
    const {
      title,
      brief,
      addon,
      arrow,
      disabled,
      left,
      right,
      below,
      onPress,
      children,
    } = this.props;

    const _styles = this.props.styles || {};

    const _title = this.renderTitle(_styles, title, brief, children, disabled);
    const _right = this.renderRight(_styles, arrow, addon, right, disabled);
    const _left = this.renderSolt(left, _styles.left);
    const _below = this.renderSolt(below, _styles.below);
    const _onPress = !disabled ? onPress : () => {};

    const _bodyStyle = [_styles.body];
    if (brief) {
      _bodyStyle.push(_styles.multilines);
    }

    return (
      <TouchableWithoutFeedback onPress={_onPress}>
        <View style={_styles.wrapper}>
          <View style={_bodyStyle}>
            {_left}
            {_title}
            {_right}
          </View>
          {_below}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private renderTitle (
    styles: IMDCellItemStyle,
    title?: string,
    brief?: string,
    children?: React.ReactNode,
    disabled?: boolean
  ) {
    if (title || brief || children) {
      const _titleStyle = [styles.title];
      const _briefStyle = [styles.brief];
      if (disabled) {
        _titleStyle.push({ color: base.colors.textDisabled });
        _briefStyle.push({ color: base.colors.textDisabled });
      }

      return (
        <View style={styles.content}>
          {title ? <Text style={_titleStyle}>{title}</Text> : null}
          {brief ? <Text style={_briefStyle}>{brief}</Text> : null}
          {children}
        </View>
      );
    }
    return null;
  }

  private renderRight (
    styles: IMDCellItemStyle,
    arrow?: boolean,
    addon?: string,
    right?: React.ReactNode,
    disabled?: boolean
  ) {
    if (arrow || addon || right) {
      const _addonStyle = [styles.addon];
      if (disabled) {
        _addonStyle.push({ color: base.colors.textDisabled });
      }

      const _addon =
        addon && !right ? <Text style={_addonStyle}>{addon}</Text> : null;

      const _arrow = arrow ? (
        <MDIcon style={styles.arrowRight} name='arrow-right' size={16} />
      ) : null;

      return (
        <View style={styles.right}>
          {right}
          {_addon}
          {_arrow}
        </View>
      );
    }
    return null;
  }

  private renderSolt (solt: React.ReactNode, style: any) {
    return solt ? <View style={style}>{solt}</View> : null;
  }
}
