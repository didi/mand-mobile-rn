import * as React from 'react'
import { View, Text } from 'react-native'
import { MDTabs, MDTabPane } from '../../../src'
import styles from './styles'

export default class BaseTabBarDemo extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>基础</Text>
        <MDTabs hasInk>
          <MDTabPane name={0} label="第一章">
            <View style={styles.content}>
              <Text style={styles.text}>
                她对他很满意。走吧。好。他起身买单，腿却一拐一拐的。难怪他才华横溢，事业有成，却还是单身。趁着他买单，她赶紧悄悄走了。
              </Text>
            </View>
          </MDTabPane>
          <MDTabPane name={1} label="第二章">
            <View style={styles.content}>
              <Text style={styles.text}>
                又是一年，她又遇到了他，他正牵着孩子的手，走的飞快。
              </Text>
            </View>
          </MDTabPane>
          <MDTabPane name={2} label="第三章" disabled>
            <View style={styles.content}>
              <Text style={styles.text}>
                你的腿？她有些诧异。腿？我的腿怎么了？他更诧异。后来，她才知道他的腿，那天只是坐麻了而已。
              </Text>
            </View>
          </MDTabPane>
        </MDTabs>
      </View>
    )
  }
}
