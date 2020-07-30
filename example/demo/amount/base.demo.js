import * as React from 'react'
import { View } from 'react-native'
import { MDAmount } from '../../../src'
import sty from './style'

export default class BaseAmountDemo extends React.Component {
  render () {
    return (
      <View style={[sty.container, this.props.style]}>
        <MDAmount
          amount={120983.8928}
          precision={3}
          symbol='$'
          format='%v %s'
          thousand=','
          fontSize={24}
          color='gray'
        />
      </View>
    )
  }
}
