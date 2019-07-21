import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MDWaterMark } from 'mand-mobile-rn'

export default class CustomWaterMarkDemo extends React.Component {
  static navigationOptions = {
    title: 'WaterMark',
  }

  render() {
    return (
      <View style={styles.content}>
        <MDWaterMark content="滴滴金融">
          <Text style={styles.text}>昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否？知否？应是绿肥红瘦。</Text>
          <Text style={styles.text}>此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？</Text>
          <Text style={styles.text}>行路难，行路难，多歧路，今安在？长风破浪会有时，直挂云帆济沧海。</Text>
        </MDWaterMark>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
    backgroundColor: '#f8f8f8',
  },
  text: {
    margin: 20,
  },
})
