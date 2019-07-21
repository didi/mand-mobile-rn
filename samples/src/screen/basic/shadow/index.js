import React from 'react'
import { View } from 'react-native'
import Container from '../../../components/container'
import Card from '../../../components/card'
import { MDBoxShadow, MDBorderShadow } from 'mand-mobile-rn'

export class ShadowScreen extends React.Component {
  static navigationOptions = {
    title: 'Shadow',
  }

  render() {
    const BoxShadowOpt = {
      width: 100,
      height: 100,
      color: '#333',
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      style: { marginVertical: 5 },
    }

    const BorderShdowOpt = {
      width: 100,
      color: '#333',
      border: 2,
      opacity: 0.2,
      side: 'bottom',
      inset: false,
      style: { marginVertical: 5 },
    }

    return (
      <Container>
        <Card title="Box Shadow">
          <MDBoxShadow {...BoxShadowOpt}>
            <View
              style={{ width: 100, height: 100, backgroundColor: 'white' }}
            />
          </MDBoxShadow>
        </Card>
        <Card title="Border Shadow">
          <MDBorderShadow {...BorderShdowOpt}>
            <View
              style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
            />
          </MDBorderShadow>
        </Card>
      </Container>
    )
  }
}
