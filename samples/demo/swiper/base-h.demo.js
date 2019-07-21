import React, { createRef } from 'react';
import { Text, View } from 'react-native';
import { MDSwiper, MDSwiperItem, MDButton } from 'mand-mobile-rn';
import styles from './styles'
import data from './simple.data'

export default class BaseHorizontalDemo extends React.Component {

  swiper = createRef()

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
        <View style={{justifyContent: 'flex-start', marginBottom: 7}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <MDButton size="tiny" type="primary" onPress={this._goto.bind(this)} style={{marginBottom: 5}}>Goto 2</MDButton>
            <MDButton size="tiny" type="primary" onPress={this._play.bind(this)} style={{marginBottom: 5}}>Play</MDButton>
            <MDButton size="tiny" type="primary" onPress={this._stop.bind(this)} style={{marginBottom: 5}}>Stop</MDButton>
          </View>
          <Text style={{fontSize: 12, fontWeight: '300', color: '#666f83',marginTop: 5}}>10秒后异步加载更多项，20秒后重置为初始数量</Text>
        </View>
        <View style={{width: 300, height: 200}}>
          <MDSwiper
            ref={this.swiper}
            width={300}
            height={200}
            onBeforeChange={this._beforeChange.bind(this)}
            onAfterChange={this._afterChange.bind(this)}
          >
            {items}
          </MDSwiper>
        </View>
      </View>
    )
  }

  _goto () {
    // console.log(this.swiper.current.goto);
    this.swiper.current.goto(2)
  }
  
  _play () {
    // console.log(this.swiper.current.goto);
    this.swiper.current.play()
  }

  _stop () {
    // console.log(this.swiper.current.goto);
    this.swiper.current.stop()
  }

  _beforeChange (from, to) {
    // console.log('----_beforeChange', from, to);
  }

  _afterChange (from, to) {
    // console.log('----_afterChange', from, to);
  }
}
