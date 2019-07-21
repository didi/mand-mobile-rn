import * as React from 'react'
import { View, Text } from 'react-native'
import { MDDatePicker } from 'mand-mobile-rn'
import styles from './styles'

export default class DateTimeDatePickerDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date(),
    }
  }

  datePicker = React.createRef()

  render() {
    return (
      <View style={styles.container}>
        <MDDatePicker
          ref={this.datePicker}
          type="datetime"
          minDate={this.state.currentDate}
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
