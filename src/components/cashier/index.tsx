import * as React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { cashier } from '../../_styles/themes/default.components';
import { safeAreaOffsetBottom } from '../../_styles/themes/device';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDActivityIndicator from '../activity-indicator';
import MDButton from '../button';
import MDCaptcha, { MDCaptchaStyles } from '../captcha';
import MDIcon from '../icon';
import MDPopup from '../popup';
import MDPopupTitleBar, { MDPopupTitleBarStyles } from '../popup-title-bar';
import MDCashierChannel, { IMDCashierChannel } from './cashier-channel';

export type MDCashierSceneType =
  | 'choose'
  | 'captcha'
  | 'loading'
  | 'success'
  | 'fail'
  | 'custom';

export interface IMDCashierProps<T> {
  styles?: IMDCashierStyle;
  visible: boolean;
  channelLimit?: number; // 支付渠道超出限制数目时展示更多支付渠道按钮, default is 2
  defaultIndex?: number; // 默认选中支付渠道索引, default is 0
  title?: string; // 收银台弹窗标题, default is `支付`
  paymentTitle?: string; // 支付金额标题, default is `支付金额(元)`
  paymentAmount?: number; // 支付金额, default is 0
  paymentDescribe?: string; // 支付金额说明
  payButtonText?: string; // 确认支付按钮文案, default is `确认支付`
  payButtonDisabled?: boolean; // 禁用支付按钮, default is false
  moreButtonText?: string; // 更多支付方式
  header?: React.ReactNode; // header
  footer?: React.ReactNode; // footer
  custom?: React.ReactNode; // scene值为`custom`时渲染
  channelData?: T[];
  renderChannel?: (channel: T, index: number) => React.ReactNode;
  onShow?: () => void;
  onDismiss?: () => void;
  onPay?: () => void;
  onSelect?: (index: number) => void; // 仅使用默认renderChannel时回调
}

export interface IMDCashierScene {
  captcha: object;
  loading: { text: string };
  success: { text: string; buttonText: string; handler?: () => void };
  fail: { text: string; buttonText: string; handler?: () => void };
}

export interface IMDCashierState {
  text: string;
  isPopupShow?: boolean;
  loading: boolean;
  scene: MDCashierSceneType;
  sceneKey: number;
  sceneOption: IMDCashierScene;
}

export interface IMDCashierStyle {
  wrapper?: ViewStyle;
  contentWrapper?: ViewStyle;
  sceneWrapper?: ViewStyle;
  bottomButton?: ViewStyle;
  resultWrappper?: ViewStyle;
  resultText?: TextStyle;
  loadingWrapper?: ViewStyle;
}

