import React from 'react'
import Container from '../../../components/container'
import CaptchaDemo from '../../../../demo/captcha/base.demo'
export class CaptchaScreen extends React.Component {
  static navigationOptions = {
    title: 'Captcha',
  }

  render() {
    return (
      <Container>
        <CaptchaDemo />
      </Container>
    )
  }
}
