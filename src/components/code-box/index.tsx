;
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { codebox } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDTextInput from '../text-input';

export interface IMDCodeBoxProps {
  styles?: IMDCodeBoxStyle;
  defaultValue?: string;
  value?: string;
  maxlength?: number;
  okText?: string;
  autofocus?: boolean;
  security?: boolean;
  disabled?: boolean;
  shuffle?: boolean;
  system?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
}

export interface IMDCodeBoxState {
  value: string;
  index: number;
  focused: boolean;
  opacity: Animated.Value;
}

export interface IMDCodeBoxStyle {
  wrapper?: ViewStyle;
  input?: TextStyle;
  fakeInput?: TextStyle;
  fakeText?: TextStyle;
  cursor?: ViewStyle;
}

export const MDCodeBoxStyles: IMDCodeBoxStyle = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    color: codebox.color,
    width: '100%',
    height: codebox.height,
    borderBottomColor: codebox.borderColor,
    borderBottomWidth: codebox.borderWidth,
    textAlign: 'center',
    marginHorizontal: codebox.holderSpace,
  },
  fakeText: {
    color: codebox.color,
    width: '100%',
    height: '100%',
    lineHeight: codebox.height,
    textAlign: 'center',
  },
  fakeInput: {
    width: codebox.width,
    height: codebox.height,
    borderBottomColor: codebox.borderColor,
    borderBottomWidth: codebox.borderWidth,
    marginHorizontal: codebox.holderSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cursor: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: 2,
    height: '60%',
    backgroundColor: '#416FEA',
    opacity: 0,
    borderRadius: 1,
  },
};

const styles = StyleSheet.create<IMDCodeBoxStyle>(MDCodeBoxStyles);

export default class MDCodeBox extends React.Component<
  IMDCodeBoxProps,
  IMDCodeBoxState
> {
  public static defaultProps = {
    styles,
    value: '',
    defaultValue: '',
    maxlength: 4,
    okText: '确定',
    autofocus: false,
    security: false,
    disabled: false,
    shuffle: false,
    system: false,
  };

  constructor (props: IMDCodeBoxProps) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      index: 0,
      focused: false,
      opacity: new Animated.Value(0),
    };
  }

  private animation?: Animated.CompositeAnimation;

  public render () {
    const {
      styles: _styles,
      maxlength,
      security,
      system,
      shuffle,
      okText,
      autofocus,
      disabled,
    } = this.props;
    const { value, index, focused } = this.state;
    const inputs = this.renderInputView(
      maxlength!,
      value,
      focused,
      index,
      security!
    );

    return (
      <View style={_styles!.wrapper}>
        {inputs}
        <MDTextInput
          autoFocus={autofocus}
          editable={!disabled}
          caretHidden={maxlength !== -1}
          style={
            maxlength === -1
              ? [_styles!.input, this.inputStyle(0, focused, true, -1), { opacity: 1 }]
              : {
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: codebox.height,
                }
          }
          value={value}
          shuffle={shuffle}
          okText={okText}
          maxLength={maxlength}
          secureTextEntry={security}
          underlineColorAndroid='transparent'
          type={system ? 'system' : 'simple'}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onChangeText={this.handleChangeText.bind(this)}
        />
      </View>
    );
  }

  private renderInputView (
    length: number,
    value: string,
    focused: boolean,
    index: number,
    security: boolean
  ) {
    if (length === -1) {
      return null;
    }

    const _styles = this.props.styles;
    const inputs = [];

    for (let i = 0; i < length!; i++) {
      const text = value!.length > i ? value![i] : '';

      // 有文字没焦点或者当前焦点之前的输入框
      const highlight = (!!text && !focused) || (i <= index && focused);
      const inputStyle = this.inputStyle(i, highlight, false, length);
      const showCursor = focused && i === index;
      const showSecurityDot = security && text.length > 0;

      const input = (
        <View style={[_styles!.fakeInput, inputStyle]} key={i}>
          {showSecurityDot ? (
            <View
              style={{
                backgroundColor: codebox.color,
                borderRadius: innerScaleSize(6),
                width: innerScaleSize(12),
                height: innerScaleSize(12),
              }}
            />
          ) : (
            <Text style={styles!.fakeText}>{text}</Text>
          )}
          {showCursor ? this.renderCursor() : null}
        </View>
      );
      inputs.push(input);
    }
    return inputs;
  }

  private renderCursor () {
    return (
      <Animated.View
        style={[
          this.props.styles!.cursor,
          {
            opacity: this.state.opacity,
          },
        ]}
      />
    );
  }

  private inputStyle (i = 0, highlight = false, noLimited = true, length = -1) {
    const leftMarginStyle = {
      marginHorizontal: undefined,
      marginRight: codebox.holderSpace / 2,
    };
    const rightMarginStyle = {
      marginHorizontal: undefined,
      marginLeft: codebox.holderSpace / 2,
    };
    const inputStyle: ViewStyle[] = [];
    if (highlight) {
      inputStyle.push({ borderBottomColor: codebox.borderActiveColor });
    }

    if (i === 0) {
      inputStyle.push(leftMarginStyle);
    }

    if (i === length - 1) {
      inputStyle.push(rightMarginStyle);
    }

    if (noLimited) {
      inputStyle.push({ width: '100%' });
    }

    return inputStyle;
  }

  private handleChangeText (text: string) {
    const { onChangeText, maxlength } = this.props;
    const index = text.length;
    // 输满的时候会导致动画停止，故删除时重新启动动画
    if (maxlength && maxlength !== -1 && index === maxlength - 1 && this.animation) {
      this.animation.start();
    }
    this.setState({ value: text, index });
    onChangeText && onChangeText(text);
  }

  private handleFocus (e: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.setState({ focused: true });
    this.cursorBlink();

    const { onFocus } = this.props;
    onFocus && onFocus(e);
  }

  private handleBlur (e: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.stopBlink();
    this.setState({ focused: false });
    const { onBlur } = this.props;
    onBlur && onBlur(e);
  }

  private cursorBlink () {
    if (this.props.maxlength === -1) {
      return;
    }
    this.animation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.step1,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.step1,
          useNativeDriver: true,
        }),
      ])
    );
    this.animation.start();
  }

  private stopBlink () {
    if (this.props.maxlength === -1) {
      return;
    }
    this.animation!.stop();
  }
}
