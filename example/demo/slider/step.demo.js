import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { MDSlider } from '../../../src'
const sliderWidth = Dimensions.get('window').width - 70 // slider组件的宽度 container的paddingLeft和paddingRight各15, sliderWrapper的paddingLeft和paddingRight各20

export default class StepSliderDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.sliderDesc}>{'步长'}</Text>
        <View style={styles.sliderWrapper}>
          <MDSlider
            width={sliderWidth}
            endValue={20}
            step={5}
            onChange={this._onChange.bind(this)}
          />
        </View>
      </View>
    )
  }
  _onChange(startPrice, endPrice) {
    console.info('_onChange' + startPrice + ',' + endPrice)
  }
}

const styles = StyleSheet.create({
  sliderWrapper: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  sliderDesc: {
    marginTop: 30,
    marginBottom: 10,
  },
})
