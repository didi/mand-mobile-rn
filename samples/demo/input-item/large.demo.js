import * as React from 'react'
import { Text, Alert } from 'react-native'
import { MDField, MDInputItem, MDFieldItem } from 'mand-mobile-rn'

export default class LargeSizeInputDemo extends React.Component {
    static navigationOptions = {
      title: '大尺寸金融表单',
    }
  
    constructor(props) {
      super(props)
      this.state = {
        value: '',
      }
    }
  
    render() {
      return (
        <MDField title="大尺寸金融表单">
          <MDFieldItem title="转出金额(元)" />
          <MDInputItem
            placeholder="最多30万元"
            brief="理财提示文案，字符超出10个自动变小"
            type="money"
            size={this.state.value.length > 10 ? 'normal' : 'large'}
            amount
            right={
              <Text
                style={{ color: '#5878b4', fontSize: 14 }}
                onPress={() => {
                  Alert.alert('以6222开头')
                }}
              >
                全部取出
              </Text>
            }
            highlight
            onChangeText={(name, text) => {
              this.setState({ value: text })
            }}
          />
        </MDField>
      )
    }
  }