import React from 'react'
import { MDDoughnut } from '../../../src'

export default class AnimateDemo extends React.Component {
  render() {
    return (
      <MDDoughnut
        animate={true}
        radius={75}
        strokeWidth={15}
        data={[
          { color: '#28AA91', proportion: 30 },
          { color: '#5878B4', proportion: 40 },
          { color: '#FF5257', proportion: 30 },
        ]}
      />
    )
  }
}
