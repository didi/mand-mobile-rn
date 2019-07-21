import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { switchs as switchBase } from '../../_styles/themes/default.components';

export interface IMDSwitchProps {
  styles?: IMDSwitchStyle;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (param: boolean) => void;
  width?: number;
  height?: number;
}

export interface IMDSwitchState {
  checked: boolean;
}

interface IMDSwitchStyle {
  container?: ViewStyle;
  thumb?: ViewStyle;
  active?: ViewStyle;
  thumbActive?: ViewStyle;
  disabled?: ViewStyle;
}

export const MDSwitchStyles: IMDSwitchStyle = {
  container: {
    position: 'relative',
    width: switchBase.width,
    height: switchBase.height,
    borderRadius: switchBase.height,
    backgroundColor: base.colors.borderBase,
  },
  thumb: {
    backgroundColor: base.colors.bg,
    borderRadius: switchBase.thumbRadius,
    height: switchBase.thumbHeight,
    width: switchBase.thumbWidth,
    left: switchBase.thumbLeft,
    position: 'absolute',
    top: '50%',
    marginTop: -switchBase.thumbHeight / 2,
  },
  active: {
    backgroundColor: base.colors.primary,
  },
  thumbActive: {
    right: switchBase.thumbLeft,
    left: 'auto',
  },
  disabled: {
    opacity: base.opacity.disabled,
  },
};

const styles = StyleSheet.create<IMDSwitchStyle>(MDSwitchStyles);

export default class MDSwitch extends React.Component<
  IMDSwitchProps,
  IMDSwitchState
> {
  public static defaultProps = {
    checked: false,
    disabled: false,
    styles,
  };

  constructor (props: IMDSwitchProps) {
    super(props);
    this.onSwitchPressed = this.onSwitchPressed.bind(this);
    const { checked } = props;
    this.state = {
      checked: !!checked
    };
  }
  public componentWillReceiveProps (nextProps: IMDSwitchProps) {
    const { checked } = nextProps;
    if (
      checked !== this.props.checked ||
      checked !== this.state.checked
    ) {
      this.setState({
        checked: !!checked
      });
    }
  }
  public render () {
    const {
      width,
      height,
      disabled
    } = this.props;
    const { checked } = this.state;
    const _styles = this.props.styles!;
    const container = [_styles.container];
    const thumb = [_styles.thumb];
    if (width) {
      container.push({
        width,
      });
    }
    if (height) {
      container.push({
        height,
      });
    }
    if (checked) {
      container.push(_styles.active);
      thumb.push(_styles.thumbActive);
    }
    if (disabled) {
      container.push(_styles.disabled);
    }
    let thumbWidth;
    if (width) {
      thumbWidth = width / 2;
    }
    if (thumbWidth) {
      thumb.push({
        width: thumbWidth,
        height: thumbWidth,
        borderRadius: thumbWidth / 2,
        marginTop: -thumbWidth / 2,
      });
    }
    return (
      <TouchableWithoutFeedback onPress={this.onSwitchPressed}>
        <View style={container}>
          <View style={thumb} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  private onSwitchPressed () {
    const { onChange, disabled } = this.props;
    if (disabled) {
      return false;
    }
    const { checked } = this.state;
    this.setState({
      checked: !checked
    }, () => {
      onChange && onChange(!checked);
    });
  }
}
