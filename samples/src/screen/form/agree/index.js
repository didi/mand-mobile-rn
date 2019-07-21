import React from 'react';
import { StyleSheet } from 'react-native';
import Card from '../../../components/card';
import Container from '../../../components/container';
import CheckedAgreeDemo from '../../../../demo/agree/checked.demo';
import UnCheckedAgreeDemo from '../../../../demo/agree/unchecked.demo';
import DisableCheckedAgreeDemo from '../../../../demo/agree/disable.demo';
import DisableUnCheckedAgreeDemo from '../../../../demo/agree/disable-unchecked.demo';
import CheckSizeAgreeDemo from '../../../../demo/agree/check-size.demo';

export class AgreeScreen extends React.Component {
  static navigationOptions = {
    title: 'Agree',
  };

  render() {
    return (
      <Container>
        <Card title="选中状态">
          <CheckedAgreeDemo />
        </Card>

        <Card title="未选中状态">
          <UnCheckedAgreeDemo />
        </Card>

        <Card title="选中不可用状态">
          <DisableCheckedAgreeDemo />
        </Card>

        <Card title="未选中不可用状态">
          <DisableUnCheckedAgreeDemo />
        </Card>

        <Card title="按钮尺寸">
          <CheckSizeAgreeDemo />
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF",
    padding: 10
  },
});
