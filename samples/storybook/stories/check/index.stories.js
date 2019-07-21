import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Readme from './README.md'

import BaseCheckDemo from '@demo/check/base.demo'
import BaseCheckDemoCode from '!raw-loader!@demo/check/base.demo'
import MultiItemCheckDemo from '@demo/check/multi-item.demo'
import MultiItemCheckDemoCode from '!raw-loader!@demo/check/multi-item.demo'
import CheckBoxDemo from '@demo/check/box.demo'
import CheckBoxDemoCode from '!raw-loader!@demo/check/box.demo'
import MultiCheckBoxDemo from '@demo/check/multi-box.demo'
import MultiCheckBoxDemoCode from '!raw-loader!@demo/check/multi-box.demo'
import CheckListDemo from '@demo/check/list.demo'
import CheckListDemoCode from '!raw-loader!@demo/check/list.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Check', module)

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
  .add('Base', () => <BaseCheckDemo onPress={action('clicked')} />, {
    story: {
      code: BaseCheckDemoCode
    }
  })
  .add('MultiItem', () => <MultiItemCheckDemo onPress={action('clicked')} />, {
    story: {
      code: MultiItemCheckDemoCode
    }
  })
  .add('CheckBox', () => <CheckBoxDemo onPress={action('clicked')} />, {
    story: {
      code: CheckBoxDemoCode
    }
  })
  .add('Mulit CheckBox', () => <MultiCheckBoxDemo onPress={action('clicked')} />, {
    story: {
      code: MultiCheckBoxDemoCode
    }
  })
  .add('CheckList', () => <CheckListDemo onPress={action('clicked')} />, {
    story: {
      code: CheckListDemoCode
    }
  })
