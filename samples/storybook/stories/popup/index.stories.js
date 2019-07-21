import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseDemo from '@demo/popup/base.demo'
import BaseDemoCode from '!raw-loader!@demo/popup/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Feedback/Popup', module)

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
  .add('Base', () => <BaseDemo />, {
    story: {
      code: BaseDemoCode
    }
  })
