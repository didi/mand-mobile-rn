import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/progress/base.demo'
import BaseDemoCode from '!raw-loader!@demo/progress/base.demo'
import AnimateDemo from '@demo/progress/animate.demo'
import AnimateDemoCode from '!raw-loader!@demo/progress/animate.demo'

const stories = storiesOf('Components/Basic/Progress', module)

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
  .add('Animate', () => <AnimateDemo />, {
    story: {
      code: AnimateDemoCode,
    },
  })
