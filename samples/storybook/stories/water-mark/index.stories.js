import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseWaterMarkDemo from '@demo/water-mark/base.demo'
import BaseWaterMarkDemoCode from '!raw-loader!@demo/water-mark/base.demo'
import CustomWaterMarkDemo from '@demo/water-mark/custom.demo'
import CustomMarkDemoCode from '!raw-loader!@demo/water-mark/custom.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Business/WaterMark', module)

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
  .add('Base', () => <BaseWaterMarkDemo />, {
    story: {
      code: BaseWaterMarkDemoCode
    }
  })
  .add('Custom', () => <CustomWaterMarkDemo />, {
    story: {
      code: CustomMarkDemoCode
    }
  })
