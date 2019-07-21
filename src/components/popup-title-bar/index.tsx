import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { popup } from '../../_styles/themes/default.components';

export interface IMDPopupTitleBarProps {
  styles?: IMDPopupTitleBarStyle;
  title?: string | ReactNode;
  describe?: string;
  okText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface IMDPopupTitleBarStyle {
  wrapper?: ViewStyle;
  titleWrapper?: ViewStyle;
  title?: TextStyle | ViewStyle;
  describe?: TextStyle | ViewStyle;
  left?: TextStyle;
  right?: TextStyle;
  leftWrapper?: TextStyle | ViewStyle;
  rightWrapper?: TextStyle | ViewStyle;
}

export const MDPopupTitleBarStyles: IMDPopupTitleBarStyle = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: popup.titleBarHeight,
    backgroundColor: popup.titleBarBg,
    overflow: 'hidden',
    borderTopLeftRadius: popup.titleBarRadius,
    borderTopRightRadius: popup.titleBarRadius,
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: popup.titleBarFontSizeTitle,
    color: popup.titleBarColorTitle,
  },
  describe: {
    width: '100%',
    textAlign: 'center',
    fontSize: popup.titleBarFontSizeDescribe,
    color: popup.titleBarColorDescribe,
  },
  left: {
    flex: 1,
    fontSize: popup.titleBarFontSizeButton,
    fontWeight: popup.titleBarFontWeightButton as TextStyle['fontWeight'],
    color: popup.titleBarColorButtonLeft,
  },
  right: {
    flex: 1,
    fontSize: popup.titleBarFontSizeButton,
    fontWeight: popup.titleBarFontWeightButton as TextStyle['fontWeight'],
    color: popup.titleBarColorButtonRight,
  },
  leftWrapper: {
    position: 'absolute',
    left: 0,
    width: '20%',
    maxHeight: popup.titleBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightWrapper: {
    position: 'absolute',
    right: 0,
    width: '20%',
    maxHeight: popup.titleBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create<IMDPopupTitleBarStyle>(MDPopupTitleBarStyles);

export default class MDPopupTitleBar extends React.Component<
  IMDPopupTitleBarProps
> {
  public static defaultProps = {
    styles,
  };

  public render () {
    const {
      cancelText,
      okText,
      onCancel,
      onConfirm,
      title,
      describe,
    } = this.props;
    const _styles = this.props.styles || {};

    const _cancel = this.renderCancelButton(cancelText, _styles, onCancel);
    const _title = this.renderTitle(title, describe, _styles);
    const _ok = this.renderOkButton(okText, _styles, onConfirm);

    const wrapper = [_styles.wrapper];
    if (this.props.describe) {
      wrapper.push({
        height: popup.titleBarHeightLarge,
      });
    }

    return (
      <View style={wrapper}>
        {_title}
        {_cancel}
        {_ok}
      </View>
    );
  }

  private renderTitle (
    title: string | ReactNode,
    describe: string | ReactNode,
    _styles: IMDPopupTitleBarStyle
  ) {
    if (!title) {
      return null;
    }
    const _desc = describe ? (
      <Text style={_styles.describe}>{describe}</Text>
    ) : null;

    if (typeof title === 'string') {
      return (
        <View style={_styles.titleWrapper}>
          <Text style={_styles.title}>{title}</Text>
          {_desc}
        </View>
      );
    }

    return <View style={_styles.titleWrapper}>{title}</View>;
  }

  private renderCancelButton (
    cancel: string | ReactNode,
    _styles: IMDPopupTitleBarStyle,
    onPress?: () => void
  ) {
    return this.renderButton(cancel, 'left', _styles, onPress);
  }

  private renderOkButton (
    ok: string | ReactNode,
    _styles: IMDPopupTitleBarStyle,
    onPress?: () => void
  ) {
    return this.renderButton(ok, 'right', _styles, onPress);
  }

  private renderButton (
    button: string | ReactNode,
    position: 'left' | 'right',
    _styles: IMDPopupTitleBarStyle,
    onPress?: () => void
  ) {
    if (!button) {
      return null;
    }

    const _wrapper =
      position === 'left' ? _styles.leftWrapper : _styles.rightWrapper;
    const _text = position === 'left' ? _styles.left : _styles.right;
    const _button =
      typeof button === 'string' ? <Text style={_text}>{button}</Text> : button;

    return (
      <View style={_wrapper}>
        <TouchableWithoutFeedback onPress={onPress}>
          {_button}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
