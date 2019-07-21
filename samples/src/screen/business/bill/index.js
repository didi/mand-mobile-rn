import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import BillDemo from '../../../../demo/bill/base.demo'
import BillSlotDemo from '../../../../demo/bill/slot.demo'

export class BillScreen extends React.Component {
  static navigationOptions = {
    title: 'Bill',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.intr}>基础</Text>
        <View style={styles.shadow}>
          <BillDemo />
        </View>
        <Text style={styles.intr}>使用插槽</Text>
        <View style={styles.shadow}>
          <BillSlotDemo />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  shadow: {
    shadowColor: '#111A34',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.1,
  },
  intr: {
    fontSize: 13,
    paddingBottom: 20,
    paddingTop: 20,
  },
})
