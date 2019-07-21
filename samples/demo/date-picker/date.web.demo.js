import * as React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'

export default class BaseDatePickerWebDemo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 10 }}>请移步手机端 Samples</Text>
        <Image
          style={{
            width: '100%',
            height: 250,
          }}
          resizeMode="stretch"
          source={require('../../assets/web/date_picker_date_select.gif')}
        />
      </View>
    )
  }
}
