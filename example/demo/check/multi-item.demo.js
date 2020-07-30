import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCheck, MDCheckGroup } from '../../../src'
import styles from './styles'

export default class MultiItemCheckDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: ['watermelon'],
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>选中项：{this.state.favorites.join(' ')}</Text>
        <MDCheckGroup
          defaultValues={this.state.favorites}
          onChange={(values) => {
            this.setState({ favorites: values })
          }}
        >
          <MDCheck value="watermelon" label="西瓜" />
          <MDCheck value="apple" label="苹果" />
          <MDCheck value="banana" label="香蕉" />
          <MDCheck value="tomato" label="西红柿" disabled />
          <View
            style={{
              backgroundColor: '#aaa',
              paddingVertical: 5,
              marginVertical: 2,
            }}
          >
            <MDCheck value="orange" label="橙子" />
          </View>
        </MDCheckGroup>
      </View>
    )
  }
}
