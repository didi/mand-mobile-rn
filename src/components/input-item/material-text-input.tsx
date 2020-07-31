import * as React from 'react';
import {
  Platform,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { inputItem } from '../../_styles/themes/default.components';
import MDTextInput, { IMDtextInputProps } from '../text-input';
import MDInputLabel, {
  IMDInputLabelStyles,
  MDInputLabelStyles,
} from './input-label';

interface IMDMaterialTextInputProps extends IMDtextInputProps {
  styles?: IMDMaterialTextInputStyles;
  duration?: number;
  textFocusColor?: string;
  textBlurColor?: string;
  highlightColor?: string;
  height?: number;
}

interface IMDMaterialTextInputStyles extends IMDInputLabelStyles {
  wrapper: ViewStyle;
  input: TextStyle;
}

interface IMDMaterialTextInputState {
  focused: boolean;
  height?: number;
}

export const MDMaterialTextInputStyles: IMDMaterialTextInputStyles = {
  wrapper: {
    width: '100%',
    height: 60,
    paddingTop: 28,
    paddingBottom: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    position: 'absolute',
    color: '#111a34',
    fontSize: inputItem.fontSize,
    fontWeight: inputItem.fontWeight as TextStyle['fontWeight'],
    ...Platform.select({
      android: {
        bottom: -5,
        left: -2,
      },
      ios: {
        bottom: 8,
      },
    }),
  },
  ...MDInputLabelStyles,
};

const styles = StyleSheet.create<IMDMaterialTextInputStyles>(
  MDMaterialTextInputStyles
);

export default class MDMaterialTextInput extends React.Component<
  IMDMaterialTextInputProps,
  IMDMaterialTextInputState
> {
  public static defaultProps = {
    styles,
    duration: 200,
    placeholderTextColor: inputItem.placeholder,
    value: '',
    dense: false,
    multiline: false,
    height: undefined,
  };

  constructor (props: IMDMaterialTextInputProps) {
    super(props);

    this.state = {
      focused: false,
      height: props.height,
    };
  }

  private inputLabel: MDInputLabel | null = null;
  private input: MDTextInput | null = null;

  public UNSAFE_componentWillReceiveProps (
    nextProps: IMDMaterialTextInputProps & TextInputProps
  ) {
    const { value, height } = this.props;
    const { value: nextValue, height: nextHeight } = nextProps;

    if (value !== nextValue || height !== nextHeight) {
      this.setState({
        height: nextHeight || 0,
      });
    }
  }

  public render () {
    const { styles: _styles, placeholder, ...newProps } = this.props;

    const {
      placeholderTextColor,
      highlightColor,
      duration,
      textFocusColor,
      textBlurColor,
    } = this.props;
    const { input, wrapper, ...label } = _styles!;
    const { focused, height } = this.state;
    const hasValue = !!(this.props.value && this.props.value.length > 0);

    const wrapperStyles = [wrapper, height ? { height: undefined } : {}];

    const labelProps = {
      styles: label,
      label: placeholder,
      labelColor: placeholderTextColor,
      duration,
      highlightColor,
      dense: true,
      hasValue,
      focused,
      focusHandler: () => {
        this.input && this.input.focus();
      },
    };

    const inputStyles = [
      input,
      focused && textFocusColor ? { color: textFocusColor } : {},
      !focused && textBlurColor ? { color: textBlurColor } : {},
    ];

    return (
      <View style={wrapperStyles}>
        <MDTextInput
          {...newProps}
          style={inputStyles}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          ref={(ref) => (this.input = ref)}
        />
        <MDInputLabel ref={(ref) => (this.inputLabel = ref)} {...labelProps} />
      </View>
    );
  }

  public focus () {
    this.input && this.input.focus();
  }

  public blur () {
    this.input && this.input.blur();
  }

  private handleFocus (e: any) {
    this.setState({ focused: true });

    const { onFocus } = this.props;
    onFocus && onFocus(e);
  }

  private handleBlur (e: any) {
    this.setState({ focused: false });

    const { onBlur } = this.props;
    onBlur && onBlur(e);
  }
}
