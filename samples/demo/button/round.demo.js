import * as React from 'react'
import { View } from 'react-native'
import { MDButton } from 'mand-mobile-rn'
import sty from './style'

export default class RoundButtonDemo extends React.Component {
  render() {
    return (
      <View style={sty.container}>
        <MDButton style={sty.margin} onPress={this.props.onPress} round={true}>Default & Round</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' round={true}>Primary & Round</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='warning' round={true}>Warning & Round</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='disabled' round={true}>Disabled & Round</MDButton>
      </View>
    )
  }
}