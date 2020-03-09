import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { actionBar } from '../../_styles/themes/default.components';
import MDButton from '../button';

export interface IMDActonSet {
  text?: string;
  disabled?: boolean;
  onPress?: (index?: number) => void;
}

export interface IMDActionBarProps {
  styles?: IMDActionBarStyle;
  actions: IMDActonSet[];
}

export interface IMDActionBarState {
  actions: IMDActonSet[];
}

export interface IMDActionBarStyle {
  wrapper?: ViewStyle;
  text?: ViewStyle;
  group?: ViewStyle;
  button?: ViewStyle;
  buttonGap?: ViewStyle;
}

export const MDActionBarStyles: IMDActionBarStyle = {
  wrapper: {
    width: actionBar.width,
    zIndex: actionBar.zIndex,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: actionBar.paddingVertical,
    paddingHorizontal: actionBar.paddingHorizontal,
    backgroundColor: '#ffffff',
  },
  text: {
    flex: 1,
    height: actionBar.slotHeight,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  group: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },
  buttonGap: {
    flex: 1,
    marginLeft: actionBar.buttonGap,
  },
};

const styles = StyleSheet.create<IMDActionBarStyle>(MDActionBarStyles);

export default class MDActionBar extends React.Component<
  IMDActionBarProps,
  IMDActionBarState
> {
  public static defaultProps = {
    styles,
  };

  constructor (props: IMDActionBarProps) {
    super(props);
    this.state = {
      actions: props.actions ? props.actions.slice(0, 2) : [],
    };
  }

  public render () {
    const _styles = this.props.styles || {};
    const actions: IMDActonSet[] = this.state.actions;
    const slot = this.props.children ? (
      <View style={_styles.text}>{this.props.children}</View>
    ) : null;
    const buttons = actions.map((action, index) => (
      <MDButton
        key={'MDActionBar-MDButton-' + index}
        style={index % 2 === 0 ? _styles.button : _styles.buttonGap}
        children={action.text ? action.text : ''}
        type={action.disabled ? 'disabled' : 'primary'}
        plain={index !== actions.length - 1}
        onPress={() => {
          if (!action.disabled && action.onPress) {
            action.onPress(index);
          }
        }}
      />
    ));
    return (
      <View style={_styles.wrapper}>
        {slot}
        <View style={_styles.group}>{buttons}</View>
      </View>
    );
  }
}
