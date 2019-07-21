import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCheck, MDButton } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseCheckDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>复选项选中状态：{this.state.checked ? 'True' : 'False'}</Text>
        <MDButton
          style={{ marginTop: 5, marginBottom: 5 }} size='small'
          onPress={() => {
            this.setState({ checked: false })
          }}
        >
          取消 Check 选中
        </MDButton>
        <MDCheck
          label="复选项"
          checked={this.state.checked}
          onChange={(checked) => {
            this.setState({ checked: checked })
          }}
        />
        <MDCheck label="禁用" disabled />
      </View>
    )
  }
}
