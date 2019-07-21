import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Readme from './README.md'
import BaseCellItemDemo from '@demo/cell-item/base.demo'
import BaseCellItemDemoCode from '!raw-loader!@demo/cell-item/base.demo'
import SingleRowDemo from '@demo/cell-item/single-row.demo'
import SingleRowDemoCode from '!raw-loader!@demo/cell-item/single-row.demo'
import MultiRowsDemo from '@demo/cell-item/multi-rows.demo'
import MultiRowsDemoCode from '!raw-loader!@demo/cell-item/multi-rows.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/CellItem', module)

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
  .add('Base', () => <BaseCellItemDemo onPress={action('clicked')} />, {
    story: {
      code: BaseCellItemDemoCode
    }
  })
  .add('Single', () => <SingleRowDemo onPress={action('clicked')} />, {
    story: {
      code: SingleRowDemoCode
    }
  })
  .add('MultiRows', () => <MultiRowsDemo onPress={action('clicked')} />, {
    story: {
      code: MultiRowsDemoCode
    }
  })
