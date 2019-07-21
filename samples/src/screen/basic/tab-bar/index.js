import React from 'react'
import BaseTabBarDemo from '../../../../demo/tab-bar/base.demo'
import MaxTabBarDemo from '../../../../demo/tab-bar/max.demo'
import ScrollTabBarDemo from '../../../../demo/tab-bar/scroll.demo'
import NolineTabBarDemo from '../../../../demo/tab-bar/noline.demo'
import CustomTabBarDemo from '../../../../demo/tab-bar/custom.demo'
import EventTabBarDemo from '../../../../demo/tab-bar/event.demo'
import Container from '../../../components/container'

export class TabBarScreen extends React.Component {
  static navigationOptions = {
    title: 'TabBar',
  }

  render() {
    return (
      <Container>
        <BaseTabBarDemo />
        <MaxTabBarDemo />
        <ScrollTabBarDemo />
        <NolineTabBarDemo />
        <CustomTabBarDemo />
        <EventTabBarDemo />
      </Container>
    )
  }
}
