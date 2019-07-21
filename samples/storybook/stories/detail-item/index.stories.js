import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import { MDDetailItem } from 'mand-mobile-rn'
import BaseDetailItemDemo from '@demo/detail-item/base.demo'
import BaseDetailItemDemoCode from '!raw-loader!@demo/detail-item/base.demo'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/DetailItem', module)

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
  .add('With knobs', () => {
    return (
      <MDDetailItem
        title={text('title', '承保公司')}
        content={text('content', '众安')}
        bold={boolean('bold', false)}
      />
    )
  })
  .add('Base', () => <BaseDetailItemDemo />, {
    story: {
      code: BaseDetailItemDemoCode
    }
  })
