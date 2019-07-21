import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCheckBox } from 'mand-mobile-rn'
import styles from './styles'

export default class CheckBoxDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this._setValue = this._setValue.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>选中项：{this.state.value}</Text>
        <View style={styles.wrapper}>
          <MDCheckBox
            value="day"
            checked={this.state.value === 'day'}
            label="日缴"
            disabled
            onChange={(checked, value) => {
              this._setValue(value)
            }}
          />
          <MDCheckBox
            value="month"
            checked={this.state.value === 'month'}
            label="月付"
            onChange={(checked, value) => {
              this._setValue(value)
            }}
          />
          <MDCheckBox
            value="season"
            checked={this.state.value === 'season'}
            label="季度费"
            onChange={(checked, value) => {
              this._setValue(value)
            }}
          />
        </View>
      </View>
    )
  }

  _setValue(value) {
    value = value === this.state.value ? '' : value
    this.setState({ value })
  }
}
