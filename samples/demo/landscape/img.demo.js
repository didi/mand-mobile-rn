import React from 'react';
import { Image, View } from 'react-native';
import { MDLandscape, MDButton } from 'mand-mobile-rn';
import sty from './style'

export default class ImgDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false}
  }

  render () {
    return (
      <View>
        <MDButton style={sty.margin} onPress={() => this.setState({show: true})}>图片广告</MDButton>
        <MDLandscape isVisible={this.state.show}>
          <Image
            source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
            style={{width: 252, height: 328}}
          />
        </MDLandscape>
      </View>
    );
  }
}
