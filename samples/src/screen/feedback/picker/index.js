import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import Single from '../../../../demo/picker/single.demo'
import Cascade from '../../../../demo/picker/cascade.demo'
import TabDemo from '../../../../demo/picker/tab.demo'

export class PickerScreen extends React.Component {
  static navigationOptions = {
    title: 'Picker',
  }

  render() {
    return (
      <Container>
        <Single />
        <Card title="联动数据">
          <Cascade />
        </Card>
        <Card title="弹窗展示">
          <TabDemo />
        </Card>
      </Container>
    )
  }
}
