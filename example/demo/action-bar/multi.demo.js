import * as React from 'react'
import { MDActionBar } from '../../../src'

export default class MultiActionBarDemo extends React.Component {
  render() {
    const actions = [
      {
        text: '次要按钮',
        onPress: this.props.onPress,
      },
      {
        text: '主要按钮',
        onPress: this.props.onPress,
      },
    ]
    return <MDActionBar actions={actions} />
  }
}
