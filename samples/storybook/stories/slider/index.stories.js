import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import BaseSliderDemo from '@demo/slider/base.demo'
import BaseSliderDemoCode from '!raw-loader!@demo/slider/base.demo'
import FormatSliderDemo from '@demo/slider/format.demo'
import FormatSliderDemoCode from '!raw-loader!@demo/slider/format.demo'
import DisabledSliderDemo from '@demo/slider/disabled.demo'
import DisabledSliderDemoCode from '!raw-loader!@demo/slider/disabled.demo'
import StepSliderDemo from '@demo/slider/step.demo'
import StepSliderDemoCode from '!raw-loader!@demo/slider/step.demo'
import RangeSliderDemo from '@demo/slider/range.demo'
import RangeSliderDemoCode from '!raw-loader!@demo/slider/range.demo'
import BorderSliderDemo from '@demo/slider/border.demo'
import BorderSliderDemoCode from '!raw-loader!@demo/slider/border.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Slider', module)

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
  .add('Base', () => <BaseSliderDemo />, {
    story: {
      code: BaseSliderDemoCode
    }
  })
  .add('Format', () => <FormatSliderDemo />, {
    story: {
      code: FormatSliderDemoCode
    }
  })
  .add('Disabled', () => <DisabledSliderDemo />, {
    story: {
      code: DisabledSliderDemoCode
    }
  })
  .add('Step', () => <StepSliderDemo />, {
    story: {
      code: StepSliderDemoCode
    }
  })
  .add('Range', () => <RangeSliderDemo />, {
    story: {
      code: RangeSliderDemoCode
    }
  })
  .add('Border', () => <BorderSliderDemo />, {
    story: {
      code: BorderSliderDemoCode
    }
  })
