import * as React from 'react'
import { MDRadioList, MDField } from '../../../src'

export default class RadioListInputDemo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      myReason: '',
      reasons: [
        {
          value: '0',
          label: '我有其他保险',
        },
        {
          value: '1',
          label: '每单都扣，我担心扣太多',
        },
        {
          value: '2',
          label: '我身体好，不需要重疾险',
        },
        {
          value: '3',
          label: '接单少，加入这个没什么用',
        },
        {
          value: '4',
          label: '我不了解这是什么计划',
        },
      ],
    }
  }

  render () {
    return (
      <MDField
        title="选中项："
        brief={this.state.myReason}
      >
        <MDRadioList
          options={this.state.reasons}
          defaultValue={this.state.myReason}
          hasInput
          inputLabel="其他"
          inputPlaceHolder="请输入原因"
          onChange={(value, index)=>{ this.setState({myReason: value}) }}
        />
      </MDField>
    )
  }
}
