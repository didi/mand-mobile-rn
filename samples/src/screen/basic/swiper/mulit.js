import React from 'react';
import { Alert } from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import MulitItemDemo from '../../../../demo/swiper/mulit-item.demo'
export class SwiperMulitScreen extends React.Component {
  static navigationOptions = {
    title: 'Swiper Mulit Item',
  };

  render() {
    return (
      <Container>
        <Card title='MulitItem'>
          <MulitItemDemo onPress={ (param)=>{ Alert.alert(param) }} />
        </Card>
      </Container>
    );
  }
}
