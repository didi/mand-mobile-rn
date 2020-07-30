import React from 'react';
import { Text, View } from 'react-native';
import { MDSwiper, MDSwiperItem, MDButton } from '../../../src';
import styles from './styles'
import data from './mulit-item.data'

export default class MulitItemDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: ''}
  }

  render () {
    const items = data.map((cells, index) => {
      const _cells = cells.map((cell, i) => {
        return <Text key={i} style={[{backgroundColor: cell.color}, styles.text2]} >{cell.text}</Text>
      })

      return (
        <MDSwiperItem key={index}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', width: 300, height: 200}}>
            {_cells}
          </View>
        </MDSwiperItem>
      )
    });

    return (
      <View style={styles.wrapper}>
        <MDSwiper
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
