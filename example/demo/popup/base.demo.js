import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MDPopup, MDPopupTitleBar, MDButton } from '../../../src'
import { Platform } from 'react-native'

export default class PopupDemo extends React.Component {
  static navigationOptions = {
    title: 'Popup',
  }

  constructor(props) {
    super(props)
    this.state = {
      isPopupShow: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>不同位置</Text>
          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'center')}
          >
            屏幕中弹出
          </MDButton>
          <MDPopup
            position="center"
            transition="zoom"
            isVisible={this.state.isPopupShow === 'center'}
          >
            <Text style={styles.text}>Popup Center</Text>
          </MDPopup>

          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'bottom')}
          >
            底部弹出
          </MDButton>
          <MDPopup
            position="bottom"
            isVisible={this.state.isPopupShow === 'bottom'}
          >
            <Text style={styles.text}>Popup Bottom</Text>
          </MDPopup>

          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'top')}
          >
            顶部弹出
          </MDButton>
          <MDPopup position="top" isVisible={this.state.isPopupShow === 'top'}>
            <Text style={styles.text}>Popup Top</Text>
          </MDPopup>

          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'left')}
          >
            左侧弹出
          </MDButton>
          <MDPopup
            position="left"
            isVisible={this.state.isPopupShow === 'left'}
          >
            <Text style={styles.text}>Popup Left</Text>
          </MDPopup>

          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'right')}
          >
            右侧弹出
          </MDButton>
          <MDPopup
            position="right"
            isVisible={this.state.isPopupShow === 'right'}
          >
            <Text style={styles.text}>Popup Right</Text>
          </MDPopup>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>其他配置</Text>
          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'nomask')}
          >
            无遮罩层
          </MDButton>
          <MDPopup
            position="center"
            isVisible={this.state.isPopupShow === 'nomask'}
            hasMask={false}
          >
            <Text style={styles.text}>Popup No Mask</Text>
          </MDPopup>

          <MDButton
            style={styles.button}
            onPress={this.showPopup.bind(this, 'dismask')}
          >
            禁用遮罩层点击
          </MDButton>
          <MDPopup
            position="bottom"
            isVisible={this.state.isPopupShow === 'dismask'}
            maskClosable={false}
          >
            <View
              style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}
            >
              <MDPopupTitleBar
                title="Prevent Mask Click"
                cancelText={<Text style={{ color: '#f4a' }}>取消</Text>}
                // cancelText="cancel"
                okText="ok"
                onCancel={() => {
                  this.setState({ isPopupShow: '' })
                }}
                onConfirm={() => {
                  this.setState({ isPopupShow: '' })
                }}
              />
              <Text style={styles.text2}>Popup Dismask</Text>
            </View>
          </MDPopup>
        </View>
      </View>
    )
  }

  showPopup(position) {
    this.setState({
      isPopupShow: position,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
    padding: 10,
  },
  section: {
    marginBottom: 15,
    zIndex: Platform.OS === 'web' ? 'unset' : 0,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111a34',
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  text: {
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    lineHeight: 100,
    borderWidth: 1,
    borderColor: '#aaa',
    textAlign: 'center',
  },
  text2: {
    textAlign: 'center',
    lineHeight: 100,
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#aaa',
  },
})
