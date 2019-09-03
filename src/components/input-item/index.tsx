import React, { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { inputItem } from '../../_styles/themes/default.components';

import {
  formatValueByGapRule,
  formatValueByGapStep,
  trimValue,
} from '../../_utils/format';
import MDTextInput, { IMDtextInputProps } from '../text-input';
import MDMaterialTextInput, {
  MDMaterialTextInputStyles,
} from './material-text-input';

type MDInputItemType =
  | 'text'
  | 'bank-card'
  | 'password'
  | 'phone'
  | 'money'
  | 'digit';
type MDInputItemAlign = 'left' | 'center' | 'right';
type MDInputItemSize = 'large' | 'normal';

export interface IMDInputItemProps {
  styles?: IMDInputItemStyles;
  name?: string; // 表单名称 区分表单组件
  title?: string; // 表单左侧标题 可用left代替
  brief?: ReactNode;
  error?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  type?: MDInputItemType | KeyboardTypeOptions;
  size?: MDInputItemSize;
  align?: MDInputItemAlign;
  amount?: boolean; // 是否使用金融字体
  readonly?: boolean;
  disabled?: boolean;
  highlight?: boolean;
  material?: boolean;
  clearable?: boolean;
  formative?: boolean; // 根据type自动格式化
  numberKeyboard?: boolean; // 是否使用金融数字键盘
  keyboardShuffle?: boolean; // 金融键盘乱序
  keyboardOKText?: string; // 金融数字键盘确认键文案
  onChangeText?: (name: string | undefined, text: string) => void;
  onFocus?: (name?: string) => void;
  onBlur?: (name?: string) => void;
  onConfirm?: (name: string | undefined, value: string) => void;
}

interface IMDInputItemState {
  value: string;
  oldValue: string;
  currentValue: string;
  highlight: boolean;
}

interface IMDInputItemStyles {
  container?: ViewStyle;
  wrapper?: ViewStyle;
  inputText?: TextStyle;
  titleText?: TextStyle;
  errorText?: TextStyle;
  briefText?: TextStyle;
}

export const MDInputItemStyles: IMDInputItemStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: base.colors.borderBase,
    borderBottomWidth: 1,
    height: inputItem.height,
  },
  wrapper: {},
  inputText: {
    flex: 1,
    color: inputItem.color,
    fontSize: inputItem.fontSize,
  },
  titleText: {
    color: inputItem.color,
    fontSize: inputItem.fontSize,
  },
  errorText: {
    color: inputItem.colorError,
    fontSize: inputItem.fontSizeError,
    marginVertical: 10,
  },
  briefText: {
    color: inputItem.colorBrief,
    fontSize: inputItem.fontSizeBrief,
    marginVertical: 10,
  },
};

const styles = StyleSheet.create<IMDInputItemStyles>(MDInputItemStyles);

const materialInputStyles = Object.assign({}, MDMaterialTextInputStyles, {
  wrapper: {
    ...MDMaterialTextInputStyles.wrapper,
    width: '100%',
    paddingLeft: 0,
  },
  input: {
    ...MDMaterialTextInputStyles.input,
    color: inputItem.color,
    fontSize: inputItem.fontSize,
    textAlign: 'left',
  }
});

export default class MDInputItem extends React.Component<
  IMDInputItemProps,
  IMDInputItemState
