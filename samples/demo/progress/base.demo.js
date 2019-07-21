import React from 'react'
import { MDProgress } from 'mand-mobile-rn'

export default class BaseDemo extends React.Component {
  render() {
    return (
      <MDProgress progress={0.9} animate={true} itemWidth={300}>
        Progress
      </MDProgress>
    )
  }
}
