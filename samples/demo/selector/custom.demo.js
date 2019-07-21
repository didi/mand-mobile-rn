import React from 'react'
import { MDSelector, MDFieldItem } from 'mand-mobile-rn'
import { View, Text } from 'react-native'
import testData from './data'

export default class CustomSelectorDemo extends React.Component {
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
          title="自定义"
          arrow
          onPress={() => {
            this.showSelector('custom')
          }}
          content={'' + this.lastChoose}
        />
        <MDSelector
          type={'custom'}
          options={testData}
          isVisible={this.state.showSelector === 'custom'}
          renderItem={(index, data) => {
            return this.renderCustomItem(index, data)
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

  renderCustomItem(index, data) {
    return (
      <View
        key={index}
        style={{
          marginLeft: 15,
          marginRight: 15,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#E2E4EA',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#161923',
            paddingBottom: 15,
            paddingTop: 15,
          }}
          onPress={() => {
            this.lastChoose = data.optionContent + '(自定义)'
            this.showSelector('')
          }}
        >
          {data.optionContent + '(自定义)'}
        </Text>
      </View>
    )
  }
}
