import * as React from 'react'
import { View, Text } from 'react-native'
import { MDNoticeBar, MDIcon } from 'mand-mobile-rn'
import styles from './styles'

export default class SlotNoticebarDemo extends React.Component {
  render() {
    return (
      <View styles={{ marginBottom: 20 }}>
        <Text style={styles.title}>使用插槽自定义</Text>
        <MDNoticeBar
          left={<MDIcon name="security" color="#2F86F6" size={18} />}
        >
          为了确保您的资金安全，请设置支付密码
        </MDNoticeBar>
      </View>
    )
  }
}
