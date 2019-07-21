import * as React from 'react'
import { View, Text } from 'react-native'
import { MDNoticeBar } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseNoticebarDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>基础</Text>
        <MDNoticeBar>为了确保您的资金安全，请设置支付密码</MDNoticeBar>
      </View>
    )
  }
}
