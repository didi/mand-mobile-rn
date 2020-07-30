import React from 'react'
import ErrorInputDemo from '../../../demo/input-item/error.demo'

export class ErrorInputItemScreen extends React.Component {
  static navigationOptions = {
    title: '错误提示',
  }

  render() {
    return <ErrorInputDemo />
  }
}
