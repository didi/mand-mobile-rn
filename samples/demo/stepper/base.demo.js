import * as React from 'react'
import { MDStepper } from 'mand-mobile-rn'

export default class BaseStepperDemo extends React.Component {
  render() {
    return <MDStepper {...this.props} />
  }
}
