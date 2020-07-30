import * as React from 'react'
import { MDIcon } from '../../../src'
import { View, Text } from 'react-native'
import fonts from './fonts'
import style from './style'

export default () => {
  let icons = []

  for (let i = 0, len = fonts.length; i < len; i++) {
    const name = fonts[i]
    icons.push(
      <View key={i} style={style.iconWrap}>
        <MDIcon name={name} color='purple' size={24}/>
        <Text style={style.text}>{name}</Text>
      </View>
    )
  }

  return (
    <View style={style.wrap}>
      {icons}
    </View>
  )
}
