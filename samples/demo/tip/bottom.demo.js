import * as React from 'react'
import { MDTip, MDButton } from 'mand-mobile-rn'

export default class TipBottomDemo extends React.Component {
  render() {
    return (
      <MDTip
        content="不错哦"
        placement="bottom"
        icon="">
        <MDButton type="default">点击我</MDButton>
      </MDTip>
    );
  }
}