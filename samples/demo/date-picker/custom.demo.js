import React, { createRef } from 'react'
import { View, Text } from 'react-native'
import { MDDatePicker, MDField, MDFieldItem } from 'mand-mobile-rn'
import styles from './styles'

export default class CustomDatePickerDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerShow: false,
      datePickerValue: '',
      currentDate: new Date(),
    }
  }

  datePicker = createRef()

  render() {
    return (
      <View style={styles.container}>
        <MDField>
          <MDFieldItem
            name="name"
            title="出险时间"
            arrow="arrow-right"
            align="right"
            content={this.state.datePickerValue}
            onPress={() => {
              this.setState({ isDatePickerShow: !this.state.isDatePickerShow })
            }}
          />
        </MDField>
        <MDDatePicker
          ref={this.datePicker}
          isVisable={this.state.isDatePickerShow}
          type="custom"
          title="选择出险时间"
          textRender={this.textRender.bind(this)}
          customTypes={['yyyy', 'MM', 'dd', 'hh', 'mm']}
          defaultDate={this.state.currentDate}
          onChange={this.onDatePickerChange.bind(this)}
          onConfirm={this.onDatePickerConfirm.bind(this)}
          onCancel={() => {
            this.setState({ isDatePickerShow: false })
          }}
        />
      </View>
    )
  }

  textRender() {
    const args = Array.prototype.slice.call(arguments)
    const typeFormat = args[0] // 类型
    // const column0Value = args[1] // 第1列选中值
    // const column1Value = args[2] // 第2列选中值
    const column2Value = args[3] // 第3列选中值
    if (typeFormat === 'dd') {
      return `*${column2Value}日`
    }
  }

  onDatePickerChange(columnIndex, itemIndex, value) {
    console.info(
      `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
        value,
      )}`,
    )
  }

  onDatePickerConfirm(columnsValue) {
    const value = this.datePicker.current.getFormatDate('yyyy/MM/dd hh:mm')
    this.setState({
      datePickerValue: value,
      isDatePickerShow: false,
    })
  }
}
