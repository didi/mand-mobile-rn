import React, { createRef } from 'react';
import { Text, View } from 'react-native';
import { MDSwiper, MDSwiperItem, MDButton } from 'mand-mobile-rn';
import styles from './styles'
import data from './simple.data'

export default class BaseVerticalDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: ''}
  }

  swiper = createRef()

  render () {
    const items = data.map((item, index) => {
      return (
        <MDSwiperItem key={index}>
          <Text style={[{backgroundColor: item.color}, styles.text]} >{item.text}</Text>
        </MDSwiperItem>
      )
    });

    return (
      <View style={styles.wrapper}>
        <MDSwiper
          transition="slideY"
          ref={this.swiper}
          width={300}
          height={200}
          onBeforeChange={this._beforeChange.bind(this)}
          onAfterChange={this._afterChange.bind(this)}
        >
          {items}
        </MDSwiper>
      </View>
    )
  }

  _beforeChange (from, to) {

  }

  _afterChange (from, to) {

  }

  goto () {
    this.swiper.goto(2)
  }

  play () {
    this.swiper.play()
  }

  stop () {
    this.swiper.stop()
  }
}
