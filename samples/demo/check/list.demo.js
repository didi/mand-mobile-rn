import * as React from 'react'
import { MDCheckList, MDField } from 'mand-mobile-rn'

export default class CheckListDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: ['apple'],
      fruits: [
        { value: 'watermelon', label: '西瓜' },
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉' },
        { value: 'orange', label: '橙子' },
        { value: 'tomato', label: '西红柿', disabled: true },
      ],
    }
  }

  render() {
    return (
      <MDCheckList
        options={this.state.fruits}
        defaultValues={this.state.favorites}
        onChange={(values) => {
          this.setState({ favorites: values })
        }}
      />
    )
  }
}
