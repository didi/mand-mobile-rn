import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseDemo from '@demo/steps/base.demo'
import BaseDemoCode from '!raw-loader!@demo/steps/base.demo'
import CurrentDemo from '@demo/steps/current.demo'
import CurrentDemoCode from '!raw-loader!@demo/steps/current.demo'
import CurrentDecimalDemo from '@demo/steps/current.decimal.demo'
import CurrentDecimalDemoCode from '!raw-loader!@demo/steps/current.decimal.demo'
import FinishedDemo from '@demo/steps/finished.demo'
import FinishedDemoCode from '!raw-loader!@demo/steps/finished.demo'
import VerticalDemo from '@demo/steps/vertical.demo'
import VerticalDemoCode from '!raw-loader!@demo/steps/vertical.demo'
import CustomIconDemo from '@demo/steps/custom.icon.demo'
import CustomIconDemoCode from '!raw-loader!@demo/steps/custom.icon.demo'
import CustomContentDemo from '@demo/steps/custom.content.demo'
import CustomContentDemoCode from '!raw-loader!@demo/steps/custom.content.demo'
import CustomContentDemo2 from '@demo/steps/custom.content.demo.2'
import CustomContentDemo2Code from '!raw-loader!@demo/steps/custom.content.demo.2'
import AnimatedDemo from '@demo/steps/animated.demo'
import AnimatedDemoCode from '!raw-loader!@demo/steps/animated.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Steps', module)

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
  .add('Base', () => <BaseDemo />, {
    style: {
      code: BaseDemoCode
    }
  })
  .add('Current', () => <CurrentDemo />, {
    style: {
      code: CurrentDemoCode
    }
  })
  .add('Current Decimal', () => <CurrentDecimalDemo />, {
    style: {
      code: CurrentDecimalDemoCode
    }
  })
  .add('Animated', () => <AnimatedDemo />, {
    style: {
      code: AnimatedDemoCode
    }
  })
  .add('Finished', () => <FinishedDemo />, {
    style: {
      code: FinishedDemoCode
    }
  })
  .add('Vertical', () => <VerticalDemo />, {
    style: {
      code: VerticalDemoCode
    }
  })
  .add('CustomIcon', () => <CustomIconDemo />, {
    style: {
      code: CustomIconDemoCode
    }
  })
  .add('CustomContent', () => <CustomContentDemo />, {
    style: {
      code: CustomContentDemoCode
    }
  })
  .add('CustomContent2', () => <CustomContentDemo2 />, {
    style: {
      code: CustomContentDemo2Code
    }
  })
