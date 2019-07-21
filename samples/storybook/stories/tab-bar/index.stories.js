import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseTabBarDemo from '@demo/tab-bar/base.demo'
import BaseTabBarDemoCode from '!raw-loader!@demo/tab-bar/base.demo'
import MaxTabBarDemo from '@demo/tab-bar/max.demo'
import MaxTabBarDemoCode from '!raw-loader!@demo/tab-bar/max.demo'
import ScrollTabBarDemo from '@demo/tab-bar/scroll.demo'
import ScrollTabBarDemoCode from '!raw-loader!@demo/tab-bar/scroll.demo'
import NolineTabBarDemo from '@demo/tab-bar/noline.demo'
import NolineTabBarDemoCode from '!raw-loader!@demo/tab-bar/noline.demo'
import CustomTabBarDemo from '@demo/tab-bar/custom.demo'
import CustomTabBarDemoCode from '!raw-loader!@demo/tab-bar/custom.demo'
import EventTabBarDemo from '@demo/tab-bar/event.demo'
import EventTabBarDemoCode from '!raw-loader!@demo/tab-bar/event.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/TabBar', module)

stories.addDecorator(withStory);

stories
  .addParameters({
    readme: {
      sidebar: Readme
    },
    options: {
      showPanel: true,
      isToolshown: true,
    },
  })
  .add('Base', () => <BaseTabBarDemo />, {
    story: {
      code: BaseTabBarDemoCode
    }
  })
  .add('Max', () => <MaxTabBarDemo />, {
    story: {
      code: MaxTabBarDemoCode
    }
  })
  .add('Scroll', () => <ScrollTabBarDemo />, {
    story: {
      code: ScrollTabBarDemoCode
    }
  })
  .add('Noline', () => <NolineTabBarDemo />, {
    story: {
      code: NolineTabBarDemoCode
    }
  })
  .add('Custom', () => <CustomTabBarDemo />, {
    story: {
      code: CustomTabBarDemoCode
    }
  })
  .add('Event', () => <EventTabBarDemo />, {
    story: {
      code: EventTabBarDemoCode
    }
  })
