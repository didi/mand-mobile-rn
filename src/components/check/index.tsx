import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { check } from '../../_styles/themes/default.components';
import MDIcon from '../icon';

import { IMDOptionValue } from '../types';

export interface IMDCheckProps {
  styles?: IMDCheckStyle;
  label: string;
  disabled?: boolean;
  checked?: boolean;
  value?: IMDOptionValue;
  icon?: ReactNode;
  iconInverse?: ReactNode;
  iconDisabled?: ReactNode;
  onChange?: (checked: boolean, value?: IMDOptionValue) => void;
}

interface IMDCheckState {
  checked: boolean;
}

interface IMDCheckStyle {
  wrapper?: ViewStyle;
  label?: TextStyle;
}

export const MDCheckStyles: IMDCheckStyle = {
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

const styles = StyleSheet.create<IMDCheckStyle>(MDCheckStyles);

export default class MDCheck extends React.Component<
  IMDCheckProps,
  IMDCheckState
> {
  public static defaultProps = {
    styles,
    checked: false,
    disabled: false,
    icon: <MDIcon name='checked' color={check.color} size='medium' />,
    iconInverse: <MDIcon name='check' color={check.color} size='medium' />,
    iconDisabled: (
      <MDIcon name='check-disabled' color={check.disabledColor} size='medium' />
    ),
  };

  constructor (props: IMDCheckProps) {
    super(props);
    this.state = {
      checked: !!props.checked,
    };
  }

  public componentWillReceiveProps (nextProps: IMDCheckProps) {
    const { checked } = nextProps;
    if (checked !== this.props.checked || checked !== this.state.checked) {
      this.setState({
        checked: !!checked,
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
          color={!disabled ? check.color : check.disabledColor}
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

    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={_styles.wrapper}>
          {_icon}
          <Text style={_lableStyle}>{label}</Text>
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
