import React from 'react'
import { MDSelector, MDFieldItem } from '../../../src'
import { View } from 'react-native'
import testData from './data'

export default class BaseSelectorDemo extends React.Component {
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
          title="默认模式"
          arrow
          onPress={() => {
            this.showSelector('default')
          }}
          content={'' + this.lastChoose}
        />
        <MDSelector
          type={'default'}
          options={testData}
          isVisible={this.state.showSelector === 'default'}
          onChoose={(index, data) => {
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
