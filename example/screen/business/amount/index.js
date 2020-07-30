import React from 'react';
import BaseAmountDemo from '../../../demo/amount/base.demo'
import FormatAmountDemo from '../../../demo/amount/format.demo'
import MaskAmountDemo from '../../../demo/amount/mask.demo'
import AnimatedDemo from '../../../demo/amount/anim.demo'
import Card from '../../../components/card'
import Container from '../../../components/container'

export class AmountScreen extends React.Component {
  static navigationOptions = {
    title: 'Amount',
  };

  render() {
    return (
      <Container>
        <Card title='Base'>
          <BaseAmountDemo />
        </Card>
        <Card title='Format'>
          <FormatAmountDemo />
        </Card>
        <Card title='Toggle/Mask'>
          <MaskAmountDemo />
        </Card>
        <Card title='Animated'>
          <AnimatedDemo />
        </Card>
      </Container>
    );
  }
}
