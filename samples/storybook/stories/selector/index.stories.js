import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseSelectorDemo from '@demo/selector/base.demo'
import BaseSelectorDemoCode from '!raw-loader!@demo/selector/base.demo'
import ConfirmSelectorDemo from '@demo/selector/confirm.demo'
import ConfirmSelectorDemoCode from '!raw-loader!@demo/selector/confirm.demo'
import CheckSelectorDemo from '@demo/selector/check.demo'
import CheckSelectorDemoCode from '!raw-loader!@demo/selector/check.demo'
import CustomSelectorDemo from '@demo/selector/custom.demo'
import CustomSelectorDemoCode from '!raw-loader!@demo/selector/custom.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Feedback/Selector', module)

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
  .add('Base', () => <BaseSelectorDemo />, {
    story: {
      code: BaseSelectorDemoCode
    }
  })
  .add('Confirm', () => <ConfirmSelectorDemo />, {
    story: {
      code: ConfirmSelectorDemoCode
    }
  })
  .add('Check', () => <CheckSelectorDemo />, {
    story: {
      code: CheckSelectorDemoCode
    }
  })
  .add('Custom', () => <CustomSelectorDemo />, {
    story: {
      code: CustomSelectorDemoCode
    }
  })
