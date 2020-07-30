import * as React from 'react'
import { View, Text } from 'react-native'
import { MDNoticeBar } from '../../../src'
import styles from './styles'

export default class ScrollNoticebarDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>滚动播放</Text>
        <MDNoticeBar mode="close" left="volumn" scrollable>
          为了确保您的资金安全，请设置支付密码
        </MDNoticeBar>
      </View>
    )
  }
}
