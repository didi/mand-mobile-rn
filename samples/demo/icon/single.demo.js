import * as React from 'react'
import { MDIcon } from 'mand-mobile-rn'
import { View, Text } from 'react-native'
import style from './style'

export default class SingleIcon extends React.Component {
  render () {
    return (
      <View style={style.iconWrap}>
        <MDIcon {...this.props} />
        <Text style={style.text}>{this.props.name}</Text>
      </View>
    )
  }
}