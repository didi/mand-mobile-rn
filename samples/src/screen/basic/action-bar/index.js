import React from 'react'
import BaseActionBarDemo from '../../../../demo/action-bar/base.demo'
import MultiActionBarDemo from '../../../../demo/action-bar/multi.demo'
import DisabledActionBarDemo from '../../../../demo/action-bar/disabled.demo'
import SlotActionBarDemo from '../../../../demo/action-bar/slot.demo'
import Container from '../../../components/container'
import Card from '../../../components/card'
import { Alert } from 'react-native'

export class ActionBarScreen extends React.Component {
  static navigationOptions = {
    title: 'ActionBar',
  }
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  render() {
    return (
      <Container>
        <Card title="基础">
          <BaseActionBarDemo onPress={this.handlePress} />
        </Card>
        <Card title="通栏多按钮">
          <MultiActionBarDemo onPress={this.handlePress} />
        </Card>
        <Card title="通栏多按钮禁用">
          <DisabledActionBarDemo />
        </Card>
        <Card title="通栏带文案">
          <SlotActionBarDemo onPress={this.handlePress} />
        </Card>
      </Container>
    )
  }
  handlePress(ev, index) {
    Alert.alert('Title', 'You have Pressed!')
  }
}
