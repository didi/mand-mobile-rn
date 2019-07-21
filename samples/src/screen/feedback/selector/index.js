import React from 'react'
import { View } from 'react-native'
import BaseSelectorDemo from '../../../../demo/selector/base.demo'
import ConfirmSelectorDemo from '../../../../demo/selector/confirm.demo'
import CheckSelectorDemo from '../../../../demo/selector/check.demo'
import CustomSelectorDemo from '../../../../demo/selector/custom.demo'
export class SelectorScreen extends React.Component {
  static navigationOptions = {
    title: 'Selector',
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          paddingTop: 0,
          backgroundColor: '#F9F9F9',
        }}
      >
        <BaseSelectorDemo />
        <ConfirmSelectorDemo />
        <CheckSelectorDemo />
        <CustomSelectorDemo />
      </View>
    )
  }
}
