import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import ActionSheetDemo from '@demo/action-sheet/base.demo'
import ActionSheetDemoCode from '!raw-loader!@demo/action-sheet/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Feedback/ActionSheet', module)

stories.addDecorator(withStory)

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
  .add('Base', () => <ActionSheetDemo />, {
    story: {
      code: ActionSheetDemoCode
    }
  })
