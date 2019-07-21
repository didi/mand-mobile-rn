import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { cashier } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDIcon from '../icon';

export interface IMDCashierChannel {
  icon?: ReactNode;
  text: string;
  value: string;
}

interface IMDCashierProps<T> {
  styles?: IMDCashierStyle;
  channelData?: T[];
  channelLimit?: number; // 支付渠道超出限制数目时展示更多支付渠道按钮, default is 2
  defaultIndex?: number; // 默认选中支付渠道索引, default is 0
  paymentTitle?: string; // 支付金额标题, default is `支付金额(元)`
  paymentAmount?: number; // 支付金额, default is 0
  paymentDescribe?: string; // 支付金额说明
  moreButtonText?: string; // 更多支付方式
  renderChannel?: (channel: T, index: number) => ReactNode;
  onSelect?: (index: number) => void;
}

interface IMDCashierState {
  checkedIndex?: number;
  expand: boolean;
}

interface IMDCashierStyle {
  wrapper?: ViewStyle;
  text?: TextStyle;
  headerWrapper?: ViewStyle;
  headerTitle?: TextStyle;
  headerAmount?: TextStyle;
  headerDesc?: TextStyle;
  itemWrapper?: ViewStyle;
  channelWrapper?: ViewStyle;
  bottomButton?: ViewStyle;
  channelMoreWrapper?: ViewStyle;
  channelMoreText?: TextStyle;
  triangle?: ViewStyle;
}

export const MDCashierStyles: IMDCashierStyle = {
  wrapper: {
    backgroundColor: 'white',
  },
  headerWrapper: {
    backgroundColor: 'white',
    paddingTop: innerScaleSize(65),
    paddingBottom: innerScaleSize(25),
  },
  headerTitle: {
    fontSize: cashier.chooseTitleFontSize,
    color: cashier.chooseTitleColor,
    textAlign: 'center',
  },
  headerAmount: {
    fontFamily: cashier.chooseAmountFontFamily,
    fontSize: cashier.chooseAmountFontSize,
    color: cashier.chooseAmountColor,
    lineHeight: cashier.chooseAmountLineHeight,
    marginTop: innerScaleSize(20),
    letterSpacing: innerScaleSize(-2),
    textAlign: 'center',
  },
  headerDesc: {
    fontSize: cashier.chooseDescribeFontSize,
    color: cashier.chooseDescribeColor,
    textAlign: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: innerScaleSize(10),
  },
  channelWrapper: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingVertical: innerScaleSize(40),
    paddingHorizontal: innerScaleSize(60),
  },
  channelMoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: innerScaleSize(10),
  },
  channelMoreText: {
    color: cashier.chooseMoreColor,
    fontSize: cashier.chooseMoreFontSize,
  },
  triangle: {
    borderTopWidth: innerScaleSize(16),
    borderTopColor: cashier.chooseMoreColor,
    borderLeftColor: 'transparent',
    borderLeftWidth: innerScaleSize(8),
    borderRightColor: 'transparent',
    borderRightWidth: innerScaleSize(8),
    marginLeft: innerScaleSize(10),
    marginTop: innerScaleSize(8),
  },
};

const styles = StyleSheet.create<IMDCashierStyle>(MDCashierStyles);

export default class MDCashierChannel<T> extends React.Component<
  IMDCashierProps<T>,
  IMDCashierState
> {
  public static defaultProps = {
    styles,
    paymentTitle: '支付金额(元)',
    paymentAmount: 0,
    paymentDescribe: '关于支付金额的特殊说明',
    moreButtonText: '更多支付方式',
    channelLimit: 2,
    defaultIndex: 0,
  };

  constructor (props: IMDCashierProps<T>) {
    super(props);
    this.state = {
      checkedIndex: props.defaultIndex,
      expand: false,
    };
  }

  public render () {
    const { styles: _styles, channelData, channelLimit } = this.props;
    const { expand } = this.state;

    // 需要收起
    const needFolder = channelData && channelData.length > channelLimit!;
    const needRenderMore = !expand && needFolder;
    return (
      <View style={[_styles!.wrapper]}>
        {this.renderHeader()}
        {channelData && channelData.length > 0 ? (
          <View style={_styles!.channelWrapper}>
            {this.renderChannelList(
              needRenderMore ? channelData.slice(0, 1) : channelData
            )}
            {needRenderMore && this.renderChannelMore()}
          </View>
        ) : null}
        {this.props.children}
      </View>
    );
  }

  private renderHeader () {
    const {
      styles: _styles,
      paymentTitle,
      paymentAmount,
      paymentDescribe,
    } = this.props;
    return (
      <View style={_styles!.headerWrapper}>
        <Text style={_styles!.headerTitle}>{paymentTitle}</Text>
        <Text style={_styles!.headerAmount}>{paymentAmount!.toFixed(2)}</Text>
        <Text style={_styles!.headerDesc}>{paymentDescribe}</Text>
      </View>
    );
  }

  private renderChannel (channel: IMDCashierChannel, index: number): ReactNode {
    const { checkedIndex } = this.state;
    const { onSelect } = this.props;
    const checked = checkedIndex === index;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ checkedIndex: index });
          onSelect && onSelect(index);
        }}
        key={index}
      >
        <View style={styles.itemWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {typeof channel.icon === 'string' ? (
              <Text>channel.icon</Text>
            ) : (
              channel.icon
            )}
            <Text style={{ marginLeft: 24, color: '#41485d' }}>
              {channel.text}
            </Text>
          </View>
          <MDIcon
            name={checked ? 'checked' : 'check'}
            size={16}
            color={checked ? '#2F86F6' : '#999999'}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private renderChannelList (channelData: T[]) {
    const renderChannel =
      this.props.renderChannel || this.renderChannel.bind(this);
    if (channelData && channelData.length > 0) {
      const channelList = channelData.map((channel, index) => {
        if (
          !(
            // @ts-ignore
            channel.hasOwnProperty('value') &&
            // @ts-ignore
            channel.hasOwnProperty('icon') &&
            // @ts-ignore
            channel.hasOwnProperty('text')
          ) &&
          !this.props.renderChannel
        ) {
          console.error('You need to impletment renderChannel');
        }
        return renderChannel(channel as any, index);
      });

      return channelList;
    }

    return null;
  }

  private renderChannelMore () {
    const { styles: _styles, moreButtonText } = this.props;
    return (
      <TouchableOpacity
        style={_styles!.channelMoreWrapper}
        onPress={() => {
          this.setState({ expand: true });
        }}
      >
        <Text style={_styles!.channelMoreText}>{moreButtonText}</Text>
        <View style={_styles!.triangle} />
      </TouchableOpacity>
    );
  }
}
