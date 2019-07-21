import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import Readme from './README.md'
import BaseDropMenuDemo from '@demo/drop-menu/base.demo'
import BaseDropMenuDemoCode from '!raw-loader!@demo/drop-menu/base.demo'
import InitDropMenuDemo from '@demo/drop-menu/init.demo'
import InitDropMenuDemoCode from '!raw-loader!@demo/drop-menu/init.demo'
import DisableDropMenuDemo from '@demo/drop-menu/disable.demo'
import DisableDropMenuDemoCode from '!raw-loader!@demo/drop-menu/disable.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/DropMenu', module)

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
  .addDecorator(withReadme(Readme))
  .add('Base', () => <BaseDropMenuDemo />, {
    story: {
      code: BaseDropMenuDemoCode
    }
  })
  .add('Multi', () => <InitDropMenuDemo />, {
    story: {
      code: InitDropMenuDemoCode
    }
  })
  .add('Disable', () => <DisableDropMenuDemo />, {
    story: {
      code: DisableDropMenuDemoCode
    }
  })
