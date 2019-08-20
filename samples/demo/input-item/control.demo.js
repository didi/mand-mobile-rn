import * as React from 'react'
import { Platform } from 'react-native'
import { MDField, MDInputItem, MDIcon } from 'mand-mobile-rn'
import bank from './bank'

export default class ControlInputDemo extends React.Component {
    static navigationOptions = {
      title: '表单控件',
    }

    render() {
      return (
        <MDField title="表单控件">
          <MDInputItem title="清空按钮" placeholder="normal text" clearable />
          <MDInputItem
            title="金融键盘"
            placeholder="financial number keyboard"
            keyboardType="standard"
            numberKeyboard
            clearable
          />
          <MDInputItem
            placeholder="left/right slot"
            left={ Platform.OS !== 'web' && <MDIcon svgXmlData={bank.cmb} svg size={24} />}
            right={<MDIcon name="info" size={24} color="gray" />}
          />
        </MDField>
      )
    }
  }
