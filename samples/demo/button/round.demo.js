import * as React from 'react'
import { View, Platform } from 'react-native'
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
        <MDButton
          style={sty.margin}
          onPress={this.props.onPress}
          type='primary'
          round={true}
          plain
          gradientStyle={
            Platform.OS === 'web'
              ? null
              : {
                  colors: ['#FC7353', '#FC9153'],
                  start: { x: 0.0, y: 0.5 },
                  end: { x: 1.0, y: 0.5 },
                }
          }>
            Gradient & Round
          </MDButton>
      </View>
    )
  }
}
