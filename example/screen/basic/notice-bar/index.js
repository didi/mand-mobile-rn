import React from 'react'
import BaseNoticeBarDemo from '../../../demo/notice-bar/base.demo'
import IconNoticeBarDemo from '../../../demo/notice-bar/icon.demo'
import TimeNoticeBarDemo from '../../../demo/notice-bar/time.demo'
import RoundNoticeBarDemo from '../../../demo/notice-bar/round.demo'
import StyleNoticeBarDemo from '../../../demo/notice-bar/style.demo'
import MultiNoticeBarDemo from '../../../demo/notice-bar/multi.demo'
import ScrollNoticeBarDemo from '../../../demo/notice-bar/scroll.demo'
import SlotNoticeBarDemo from '../../../demo/notice-bar/slot.demo'
import Container from '../../../components/container'

export class NoticeBarScreen extends React.Component {
  static navigationOptions = {
    title: 'NoticeBar',
  }

  render() {
    return (
      <Container>
        <BaseNoticeBarDemo />
        <IconNoticeBarDemo />
        <TimeNoticeBarDemo />
        <RoundNoticeBarDemo />
        <StyleNoticeBarDemo />
        <MultiNoticeBarDemo />
        <ScrollNoticeBarDemo />
        <SlotNoticeBarDemo />
      </Container>
    )
  }
}
