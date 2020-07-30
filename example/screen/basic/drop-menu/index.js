import React from 'react'
import Card from '../../../components/card'
import Container from '../../../components/container'
import BaseDropMenuDemo from '../../../demo/drop-menu/base.demo'
import CustomDropMenuDemo from '../../../demo/drop-menu/custom.demo'
import DisableDropMenuDemo from '../../../demo/drop-menu/disable.demo'
import InitDropMenuDemo from '../../../demo/drop-menu/init.demo'

export class DropMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'DropMenu',
  }

  render() {
    return (
      <Container>
        <Card title="基础下拉菜单">
          <BaseDropMenuDemo />
        </Card>
        <Card title="初始下拉菜单">
          <InitDropMenuDemo onPress={this.handlePress} />
        </Card>
        <Card title="禁用下拉菜单">
          <DisableDropMenuDemo />
        </Card>
        <Card title="自定义菜单项">
          <CustomDropMenuDemo />
        </Card>
      </Container>
    )
  }
}
