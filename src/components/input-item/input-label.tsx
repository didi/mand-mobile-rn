import * as React from 'react';
import { Animated, StyleSheet, Text, TextStyle } from 'react-native';
import { inputItem } from '../../_styles/themes/default.components';

interface IMDInputLabelProps {
  styles?: IMDInputLabelStyles;
  label?: string;
  labelColor?: string;
  highlightColor?: string;
  duration?: number;
  hasValue: boolean;
  focused: boolean;
  focusHandler?: (e: any) => void;
}

interface IMDInputLabelState {
  top: Animated.Value;
  fontSize: Animated.Value;
}

export interface IMDInputLabelStyles {
  labelText: TextStyle;
  small: TextStyle;
  large: TextStyle;
}

export const MDInputLabelStyles: IMDInputLabelStyles = {
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },
  small: {
    top: 12,
    fontSize: 12,
  },
  large: {
    top: 32,
    fontSize: 16,
  },
};

const styles = StyleSheet.create<IMDInputLabelStyles>(MDInputLabelStyles);

export default class MDInputLabel extends React.Component<
  IMDInputLabelProps,
  IMDInputLabelState
> {
  public static defaultProps = {
    styles,
    label: '',
    labelColor: inputItem.placeholder,
    highlightColor: inputItem.placeholderHighlight,
    duration: 200,
    hasValue: false,
    focused: false,
  };

  constructor (props: IMDInputLabelProps) {
    super(props);

    const { hasValue, styles: _styles } = props;
    const { small, large } = _styles!;
    const top = hasValue ? (small as TextStyle).top : (large as TextStyle).top;
    const fontSize = hasValue
      ? (small as TextStyle).fontSize
      : (large as TextStyle).fontSize;

    this.state = {
      top: new Animated.Value(Number(top)),
      fontSize: new Animated.Value(fontSize!),
    };
  }

  private position: any;

  public shouldComponentUpdate (
    nextProps: IMDInputLabelProps,
    nextState: IMDInputLabelState
  ) {
    const { hasValue, focused } = this.props;
    const { hasValue: nextHasValue, focused: nextFocused } = nextProps;

    return hasValue !== nextHasValue || focused !== nextFocused;
  }

  public componentWillReceiveProps (nextProps: IMDInputLabelProps) {
    const { hasValue, focused } = this.props;
    const { hasValue: nextHasValue, focused: nextFocused } = nextProps;

    if (focused !== nextFocused || hasValue !== nextHasValue) {
      if (nextFocused || nextHasValue) {
        this.floatLabel();
      } else {
        this.sinkLabel();
      }
    }
  }

  public floatLabel () {
    const { duration } = this.props;
    const { small } = styles;
    const { top, fontSize } = this.state;
    Animated.parallel([
      Animated.timing(top, {
        toValue: Number((small as TextStyle).top),
        duration,
      }),
      Animated.timing(fontSize, {
        toValue: (small as TextStyle).fontSize!,
        duration,
      }),
    ]).start();
  }

  public sinkLabel () {
    const { duration } = this.props;
    const { large } = styles;
    const { top, fontSize } = this.state;
    Animated.parallel([
      Animated.timing(top, {
        toValue: Number((large as TextStyle).top),
        duration,
      }),
      Animated.timing(fontSize, {
        toValue: (large as TextStyle).fontSize!,
        duration,
      }),
    ]).start();
  }

  public render () {
    const {
      styles: _styles,
      label,
      labelColor,
      hasValue,
      focused,
      highlightColor,
      focusHandler,
    } = this.props;

    const { top, fontSize } = this.state;

    return (
      <Animated.Text
        style={[
          {
            fontSize,
            top,
            color: labelColor,
          },
          hasValue || focused
            ? {
                color: highlightColor,
              }
            : {},
          _styles!.labelText,
        ]}
        onPress={focusHandler}
      >
        {label}
      </Animated.Text>
    );
  }
}
