import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import SingleDemo from '@demo/picker/single.web.demo'
import SingleDemoCode from '!raw-loader!@demo/picker/single.demo'
import CascadeDemo from '@demo/picker/cascade.web.demo'
import CascadeDemoCode from '!raw-loader!@demo/picker/cascade.demo'
import TabDemo from '@demo/picker/tab.web.demo'
import TabDemoCode from '!raw-loader!@demo/picker/tab.demo'
import { withStory } from '../../addons/story-panel/index'

const stories = storiesOf('Components/Feedback/Picker', module)

stories.addDecorator(withStory)

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
  .add('Single', () => <SingleDemo />, {
    story: {
      code: SingleDemoCode,
    },
  })
  .add('Cascade', () => <CascadeDemo />, {
    story: {
      code: CascadeDemoCode,
    },
  })
  .add('Tab', () => <TabDemo />, {
    story: {
      code: TabDemoCode,
    },
  })
