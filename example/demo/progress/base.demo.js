import React from 'react'
import { MDProgress } from '../../../src'

export default class BaseDemo extends React.Component {
  render() {
    return (
      <MDProgress progress={0.9} animate={true} itemWidth={300}>
        Progress
      </MDProgress>
    )
  }
}
