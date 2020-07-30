import * as React from 'react'
import { View, Text } from 'react-native'
import { MDNoticeBar } from '../../../src'
import styles from './styles'

export default class StyleNoticebarDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>样式</Text>
        <MDNoticeBar mode="close" left="security" type="warning">
          该银行3:00-12:00系统维护，请更换其他银行卡
        </MDNoticeBar>
        <View style={{ marginTop: 10 }} />
        <MDNoticeBar mode="arrow-right" left="coupon" type="activity">
          该银行3:00-12:00系统维护，请更换其他银行卡
        </MDNoticeBar>
      </View>
    )
  }
}
