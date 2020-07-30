import React from 'react';
import Container from '../../../components/container'

import { Category } from '../../../components/category';

const items = [
  { path: 'SwiperH', name: 'Horizontal', ccname: '横向轮播' },
  { path: 'SwiperV', name: 'Vertical', ccname: '纵向轮播' },
  { path: 'SwiperFade', name: 'Fade', ccname: '渐隐渐现' },
  { path: 'SwiperMulit', name: 'Mulit', ccname: '多子项' },
]

export class SwiperScreen extends React.Component {
  static navigationOptions = {
    title: 'Swiper',
  };

  render() {
    return (
      <Container>
        <Category navigation={this.props.navigation} items={items}></Category>
      </Container>
    );
  }
}
