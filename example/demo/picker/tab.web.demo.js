import * as React from 'react'
import { View, Image, Text } from 'react-native'

export default class TabWebDemo extends React.Component {
  render() {
    return (
      <View style={{ width: '100%' }}>
        <Text style={{ marginBottom: 10 }}>请移步手机端 Samples</Text>
        <Image
          style={{
            width: '100%',
            height: 310,
          }}
          resizeMode="stretch"
          source={require('../../assets/web/picker_tab.gif')}
        />
      </View>
    )
  }
}
