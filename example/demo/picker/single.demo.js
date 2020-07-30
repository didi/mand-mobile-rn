import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MDPicker, MDButton, MDDialog } from '../../../src'
import sample from './data/simple'
import Container from '../../components/container'
import Card from '../../components/card'

const Sample = sample

export default class SingleDemo extends React.Component {
  render() {
    return (
      <Container>
        {this.showButton()}
        <Card style={{ overflow: 'hidden' }} title="单列数据">
          <MDPicker
            ref={(e) => {
              this._singlePicker = e
            }}
            data={Sample}
            cols={1}
            isView={true}
            pickerHeight={200}
            pickerWidth={350}
            defaultIndex={[0]}
            invalidIndex={[[4, 2, 3]]}
          />
        </Card>
      </Container>
    )
  }

  showButton() {
    return (
      <View style={styles.buttonView}>
        <MDButton
          style={styles.button}
          onPress={() => {
            this.getColumnValues()
          }}
          size={{ width: 80, height: 20, fontSize: 8 }}
          type="primary"
        >
          getColumnValues
        </MDButton>
        <MDButton
          style={styles.button}
          onPress={() => {
            this.getColumnIndexs()
          }}
          size={{ width: 80, height: 20, fontSize: 8 }}
          type="primary"
        >
          getColumnIndexs
        </MDButton>
        <MDButton
          style={styles.button}
          onPress={() => {
            this.setColumnValues()
          }}
          size={{ width: 80, height: 20, fontSize: 8 }}
          type="primary"
        >
          setColumnValues
        </MDButton>
      </View>
    )
  }

  getColumnValues() {
    MDDialog.alert({
      isVisible: true,
      closable: false,
      context: JSON.stringify(this._singlePicker.getColumnValues()),
      confirmText: '确定',
    })
  }

  getColumnIndexs() {
    MDDialog.alert({
      isVisible: true,
      closable: false,
      context: JSON.stringify(this._singlePicker.getColumnIndexs()),
      confirmText: '确定',
    })
  }

  setColumnValues() {
    this._singlePicker.setColumnValues(
      0,
      [{ text: 'hello', value: 2 }],
      () => {},
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 15,
    overflow: 'visible',
    marginLeft: 90,
    zIndex: 100,
  },
})
