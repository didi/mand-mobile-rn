import * as React from 'react'
import { MDTip, MDButton } from 'mand-mobile-rn'

export default class TipRightDemo extends React.Component {
  render() {
    return (
      <MDTip
        content="点击拼车更有优惠，拼成还可能获得随机礼包"
        placement="right"
        icon="">
        <MDButton type="default" style={{ width: 100 }} >点击我</MDButton>
      </MDTip>
    );
  }
}