> {
  public static defaultProps = {
    styles,
    type: 'text',
    size: 'normal',
    align: 'left',
    amount: false,
    readonly: false,
    disabled: false,
    highlight: false,
    material: false,
    clearable: false,
    numberKeyboard: false,
  };

  constructor (props: IMDInputItemProps) {
    super(props);
    const { value } = this.props;
    this.state = {
      currentValue: value || '',
      oldValue: value || '',
      value: value || '',
      highlight: false,
    };
  }

  private inputRef: MDTextInput | MDMaterialTextInput | null = null;

  public render () {
    const {
      title,
      highlight,
      material,
      error,
      left,
      right,
      size,
      styles: _styles,
    } = this.props;
    const highlighted = highlight && this.state.highlight;
    const borderBottomColor = error
      ? inputItem.colorError
      : highlighted
      ? base.colors.textBase
      : base.colors.borderBase;
    const brief = this.renderBrief();
    const content = this.renderContent();
    return (
      <View style={_styles!.wrapper as any}>
        <View
          style={
            [
              _styles!.container,
              { borderBottomColor },
              material ? { height: 60 } : null,
              size === 'large'
                ? { height: Platform.OS === 'android' ? 61.3 : 50 }
                : null,
            ] as ViewStyle[]
          }
        >
          {title ? (
            <Text style={_styles!.titleText as TextStyle}>{title}</Text>
          ) : null}
          {left}
          {content}
          {right}
        </View>
        {brief}
      </View>
    );
  }

  public focus () {
    this.inputRef && this.inputRef.focus();
  }

  public blur () {
    this.inputRef && this.inputRef.blur();
  }

  public getValue () {
    return this.state.value;
  }

  private renderBrief () {
    const { styles: _styles, error, brief } = this.props;
    const errorNode =
      typeof error === 'string' ? (
        <Text style={_styles!.errorText}>error</Text>
      ) : (
        error
      );
    const briefNode =
      typeof brief === 'string' ? (
        <Text style={_styles!.briefText}>brief</Text>
      ) : (
        brief
      );

    return error || brief ? (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {error ? errorNode : briefNode}
      </View>
    ) : null;
  }

  private renderContent () {
    const { styles: _styles, title, disabled, readonly, value } = this.props;
    return title && (disabled || readonly) ? (
      <Text
        style={
          [
            _styles!.inputText,
            {
              opacity: disabled ? inputItem.colorDisabled : 1,
              paddingLeft: 20,
              fontWeight: readonly ? inputItem.fontWeight : '300',
            },
          ] as TextStyle[]
        }
      >
        {value}
      </Text>
    ) : (
      this.renderInput()
    );
  }

  private renderInput () {
    const {
      material,
      name,
      type,
      title,
      align,
      left,
      right,
      placeholder,
      clearable,
      size,
      onFocus,
      onBlur,
      onConfirm,
      amount,
      numberKeyboard,
      keyboardShuffle,
      keyboardOKText,
    } = this.props;
    const inputStyle: TextStyle = {
      paddingLeft: title ? 20 : 0,
      textAlign: align,
      marginLeft: left ? 10 : 0,
      marginRight: right ? 10 : 0,
      // fontFamily: amount ? 'FD+_Number' : undefined,
      // fontSize: size === 'large' ? inputItem.fontSizeLarge : undefined,
    };

    if(!!amount){
      inputStyle.fontFamily = 'FD+_Number';
    }
    if(size === 'large') {
      inputStyle.fontSize = inputItem.fontSizeLarge;
    }

    const keyboardType = this.keyboardTypeByType(type!);

    let maxLength = this.props.maxLength;

    if (type === 'phone') {
      maxLength = 13;
    }

    const inputProps: IMDtextInputProps = {
      secureTextEntry: type === 'password',
      maxLength,
      placeholder,
      underlineColorAndroid: 'transparent',
      clearButtonMode: clearable ? 'while-editing' : 'never',
      type: numberKeyboard ? 'professional' : 'system',
      okText: keyboardOKText,
      shuffle: keyboardShuffle,
      keyboardType,
      placeholderTextColor: inputItem.placeholder,
      onFocus: () => {
        this.setState({ highlight: true });
        onFocus && onFocus(name);
      },
      onBlur: () => {
        this.setState({ highlight: false });
        onBlur && onBlur(name);
      },
      onChangeText: (text) => {
        this.handleChangeText(name, text);
      },
      onSubmitEditing: () => {
        onConfirm && onConfirm(name, this.state.value);
      },
      value: this.state.value,
    };
    return material
      ? this.renderMaterialInput(inputProps, inputStyle)
      : this.renderNormalInput(inputProps, inputStyle);
  }

  private renderMaterialInput (
    inputProps: IMDtextInputProps,
    inputStyle: TextStyle
  ) {
    return (
      <MDMaterialTextInput
        {...inputProps}
        styles={materialInputStyles}
        ref={(ref) => (this.inputRef = ref)}
      />
    );
  }

  private renderNormalInput (
    inputProps: IMDtextInputProps,
    inputStyle: TextStyle
  ) {
    const _styles = this.props.styles;
    const sty = Object.assign({}, _styles!.inputText, {
      ...inputStyle
    });
    return (
      <MDTextInput
        {...inputProps}
        style={sty}
        ref={(ref) => (this.inputRef = ref)}
      />
    );
  }

  private keyboardTypeByType (
    type: MDInputItemType | KeyboardTypeOptions
  ): KeyboardTypeOptions {
    switch (type) {
      case 'bank-card':
      case 'phone':
      case 'digit':
      case 'money':
      case 'text':
      case 'password':
        return 'default';
      default:
        return type;
    }
  }

  private handleChangeText (name: string | undefined, text: string) {
    const { onChangeText, formative, type } = this.props;
    const oldValue = this.state.currentValue;
    // 未设置formative的情况下, type为bankCard,phone, money默认为true
    const needFormat =
      formative ||
      (formative === undefined &&
        (type === 'bank-card' || type === 'phone' || type === 'money'));
    const formatValue = needFormat
      ? this.formatValue(text, text.length)
      : { value: text, range: text.length };
    this.setState({
      value: formatValue.value,
      currentValue: formatValue.value,
      oldValue,
    });

    const original = trimValue(trimValue(text, ' '), ',');
    onChangeText && onChangeText(name, original);
  }

  private inputMaxLength () {
    if (this.props.type === 'phone') {
      return 11;
    } else {
      return this.props.maxLength;
    }
  }

  private subValue (value: string) {
    const length = this.inputMaxLength();
    if (length && value.length > length) {
      return value.substring(0, length);
    }
    return value;
  }

  private formatValue (value: string, position = 0) {
    const { type } = this.props;
    let formatValue = { value, range: position };

    if (value === '') {
      return formatValue;
    }

    let gap = ' ';
    let curValue = value;
    const oldValue = this.state.oldValue;
    const isAdd = oldValue.length > curValue.length ? -1 : 1;

    switch (type) {
      case 'bank-card':
        curValue = this.subValue(trimValue(curValue.replace(/\D/g, '')));
        formatValue = {
          value: curValue.replace(/(\d{4})(?=\d)/g, '$1 '),
          range: position,
        };
        break;
      case 'phone':
        curValue = this.subValue(trimValue(curValue.replace(/\D/g, '')));
        formatValue = {
          value: curValue.replace(/(^\d{3}|\d{4}\B)/g, '$1 '),
          range: position,
        };
        break;
      case 'money':
        gap = ',';
        curValue = this.subValue(trimValue(curValue.replace(/[^\d.]/g, '')));
        // curValue = curValue.replace(/\D/g, '')
        const dotPos = curValue.indexOf('.');
        // format if no dot or new add dot or insert befor dot
        const moneyCurValue = curValue.split('.')[0];
        const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : '';

        formatValue = formatValueByGapStep(
          3,
          trimValue(moneyCurValue, gap),
          gap,
          'right',
          position,
          isAdd,
          oldValue.split('.')[0]
        );
        formatValue.value += moneyCurDecimal;
        break;
      case 'digit':
        curValue = this.subValue(trimValue(curValue.replace(/\D/g, '')));
        formatValue.value = curValue;
        break;
      default:
        curValue = this.subValue(curValue);
        formatValue.value = curValue;
        break;
    }
    return formatValue;
  }
}
