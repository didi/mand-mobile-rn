import React from 'react';
import { Alert } from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseHorizontalDemo from '../../../demo/swiper/base-h.demo'
export class SwiperHScreen extends React.Component {
  static navigationOptions = {
    title: 'Swiper Horizontal',
  };

  render() {
    return (
      <Container>
        <Card title='BaseHorizontal'>
          <BaseHorizontalDemo onPress={ (param)=>{ Alert.alert(param) }} />
        </Card>
      </Container>
    );
  }
}
