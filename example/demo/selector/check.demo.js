import React from 'react'
import { MDSelector, MDFieldItem } from '../../../src'
import { View } from 'react-native'
import testData from './data'

export default class CheckSelectorDemo extends React.Component {
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
          title="校验模式"
          arrow
          onPress={() => {
            this.showSelector('check')
          }}
          content={'' + this.lastChoose}
        />
        <MDSelector
          type={'check'}
          options={testData}
          isVisible={this.state.showSelector === 'check'}
          onChoose={(index, data) => {
            this.lastChoose = data.optionContent
            this.showSelector('')
            console.info('index=' + index + ',data=' + JSON.stringify(data))
          }}
          onConfirm={(index, data) => {
            this.lastChoose = data.optionContent
            this.showSelector('')
            console.info('index=' + index + ',data=' + JSON.stringify(data))
          }}
          onCancle={() => {
            this.showSelector('')
            console.info('onCancle')
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
