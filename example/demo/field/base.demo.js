import * as React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { MDIcon, MDField, MDFieldItem } from '../../../src'
import styles from './styles'

// 点击事件
let onClick = () => {
  Alert.alert('click event')
}

// 点击事件
let onPress = () => {
  Alert.alert('Alert Title')
}

export default class BaseFieldDemo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MDField
          title="区域标题"
          brief="区域描述性文本，可根据具体场景配置"
          action={
            <TouchableOpacity style={styles.actionContainer} onPress={onClick}>
              <Text>操作</Text>
              <MDIcon name="rectangle" />
            </TouchableOpacity>
          }
        >
          <MDFieldItem solid title="标题区域" placeholder="提示文本" />

          <MDFieldItem
            solid
            title="标题区域"
            content="内容文本"
            addon="次要信息"
          />

          <MDFieldItem solid title="附加内容" content="正文内容">
            <Text style={styles.child}>这是子内容区域</Text>
          </MDFieldItem>

          <MDFieldItem solid title="动作条目" arrow onPress={onPress} />

          <MDFieldItem
            solid
            title="禁用条目"
            content="内容禁用状态"
            arrow
            disabled
          />
        </MDField>
      </View>
    )
  }
}
