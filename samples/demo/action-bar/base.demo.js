import * as React from 'react'
import { MDActionBar } from 'mand-mobile-rn'

export default class BaseActionBarDemo extends React.Component {
  render() {
    const actions = [
      {
        text: '主要按钮',
        onPress: this.props.onPress,
      },
    ]
    return <MDActionBar actions={actions} />
  }
}
