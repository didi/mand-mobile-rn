import React from 'react'
import { MDActionSheet, MDButton } from '../../../src'
import { View, Alert } from 'react-native'

export default class ActionSheetDemo extends React.Component {
  dataList = []

  static navigationOptions = {
    title: 'ActionSheet',
  }

  constructor(props) {
    super(props)
    this.state = {
      showActionSheet: false,
    }
    for (let i = 0; i < 3; i++) {
      const data = {
        optionContent: '选项' + i,
        disabled: i === 2,
      }
      this.dataList.push(data)
    }
  }

  render() {
    return (
      <View>
        <MDButton
          style={{ marginLeft: 40, marginRight: 40, marginTop: 20 }}
          onPress={() => {
            this.showActionSheet(true)
          }}
        >
          唤起动作面板
        </MDButton>
        <MDActionSheet
          title={'操作说明的标题'}
          options={this.dataList}
          isVisible={this.state.showActionSheet}
          onChoose={(index, data) => {
            this.showActionSheet(false)
            setTimeout(() => {
              Alert.alert('index=' + index + ', content=' + data.optionContent)
            }, 500);
          }}
          onCancle={() => {
            this.showActionSheet(false)
            setTimeout(() => {
              Alert.alert('cancle')
            }, 500);
          }}
        />
      </View>
    )
  }
  showActionSheet(show) {
    this.setState({
      showActionSheet: show,
    })
  }
}
