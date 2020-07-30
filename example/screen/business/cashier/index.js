import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import {
  MDCashier,
  MDField,
  MDRadioList,
  MDInputItem,
  MDSwitch,
  MDCellItem,
  MDButton,
  MDIcon,
  MDNoticeBar,
} from '../../../../src'
import Container from '../../../components/container'
import bank from '../../../demo/input-item/bank'

export class CashierScreen extends React.Component {
  static navigationOptions = {
    title: 'Cashier',
  }

  constructor(props) {
    super(props)
    this.state = {
      scene: 'choose',
      checkIndex: 0,
      result: true,
      account: '100.00',
      captha: false,
      showPopup: false,
      options: [
        {
          value: true,
          label: '支付成功',
        },
        {
          value: false,
          label: '支付失败',
        },
      ],
    }
    this.cachier = undefined
  }

  channels = [
    {
      icon: <MDIcon svgXmlData={bank.cmb} svg size={24} />,
      text: '招商银行(0056)',
      value: '001',
    },
    {
      icon: <MDIcon svgXmlData={bank.alipay} svg size={24} />,
      text: '支付宝支付',
      value: '002',
    },
    {
      icon: <MDIcon svgXmlData={bank.wepay} svg size={24} />,
      text: '微信支付',
      value: '003',
    },
    {
      icon: <MDIcon svgXmlData={bank.icbc} svg size={24} />,
      text: '工商银行',
      value: '004',
    },
    {
      icon: <MDIcon svgXmlData={bank.abc} svg size={24} />,
      text: '农业银行',
      value: '005',
    },
  ]

  _renderChannel(channel, index) {
    const { checkIndex } = this.state
    const checked = checkIndex === index

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({ checkIndex: index })
        }}
        key={index}
      >
        <View style={styles.itemWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {channel.icon ? (
              <MDIcon svgXmlData={channel.icon} svg size={24} />
            ) : null}
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
    )
  }

  _onPressPay() {
    if (!this.state.captha) {
      this.cachier.next('loading')
      this.setState({ scene: 'loading' })
      setTimeout(() => {
        this.cachier.next(this.state.result ? 'success' : 'fail')
        this.setState({ scene: this.state.result ? 'success' : 'fail' })
      }, 5000)
    } else {
      this.cachier.next('captcha', {
        text: 'Verification code sent to 156 **** 8965',
        brief: 'The latest verification code is still valid',
        autoCountdown: false,
        countNormalText: 'Send Verification code',
        countActiveText: 'Retransmission after {$1}s',
        onSend: () => {},
        onSubmit: (code) => {
          if (code === '1234') {
            this.cachier.next('loading')
            this.setState({ scene: 'loading' })
            setTimeout(() => {
              this.cachier.next(this.state.result ? 'success' : 'fail')
              this.setState({ scene: this.state.result ? 'success' : 'fail' })
            }, 5000)
          } else {
            if (this.cachier.captha) {
              this.cachier.captha.setError('验证码输入错误，请重新输入')
            }
          }
        },
      })
      this.setState({ scene: 'captcha' })
    }
  }

  _onShowCashier() {
    this.setState({ showPopup: true })
  }

  render() {
    const { scene, account } = this.state
    return (
      <Container>
        <MDField title="支付结果">
          <MDRadioList
            options={this.state.options}
            defaultValue={this.state.result}
            onChange={(value, index) => {
              this.setState({ result: value })
            }}
          />
        </MDField>
        <MDField title="支付配置">
          <MDInputItem
            placeholder="支付金额"
            title="支付金额"
            align="right"
            defaultValue={this.state.account}
            onChangeText={(name, text) => {
              this.setState({ account: text })
            }}
          />
          <MDCellItem
            title="发送验证码"
            right={
              <MDSwitch
                checked={this.state.captha}
                width={50}
                height={30}
                onChange={(checked) => {
                  this.setState({ captha: checked })
                }}
              />
            }
          />
        </MDField>
        <MDButton
          style={{ marginVertical: 10 }}
          onPress={this._onShowCashier.bind(this)}
        >
          唤起收银台
        </MDButton>
        <MDCashier
          visible={this.state.showPopup}
          channelData={this.channels}
          // renderChannel={this._renderChannel.bind(this)}
          paymentAmount={+account}
          channelLimit={2}
          payButtonText="发起支付"
          header={
            scene === 'choose' ? (
              <MDNoticeBar mode="close" icon="security" type="warning">
                该银行3:00-12:00系统维护，请更换其他银行卡
              </MDNoticeBar>
            ) : null
          }
          onDismiss={() => {
            this.setState({
              showPopup: false,
              resultValue: undefined,
              scene: 'choose',
            })
          }}
          onPay={this._onPressPay.bind(this)}
          onSelect={(index) => {
            console.info('选择了index', index)
          }}
          ref={(ref) => {
            this.cachier = ref
          }}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
})
