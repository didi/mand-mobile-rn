;
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { checkbox } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDIcon from '../icon';
import MDTag from '../tag';

import { IMDOptionValue } from '../types';

export interface IMDCheckBoxProps {
  styles?: IMDCheckBoxStyle;
  label: string;
  checked?: boolean;
  value?: IMDOptionValue;
  disabled?: boolean;
  onChange?: (checked: boolean, value?: IMDOptionValue) => void;
}

export interface IMDCheckBoxState {
  checked: boolean;
}

export interface IMDCheckBoxStyle {
  wrapper?: ViewStyle;
  tag?: ViewStyle;
  label?: TextStyle;
}

export const MDCheckBoxStyles: IMDCheckBoxStyle = {
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
    borderWidth: innerScaleSize(1),
    borderStyle: 'solid',
    borderColor: checkbox.borderColor,
    borderRadius: checkbox.borderRadius,
    overflow: 'hidden',
    paddingVertical: base.gapSize.vSmall,
    paddingHorizontal: base.gapSize.hMid,
  },
  tag: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  label: {
    color: checkbox.color,
    fontSize: checkbox.fontSize,
  },
};

const styles = StyleSheet.create<IMDCheckBoxStyle>(MDCheckBoxStyles);

export default class MDCheckBox extends React.Component<
  IMDCheckBoxProps,
  IMDCheckBoxState
> {
  public static defaultProps = {
    styles,
    checked: false,
    disabled: false,
  };

  constructor (props: IMDCheckBoxProps) {
    super(props);
    this.state = {
      checked: !!props.checked,
    };
  }

  public componentWillReceiveProps (nextProps: IMDCheckBoxProps) {
    const { checked } = nextProps;
    if (checked !== this.props.checked || checked !== this.state.checked) {
      this.setState({
        checked: !!checked,
      });
    }
  }

  public render () {
    const { label, disabled, children } = this.props;
    const { checked } = this.state;

    const _styles = this.props.styles!;

    const _wrapperStyle = [_styles.wrapper];
    const _labelStyle = [_styles.label];

    if (checked) {
      _wrapperStyle.push({
        borderColor: checkbox.activeBorderColor,
      });

      _labelStyle.push({
        color: checkbox.activeColor,
      });
    }

    if (disabled) {
      _wrapperStyle.push({
        borderColor: checkbox.disabledColor,
      });

      _labelStyle.push({
        color: checkbox.disabledColor,
      });
    }

    const _label = children ? (
      children
    ) : (
      <Text style={_labelStyle}>{label}</Text>
    );
    const _tab = this.state.checked ? (
      <View style={_styles.tag}>
        <MDTag
          type='fill'
          size='small'
          shape='quarter'
          fillColor={base.colors.primary}
          textColor='#ffffff'
          fontWeight='normal'
        >
          <MDIcon name='right' color={'#ffffff'} size='small' />
        </MDTag>
      </View>
    ) : null;

    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={_wrapperStyle}>
          {_label}
          {_tab}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private onPress () {
    const { disabled, onChange, value } = this.props;
    if (disabled) {
      return;
    }

    const { checked } = this.state;

    this.setState(
      {
        checked: !checked,
      },
      () => {
        onChange && onChange(!checked, value);
      }
    );
  }
}
