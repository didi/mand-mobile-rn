import React from 'react'
import Card from '../../../components/card'
import Container from '../../../components/container'
import RollerDemo from '../../../demo/activity-indicator/roller.demo'
import SpinnerDemo from '../../../demo/activity-indicator/spinner.demo'
import CarouselDemo from '../../../demo/activity-indicator/carousel.demo'

export class ActivityIndicatorScreen extends React.Component {
  static navigationOptions = {
    title: 'ActivityIndicator',
  }

  render() {
    return (
      <Container>
        <Card title="Roller">
          <RollerDemo />
        </Card>

        <Card title="Spinner">
          <SpinnerDemo />
        </Card>

        <Card title="Carousel">
          <CarouselDemo />
        </Card>
      </Container>
    )
  }
}
