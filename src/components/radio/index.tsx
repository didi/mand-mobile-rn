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
import { radio } from '../../_styles/themes/default.components';
import MDIcon from '../icon';

import { IMDOptionValue } from '../types';

export interface IMDRadioProps {
  styles?: IMDRadioStyle;
  label: string | React.ReactNode;
  selected?: IMDOptionValue;
  value?: IMDOptionValue;
  disabled?: boolean;
  onChange?: (checked: boolean, value?: IMDOptionValue) => void;

  icon?: React.ReactNode;
  iconInverse?: React.ReactNode;
  iconDisabled?: React.ReactNode;
}

interface IMDRadioState {
  checked: boolean;
}

interface IMDRadioStyle {
  wrapper?: ViewStyle;
  icon?: TextStyle;
  label?: TextStyle | ViewStyle;
}

export const MDRadioStyles: IMDRadioStyle = {
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: base.gapSize.vSmall,
  },
  label: {
    color: base.colors.textBase,
    marginLeft: base.gapSize.hSmall,
    fontSize: base.fontSize.bodyLarge,
  },
};

const styles = StyleSheet.create<IMDRadioStyle>(MDRadioStyles);

export default class MDRadio extends React.Component<
  IMDRadioProps,
  IMDRadioState
> {
  public static defaultProps = {
    styles,
    disabled: false,
    icon: <MDIcon name='checked' color={radio.color} size='medium' />,
    iconInverse: <MDIcon name='check' color={radio.color} size='medium' />,
    iconDisabled: (
      <MDIcon name='check-disabled' color={radio.disabledColor} size='medium' />
    ),
  };

  constructor (props: IMDRadioProps) {
    super(props);
    this.state = {
      checked: props.selected === props.value,
    };
  }

  public UNSAFE_componentWillReceiveProps (nextProps: IMDRadioProps) {
    const { selected, value } = nextProps;
    if (selected !== this.props.selected) {
      this.setState({
        checked: selected === value,
      });
    }
  }

  public render () {
    const { label, disabled, icon, iconInverse, iconDisabled } = this.props;
    const _styles = this.props.styles || {};

    let _icon = disabled
      ? iconDisabled
      : this.state.checked
      ? icon
      : iconInverse;

    if (typeof _icon === 'string') {
      _icon = (
        <MDIcon
          name={_icon}
          color={!disabled ? radio.color : radio.disabledColor}
          size='medium'
        />
      );
    }

    const _lableStyle = [_styles.label];
    if (disabled) {
      _lableStyle.push({
        color: base.colors.textDisabled,
      });
    }

    const _lable =
      typeof label === 'string' ? (
        <Text style={_lableStyle}>{label}</Text>
      ) : (
        <View style={_lableStyle}>{label}</View>
      );

    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={_styles.wrapper}>
          {_icon}
          {_lable}
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
    if (checked) {
      return;
    }

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
