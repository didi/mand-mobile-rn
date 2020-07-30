import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseDialogDemo from '../../../demo/dialog/base.demo'
import SingleDialogDemo from '../../../demo/dialog/single.demo'

export class DialogScreen extends React.Component {
  static navigationOptions = {
    title: 'Dialog',
  }

  render() {
    return (
      <Container>
        <Card title="Base">
          <BaseDialogDemo />
        </Card>
        <Card title="Single">
          <SingleDialogDemo />
        </Card>
      </Container>
    )
  }
}
