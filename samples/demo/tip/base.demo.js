import * as React from 'react'
import { MDTip, MDButton } from 'mand-mobile-rn'

export default class TipDemo extends React.Component {
  render() {
    return (
      <MDTip content="不错喔" icon="">
        <MDButton type="default">点击我</MDButton>
      </MDTip>
    )
  }
}

export class TipLeftDemo extends React.Component {
  render() {
    return (
      <MDTip content="不错哟" placement="left" icon="">
        <MDButton type="default" style={{ width: 100 }}>
          点击我
        </MDButton>
      </MDTip>
    )
  }
}

export class TipRightDemo extends React.Component {
  render() {
    return (
      <MDTip
        content="点击拼车更有优惠，拼成还可能获得随机礼包"
        placement="right"
        icon=""
      >
        <MDButton type="default" style={{ width: 100 }}>
          点击我
        </MDButton>
      </MDTip>
    )
  }
}
export class TipBottomDemo extends React.Component {
  render() {
    return (
      <MDTip content="不错哦" placement="bottom" icon="">
        <MDButton type="default">点击我</MDButton>
      </MDTip>
    )
  }
}
export class TipOtherDemo extends React.Component {
  onShow() {
    console.info('显示')
  }
  onHide() {
    console.info('隐藏')
  }
  render() {
    return (
      <MDTip
        content="完善信息，领取5元免息券"
        fill
        onShow={this.onShow.bind(this)}
        onHide={this.onHide.bind(this)}
        icon="security"
      >
        <MDButton type="default">点击我</MDButton>
      </MDTip>
    )
  }
}
