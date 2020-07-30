import * as React from 'react'
import { View } from 'react-native'
import { MDCellItem } from '../../../src'
import { default as inputItems } from './_items'

export default class BaseInputItemDemo extends React.Component {
  render() {
    const { navigation } = this.props
    const cellItems = inputItems.map(item => {
      return (
        <MDCellItem
          title={item.name + '-' + item.ccname}
          arrow
          onPress={() => {
            navigation.navigate(item.path)
          }}
        />
      );
    });
    return (
      <View>
        { cellItems }
      </View>
    )
  }
}
