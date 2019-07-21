import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseDemo from '../../../../demo/date-picker/date.demo'
import TimeDemo from '../../../../demo/date-picker/time.demo'
import DateTimeDemo from '../../../../demo/date-picker/date2.demo'
import CustomDemo from '../../../../demo/date-picker/custom.demo'

export class DatePickerScreen extends React.Component {
  static navigationOptions = {
    title: 'DatePicker',
  }

  render() {
    return (
      <Container>
        <Card title="日期选择">
          <BaseDemo />
        </Card>
        <Card title="时间选择">
          <TimeDemo />
        </Card>
        <Card title="日期时间选择">
          <DateTimeDemo />
        </Card>
        <Card title="自定义类型和选项文案值">
          <CustomDemo />
        </Card>
      </Container>
    )
  }
}
