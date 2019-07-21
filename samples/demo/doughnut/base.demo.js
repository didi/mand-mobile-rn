import React from 'react'
import { MDDoughnut } from 'mand-mobile-rn'

export default class BaseDemo extends React.Component {
  render() {
    return (
      <MDDoughnut
        animate={false}
        radius={100}
        strokeWidth={15}
        data={[
          { color: '#28AA91', proportion: 30 },
          { color: '#5878B4', proportion: 40 },
          { color: '#FF5257', proportion: 30 },
        ]}
      >
        Custom
      </MDDoughnut>
    )
  }
}
