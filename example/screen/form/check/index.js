import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseCheckDemo from '../../../demo/check/base.demo'
import MultiItemCheckDemo from '../../../demo/check/multi-item.demo'
import CheckBoxDemo from '../../../demo/check/box.demo'
import MultiCheckBoxDemo from '../../../demo/check/multi-box.demo'
import CheckListDemo from '../../../demo/check/list.demo'

export class CheckScreen extends React.Component {
  static navigationOptions = {
    title: 'Check',
  }

  render() {
    return (
      <Container>
        <Card title="复选项">
          <BaseCheckDemo
            onPress={(param) => {
              Alert.alert(param)
            }}
          />
        </Card>
        <Card title="复选项组">
          <MultiItemCheckDemo
            onPress={(param) => {
              Alert.alert(param)
            }}
          />
        </Card>
        <Card title="复选框">
          <CheckBoxDemo
            onPress={(param) => {
              Alert.alert(param)
            }}
          />
        </Card>
        <Card title="复选框组">
          <MultiCheckBoxDemo
            onPress={(param) => {
              Alert.alert(param)
            }}
          />
        </Card>
        <Card title="复选列表">
          <CheckListDemo
            onPress={(param) => {
              Alert.alert(param)
            }}
          />
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
