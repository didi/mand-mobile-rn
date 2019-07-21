import * as React from 'react'
import { MDActionBar, MDAmount } from 'mand-mobile-rn'

export default class SlotActionBarDemo extends React.Component {
  render() {
    const actions = [
      {
        text: '主要按钮',
        onPress: this.props.onPress,
      },
    ]
    return (
      <MDActionBar actions={actions}>
        <MDAmount
          amount={128.0}
          precision={2}
          symbol="¥"
          thousand=" "
          fontSize={24}
          fontFamily="Helvetica Neue"
          color="#FF823A"
        />
      </MDActionBar>
    )
  }
}
