import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default class Container extends React.Component {
  render () {
    return (
      <ScrollView contentContainerStyle={[styles.wrap, this.props.style]}>
        {this.props.children}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
  }
})