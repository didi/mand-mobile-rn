import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import MuitiDemo from '@demo/image-picker/multi.web.demo'
import MuitiDemoCode from '!raw-loader!@demo/image-picker/multi.demo'

const stories = storiesOf('Components/Feedback/ImagePicker', module)

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
  .add('Multi', () => <MuitiDemo />, {
    story: {
      code: MuitiDemoCode,
    },
  })
