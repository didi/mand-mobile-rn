import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { Text } from 'react-native'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/refresh-control/base.web.demo'

const stories = storiesOf('Components/Gesture/RefreshControl', module)

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
      code: 'RefreshControlDemoCode',
    },
  })
