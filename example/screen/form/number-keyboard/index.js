import React from 'react';
import Container from '../../../components/container'
import NumberKeyboardDemo from '../../../demo/number-keyboard/base.demo'

export class NumberKeyboardScreen extends React.Component {
  static navigationOptions = {
    title: 'NumberKeyboard',
  };

  render() {
    return (
      <Container>
        <NumberKeyboardDemo />
      </Container>
    );
  }
}
