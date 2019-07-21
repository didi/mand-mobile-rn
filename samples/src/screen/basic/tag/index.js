import React from 'react';
import Card from '../../../components/card'
import Container from '../../../components/container'
import HalfRoundDemo from '../../../../demo/tag/half.demo';
import RoundDemo from '../../../../demo/tag/round.demo';
import RisedDemo from '../../../../demo/tag/raised.demo';
import GhostDemo from '../../../../demo/tag/ghost.demo';
import SpecialDemo from '../../../../demo/tag/special.demo';


export class TagScreen extends React.Component {
  static navigationOptions = {
    title: 'Tag',
  };

  render() {
    return (
      <Container>
        <Card title='半圆'>
          <HalfRoundDemo />
        </Card>
        <Card title='圆角'>
          <RoundDemo />
        </Card>
        <Card title='阳文'>
          <RisedDemo />
        </Card>  
        <Card title='线框'>
          <GhostDemo />
        </Card>
        <Card title='特殊标签'>
          <SpecialDemo />
        </Card>
      </Container>
    );
  }
}
