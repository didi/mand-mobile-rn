import React from 'react'
import BaseTabPickerDemo from '../../../demo/tab-picker/base.demo'

import Container from '../../../components/container'

export class TabPickerScreen extends React.Component {
  static navigationOptions = {
    title: 'TabPicker',
  }

  render() {
    return (
      <Container>
        <BaseTabPickerDemo />
      </Container>
    )
  }
}
