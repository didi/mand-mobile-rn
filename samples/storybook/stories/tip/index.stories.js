import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Readme from './README.md';
import TipDemo from '@demo/tip/base.demo'
import TipDemoCode from '!raw-loader!@demo/tip/base.demo'
import TipBottomDemo from '@demo/tip/bottom.demo'
import TipBottomDemoCode from '!raw-loader!@demo/tip/bottom.demo'
import TipLeftDemo from '@demo/tip/left.demo'
import TipLeftDemoCode from '!raw-loader!@demo/tip/left.demo'
import TipRightDemo from '@demo/tip/right.demo'
import TipRightDemoCode from '!raw-loader!@demo/tip/right.demo'
import TipOtherDemo from '@demo/tip/other.demo'
import TipOtherDemoCode from '!raw-loader!@demo/tip/other.demo'
import { withStory } from '../../addons/story-panel/index';


const stories = storiesOf('Components/Feedback/Tips', module);

stories.addDecorator(withKnobs);
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
  .add('Base', () => <TipDemo />, {
    story: {
      code: TipDemoCode
    }
  })
  .add('Bottom', () => <TipBottomDemo />, {
    story: {
      code: TipBottomDemoCode
    }
  })
  .add('Left', () => <TipLeftDemo />, {
    story: {
      code: TipLeftDemoCode
    }
  })
  .add('Right', () => <TipRightDemo />, {
    story: {
      code: TipRightDemoCode
    }
  })
  .add('Other', () => <TipOtherDemo />, {
    story: {
      code: TipOtherDemoCode
    }
  })