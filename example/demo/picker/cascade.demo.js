import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { MDPicker, MDButton, MDPopup } from '../../../src'
import district from './data/district'

const District = district

export default class CascadeDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: '',
    }
  }

  onPressCascade() {
    this.setState({
      visible: 'cascade',
    })
  }

  render() {
    return (
      <View title="联动数据">
        <MDButton
          onPress={() => {
            this.onPressCascade()
          }}
        >
          联动弹窗
        </MDButton>
        <MDPopup position="center" isVisible={this.state.visible === 'cascade'}>
          <View style={styles.popup}>
            <MDPicker
              ref={(e) => {
                this._cascadePicker = e
              }}
              data={District}
              cols={3}
              isView={true}
              isCascade={true}
              pickerHeight={200}
              pickerWidth={350}
              itemHeight={40}
              // invalidIndex={[[1], [3], [3]]}
              defaultIndex={[3, 2, 1]}
              // defaultValue={['北京', '北京', '朝阳区']}
            />
          </View>
        </MDPopup>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popup: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 300,
    backgroundColor: '#fff',
  },
})
