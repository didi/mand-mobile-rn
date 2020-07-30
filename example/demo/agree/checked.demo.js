import * as React from 'react';
import { MDAgree } from '../../../src';
import { Text } from 'react-native';

export default class CheckedAgreeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
      <MDAgree content={
        <Text style={{ color: '#838794' }}>
          本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
              <Text style={{ color: '#5878b4' }}>
            《投保须知》
              </Text>
          ,
              <Text style={{ color: '#5878b4' }}>
            《保险条款》
              </Text>
        </Text>
      } checked={checked}>
      </MDAgree>
    );
  }
}
