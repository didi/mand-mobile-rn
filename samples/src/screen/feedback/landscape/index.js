import React from 'react';
import Container from '../../../components/container'
import Card from '../../../components/card'
import ImgDemo from '../../../../demo/landscape/img.demo'
import MaskClosableDemo from '../../../../demo/landscape/maskcloseable.demo'
import FullScreenDemo from '../../../../demo/landscape/fullscreen.demo'
import NoMaskDemo from '../../../../demo/landscape/nomask.demo'
import ListenEventDemo from '../../../../demo/landscape/listenevent.demo'

export class LandscapeScreen extends React.Component {
  static navigationOptions = {
    title: 'Landscape',
  };

  constructor(props) {
    super(props)
  }

  render = () => (
    <Container>
      <Card title='基础'>
        <ImgDemo />
        <MaskClosableDemo />
        <FullScreenDemo />
        <NoMaskDemo />
        <ListenEventDemo />
      </Card>
    </Container>
  )
}
