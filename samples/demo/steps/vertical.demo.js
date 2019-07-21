import * as React from 'react'
import { MDSteps, MDIcon } from 'mand-mobile-rn'

export default class VerticalDemo extends React.Component {
  render = () => {
    const steps = [
      { title: '登录', brief: '这是登录的描述' },
      { title: '开通', brief: '这是开通的描述' },
      { title: '验证', brief: '这是验证的描述' },
      { title: '成功', brief: '这是成功的描述' },
    ]
    return <MDSteps steps={steps} direction="vertical" current={1.3} />
  }
}
