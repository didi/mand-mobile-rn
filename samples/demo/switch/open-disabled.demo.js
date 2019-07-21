import * as React from 'react'
import { MDSwitch } from 'mand-mobile-rn'

export default class OpenDisabledSwitchDemo extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: true,
    }
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }
  render() {
    const { checked } = this.state
    return (
      <MDSwitch
        checked={checked}
        disabled={true}
        onChange={this.handleChange}>
      </MDSwitch>
    );
  }
}