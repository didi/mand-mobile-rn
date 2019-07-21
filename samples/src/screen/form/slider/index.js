import React from 'react'
import BaseSliderDemo from '../../../../demo/slider/base.demo'
import FormatSliderDemo from '../../../../demo/slider/format.demo'
import DisabledSliderDemo from '../../../../demo/slider/disabled.demo'
import StepSliderDemo from '../../../../demo/slider/step.demo'
import RangeSliderDemo from '../../../../demo/slider/range.demo'
import BorderSliderDemo from '../../../../demo/slider/border.demo'
import { StyleSheet, View, ScrollView } from 'react-native'

export class SliderScreen extends React.Component {
  static navigationOptions = {
    title: 'Slider',
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <BaseSliderDemo />
          <FormatSliderDemo />
          <DisabledSliderDemo />
          <StepSliderDemo />
          <RangeSliderDemo />
          <BorderSliderDemo />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
  },
})
