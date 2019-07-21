import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, number } from '@storybook/addon-knobs'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index'
import BaseStepperDemo from '../../../demo/stepper/base.demo'
import BaseStepperDemoCode from '!raw-loader!@demo/stepper/base.demo'

const stories = storiesOf('Components/Basic/Stepper', module)

stories.addDecorator(withKnobs)
stories.addDecorator(withStory)

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
  .add(
    'Base',
    () => {
      return (
        <BaseStepperDemo
          defaultValue={number('defaultValue', 0)}
          value={number('value', 0)}
          step={number('step', 1)}
          min={number('min', -10)}
          max={number('max', 10)}
          disabled={boolean('disabled', false)}
          readOnly={boolean('readOnly', false)}
          isInteger={boolean('isInteger', false)}
          onChange={(value) => {
            console.info('Stepper changed ' + value)
          }}
        />
      )
    },
    {
      story: {
        code: BaseStepperDemoCode,
      },
    },
  )
