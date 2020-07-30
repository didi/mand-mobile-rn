import * as React from 'react'
import { MDIcon } from '../../../src'
import { View, Text } from 'react-native'
import style from './style'

export default (props) => {
  return (
    <View style={style.iconWrap}>
      <MDIcon {...props} />
      <Text style={style.text}>{props.name}</Text>
    </View>
  )
}
