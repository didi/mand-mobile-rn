import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { MDButton } from 'mand-mobile-rn'
import sty from './style'

export default class ButtonIconDemo extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <MDButton style={sty.margin} onPress={this.props.onPress} plain={true} size='large'>Default & Large</MDButton>
        <View style={sty.wrap}>
          <MDButton onPress={this.props.onPress} size='small'>Default</MDButton>
          <MDButton onPress={this.props.onPress} type='primary' size='small'>Primary</MDButton>
          <MDButton onPress={this.props.onPress} type='warning' size='small'>Warning</MDButton>
        </View>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='disabled' size='large' plain={true}>Disabled & Large</MDButton>
        <View style={sty.wrap}>
          <MDButton style={sty.margin} onPress={this.props.onPress} size='small' round={true} plain={true}>Round</MDButton>
          <MDButton style={sty.margin} onPress={this.props.onPress} round={true} plain={true} type='primary' size='small'>Primary</MDButton>
          <MDButton style={sty.margin} onPress={this.props.onPress} round={true} plain={true} type='warning' size='small'>Warning</MDButton>
        </View>
      </View>
    )
  }
}