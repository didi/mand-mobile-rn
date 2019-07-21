import React from 'react';
import { Alert, View } from 'react-native';
import { MDResultPage } from 'mand-mobile-rn';
import Container from '../../../components/container'
import Card from '../../../components/card'

export class ResultPageScreen extends React.Component {
  static navigationOptions = {
    title: 'ResultPage',
  };

  _onPress () {
    Alert.alert('Test', 'Test')
  }
  render() {
    const buttons = [{
      text: '普通按钮', 
      handler: this._onPress.bind(this)
    }, {
      type: 'primary', 
      text: '高亮按钮',
      handler: this._onPress.bind(this)
    }]

    return (
      <Container>
        <Card title='404'>
          <MDResultPage type='lost' />
        </Card>
        <Card title='网络异常'>
          <MDResultPage type='network' subtext='点击屏幕，重新加载' />
        </Card>
        <Card title='按钮'>
          <MDResultPage buttons={buttons} />
        </Card>
        <Card title='自定义图案'>
          <MDResultPage 
            text='不太确定自己错在了哪里...' 
            imgUrl='http://manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp'
            subtext='要不然返回试试？'
          />
        </Card>
      </Container>
    );
  }
}