export const MDCashierStyles: IMDCashierStyle = {
  contentWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  sceneWrapper: {
    backgroundColor: cashier.bg,
    paddingBottom: safeAreaOffsetBottom,
  },
  bottomButton: {
    marginHorizontal: innerScaleSize(40),
    marginBottom: innerScaleSize(40),
  },
  resultWrappper: {
    height: cashier.resultContentHeight,
    width: '100%',
    alignItems: 'center',
    paddingTop: innerScaleSize(76),
    paddingBottom: innerScaleSize(40),
    paddingHorizontal: innerScaleSize(40),
  },
  resultText: {
    fontSize: cashier.resultTextFontSize,
    color: cashier.resultTextColor,
    textAlign: 'center',
    width: '100%',
    marginTop: innerScaleSize(30),
    marginBottom: innerScaleSize(180),
  },
  loadingWrapper: {
    height: cashier.loadingContentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create<IMDCashierStyle>(MDCashierStyles);
const titleBarStyles = Object.assign({}, MDPopupTitleBarStyles, {
  wrapper: {
    ...MDPopupTitleBarStyles.wrapper,
    backgroundColor: '#f9fafb',
    height: 60,
  },
});

const captchaBarStyles = Object.assign({}, MDCaptchaStyles, {
  wrapper: {
    ...MDCaptchaStyles.wrapper,
    paddingHorizontal: 10,
    paddingBottom: 216 + safeAreaOffsetBottom + 20,
  },
});

const defaultSceneOption: IMDCashierScene = {
  loading: {
    text: '支付结果查询中...',
  },
  success: {
    text: '支付成功',
    buttonText: '我知道了',
  },
  fail: {
    text: '支付失败，请稍后重试',
    buttonText: '我知道了',
  },
  captcha: {
    text: '',
    brief: '',
    maxlength: 4,
    count: 60,
    autoCountdown: true,
    onSend: () => {},
    onSubmit: () => {},
  },
};
export default class MDCashier<ItemT> extends React.Component<
  IMDCashierProps<ItemT>,
  IMDCashierState
> {
  public static defaultProps = {
    styles,
    visible: false,
    title: '支付',
    payButtonText: '确认支付',
    payButtonDisabled: false,
  };

  public captcha: MDCaptcha | null = null;

  constructor (props: IMDCashierProps<ItemT>) {
    super(props);
    this.state = {
      text: 'MDCashier',
      loading: false,
      isPopupShow: undefined,
      scene: 'choose',
      sceneKey: Date.now(),
      sceneOption: defaultSceneOption,
    };
  }

  public UNSAFE_componentWillReceiveProps (nextProps: IMDCashierProps<ItemT>) {
    const { visible } = nextProps;
    if (visible) {
      this.setState({ isPopupShow: true });
    } else {
      this.setState({ isPopupShow: false });
      this.next('choose');
    }
  }

  // shouldComponentUpdate(nextProps: IMDCashierProps<ItemT>, nextState: IMDCashierState, context: any) {
  //   // 由于setState是异步执行的，当componentWillReceiveProps中setState之后此时state状态依然未变
  //   if (nextProps.visible && this.state.isPopupShow === undefined) return true;
  //   if (nextProps.visible !== this.props.visible) return false;
  //   return true
  // }

  public render () {
    const { styles: _styles, onShow, onDismiss, header, footer } = this.props;
    const { isPopupShow, scene } = this.state;

    return (
      <MDPopup
        position='bottom'
        isVisible={isPopupShow}
        maskClosable={false}
        onShow={() => {
          onShow && onShow();
        }}
        onHide={() => {
          onDismiss && onDismiss();
        }}
      >
        <View style={_styles!.contentWrapper}>
          {this.renderTitleBar()}
          <View style={_styles!.sceneWrapper}>
            {header}
            {this.renderScene(scene)}
            {footer}
          </View>
        </View>
      </MDPopup>
    );
  }

  /**
   * 进入收银台下一步
   */
  public next (scene: MDCashierSceneType, option?: object) {
    const { sceneOption } = this.state;
    if (sceneOption.hasOwnProperty(scene)) {
      let currentOption = (sceneOption as any)[scene];
      if (currentOption) {
        currentOption = Object.assign(currentOption, option)
        ; (sceneOption as any)[scene] = currentOption;
      }
    }

    this.setState({
      sceneOption,
      scene,
      sceneKey: Date.now(),
      loading: scene === 'loading',
    });
  }

  private onPressPay () {
    const { onPay } = this.props;
    this.setState({ loading: true });

    onPay && onPay();
  }

  private renderTitleBar () {
    return (
      <MDPopupTitleBar
        styles={titleBarStyles}
        title={this.props.title}
        cancelText={<MDIcon name='close' color='#333' size={24} />}
        onCancel={() => {
          this.setState({ isPopupShow: false });
        }}
      />
    );
  }

  private renderScene (scene: MDCashierSceneType) {
    const { loading, sceneOption } = this.state;
    const {
      styles: _styles,
      channelData,
      renderChannel,
      paymentTitle,
      paymentAmount,
      paymentDescribe,
      channelLimit,
      defaultIndex,
      onSelect,
      custom,
    } = this.props;

    switch (scene) {
      case 'choose':
        const props = {
          channelData,
          renderChannel,
          paymentTitle,
          paymentAmount,
          paymentDescribe,
          channelLimit,
          defaultIndex,
          onSelect,
        };
        return this.renderChannel(props, true);
      case 'captcha':
        return this.renderCaptcha(sceneOption.captcha);
      case 'loading':
        return this.renderLoading(loading, _styles!, sceneOption.loading);
      case 'success':
        return this.renderResultSuccess(true, _styles!, sceneOption.success);
      case 'fail':
        return this.renderResultSuccess(false, _styles!, sceneOption.fail);
      case 'custom':
        return <React.Fragment>{custom}</React.Fragment>;
      default:
        return this.renderChannel({ channelData, renderChannel }, true);
    }
  }

  private renderChannel (props: any, show: boolean) {
    if (!show) return null;
    const { payButtonText, payButtonDisabled } = this.props;
    return (
      <MDCashierChannel {...props}>
        <MDButton
          type={'primary'}
          style={styles!.bottomButton as any}
          onPress={this.onPressPay.bind(this)}
          inactive={payButtonDisabled}
        >
          {payButtonText}
        </MDButton>
      </MDCashierChannel>
    );
  }

  private renderCaptcha (option: any) {
    return (
      <MDCaptcha
        {...option}
        isView={true}
        styles={captchaBarStyles}
        ref={(ref) => {
          this.captcha = ref;
        }}
      >
        {option.text}
      </MDCaptcha>
    );
  }

  private renderResultSuccess (
    result: boolean | undefined,
    style: IMDCashierStyle,
    option: any
  ) {
    if (result === undefined) return null;

    const { text, buttonText, handler } = option;
    return (
      <View style={style.resultWrappper}>
        <MDIcon
          name={result ? 'success-color' : 'warn-color'}
          svg={true}
          size={50}
        />
        <Text style={style.resultText}>{text}</Text>
        <MDButton
          style={{ width: '100%' }}
          type={'primary'}
          onPress={() => {
            this.setState({ isPopupShow: false });
            handler && handler();
          }}
        >
          {buttonText}
        </MDButton>
      </View>
    );
  }

  private renderLoading (loading: boolean, style: IMDCashierStyle, option: any) {
    if (!loading) return null;
    return (
      <View style={style.loadingWrapper}>
        <MDActivityIndicator size={50} textSize={12} textGap={15} column={true}>
          {option.text}
        </MDActivityIndicator>
      </View>
    );
  }
}
