import React from 'react';
import { Alert } from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseVerticalDemo from '../../../../demo/swiper/base-v.demo'
export class SwiperVScreen extends React.Component {
  static navigationOptions = {
    title: 'Swiper Vertical',
  };

  render() {
    return (
      <Container>
        <Card title='BaseVertical'>
          <BaseVerticalDemo onPress={ (param)=>{ Alert.alert(param) }} />
        </Card>
      </Container>
    );
  }
}
