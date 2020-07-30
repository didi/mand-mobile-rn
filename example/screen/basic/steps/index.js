import React from 'react';
import Container from '../../../components/container'
import Card from '../../../components/card'
import Base from '../../../demo/steps/base.demo'
import Current from '../../../demo/steps/current.demo'
import CurrentDecimal from '../../../demo/steps/current.decimal.demo'
import Finished from '../../../demo/steps/finished.demo'
import VerticalDemo from '../../../demo/steps/vertical.demo'
import CustomIcon from '../../../demo/steps/custom.icon.demo'
import CustomContentDemo from '../../../demo/steps/custom.content.demo'
import CustomContentDemo2 from '../../../demo/steps/custom.content.demo.2'
import AnimatedDemo from '../../../demo/steps/animated.demo'
export class StepsScreen extends React.Component {
  static navigationOptions = {
    title: 'Steps',
  };

  render () {
    return (
      <Container>
        <Card title='Base'><Base /></Card>
        <Card title='Current'><Current /></Card>
        <Card title='CurrentDecimal'><CurrentDecimal /></Card>
        <Card title='AnimatedDemo'><AnimatedDemo /></Card>
        <Card title='Finished'><Finished /></Card>
        <Card title='VerticalDemo' style={{ justifyContent: 'flex-start' }}><VerticalDemo /></Card>
        <Card title='CustomIcon'><CustomIcon /></Card>
        <Card title='CustomContentDemo'><CustomContentDemo /></Card>
        <Card title='CustomContentDemo2'><CustomContentDemo2 /></Card>
      </Container>
    )
  }
}
