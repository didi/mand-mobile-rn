import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/doughnut/base.demo'
import BaseDemoCode from '!raw-loader!@demo/doughnut/base.demo'
const stories = storiesOf('Components/Basic/Doughnut', module)

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
      code: BaseDemoCode,
    },
  })
