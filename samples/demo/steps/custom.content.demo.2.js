import * as React from 'react'
import { View, Text } from 'react-native'
import { MDSteps, MDIcon, MDAmount } from 'mand-mobile-rn'

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

    const titleRender = (st, index) => {
      if (index === steps.length - 1) {
        return _customName('还款成功')
      }
    }
    const briefRender = (st, index) => {
      if (index === steps.length - 1) {
        return _amount(600.05)
      }
    }

    return (
      <MDSteps
        steps={steps}
        current={1}
        direction="vertical"
        iconRender={renderIcon}
        titleRender={titleRender}
        briefRender={briefRender}
      />
    )
  }
}
