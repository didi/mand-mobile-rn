import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/cashier/base.web.demo'
import PayDemo from '@demo/cashier/pay.web.demo'

const stories = storiesOf('Components/Business/Cashier', module)

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
  .add('Base', () => <BaseDemo />, {
    story: {
      code: 'BaseButtonDemoCode',
    },
  })
  .add('Pay', () => <PayDemo />, {
    story: {
      code: 'BaseButtonDemoCode',
    },
  })
