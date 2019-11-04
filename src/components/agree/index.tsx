import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { agree } from '../../_styles/themes/default.components';
import MDIcon, { MDIconSize } from '../icon';

export interface IMDAgreeProps {
  styles?: IMDAgreeStyle;
  content: React.ReactNode;
  disabled?: boolean;
  checked?: boolean;
  size?: number | MDIconSize;
  onChange?: (param: boolean) => void;
}

export interface IMDAgreeState {
  checked?: boolean;
}

export interface IMDAgreeStyle {
  wrapper?: ViewStyle;
  content?: TextStyle | ViewStyle;
  disable?: ViewStyle;
}

export const MDAgreeStyles: IMDAgreeStyle = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
  },
  content: {
    color: '#838794',
    textAlign: 'left',
    marginLeft: 10,
    flex: 1,
  },
  disable: {
    opacity: agree.disabledOpacity,
  },
};

const styles = StyleSheet.create<IMDAgreeStyle>(MDAgreeStyles);

export default class MDAgree extends React.Component<
  IMDAgreeProps,
  IMDAgreeState
> {
  public static defaultProps = {
    styles,
    content: '',
    disabled: false,
    checked: false,
    size: 'medium',
  };

  constructor (props: IMDAgreeProps) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  public render () {
    const _styles = this.props.styles || {};
    const { content, disabled, size } = this.props;
    const wrapperStyle: any = [styles.wrapper];
    const contentStyle: any = [styles.content];
    const iconColor = agree.fill;

    if (disabled) {
      wrapperStyle.push(_styles.disable || styles.disable);
    }

    const wrapperFlattenStyle: ViewStyle = StyleSheet.flatten([
      wrapperStyle,
      _styles.wrapper,
    ]);
    const contentFlattenStyle: ViewStyle = StyleSheet.flatten([
      contentStyle,
      _styles.content,
    ]);

    const iconName = this.state.checked ? 'checked' : 'check';
    const _icon = this.renderIcon(iconName, size, iconColor, disabled);
    const _content = this.renderContent(content, contentFlattenStyle);

    return (
      <View style={wrapperFlattenStyle}>
        {_icon}
        {_content}
      </View>
    );
  }

  private renderIcon (
    iconName: string,
    iconSize?: number | MDIconSize,
    iconColor?: string,
    disable?: boolean
  ) {
    return (
      <TouchableOpacity
        onPress={this.checkAction.bind(this)}
        disabled={disable}
      >
        <MDIcon name={iconName} color={iconColor} size={iconSize} />
      </TouchableOpacity>
    );
  }

  private renderContent (content: React.ReactNode, contentStyle: TextStyle) {
    if (typeof content === 'string') {
      return <Text style={contentStyle}>{content}</Text>;
    }
    delete contentStyle.color;
    delete contentStyle.textAlign;
    return <View style={contentStyle}>{content}</View>;
  }

  private checkAction () {
    const { onChange } = this.props;
    const { checked } = this.state;

    this.setState({
      checked: !checked,
    });
    onChange && onChange(!checked);
  }
}
