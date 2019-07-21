import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { MDSlider } from 'mand-mobile-rn'
const sliderWidth = Dimensions.get('window').width - 70 // slider组件的宽度 container的paddingLeft和paddingRight各15, sliderWrapper的paddingLeft和paddingRight各20

export default class BaseSliderDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.sliderDesc}>{'基本'}</Text>
        <View style={styles.sliderWrapper}>
          <MDSlider width={sliderWidth} onChange={this._onChange.bind(this)} />
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
