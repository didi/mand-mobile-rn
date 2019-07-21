import React from 'react'
import { MDTextInput } from 'mand-mobile-rn'
import { View } from 'react-native'
import sty from './styles'

export default class NumberKeyboardDemo extends React.Component {
  formatCapital(value) {
    const values = {
      '0': '零',
      '1': '壹',
      '2': '贰',
      '3': '叁',
      '4': '肆',
      '5': '伍',
      '6': '陆',
      '7': '柒',
      '8': '捌',
      '9': '玖',
      '.': '點',
    }
    return values[value]
  }

  render() {
    return (
      <View>
        <MDTextInput
          style={sty.margin}
          type="professional"
          placeholder="唤起键盘，有小数点"
          onChange={() => {
            console.info('onchange')
          }}
          onChangeText={(text) => {
            console.info(`onChangeText [${text}]`)
          }}
          onKeyPress={() => {
            console.info('onKeyPress')
          }}
          onSubmitEditing={() => {
            console.info('onSubmitEditing')
          }}
        />
        <MDTextInput
          style={sty.margin}
          type="professional"
          hideDot
          placeholder="唤起键盘，无小数点"
        />
        <MDTextInput
          style={sty.margin}
          type="professional"
          placeholder="唤起键盘，替换键值"
          textRender={(value) => {
            if (value === '.') return 'X'
          }}
        />
        <MDTextInput
          style={sty.margin}
          type="professional"
          shuffle={true}
          placeholder="唤起键盘，数字乱序"
        />
        <MDTextInput
          style={sty.margin}
          placeholder="唤起键盘，简单类型"
          type="simple"
        />
        <MDTextInput
          style={sty.margin}
          type="professional"
          placeholder="替换OK 和 左下角"
          okText="submit"
          textRender={(value) => {
            if (value === '.') return '^'
          }}
        />
        <MDTextInput
          style={sty.margin}
          type="professional"
          placeholder="唤起键盘，自定义键盘文字"
          textRender={this.formatCapital}
        />
      </View>
    )
  }
}
