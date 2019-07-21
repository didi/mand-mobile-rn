import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseDialogDemo from '@demo/dialog/base.demo'
import BaseDialogDemoCode from '!raw-loader!@demo/dialog/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Feedback/Dialog', module)

stories.addDecorator(withStory);

stories
  .addParameters({
    readme: {
      sidebar: Readme
    },
    options: {
      showPanel: true,
      isToolshown: true,
    }
  })
  .add('Base', () => <BaseDialogDemo />, {
    story: {
      code: BaseDialogDemoCode
    }
  })
