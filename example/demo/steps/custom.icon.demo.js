import * as React from 'react'
import { MDSteps, MDIcon } from '../../../src'

export default class CustomIcon extends React.Component {
  render = () => {
    const steps = [
      { title: '登录' },
      { title: '开通' },
      { title: '验证' },
      { title: '成功' },
    ]
    const renderIcon = (st, index) => {
      if (st === 'current') {
        return (
          <MDIcon
            name="location"
            color="#2F86F6"
            size={28}
            style={{ position: 'relative', top: -12 }}
          />
        )
      }
      if (st === 'reached') {
        if (index === 1) {
          return <MDIcon name="checked" color="#2F86F6" />
        }
      }
    }
    return <MDSteps steps={steps} current={2} iconRender={renderIcon} />
  }
}
