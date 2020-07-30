import * as React from 'react'
import { Text, Alert } from 'react-native'
import { MDField, MDInputItem } from '../../../src'

export default class ErrorInputDemo extends React.Component {
    static navigationOptions = {
      title: '错误提示',
    }

    constructor(props) {
      super(props)
      this.state = {
        bankCard: '',
        bankError: null,
      }
    }

    render() {
      return (
        <MDField title="错误提示">
          <MDInputItem
            title="手机号码"
            placeholder="手机号码"
            type="phone"
            error="手机号码无效"
            clearable
          />
          <MDInputItem
            title="银行卡号"
            placeholder="bankCard xxxx xxxx xxxx xxxx"
            type="bank-card"
            onChangeText={(name, text) => {
              this.setState({ bankCard: text })
            }}
            onBlur={() => {
              if (this.state.bankCard.substring(0, 4) !== '6222') {
                this.setState({ bankError: '不支持当前银行' })
              } else {
                this.setState({ bankError: null })
              }
            }}
            error={
              this.state.bankError ? (
                <Text
                  style={{ color: '#5878b4', fontSize: 12, marginVertical: 10 }}
                  onPress={() => {
                    Alert.alert('以6222开头')
                  }}
                >
                  查看支持银行列表
                </Text>
              ) : null
            }
          />
        </MDField>
      )
    }
  }
