import * as React from 'react'
import { MDSwitch } from 'mand-mobile-rn'

export default class CustomSwitchDemo extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: true
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
        width={80}
        height={50}
        checked={checked}
        onChange={this.handleChange}>
      </MDSwitch>
    );
  }
}