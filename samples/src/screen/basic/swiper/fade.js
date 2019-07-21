import React from 'react';
import { Alert } from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import FadeDemo from '../../../../demo/swiper/fade.demo'
export class SwiperFadeScreen extends React.Component {
  static navigationOptions = {
    title: 'Swiper Fade',
  };

  render() {
    return (
      <Container>
        <Card title='Fade'>
          <FadeDemo onPress={ (param)=>{ Alert.alert(param) }} />
        </Card>
      </Container>
    );
  }
}




