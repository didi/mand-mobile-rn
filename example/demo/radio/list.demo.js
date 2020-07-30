import * as React from 'react'
import { MDRadioList, MDButton } from '../../../src'
import { View } from 'react-native';

export default class RadioListDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBank: '',
      banks: [
        {
          value: '0',
          label: '交通银行(尾号3089)',
          brief: '选项摘要描述',
        },
        {
          value: '1',
          label: '招商银行(尾号2342)',
          brief: '选项摘要描述',
        },
        {
          value: '2',
          label: '建设银行(尾号4321)',
          brief: '选项摘要描述',
          disabled: true,
        },
      ],
    }
  }

  render() {
    return (
      <View>
        <MDButton size='small' onPress={this.onPress.bind(this)}>切换 Radio Options</MDButton>
        <MDRadioList
          options={this.state.banks}
          defaultValue={this.state.myBank}
          onChange={(value) => { this.setState({ myBank: value }) }}
        />
      </View>
    )
  }

  onPress() {
    this.setState({
      banks: [
        {
          value: '3',
          label: '中国银行(尾号3089)',
          brief: '选项摘要描述',
        },
        {
          value: '4',
          label: '农业银行(尾号2342)',
          brief: '选项摘要描述',
        },
        {
          value: '5',
          label: '工商银行(尾号4321)',
          brief: '选项摘要描述',
        },
      ],
    })
  }
}
