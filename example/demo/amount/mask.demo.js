import * as React from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import { MDAmount, MDIcon } from '../../../src'
import sty from './style'

export default class MaskAmountDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      iconName: 'visible',
      mask: false,
    }
  }
  render () {
    return (
      <View style={[sty.container, this.props.style]}>
        <MDAmount
          amount={120983.8928}
          precision={4}
          symbol='€ '
          decimal='. '
          thousand=' '
          fontSize={22}
          fontHeight={22}
          color='orange'
          mask={this.state.mask}
        />
        <TouchableHighlight underlayColor='#fff' onPress={this.onPress.bind(this)}>
          <View>
            <MDIcon name={this.state.iconName} size={20} style={{ marginLeft: 10}} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  onPress () {
    const { iconName, mask } = this.state
    this.setState({
      iconName: iconName === 'visible' ? 'invisible' : 'visible',
      mask: !mask,
    })
  }
}
