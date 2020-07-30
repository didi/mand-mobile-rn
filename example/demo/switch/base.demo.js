import * as React from 'react'
import { MDSwitch } from '../../../src'

export default class OpenSwitchDemo extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: true,
    }
  }
  handleChange(checked) {
    this.setState({
      checked: !this.state.checked
    })
  }
  render() {
    const { checked } = this.state
    return (
      <MDSwitch
        checked={checked}
        width={50}
        height={30}
        onChange={this.handleChange}>
      </MDSwitch>
    );
  }
}
