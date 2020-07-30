import * as React from 'react'
import { MDTip, MDButton } from '../../../src'

export default class TipLeftDemo extends React.Component {
  render() {
    return (
      <MDTip
        content="不错哟"
        placement="left"
        icon="">
        <MDButton type="default" style={{ width: 100 }}>点击我</MDButton>
      </MDTip>
    );
  }
}
