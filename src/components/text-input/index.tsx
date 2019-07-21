import React from 'react';
import {
  findNodeHandle,
  KeyboardTypeOptions,
  NativeModules,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { inputItem } from '../../_styles/themes/default.components';
import MDIcon from '../icon/index';

const { MDNumberKeyboard } = NativeModules;

export type MDTextInputKeyboardType = 'professional' | 'simple' | 'system';

export type MDTextInputRenderKeys =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '.';

const defaultValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

export interface IMDtextInputProps extends TextInputProps {
  shuffle?: boolean;
  okText?: string;
  type?: MDTextInputKeyboardType;
  hideDot?: boolean;
  textRender?: (value: MDTextInputRenderKeys) => string | undefined;
}

export interface IMDTextInputState {
  isEditing: boolean;
  value?: string;
}

export default class MDTextInput extends React.Component<
  IMDtextInputProps,
  IMDTextInputState
> {
  public static defaultProps = {
    shuffle: false,
    okText: '确认',
    type: 'professional',
    hideDot: false,
    textRender: (value: MDTextInputRenderKeys) => {
      return value;
    },
  };

  public input: TextInput | null = null;

  constructor (props: IMDtextInputProps) {
    super(props);
    this.state = {
      isEditing: false,
      value: props.defaultValue || '',
    };
  }

  public componentDidMount () {
    if (Platform.OS === 'web') {
      return;
    }
    const { shuffle, okText, type, textRender, hideDot } = this.props;

    if (type === 'professional') {
      setTimeout(() => {
        const rootTag = findNodeHandle(this.input);
        const renderValues = this.renderTexts();
        if (rootTag && MDNumberKeyboard.setup) {
          MDNumberKeyboard.setup(
            rootTag,
            type,
            shuffle,
            okText,
            hideDot,
            renderValues
          );
        }
      }, 300);
    }
  }

  public componentWillUnmount () {
    if (Platform.OS === 'web') {
      return;
    }
    if (MDNumberKeyboard && MDNumberKeyboard.remove) {
      MDNumberKeyboard.remove();
    }
  }

  public componentWillReceiveProps (nextProps: IMDtextInputProps) {
    const { value } = nextProps;
    if (nextProps && value) {
      this.setState({ value });
    }
  }

  /**
   * focus 获取焦点
   */
  public focus () {
    this.input && this.input.focus();
  }

  /**
   * blur 失去焦点
   */
  public blur () {
    this.input && this.input.blur();
  }

  public render () {
    const {
      type,
      keyboardType,
      okText,
      textRender,
      shuffle,
      hideDot,
      ...props
    } = this.props;
    const _keyboardType = this.keyboardTypeByType(type) || keyboardType;

    if (Platform.OS === 'android') {
      return this.renderAndroid(props, _keyboardType);
    } else {
      return this.renderIos(props, _keyboardType);
    }
  }

  private renderTexts () {
    const values: string[] = [];
    for (const value of defaultValues) {
      const renderValue = this.props.textRender!(value as MDTextInputRenderKeys);
      if (renderValue) {
        values.push(renderValue);
      } else {
        values.push(value);
      }
    }
    return values.join(',');
  }

  private keyboardTypeByType (type?: MDTextInputKeyboardType) {
    if (type === 'professional') {
      return 'default';
    }
    if (type === 'simple') {
      return 'numeric';
    }
    return undefined;
  }

  private renderIos (
    inputProps: TextInputProps,
    keyboardType?: KeyboardTypeOptions
  ) {
    return (
      <TextInput
        {...inputProps}
        keyboardType={keyboardType}
        ref={(ref) => {
          this.input = ref;
        }}
      />
    );
  }

  private renderInput (
    inputProps: TextInputProps,
    keyboardType?: KeyboardTypeOptions
  ) {
    const { onFocus, onBlur, onChangeText, maxLength, style, ...otherProps } = inputProps;
    // @ts-ignore
    const { borderColor, borderWidth, ...otherStyles } = style;
    const { value } = this.state;
    return (
      <TextInput
        {...otherProps}
        style={Platform.OS === 'ios' ? style : otherStyles}
        maxLength={maxLength && maxLength > 0 ? maxLength : undefined}
        keyboardType={keyboardType}
        value={value}
        onFocus={this.onFoucs.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onChangeText={this.onChangeText.bind(this)}
        ref={(ref) => {
          this.input = ref;
        }}
      />
    );
  }

  private renderAndroid (
    inputProps: TextInputProps,
    keyboardType?: KeyboardTypeOptions
  ) {
    return (
      <View
        style={[
          inputProps.style,
          { display: 'flex', flexDirection: 'row', alignItems: 'center' },
        ]}
      >
        {this.renderInput(inputProps, keyboardType)}
        {this.renderClearButton()}
      </View>
    );
  }

  private renderClearButton () {
    const { clearButtonMode } = this.props;
    const { value } = this.state;
    return (
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          this.setState({ value: '' });
        }}
      >
        {this.showClearButton(clearButtonMode, value) ? (
          <MDIcon name='clear' color={inputItem.icon} size={16} />
        ) : null}
      </TouchableOpacity>
    );
  }

  private showClearButton (clearButtonMode: string | undefined, value?: string) {
    if (!!!clearButtonMode || clearButtonMode === 'never') {
      return false;
    }
    if (clearButtonMode === 'always') {
      return true;
    }
    const { isEditing } = this.state;
    if (
      clearButtonMode === 'while-editing' &&
      value &&
      value.length >= 0 &&
      isEditing
    ) {
      return true;
    }
    if (clearButtonMode === 'unless-editing' && !isEditing) {
      return true;
    }
  }

  private onFoucs (e: any) {
    this.setState({
      isEditing: true,
    });
    this.props.onFocus && this.props.onFocus(e);
  }

  private onBlur (e: any) {
    this.setState({
      isEditing: false,
    });
    this.props.onBlur && this.props.onBlur(e);
  }

  private onChangeText (text: string) {
    this.setState({
      value: text,
    });
    this.props.onChangeText && this.props.onChangeText(text);
  }
}
