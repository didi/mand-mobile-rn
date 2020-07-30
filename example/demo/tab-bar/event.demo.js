import * as React from 'react'
import { View, Text, Alert } from 'react-native'
import { MDTabBar } from '../../../src'
import styles from './styles'

export default class BaseTabBarDemo extends React.Component {
  render() {
    const items = [
      { name: 1, label: '标签1' },
      { name: 2, label: '标签2' },
      { name: 3, label: '标签3' },
    ]
    return (
      <View>
        <Text style={styles.title}>监听事件</Text>
        <MDTabBar current={0} items={items} hasInk change={this.onchange} />
      </View>
    )
  }
  onchange(item, index) {
    Alert.alert(`index: ${index}, label: ${item.label}`)
  }
}
