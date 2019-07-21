import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseDemo from '../../../../demo/progress/base.demo'
import AnimareDemo from '../../../../demo/progress/animate.demo'

export class ProgressScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  }

  render() {
    return (
      <Container>
        <Card
          style={{ justifyContent: 'center', alignItems: 'center' }}
          title={'控件一'}
        >
          <BaseDemo />
        </Card>
        <Card
          style={{ justifyContent: 'center', alignItems: 'center' }}
          title={'控件二'}
        >
          <AnimareDemo />
        </Card>
      </Container>
    )
  }
}
