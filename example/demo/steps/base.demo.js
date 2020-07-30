import * as React from 'react'
import { View } from 'react-native'
import { MDSteps } from '../../../src'

export default class Base extends React.Component {
  render() {
    const steps = [
      {
        title: '登录/注册',
      },
      {
        title: '申请征信报告',
      },
      {
        title: '提取征信报告',
      },
    ]
    return <MDSteps steps={steps} />
  }
}
