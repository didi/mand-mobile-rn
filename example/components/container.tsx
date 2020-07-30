import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const Container = (props: any) => {
  const { style, children } = props;
  return (
    <ScrollView contentContainerStyle={[styles.wrap, style]}>
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
  }
})

export default Container;
