import React from 'react'
import { Dimensions } from 'react-native'
import { MDProgress } from '../../../src'

export default class AnimateDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      progress: 0.2,
      isAnimate: false,
    }
  }

  render() {
    this._startAnimatedFill()
    return (
      <MDProgress
        progress={this.state.progress}
        animate={this.state.isAnimate}
        itemWidth={Dimensions.get('window').width - 50}
      >
        Progress
      </MDProgress>
    )
  }

  _startAnimatedFill() {
    setTimeout(() => {
      this.setState({
        progress: 0.8,
        isAnimate: true,
      })
    }, 2000)
  }
}
