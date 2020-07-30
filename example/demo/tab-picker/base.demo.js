import * as React from 'react'
import { View, Text } from 'react-native'
import { MDField, MDFieldItem, MDTabPicker } from '../../../src'
import styles from './styles'
import data from './data.json'

export default class BaseTabPickerDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      address: '',
    }
  }
  render() {
    const { show, address } = this.state
    return (
      <View>
        <Text style={styles.title}>基础</Text>
        <MDField title="地址">
          <MDFieldItem
            title="联系地址"
            arrow
            placeholder="请选择联系地址"
            content={address}
            solid
            onPress={this.toggle.bind(this)}
          />
        </MDField>
        <MDTabPicker
          visible={show}
          title="请选择"
          describe="请选择您所在的省份、城市、区县"
          data={data}
          change={this.handleChange.bind(this)}
        />
      </View>
    )
  }
  toggle() {
    this.setState({
      show: true,
    })
  }
  handleChange(options) {
    this.setState({
      // address: JSON.stringify(options),
      address: options.map((item) => item.label).join(' '),
    })
  }
}
