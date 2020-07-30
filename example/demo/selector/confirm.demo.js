import React from 'react'
import { MDSelector, MDFieldItem } from '../../../src'
import { View } from 'react-native'
import testData from './data'

export default class ConfirmSelectorDemo extends React.Component {
  lastChoose = ''
  constructor(props) {
    super(props)
    this.state = {
      showSelector: '',
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 20,
          padding: 20,
          paddingTop: 10,
        }}
      >
        <MDFieldItem
          solid
          title="确认模式"
          arrow
          onPress={() => {
            this.showSelector('confirm')
          }}
          content={'' + this.lastChoose}
        />
        <MDSelector
          type={'confirm'}
          options={testData}
          isVisible={this.state.showSelector === 'confirm'}
          onChoose={(index, data) => {
            this.lastChoose = data.optionContent
            this.showSelector('')
          }}
          onConfirm={(index, data) => {
            this.lastChoose = data.optionContent
            this.showSelector('')
          }}
          onCancle={() => {
            this.showSelector('')
          }}
        />
      </View>
    )
  }
  showSelector(mode) {
    this.setState({
      showSelector: mode,
    })
  }
}
