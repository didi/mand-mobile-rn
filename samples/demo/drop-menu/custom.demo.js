import * as React from 'react'
import { View, Text } from 'react-native'
import { MDDropMenu } from 'mand-mobile-rn'
// 基础下拉菜单
export default class CustomDropMenuDemo extends React.Component {
  render() {
    let data = [
      {
        text: '一级选项1',
        options: [
          { value: '0', label: '二级选项1' },
          { value: '1', label: '二级选项2' },
        ],
      },
    ]
    return (
      <View
        style={{
          borderWidth: 0,
          borderColor: 'rgb(197, 202, 213)',
          backgroundColor: 'rgb(197, 202, 213)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MDDropMenu
          style={{ backgroundColor: '#FFF' }}
          data={data}
          alignCenter={true}
          change={(dropMenuData, selectOption) => {}}
        >
          Default
        </MDDropMenu>
        <View style={{ flexWrap: 'wrap', flex: 1, height: 100, width: '100%' }}>
          <Text style={{ textAlign: 'center', fontSize: 50 }}>内容区</Text>
        </View>
      </View>
    )
  }
}
