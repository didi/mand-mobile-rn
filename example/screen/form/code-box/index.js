import React from 'react'
import { MDCodeBox } from '../../../../src'
import Card from '../../../components/card'
import Container from '../../../components/container'

export class CodeBoxScreen extends React.Component {
  static navigationOptions = {
    title: 'CodeBox',
  }

  render() {
    return (
      <Container>
        <Card title="基本">
          <MDCodeBox maxlength={4} />
        </Card>
        <Card title="掩码遮蔽">
          <MDCodeBox maxlength={6} security />
        </Card>
        <Card title="禁用">
          <MDCodeBox maxlength={4} disabled />
        </Card>
        <Card title="不限长度">
          <MDCodeBox maxlength={-1} />
        </Card>
        <Card title="系统键盘">
          <MDCodeBox maxlength={-1} system security />
        </Card>
      </Container>
    )
  }
}
