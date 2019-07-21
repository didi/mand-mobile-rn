import React from 'react';
import { Image, View } from 'react-native';
import { MDLandscape, MDButton } from 'mand-mobile-rn';
import sty from './style'

export default class NoMaskDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: ''}
  }

  render () {
    return (
      <View>
        <MDButton style={sty.margin} onPress={()=>this.setState({show: 'NoMask'})}>无蒙层</MDButton>
        <MDLandscape isVisible={this.state.show === 'NoMask'} hasMask={false}>
          <Image
            source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
            style={{width: 252, height: 328}}
          />
        </MDLandscape>
      </View>
    )
  }
}