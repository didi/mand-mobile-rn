import React from 'react'
import { storiesOf } from '@storybook/react'
import { View } from 'react-native'
import Readme from './README.md'
import BaseTabsDemo from '@demo/tabs/base.demo'
import BaseTabsDemoCode from '!raw-loader!@demo/tabs/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Tabs', module)

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
        <BaseTabsDemo />
      </View>
    )
  }, {
      story: {
        code: BaseTabsDemoCode
      }
    })
