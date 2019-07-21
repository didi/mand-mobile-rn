import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MDWaterMark } from 'mand-mobile-rn'

export default class BaseWaterMarkDemo extends React.Component {
  static navigationOptions = {
    title: 'WaterMark',
  }

  render() {
    return (
      <View style={styles.content}>
        <MDWaterMark>
          <Text style={styles.text}>我想你一定很忙,所以只看前三个字就好了</Text>
          <Text style={styles.text}>跟你说一个坏消息 什么坏消息 我对你的思想已经不单纯了</Text>
          <Text style={styles.text}>莫文蔚的阴天 孙燕姿的雨天 周杰伦的晴天 都不如你和我聊天</Text>
        </MDWaterMark>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: '#f8f8f8',
  },
  text: {
    margin: 20,
  },
})
