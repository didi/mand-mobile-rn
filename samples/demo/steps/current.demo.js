import * as React from 'react'
import { MDSteps } from 'mand-mobile-rn'

export default class Current extends React.Component {
  render = () => {
    const steps = [
      { title: '登录' },
      { title: '开通' },
      { title: '验证' },
      { title: '成功' },
    ]
    return <MDSteps steps={steps} current={2} />
  }
}
