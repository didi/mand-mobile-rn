import * as React from 'react'
import { MDTip, MDButton } from 'mand-mobile-rn'

export default class TipOtherDemo extends React.Component {
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
