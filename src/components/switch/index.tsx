;
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import base from '../../_styles/themes/default.basic';
import { switchs as switchBase } from '../../_styles/themes/default.components';

export interface IMDSwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (param: boolean) => void;
  styles?: IMDSwitchStyle;
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
    top: '50%',
    marginTop: -switchBase.thumbHeight / 2,
    left: switchBase.thumbLeft,
    position: 'absolute',
  },
  active: {
    backgroundColor: base.colors.primary,
  },
  thumbActive: {
    left: switchBase.thumbX,
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
    styles,
    checked: false,
    disabled: false,
  };

  constructor (props: IMDSwitchProps) {
    super(props);
    const { checked } = props;
    this.state = {
      checked: checked ? !!checked : false,
    };
  }
  public componentWillReceiveProps (nextProps: IMDSwitchProps) {
    const { checked } = nextProps;
    if (
      checked !== this.props.checked ||
      checked !== this.state.checked
    ) {
      this.setState({
        checked: !!checked,
      });
    }
  }
  public render () {
    const { disabled, width, height } = this.props;
    const _styles = this.props.styles!;
    const container = [_styles.container];
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
    const thumb = [_styles.thumb];
    const { checked } = this.state;
    let styleLeft = switchBase.thumbLeft;
    if (checked) {
      container.push(_styles.active);
      styleLeft = switchBase.thumbX;
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
    if (checked && thumbWidth) {
      styleLeft = thumbWidth - switchBase.thumbLeft;
    }
    return (
      <TouchableWithoutFeedback onPress={this.onSwitchPressed.bind(this)}>
        <View style={container}>
          <Animatable.View
            transition='left'
            style={[thumb, { left: styleLeft }]}
          />
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
      checked: !checked,
    });
    onChange && onChange(!checked);
  }
}
