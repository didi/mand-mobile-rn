import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Readme from './README.md'
import BaseRadioDemo from '@demo/radio/base.demo'
import BaseRadioDemoCode from '!raw-loader!@demo/radio/base.demo'
import RadiokListDemo from '@demo/radio/list.demo'
import RadiokListDemoCode from '!raw-loader!@demo/radio/list.demo'
import RadioListInputDemo from '@demo/radio/list-input.demo'
import RadioListInputDemoCode from '!raw-loader!@demo/radio/list-input.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Radio', module)

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
  .add('Base', () => <BaseRadioDemo onPress={action('clicked')} />, {
    story: {
      code: BaseRadioDemoCode
    }
  })
  .add('Radio list', () => <RadiokListDemo onPress={action('clicked')} />, {
    story: {
      code: RadiokListDemoCode
    }
  })
  .add('Has Input', () => <RadioListInputDemo onPress={action('clicked')} />, {
    story: {
      code: RadioListInputDemoCode
    }
  })
