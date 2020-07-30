import React from 'react'
import BaseTabsDemo from '../../../demo/tabs/base.demo'

import Container from '../../../components/container'

export class TabsScreen extends React.Component {
  static navigationOptions = {
    title: 'Tabs',
  }

  render() {
    return (
      <Container>
        <BaseTabsDemo />
      </Container>
    )
  }
}
