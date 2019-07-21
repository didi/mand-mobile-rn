import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseActionBarDemo from '@demo/action-bar/base.demo'
import BaseActionBarDemoCode from '!raw-loader!@demo/action-bar/base.demo'
import MultiActionBarDemo from '@demo/action-bar/multi.demo'
import MultiActionBarDemoCode from '!raw-loader!@demo/action-bar/multi.demo'
import DisabledActionBarDemo from '@demo/action-bar/disabled.demo'
import DisabledActionBarDemoCode from '!raw-loader!@demo/action-bar/disabled.demo'
import SlotActionBarDemo from '@demo/action-bar/slot.demo'
import SlotActionBarDemoCode from '!raw-loader!@demo/action-bar/slot.demo'
import { withStory } from '../../addons/story-panel/index'

const stories = storiesOf('Components/Basic/ActionBar', module)

stories.addDecorator(withStory)

const onPress = (index) => {
  console.info(index + ' pressed')
}


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
  .add('Base', () => <BaseActionBarDemo onPress={onPress} />, {
    story: {
      code: BaseActionBarDemoCode,
    }
  })
  .add('Multi', () => <MultiActionBarDemo onPress={onPress} />, {
    story: {
      code: MultiActionBarDemoCode,
    },
  })
  .add('Disabled', () => <DisabledActionBarDemo />, {
    story: {
      code: DisabledActionBarDemoCode,
    },
  })
  .add('Slot', () => <SlotActionBarDemo onPress={onPress} />, {
    story: {
      code: SlotActionBarDemoCode,
    },
  })
