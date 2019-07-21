import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseNoticeBarDemo from '@demo/notice-bar/base.demo'
import BaseNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/base.demo'
import IconNoticeBarDemo from '@demo/notice-bar/icon.demo'
import IconNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/icon.demo'
import TimeNoticeBarDemo from '@demo/notice-bar/time.demo'
import TimeNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/time.demo'
import RoundNoticeBarDemo from '@demo/notice-bar/round.demo'
import RoundNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/round.demo'
import StyleNoticeBarDemo from '@demo/notice-bar/style.demo'
import StyleNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/style.demo'
import MultiNoticeBarDemo from '@demo/notice-bar/multi.demo'
import MultiNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/multi.demo'
import ScrollNoticeBarDemo from '@demo/notice-bar/scroll.demo'
import ScrollNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/scroll.demo'
import SlotNoticeBarDemo from '@demo/notice-bar/slot.demo'
import SlotNoticeBarDemoCode from '!raw-loader!@demo/notice-bar/slot.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/NoticeBar', module)

stories.addDecorator(withStory);

stories
  .addParameters({
    readme: {
      sidebar: Readme
    },
    options: {
      showPanel: true,
      isToolshown: true,
    }
  })
  .add('Base', () => <BaseNoticeBarDemo />, {
    story: {
      code: BaseNoticeBarDemoCode
    }
  })
  .add('Icon', () => <IconNoticeBarDemo />, {
    story: {
      code: IconNoticeBarDemoCode
    }
  })
  .add('Time', () => <TimeNoticeBarDemo />, {
    story: {
      code: TimeNoticeBarDemoCode
    }
  })
  .add('Round', () => <RoundNoticeBarDemo />, {
    story: {
      code: RoundNoticeBarDemoCode
    }
  })
  .add('Custom style', () => <StyleNoticeBarDemo />, {
    story: {
      code: StyleNoticeBarDemoCode
    }
  })
  .add('Multi', () => <MultiNoticeBarDemo />, {
    story: {
      code: MultiNoticeBarDemoCode
    }
  })
  .add('Scroll', () => <ScrollNoticeBarDemo />, {
    story: {
      code: ScrollNoticeBarDemoCode
    }
  })
  .add('Slot', () => <SlotNoticeBarDemo />, {
    story: {
      code: SlotNoticeBarDemoCode
    }
  })
