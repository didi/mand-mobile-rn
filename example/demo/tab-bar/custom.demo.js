import * as React from 'react'
import { View, Text } from 'react-native'
import { MDTabBar } from '../../../src'
import Custom from './components/custom.js'
import styles from './styles'

export default class CustomTabBarDemo extends React.Component {
  render() {
    const items = [
      { name: 1, label: '首页', icon: 'home' },
      { name: 2, label: '我的', icon: 'user' },
    ]
    return (
      <View>
        <Text style={styles.title}>自定义内容</Text>
        <MDTabBar current={0} items={items}>
          <Custom />
        </MDTabBar>
      </View>
    )
  }
}
