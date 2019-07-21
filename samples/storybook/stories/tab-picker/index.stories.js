import React from 'react'
import { storiesOf } from '@storybook/react'
import { View } from 'react-native'
import Readme from './README.md'
import BaseTabPickerDemo from '@demo/tab-picker/base.demo'
import BaseTabPickerDemoCode from '!raw-loader!@demo/tab-picker/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/TabPicker', module)

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
  .add('base', () => {
    return (
      <View>
        <BaseTabPickerDemo />
      </View>
    )
  }, {
      story: {
        code: BaseTabPickerDemoCode
      }
    })
