import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import ToastDemo from '@demo/toast/toast.web.demo'

const stories = storiesOf('Components/Feedback/Toast', module)

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
  .add('Multi', () => <ToastDemo />, {
    story: {},
  })
