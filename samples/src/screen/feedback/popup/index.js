import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import PopupDemo from '../../../../demo/popup/base.demo'

export class PopupScreen extends React.Component {
  static navigationOptions = {
    title: 'Popup',
  }

  constructor(props) {
    super(props)
    this.state = {
      isPopupShow: '',
    }
  }

  render() {
    return (
      <Container>
        <Card title="基础">
          <PopupDemo />
        </Card>
      </Container>
    )
  }
}
