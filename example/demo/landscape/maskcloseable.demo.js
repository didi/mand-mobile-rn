import React from 'react';
import { Image, View } from 'react-native';
import { MDLandscape, MDButton } from '../../../src';
import sty from './style'

export default class MaskClosableDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: ''}
  }

  render () {
    return (
      <View>
        <MDButton style={sty.margin} onPress={()=>this.setState({show: 'MaskClosable'})}>点击蒙层关闭</MDButton>
        <MDLandscape isVisible={this.state.show === 'MaskClosable'} maskClosable>
          <Image
            source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
            style={{width: 252, height: 328}}
          />
        </MDLandscape>
      </View>
    )
  }
}

