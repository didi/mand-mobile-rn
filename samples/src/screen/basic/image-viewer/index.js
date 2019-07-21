import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseDemo from '../../../../demo/image-viewer/base.demo'

export class ImageViewerScreen extends React.Component {
  static navigationOptions = {
    title: 'ImageViewer',
  }

  render() {
    return (
      <Container>
        <Card title="基础" height={'100%'}>
          <BaseDemo />
        </Card>
      </Container>
    )
  }
}
