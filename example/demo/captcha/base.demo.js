import React from 'react'
import { View } from 'react-native'
import {
  MDCaptcha,
  MDField,
  MDToast,
  MDInputItem,
  MDSwitch,
  MDCellItem,
  MDButton,
} from '../../../src'

export default class CaptchaDemo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      title: '输入验证码',
      slot: '验证码已发送至 186****5407',
      captha: '1234',
      capthaLength: 4,
      capthaLimit: true,
      security: false,
      systemKeyboard: false,
    }
  }

  _onShowCaptha() {
    this.setState({ showPopup: true })
  }

  _onSubmit(text) {
    if (text === this.state.captha) {
      // success
      this.setState({
        showPopup: false,
        error: null,
      })
      setTimeout(() => {
        MDToast.succeed('验证码' + text)
      }, 500)
    } else {
      // error
      this.captha.setError('验证码错误，请重新输入')
    }
  }

  _onSend(countdown) {
    console.info(countdown)
  }

  render() {
    const {
      showPopup,
      title,
      slot,
      captha,
      capthaLength,
      capthaLimit,
      security,
      systemKeyboard,
    } = this.state

    return (
      <View>
        <MDField title="文案">
          <MDInputItem
            title="标题"
            value={title}
            onChangeText={(name, text) => {
              this.setState({ title: text })
            }}
          />
          <MDInputItem
            title="插槽内容"
            value={slot}
            onChangeText={(name, text) => {
              this.setState({ slot: text })
            }}
          />
          <MDInputItem
            title="短信验证码"
            value={captha}
            onChangeText={(name, text) => {
              this.setState({ captha: text })
            }}
          />
        </MDField>
        <MDField title="配置">
          <MDCellItem
            title="限制验证码长度"
            right={
              <MDSwitch
                checked={capthaLimit}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ capthaLimit: checked })
                }}
              />
            }
          />
          <MDInputItem
            title="验证码长度"
            value={'' + capthaLength}
            onChangeText={(name, text) => {
              this.setState({ capthaLength: +text })
            }}
          />
          <MDCellItem
            title="采用掩码"
            right={
              <MDSwitch
                checked={security}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ security: checked })
                }}
              />
            }
          />
          <MDCellItem
            title="使用系统键盘"
            right={
              <MDSwitch
                checked={systemKeyboard}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ systemKeyboard: checked })
                }}
              />
            }
          />
        </MDField>
        <MDButton
          style={{ marginVertical: 10 }}
          onPress={this._onShowCaptha.bind(this)}
        >
          确定
        </MDButton>
        <MDCaptcha
          title={title}
          maxlength={capthaLimit ? capthaLength : -1}
          brief="最新验证码依然有效，请勿重发"
          security={security}
          system={systemKeyboard}
          isVisible={showPopup}
          autoCountdown
          onClose={() => {
            this.setState({ showPopup: false })
          }}
          onDismiss={() => {
            this.setState({ error: null })
          }}
          onSubmit={this._onSubmit.bind(this)}
          onSend={this._onSend.bind(this)}
          ref={(ref) => {
            this.captha = ref
          }}
        >
          {slot}
        </MDCaptcha>
      </View>
    )
  }
}
