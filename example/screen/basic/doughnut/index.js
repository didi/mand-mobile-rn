import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseDemo from '../../../demo/doughnut/base.demo'
import AnimateDemo from '../../../demo/doughnut/animate.demo'

export class DoughnutScreen extends React.Component {
  static navigationOptions = {
    title: 'MDDoughnut',
  }

  render() {
    return (
      <Container>
        <Card
          style={{ justifyContent: 'center', alignItems: 'center' }}
          title={'默认'}
        >
          <BaseDemo />
        </Card>
        <Card
          style={{ justifyContent: 'center', alignItems: 'center' }}
          title={'带动画'}
        >
          <AnimateDemo />
        </Card>
      </Container>
    )
  }
}
