import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCheck, MDCheckBox, MDCheckGroup } from '../../../src'
import styles from './styles'

export default class MultiCheckBoxDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      insurants: ['couple'],
      orange: false,
      bg: '#a34',
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        bg: '#ead',
      })
    }, 5000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>选中项：{this.state.insurants.join(' ')}</Text>
        <Text>橙子：{this.state.orange ? 'True' : 'False'}</Text>
        <MDCheckGroup
          defaultValues={this.state.insurants}
          onChange={(values) => {
            this.setState({ insurants: values })
          }}
        >
          <View>
            <View style={styles.wrapper}>
              <MDCheckBox value="self" label="自己" disabled />
              <MDCheckBox value="couple" label="配偶" />
              <MDCheckBox value="parent" label="父母" />
              <MDCheckBox value="child" label="子女" />
            </View>
            <View>
              <MDCheck value="watermelon" label="西瓜" />
              <MDCheck value="apple" label="苹果" />
              <MDCheck value="banana" label="香蕉" />
              <MDCheck value="tomato" label="西红柿" disabled />
              <View
                style={{
                  backgroundColor: this.state.bg,
                  paddingVertical: 5,
                  marginVertical: 2,
                }}
              >
                <MDCheck
                  value="orange"
                  label="橙子"
                  onChange={this.itemOnChange.bind(this)}
                />
              </View>
            </View>
          </View>
        </MDCheckGroup>
      </View>
    )
  }

  itemOnChange(checked, value) {
    this.setState({
      orange: checked,
    })
  }
}
