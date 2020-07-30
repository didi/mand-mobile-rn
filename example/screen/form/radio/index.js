import React from 'react';
import { StyleSheet, Alert} from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseRadioDemo from '../../../demo/radio/base.demo'
import RadiokListDemo from '../../../demo/radio/list.demo'
import RadiokListInputDemo from '../../../demo/radio/list-input.demo'


export class RadioScreen extends React.Component {
  static navigationOptions = {
    title: 'Radio',
  };

  render() {
    return (
      <Container>
        <Card title='普通单选框'>
          <BaseRadioDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </BaseRadioDemo>
        </Card>
        <Card title='简单单选列表'>
          <RadiokListDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </RadiokListDemo>
        </Card>
        <Card title='输入项'>
          <RadiokListInputDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </RadiokListInputDemo>
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
});
