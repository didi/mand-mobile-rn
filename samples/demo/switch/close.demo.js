import * as React from 'react'
import { MDSwitch } from 'mand-mobile-rn'

export default class CloseSwitchDemo extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: false
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
        onChange={this.handleChange}>
      </MDSwitch>
    );
  }
}