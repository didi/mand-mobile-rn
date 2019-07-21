import React from 'react'
import { Text, View } from 'react-native'
import { MDIcon } from 'mand-mobile-rn'
import styles from '../styles'

export default class Custom extends React.Component {
  render() {
    const { index, item, cur } = this.props

    return (
      <View style={styles.customItem} key={index}>
        <MDIcon
          name={item.icon}
          color={cur === index ? '#2F86F6' : '#666f83'}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: cur === index ? '#2F86F6' : '#666f83',
            },
          ]}
        >
          {item.label}
        </Text>
      </View>
    )
  }
}
