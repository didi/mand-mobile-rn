import * as React from 'react'
import { MDIcon } from '../../../src'
import { View, Text } from 'react-native'
import style from './style'

export default () => {
    return (
      <View style={style.wrap}>
        <View style={style.iconWrap}>
          <MDIcon name='security' color='gray' size={24} />
          <Text style={style.text}>gray</Text>
        </View>
        <View style={style.iconWrap}>
          <MDIcon name='security' color='orange' size={24} />
          <Text style={style.text}>orange</Text>
        </View>
        <View style={style.iconWrap}>
          <MDIcon name='security' color='blue' size={24} />
          <Text style={style.text}>blue</Text>
        </View>
        <View style={style.iconWrap}>
          <MDIcon name='security' color='purple' size={24} />
          <Text style={style.text}>purple</Text>
        </View>
      </View>
    )
}
