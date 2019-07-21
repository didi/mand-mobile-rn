import React from 'react'
import { storiesOf } from '@storybook/react'
import { Text } from 'react-native'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/image-viewer/base.web.demo'
import BaseDemoCode from '!raw-loader!@demo/image-viewer/base.demo'

const stories = storiesOf('Components/Basic/ImageViewer', module)

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
