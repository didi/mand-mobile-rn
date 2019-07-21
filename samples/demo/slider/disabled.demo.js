import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { MDSlider } from 'mand-mobile-rn'
const sliderWidth = Dimensions.get('window').width - 70 // slider组件的宽度 container的paddingLeft和paddingRight各15, sliderWrapper的paddingLeft和paddingRight各20

export default class DisabledSliderDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.sliderDesc}>{'禁用'}</Text>
        <View style={styles.sliderWrapper}>
          <MDSlider
            width={sliderWidth}
            endValue={50}
            disabled={true}
          />
        </View>
      </View>
    )
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
