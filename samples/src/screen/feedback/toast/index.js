import React from 'react';
import { StyleSheet, View, Text, Alert} from 'react-native';
import { MDToast, MDButton } from 'mand-mobile-rn';
import Container from '../../../components/container'
import Card from '../../../components/card'

export class ToastScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Toast',
  }

  onPress () {
    MDToast.loading()
    setTimeout(() => {
      MDToast.hide()
      setTimeout(() => MDToast.failed('载入失败'), 10)
    }, 1000)
  }

  onPressCustomPosition () {
    MDToast({ content: '自定义位置', hasMask: true, position: 'bottom', duration: 0 })
  }

  render() {
    return (
      <Container>
        <Card title='Base'>
          <MDButton style={styles.margin} onPress={() => MDToast.info('一段文字')}>纯文字</MDButton>
          <MDButton style={styles.margin} onPress={() => MDToast.succeed()}>成功</MDButton>
          <MDButton style={styles.margin} onPress={() => MDToast.failed()}>失败</MDButton>
          <MDButton style={styles.margin} onPress={() => MDToast.loading()}>载入中</MDButton>
          <MDButton style={styles.margin} onPress={() => MDToast.succeed('所有文案部分字数最多展示15个字')}>长文案</MDButton>
        </Card>
        <Card title='连续调用'>
          <MDButton onPress={this.onPress.bind(this)}>连续调用</MDButton>
        </Card>
        <Card title='Custom'>
          <MDButton onPress={this.onPressCustomPosition.bind(this)}>自定义位置</MDButton>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  margin: {
    marginVertical: 5,
  }
});