import React from 'react';
import { Alert } from 'react-native';
import Card from '../../../components/card'
import ButtonBaseDemo from '../../../../demo/button/base.demo'
import RoundButtonDemo from '../../../../demo/button/round.demo'
import PlainButtonDemo from '../../../../demo/button/plain.demo'
import ButtonIconDemo from '../../../../demo/button/icon.demo'
import ButtonSizeDemo from '../../../../demo/button/size.demo'
import Container from '../../../components/container'

export class ButtonScreen extends React.Component {
  static navigationOptions = {
    title: 'Button',
  };

  _onPress() {
    Alert.alert('Title', 'You have Pressed!')
  }

  render() {
    return (
      <Container>
        <Card title='Base'>
          <ButtonBaseDemo onPress={this._onPress.bind(this)} />
        </Card>
        <Card title='Round'>
          <RoundButtonDemo onPress={this._onPress.bind(this)} />
        </Card>
        <Card title='Plain'>
          <PlainButtonDemo onPress={this._onPress.bind(this)} />
        </Card>
        <Card title='Size'>
          <ButtonSizeDemo onPress={this._onPress.bind(this)} />
        </Card>
        <Card title='Icon'>
          <ButtonIconDemo onPress={this._onPress.bind(this)} />
        </Card>
      </Container>
    );
  }
}