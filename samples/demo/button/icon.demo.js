import * as React from 'react'
import { View } from 'react-native'
import { MDButton } from 'mand-mobile-rn'
import sty from './style'

export default class ButtonSizeDemo extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <MDButton style={sty.margin} onPress={this.props.onPress} plain icon='edit' size='large'>Edit</MDButton>
        <View style={sty.wrap}>
          <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' icon='service' iconPosition='right' size='small'>Service</MDButton>
          <MDButton style={sty.margin} onPress={this.props.onPress} type='warning' icon='setting' size='small'>Setting</MDButton>
          <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' icon='security' iconPosition='right' size='small' round plain>Security</MDButton>
        </View>
        <MDButton style={sty.margin} onPress={this.props.onPress} type='disabled' icon='share' size='large' plain>Share</MDButton>
        <View style={sty.wrap}>
          <MDButton style={sty.margin} onPress={this.props.onPress} icon='share' size='large' plain />
          <MDButton style={sty.margin} onPress={this.props.onPress} type='warning' icon='edit' plain round/>
          <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' size='small' icon='close' plain round/>
          <MDButton style={sty.margin} onPress={this.props.onPress} type='primary' size='small' icon='refresh' round/>
        </View>
      </View>
    )
  }
}