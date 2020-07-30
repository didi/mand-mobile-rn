import * as React from 'react'
import { View, Text } from 'react-native'
import { MDSteps, MDIcon, MDAmount } from '../../../src'

export default class CustomContentDemo extends React.Component {
  render = () => {
    const steps = [{ name: '还款申请已提交' }, { name: '还款成功' }]
    const renderIcon = (st, index) => {}

    const _customName = (txt) => (
      <Text style={{ color: '#41485d', fontSize: 20, width: 300 }}>{txt}</Text>
    )
    const _amount = (amount) => (
      <View
        style={{
          marginTop: 12,
          marginBottom: 5,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <MDAmount amount={amount} precision={2} color="#41485d" fontSize={40} />
        <Text
          style={{ fontSize: 14, marginLeft: 5, position: 'relative', top: -7 }}
        >
          元
        </Text>
      </View>
    )

    const _desc = (
      <View style={{ width: 300 }}>
        {_amount(600.06)}
        <Text style={{ color: '#666', fontSize: 14 }}>
          银行处理中，预计30分钟内到账，请留意短信信息。如有疑问，请联系客服。
        </Text>
      </View>
    )

    const titleRender = (st, index) => {
      if (index === 0) {
        return _customName('还款申请已提交2')
      }
    }

    const briefRender = (st, index) => {
      if (index === 0) {
        return _desc
      }
    }

    return (
      <MDSteps
        steps={steps}
        current={0}
        direction="vertical"
        iconRender={renderIcon}
        titleRender={titleRender}
        briefRender={briefRender}
      />
    )
  }
}
