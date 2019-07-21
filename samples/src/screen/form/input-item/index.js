import React from 'react';
import InputItemDemo from '../../../../demo/input-item/base.demo'
import Container from '../../../components/container';

export class InputItemScreen extends React.Component {
  static navigationOptions = {
    title: 'InputItem',
  };

  render() {
    return (
      <Container style={{ paddingHorizontal: 10, backgroundColor: 'white' }}>
        <InputItemDemo navigation={this.props.navigation} />
      </Container>
    );
  }
}
