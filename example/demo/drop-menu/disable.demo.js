import * as React from 'react'
import { View } from 'react-native'
import { MDDropMenu } from '../../../src'
// 初始下拉菜单
export default class DisableDropMenuDemo extends React.Component {
  render() {
    let data = [
      {
        text: '1.8L',
        options: [
          { value: '1.6', checked: false, label: '1.6L' },
          { value: '1.8', checked: false, label: '1.8L' },
          { value: '2.0', checked: true, label: '2.0L' },
          { value: '1.2', disabled: true, checked: false, label: '1.2T' },
          { value: '1.4', checked: false, label: '1.4T' },
        ],
      },
      {
        text: '自动挡',
        disabled: true,
        options: [
          { value: '0', label: '手动挡' },
          { value: '1', label: '自动挡' },
          { value: '2', label: '手动一体' },
        ],
      },
    ]
    return (
      <View>
        <MDDropMenu data={data}>Default</MDDropMenu>
      </View>
    )
  }
}
