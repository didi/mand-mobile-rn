import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MDStepper } from '../../../../src'

export class StepperScreen extends React.Component {
  static navigationOptions = {
    title: 'Stepper',
  }

  constructor(props) {
    super(props)
    this.handleChanged = this.handleChanged.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.text}>禁用</Text>
          <MDStepper
            disabled={true}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>只读</Text>
          <MDStepper
            readOnly={true}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>最小值-12，最大值18</Text>
          <MDStepper
            max={18}
            min={-12}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>步进2, 只允许输入整数</Text>
          <MDStepper
            step={2}
            isInteger={true}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>最小值4大于默认值</Text>
          <MDStepper
            min={4}
            value={4}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.text}>step为小数1.3</Text>
          <MDStepper
            step={1.3}
            onChange={(value) => {
              this.handleChanged(value)
            }}
          />
        </View>
      </View>
    )
  }

  handleChanged(text) {
    console.info('Stepper changed ' + text)
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  item: {
    height: 49,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 2,
  },
  line: {
    height: 1,
    backgroundColor: '#d9d9d9',
  },
})
