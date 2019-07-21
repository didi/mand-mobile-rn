import * as React from 'react'
import { MDField, MDInputItem } from 'mand-mobile-rn'

export default class FloatInputDemo extends React.Component {
    static navigationOptions = {
      title: '标题浮动输入框',
    }
  
    render() {
      return (
        <MDField title="标题浮动输入框">
          <MDInputItem placeholder="投保人姓名" material />
          <MDInputItem placeholder="投保人身份证号" material />
        </MDField>
      )
    }
  }
  