import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MDPicker, MDCellItem } from 'mand-mobile-rn'
import sample from './data/simple'
import district from './data/district'

const District = district
const Sample = sample

export default class TabDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: '',
      textA: '',
      textB: '',
    }
  }

  onPressTabO() {
    this.setState({
      visible: 'one',
    })
  }

  onPressTabT() {
    this.setState({
      visible: 'two',
    })
  }

  updateText(activeValues) {
    var context = ''
    if (activeValues) {
      activeValues.forEach((element) => {
        if (element && (element.text || element.label)) {
          let itemText = element.text || element.label
          context = context + ' ' + itemText
        }
      })
    }
    switch (this.state.visible) {
      case 'one':
        this.setState({
          textA: context,
          visible: '',
        })
        break
      case 'two':
        this.setState({
          textB: context,
          visible: '',
        })
        break
      default:
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MDCellItem
          title="起保年份"
          addon={this.state.textA}
          arrow
          onPress={() => {
            this.onPressTabO()
          }}
        />
        <MDPicker
          data={Sample}
          cols={1}
          isView={false}
          pickerHeight={200}
          pickerWidth={350}
          defaultIndex={[0]}
          isVisible={this.state.visible === 'one'}
          title="选择年份"
          onConfirm={(activeValues) => {
            this.updateText(activeValues)
          }}
        />
        <MDCellItem
          title="省市区/县"
          addon={this.state.textB}
          arrow
          onPress={() => {
            this.onPressTabT()
          }}
        />
        <MDPicker
          data={District}
          cols={3}
          isView={false}
          isCascade={true}
          pickerHeight={200}
          pickerWidth={350}
          itemHeight={40}
          defaultIndex={[3, 2, 1]}
          title="选择省市区/县"
          onConfirm={(activeValues) => {
            this.updateText(activeValues)
          }}
          isVisible={this.state.visible === 'two'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
