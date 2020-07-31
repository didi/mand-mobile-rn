import * as React from 'react';
import { Animated, StyleSheet, Text, TextStyle, View } from 'react-native';
import accounting from '../../_utils/accounting';

export interface IMDAmountProps {
  style?: TextStyle | TextStyle[];
  amount: number | string;
  precision?: number;
  symbol?: string;
  thousand?: string;
  decimal?: string;
  format?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  mask?: boolean;

  // for transition
  transition?: boolean;
  fontHeight?: number;
  containerHeight?: number;
  containerStyle?: TextStyle | TextStyle[];
  duration?: number;
  autoStart?: boolean;
}

export interface IMDAmountState {
  animatedValue: Animated.Value;
}

/**
 * 金额展示组件
 * 格式化的参数参考：http://openexchangerates.github.io/accounting.js/#documentation
 */
export default class MDAmount extends React.Component<
  IMDAmountProps,
  IMDAmountState
> {
  public static defaultProps = {
    precision: 2,
    symbol: '',
    thousand: ',',
    decimal: '.',
    format: '%s%v',
    fontFamily: 'DIDIFD-Medium',
    mask: false,
    startAnim: true, // 默认创建DidMount后启动动画
    transition: false,
  };

  constructor (props: IMDAmountProps) {
    super(props);
    if (props.amount === undefined) {
      throw new Error('The MDAmount need set amount');
    }

    const { transition, containerHeight, fontHeight } = props;
    if (transition) {
      if (!containerHeight) {
        throw new Error(
          'The MDAmount in transition mode need set containerHeight'
        );
      }
      if (!fontHeight) {
        throw new Error('The MDAmount in transition mode need set fontHeight');
      }
    }
    this.state = {
      animatedValue: new Animated.Value(0),
    };
    this.startTransition = this.startTransition.bind(this);
  }

  private oldAmount: number | string = 0;

  public componentDidMount () {
    const { transition, autoStart, amount } = this.props;
    if (transition && autoStart) {
      this.startTransition(() => {
        this.oldAmount = amount || 0;
      });
    }
  }

  public UNSAFE_componentWillReceiveProps (nextProps: IMDAmountProps) {
    const { amount, transition } = nextProps;
    const { transition: _transition, amount: _amount } = this.props;

    if (transition && amount !== _amount) {
      this.setState(
        {
          animatedValue: new Animated.Value(0),
        },
        () => {
          this.startTransition(() => {
            this.oldAmount = amount || 0;
          });
        }
      );
    }

    if (transition && !_transition) {
      this.oldAmount = _amount === amount ? 0 : _amount;
      this.setState(
        {
          animatedValue: new Animated.Value(0),
        },
        () => {
          this.startTransition(() => {
            this.oldAmount = amount || 0;
          });
        }
      );
    }
  }

  public render () {
    const { amount, mask, transition, fontHeight, containerHeight } = this.props;

    const oldAmount = this.oldAmount;

    const oldFormatAmount = this.formatMoney(oldAmount);

    const formatAmount = this.formatMoney(amount);

    const fontStyle: TextStyle = this.genFontStyle();

    if (transition && fontHeight && containerHeight && !mask) {
      return this.renderAnimAmount(oldFormatAmount, formatAmount, fontStyle);
    }

    return <Text style={fontStyle}>{mask ? '****' : formatAmount}</Text>;
  }

  private formatMoney (amount?: number | string): string {
    const { precision, symbol, thousand, decimal, format } = this.props;

    return amount !== undefined
      ? accounting.formatMoney(amount, {
          precision,
          symbol,
          thousand,
          decimal,
          format,
        })
      : 0;
  }

  private genFontStyle (): TextStyle {
    const { fontFamily, fontSize, color, style, fontHeight } = this.props;

    return StyleSheet.flatten([
      {
        fontFamily,
        fontSize,
        color,
        lineHeight: fontHeight,
        letterSpacing: -1,
      },
      style,
    ]);
  }

  private renderAnimAmount (
    oldFormatAmount: any,
    formatAmount: any,
    fontStyle: TextStyle
  ) {
    const { fontHeight, containerHeight: height, containerStyle } = this.props;

    let oldAmounts = oldFormatAmount.split('');
    let formatAmounts = formatAmount.split('');

    if (oldAmounts.length < formatAmounts.length) {
      oldAmounts = new Array(formatAmounts.length - oldAmounts.length)
        .fill('0')
        .concat(oldAmounts);
    } else if (oldAmounts.length > formatAmounts.length) {
      formatAmounts = new Array(oldAmounts.length - formatAmounts.length)
        .fill('')
        .concat(formatAmounts);
    }

    const { columns, transitions, rowHeights } = this.renderColumnCells(
      formatAmounts,
      oldAmounts,
      fontHeight!,
      fontStyle
    );

    const animColumnViews = columns.map(
      (column: React.ReactNode, i: number) => {
        return (
          <Animated.View
            key={i}
            style={{
              height: rowHeights[i],
              justifyContent: 'flex-end',
              transform: [{ translateY: transitions[i] }],
            }}
          >
            {column}
          </Animated.View>
        );
      }
    );

    return (
      <View style={[styles.container, { height }, containerStyle]}>
        {animColumnViews}
      </View>
    );
  }

  private renderColumnCells (
    formatAmounts: string[],
    oldAmounts: string[],
    fontHeight: number,
    fontStyle: TextStyle
  ) {
    const transitions: any[] = [];
    const rowHeights: number[] = [];

    const columns = formatAmounts.map((num: string, k: number) => {
      const oldNum = isNaN(+oldAmounts[k]) ? 0 : +oldAmounts[k];
      const newNum = +num;
      let n = 1; // 多少个 cell，第一列个数的基数为 1，第二列为 11，以此类推
      if (num.match(/\d/g)) {
        n = 10 * k + 1;
        if (oldNum > newNum) {
          // 7 -> 2
          n += 10 - oldNum + newNum;
        } else if (oldNum < newNum) {
          // 2 -> 7
          n += newNum - oldNum;
        }
      }
      const _transition = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(fontHeight! * (n - 1))],
      });
      transitions.push(_transition);
      rowHeights.push(fontHeight! * n);
      // @ts-ignore
      return new Array(n).fill(0).map((v, i) => {
        return (
          <View key={i} style={{ height: fontHeight }}>
            <Text style={fontStyle}>
              {num.match(/\d/g) ? (i + oldNum) % 10 : num}
            </Text>
          </View>
        );
      });
    });

    return { columns, transitions, rowHeights };
  }

  private startTransition (cb?: () => void) {
    const duration = this.props.duration || 2000;
    Animated.timing(this.state.animatedValue, {
      duration,
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      cb && cb();
    });
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    borderColor: 'transparent',
  },
});
