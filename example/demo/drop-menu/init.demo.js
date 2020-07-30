import * as React from 'react'
import { View, Button, TextInput, Text, findNodeHandle } from 'react-native'
import { MDDropMenu } from '../../../src'
// 初始下拉菜单
export default class InitDropMenuDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectIndex: 0,
      content: '',
    }
  }
  render() {
    let data = [
      {
        text: '1.8L',
        options: [
          { value: '1.6', checked: false, label: '1.6L' },
          { value: '1.8', checked: false, label: '1.8L' },
          { value: '2.0', checked: false, label: '2.0L' },
          { value: '1.2', checked: false, label: '1.2T' },
          { value: '1.4', checked: false, label: '1.4T' },
        ],
      },
      {
        text: '自动挡',
        options: [
          { value: '0', label: '手动挡' },
          { value: '1', label: '自动挡' },
          { value: '2', label: '手动一体' },
        ],
      },
    ]

    return (
      <View>
        <MDDropMenu ref={'mdDropMenu'} data={data}>
          Default
        </MDDropMenu>
      </View>
    )
  }
}
