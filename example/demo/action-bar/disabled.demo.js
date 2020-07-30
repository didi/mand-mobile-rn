import * as React from 'react'
import { MDActionBar } from '../../../src'

export default class DisabledActionBarDemo extends React.Component {
  render() {
    const actions = [
      {
        text: '次要按钮',
        disabled: true,
      },
      {
        text: '主要按钮',
        disabled: true,
      },
    ]
    return <MDActionBar actions={actions} />
  }
}
