import * as React from 'react'
import { View, Text } from 'react-native'
import { MDDatePicker } from '../../../src'
import styles from './styles'

export default class BaseDatePickerDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minDate: new Date('2013/9/9'),
      maxDate: new Date('2020/9/9'),
      currentDate: new Date(),
    }
  }

  datePicker = React.createRef()

  render() {
    return (
      <View style={styles.container}>
        <MDDatePicker
          ref={this.datePicker}
          todayText="今天"
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          defaultDate={this.state.currentDate}
          isView
          onInitialed={this.onInitialed.bind(this)}
        />
      </View>
    )
  }

  onInitialed() {
    console.info(
      `[Mand Mobile] DatePicker getFormatDate: ${this.datePicker.current.getFormatDate(
        'yyyy/MM/dd',
      )}`,
    )
  }
}
