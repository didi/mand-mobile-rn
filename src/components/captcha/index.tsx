import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { default as base } from '../../_styles/themes/default.basic';
import { captcha } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import MDCodebox, { MDCodeBoxStyles } from '../code-box';
import MDIcon from '../icon';
import MDPopup from '../popup';
import MDCountdown from './countdown';

export interface IMDCaptchaProps {
  styles?: IMDCaptchaStyle;
  isVisible?: boolean;
  isView?: boolean; // 是否内嵌在页面内展示，否则以popup形式，default is false
  maxlength?: number;
  title?: string;
  brief?: string;
  error?: string;
  countdownNumber?: number;
  security?: boolean;
  system?: boolean;
  autoCountdown?: boolean;
  countNormalText?: string;
  countActiveText?: string;
  onShow?: () => void;
  onDismiss?: () => void;
  onClose?: () => void;
  onSend?: (countdown: () => void) => void;
  onSubmit?: (text: string) => void;
}

export interface IMDCaptchaState {
  error: string;
}

export interface IMDCaptchaStyle {
  wrapper?: ViewStyle;
  codeboxWrapper?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  error?: TextStyle;
  children?: TextStyle;
  countNormal?: TextStyle;
  countActive?: TextStyle;
  footer?: ViewStyle;
}

export const MDCaptchaStyles: IMDCaptchaStyle = {
  wrapper: {
    backgroundColor: base.colors.bg,
    paddingHorizontal: innerScaleSize(60),
    paddingTop: innerScaleSize(60),
    paddingBottom: innerScaleSize(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: innerScaleSize(8),
    overflow: 'hidden',
  },
  title: {
    color: captcha.titleColor,
    fontSize: captcha.titleFontSize,
    fontWeight: '400',
    lineHeight: 1.15 * captcha.titleFontSize,
    marginBottom: innerScaleSize(16),
  },
  children: {
    color: captcha.color,
    fontSize: captcha.fontSize,
    textAlign: 'center',
    lineHeight: 1.2 * captcha.fontSize,
  },
  codeboxWrapper: {
    marginTop: innerScaleSize(50),
  },
  footer: {
    width: innerScaleSize(480),
    marginVertical: innerScaleSize(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brief: {
    maxWidth: '50%',
    color: captcha.briefColor,
    fontSize: captcha.footerFontSize,
    textAlign: 'left',
  },
  error: {
    color: captcha.errorColor,
  },
};

const styles = StyleSheet.create<IMDCaptchaStyle>(MDCaptchaStyles);
// todo 内部组件样式
const codeBoxStyles = Object.assign({}, MDCodeBoxStyles, {
  input: {
    ...MDCodeBoxStyles.input,
    flex: 1,
    width: undefined,
  },
});

export default class MDCaptcha extends React.Component<
  IMDCaptchaProps,
  IMDCaptchaState
> {
  public static defaultProps = {
    styles,
    isVisible: false,
    maxlength: 4,
    countdownNumber: 60,
    security: false,
    system: false,
    autoCountdown: false,
    isView: false,
    countNormalText: '发送验证码',
    countActiveText: '{$1}秒后重发',
  };

  constructor (props: IMDCaptchaProps) {
    super(props);
    this.currentInput = undefined;
    this.state = {
      error: '',
    };
  }

  private currentInput: string | undefined;
  private countdown: MDCountdown | null = null;

  public render () {
    const { isVisible, onShow, onDismiss, isView, autoCountdown } = this.props;
    const content = this.renderContent();

    return isView ? (
      content
    ) : (
      <MDPopup
        position='center'
        isVisible={isVisible}
        maskClosable={false}
        onShow={() => {
          autoCountdown && this.countDown();
          onShow && onShow();
        }}
        onHide={() => {
          onDismiss && onDismiss();
        }}
      >
        {content}
      </MDPopup>
    );
  }

  public componentDidMount () {
    const { isView, autoCountdown } = this.props;
    if (isView && autoCountdown) {
      this.countDown();
    }
  }

  /**
   * countDown 开始倒计时
   */
  public countDown () {
    this.countdown && this.countdown.countDown();
  }

  /**
   * resetCount 重置倒计时
   */
  public resetCount () {
    this.countdown && this.countdown.resetCount();
  }

  /**
   * setError 设置报错信息并显示
   */
  public setError (message: string) {
    this.setState({
      error: message,
    });
  }

  private renderContent () {
    const { styles: _styles, title, children } = this.props;

    return (
      <View style={_styles!.wrapper}>
        {this.renderCloseButton()}
        {title ? <Text style={_styles!.title}>{title}</Text> : null}
        {this.renderChildren(children, _styles!)}
        {this.renderCodebox()}
      </View>
    );
  }

  private renderChildren (children: ReactNode, style: IMDCaptchaStyle) {
    if (!children) return null;
    if (typeof children === 'string') {
      return <Text style={style.children}>{children}</Text>;
    }
    return children;
  }

  private renderCloseButton () {
    const { isView, onClose } = this.props;
    if (isView) return null;
    return (
      <TouchableOpacity
        style={{
          zIndex: captcha.zIndex,
          position: 'absolute',
          top: innerScaleSize(32),
          right: innerScaleSize(32),
        }}
        onPress={() => {
          onClose && onClose();
        }}
      >
        <MDIcon name='close' size={16} color={captcha.color} />
      </TouchableOpacity>
    );
  }

  private renderBrief (style: IMDCaptchaStyle, error?: string, brief?: string) {
    if (
      error &&
      this.currentInput &&
      this.currentInput.length === this.props.maxlength
    ) {
      return (
        <Text style={[style.brief, style.error]} numberOfLines={0}>
          {error}
        </Text>
      );
    }
    if (brief) {
      return (
        <Text style={style.brief} numberOfLines={0}>
          {brief}
        </Text>
      );
    }
    return null;
  }

  private renderCodebox () {
    const {
      styles: _styles,
      brief,
      maxlength,
      security,
      system,
      countNormalText,
      countActiveText,
      countdownNumber,
      isView,
      onSend,
    } = this.props;
    const { error } = this.state;
    return (
      <View
        style={[
          _styles!.codeboxWrapper,
          isView
            ? { width: '100%', paddingHorizontal: innerScaleSize(20) }
            : null,
        ]}
      >
        <MDCodebox
          styles={codeBoxStyles}
          autofocus={true}
          {...{ maxlength, security, system }}
          onChangeText={this.onChangeText.bind(this)}
        />
        <View style={[_styles!.footer, isView ? { width: undefined } : null]}>
          {this.renderBrief(_styles!, error, brief)}
          <MDCountdown
            normalText={countNormalText}
            activeText={countActiveText}
            countdownNumber={countdownNumber}
            onSend={onSend}
            ref={(ref) => {
              this.countdown = ref;
            }}
          />
        </View>
      </View>
    );
  }

  private onChangeText (text: string) {
    const { maxlength, onSubmit } = this.props;
    // 前面条件成立时，this.currentInput必有值
    if (
      text.length === maxlength! - 1 &&
      this.currentInput!.length === maxlength
    ) {
      this.forceUpdate(); // todo 删除字符串时更新逻辑
    }
    this.currentInput = text;

    if (text.length < maxlength!) return;
    onSubmit && onSubmit(text);
  }
}
