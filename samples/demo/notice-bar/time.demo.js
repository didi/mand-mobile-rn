import * as React from 'react'
import { View, Text } from 'react-native'
import { MDNoticeBar } from 'mand-mobile-rn'
import styles from './styles'

export default class TimeNoticebarDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>设置时间</Text>
        <Text style={styles.subtitle}>5s后隐藏</Text>
        <MDNoticeBar time={5000}>
          为了确保您的资金安全，请设置支付密码
        </MDNoticeBar>
      </View>
    )
  }
}
