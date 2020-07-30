import React from 'react';
import { Text, View } from 'react-native';
import { MDSwiper, MDSwiperItem, MDButton } from '../../../src';
import styles from './styles'
import data from './simple.data'

export default class FadeDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: ''}
  }

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
          transition="fade"
          ref={this.swiper}
          width={300}
          height={200}
        >
          {items}
        </MDSwiper>
      </View>
    )
  }
}
