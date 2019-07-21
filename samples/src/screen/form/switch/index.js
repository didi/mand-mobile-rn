import React from 'react';
import Container from '../../../components/container'
import Card from '../../../components/card'
import OpenSwitchDemo from '../../../../demo/switch/base.demo'
import CloseSwitchDemo from '../../../../demo/switch/close.demo'
import OpenDisabledSwitchDemo from '../../../../demo/switch/open-disabled.demo'
import CloseDisabledSwitchDemo from '../../../../demo/switch/close-disabled.demo'
import CustomSwitchDemo from '../../../../demo/switch/custom.demo'

export class SwitchScreen extends React.Component {
  static navigationOptions = {
    title: 'Switch',
  }
  render() {
      return (
        <Container>
          <Card title='开启状态'>
            <OpenSwitchDemo />
          </Card>
          <Card title='关闭状态'>
            <CloseSwitchDemo />
          </Card>
          <Card title='自定义宽高'>
            <CustomSwitchDemo />
          </Card>
          <Card title='开启不可用状态'>
            <OpenDisabledSwitchDemo />
          </Card>
          <Card title='关闭不可用状态'>
            <CloseDisabledSwitchDemo />
          </Card>
      </Container>
      );
  }
}