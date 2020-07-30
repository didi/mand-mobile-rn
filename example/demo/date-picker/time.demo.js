import * as React from 'react'
import { View, Text } from 'react-native'
import { MDDatePicker} from '../../../src'
import styles from './styles'

export default class TimeDatePickerDemo extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <MDDatePicker
          type="time"
          unit-text={['', '', '', '\'', '\'\'']}
          minute-step="1"
          isView
        />
      </View>
    )
  }
}
