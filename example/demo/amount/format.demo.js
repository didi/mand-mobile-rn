import * as React from 'react'
import { View } from 'react-native'
import { MDAmount } from '../../../src'
import sty from './style'

export default class FormatAmountDemo extends React.Component {
  render () {
    return (
      <View style={[sty.container, this.props.style]}>
        <MDAmount
          amount={120983.8928}
          precision={2}
          symbol='¥'
          thousand=' '
          fontSize={40}
          fontFamily='Helvetica Neue'
          color='blue'
        />
      </View>
    )
  }
}
