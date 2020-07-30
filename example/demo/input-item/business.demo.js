import * as React from 'react'
import { MDField, MDInputItem } from '../../../src'

export default class BussinessInputDemo extends React.Component {
    static navigationOptions = {
      title: '业务场景输入框',
    }

    render() {
      return (
        <MDField title="业务场景输入框">
          <MDInputItem
            placeholder="bankCard xxxx xxxx xxxx xxxx"
            title="银行卡"
            type="bank-card"
            numberKeyboard
          />
          <MDInputItem
            placeholder="phone xxx xxxx xxxx"
            title="手机号"
            type="phone"
          />
          <MDInputItem
            placeholder="money xx,xxx.xxxx"
            title="金额"
            type="money"
            amount
          />
          <MDInputItem placeholder="digit 0123456789" title="数字" type="digit" />
          <MDInputItem
            placeholder="password *********"
            title="密码"
            type="password"
          />
          <MDInputItem
            placeholder="其他标准 html input 类型"
            title="邮箱"
            type="email-address"
          />
        </MDField>
      )
    }
  }
