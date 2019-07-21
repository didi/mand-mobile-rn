import * as React from 'react'
import { View, Text } from 'react-native'
import { MDRadio, MDButton } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseCheckDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>单选项选中状态：{this.state.selected}</Text>
        <MDButton
          style={{ marginTop: 5, marginBottom: 5 }}
          size='small'
          onPress={() => { this.setState({ selected: null }) }}>
          取消 Raido 选中
        </MDButton>
        <MDRadio
          value="email"
          label="Email"
          selected={this.state.selected}
          onChange={(checked, value) => { this.setState({ selected: value }) }}
        />
        <MDRadio
          value="phone"
          label="Phone"
          selected={this.state.selected}
          onChange={(checked, value) => { this.setState({ selected: value }) }}
        />
        <MDRadio
          value="mail"
          label="Mail"
          disabled
          selected={this.state.selected}
          onChange={(checked, value) => { this.setState({ selected: value }) }}
        />
      </View>
    )
  }
}
