import * as React from 'react'
import { View } from 'react-native'
import { MDButton } from 'mand-mobile-rn'
import sty from './style'

export default class BaseButtonDemo extends React.Component {
  render() {
    return (
      <View style={sty.container}>
        <MDButton style={sty.margin} onPress={this.props.onPress}>Default</MDButton>
        <MDButton style={sty.margin}>Default not onPress</MDButton>
        <MDButton style={sty.margin} inactive={true}>Default Inactive</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='primary'>Primary</MDButton>
        <MDButton style={sty.margin} type='primary' inactive={true}>Primary Inactive</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='warning'>Warning</MDButton>
        <MDButton style={sty.margin} type='warning' inactive={true}>Warning Inactive</MDButton>
        <MDButton style={sty.margin} type='disabled'>Disabled</MDButton>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' icon='edit'>Primary</MDButton>
      </View>
    )
  }
}