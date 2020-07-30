import React from 'react';
import Container from '../../../components/container'
import Card from '../../../components/card'
import TipDemo from '../../../demo/tip/base.demo'
import TipLeftDemo from '../../../demo/tip/left.demo'
import TipRightDemo from '../../../demo/tip/right.demo'
import TipBottomDemo from '../../../demo/tip/bottom.demo'
import TipOtherDemo from '../../../demo/tip/other.demo'


export class TipScreen extends React.Component {
  static navigationOptions = {
    title: 'Tip',
  };

  render() {
    return (
      <Container>
        <Card title='上方'>
          <TipDemo />
        </Card>
        <Card title='下方'>
          <TipBottomDemo />
        </Card>
        <Card title='左侧' style={{ alignItems: 'center' }}>
          <TipLeftDemo />
        </Card>
        <Card title='右侧' style={{ alignItems: 'center' }}>
          <TipRightDemo />
        </Card>
        <Card title='其他配置'>
          <TipOtherDemo />
        </Card>
      </Container>
    );
  }
}
