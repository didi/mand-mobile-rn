import * as React from 'react'
import { View } from 'react-native'
import { MDButton } from 'mand-mobile-rn'
import sty from './style'

export default class PlainButtonDemo extends React.Component {
  render() {
    return (
      <View style={sty.container}>
        <MDButton style={sty.margin} onPress={this.props.onPress} plain={true}>Default & Plain</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' plain={true}>Primary & Plain</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='warning' plain={true}>Warning & Plain</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='disabled' plain={true}>Disabled & Plain</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' round={true} plain={true}>Primay & Plain & Round</MDButton>
      </View>
    )
  }
}