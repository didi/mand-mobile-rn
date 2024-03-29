import * as React from 'react';
import { MDAgree } from 'mand-mobile-rn';
import { Text } from 'react-native';

export default class DisableUnCheckedAgreeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: false,
      disabled: true,
    }
  }
  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }
  render() {
    const { checked, disabled } = this.state
    return (
      <MDAgree content={<Text>本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意《投保须知》,《保险条款》</Text>} onChange={this.handleChange} checked={checked} disabled={disabled}></MDAgree>
    );
  }
}