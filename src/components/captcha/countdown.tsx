import React from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { captcha } from '../../_styles/themes/default.components';

interface IMDCountdownProps {
  styles?: IMDCountdownStyle;
  normalText?: string;
  activeText?: string;
  countdownNumber?: number;
  onSend?: (countdown: () => void) => void;
}

interface IMDCountdownState {
  countDownToggle: boolean;
  countDown: number;
  appState: AppStateStatus;
}

interface IMDCountdownStyle {
  normal: TextStyle;
  active: TextStyle;
}

const MDCountdownStyles: IMDCountdownStyle = {
  normal: {
    color: captcha.btnColor,
    fontSize: captcha.footerFontSize,
    textAlign: 'right',
    marginLeft: 10,
  },
  active: {
    color: base.colors.textDisabled,
  },
};

const styles = StyleSheet.create<IMDCountdownStyle>(MDCountdownStyles);

/** 
 * 截取小数点后几位
 * @param src 输入数字
 * @param pos 保留小叔位数
 */
function fomatFloat (src: number, pos: number) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

export default class MDCountdown extends React.Component<
  IMDCountdownProps,
  IMDCountdownState
> {
  public static defaultProps = {
    styles,
    normalText: '发送验证码',
    activeText: '{$1}秒后重发',
  };

  constructor (props: IMDCountdownProps) {
    super(props);
    this.state = {
      countDownToggle: false,
      countDown: -1,
      appState: 'active',
    };
  }

  private interval: any = 0;
  private backgroundTime: number = 0;

  public componentDidMount () {
    if (Platform.OS === 'web') {
      return;
    }
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }
  
  public componentWillUnmount () {
    this.interval && clearInterval(this.interval);
    if (Platform.OS === 'web') {
      return;
    }
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  public render () {
    const { styles: _styles, normalText, activeText } = this.props;
    const { countDownToggle, countDown } = this.state;
    return countDownToggle ? (
      <Text style={[_styles!.normal, _styles!.active]}>
        {activeText!.replace('{$1}', countDown.toString())}
      </Text>
    ) : (
      <Text style={_styles!.normal} onPress={this.startCountDown.bind(this)}>
        {normalText}
      </Text>
    );
  }

  /**
   * countDown
   */
  public countDown () {
    const { countdownNumber, onSend } = this.props;
    onSend && onSend(this.countDown);

    this.setState({
      countDown: countdownNumber!,
      countDownToggle: true,
    });

    this.interval = setInterval(() => {
      if (this.backgroundTime < countdownNumber!) {
        this.setState(
          {
            countDown: this.state.countDown - this.backgroundTime - 1,
          },
          () => {
            this.backgroundTime = 0;
            if (this.state.countDown < 0) {
              this.interval && clearInterval(this.interval);
              this.setCountDownToggle(false);
            }
          }
        );
      } else {
        this.setCountDown(-1);
        this.setCountDownToggle(false);
        this.interval && clearInterval(this.interval);
      }
    }, 1000);
  }

  /**
   * resetCount
   */
  public resetCount () {
    this.setCountDown(-1);
    this.setCountDownToggle(false);
    this.interval && clearInterval(this.interval);
  }

  private timestamp = 0;
  private handleAppStateChange (nextAppState: AppStateStatus) {
    const { appState } = this.state;
    if (appState.match(/active|inactive/) && nextAppState === 'background') {
      this.timestamp = new Date().getTime() / 1000;
    }
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.backgroundTime = fomatFloat(
        new Date().getTime() / 1000 - this.timestamp,
        0
      );
    }
    this.setState({ appState: nextAppState });
  }

  private startCountDown () {
    this.countDown();
  }

  private setCountDownToggle (enable: boolean) {
    this.setState({ countDownToggle: enable });
  }

  private setCountDown (countDown: number) {
    this.setState({ countDown });
  } 
}
