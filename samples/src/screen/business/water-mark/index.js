import React from 'react'
import BaseWaterMarkDemo from '../../../../demo/water-mark/base.demo'
import CustomWaterMarkDemo from '../../../../demo/water-mark/custom.demo'
import { View } from 'react-native';

export class WaterMarkScreen extends React.Component {
  static navigationOptions = {
    title: 'WaterMark',
  }

  render() {
    return (
      <View>
        <BaseWaterMarkDemo />
        <CustomWaterMarkDemo />
      </View>
    )
  }
}

