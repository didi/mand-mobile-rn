import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs'
import { MDInputItem } from 'mand-mobile-rn'
import Readme from './README.md'
import NormalInputDemo from '@demo/input-item/normal.demo';
import NormalInputDemoCode from '!raw-loader!@demo/input-item/normal.demo';
import BussinessInputDemo from '@demo/input-item/business.demo';
import BussinessInputDemoCode from '!raw-loader!@demo/input-item/business.demo';
import ControlInputDemo from '@demo/input-item/control.demo';
import ControlInputDemoCode from '!raw-loader!@demo/input-item/control.demo';
import FloatInputDemo from '@demo/input-item/float.demo';
import FloatInputDemoCode from '!raw-loader!@demo/input-item/float.demo';
import ErrorInputDemo from '@demo/input-item/error.demo';
import ErrorInputDemoCode from '!raw-loader!@demo/input-item/error.demo';
import LargeSizeInputDemo from '@demo/input-item/large.demo';
import LargeSizeInputDemoCode from '!raw-loader!@demo/input-item/large.demo';

import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/InputItem', module)

stories.addDecorator(withKnobs)
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
    const typeOpts = [
      'text',
      'bankCard',
      'phone',
      'money',
      'digit',
      'password',
    ]
    const alignOpts = ['left', 'center', 'right']
    const sizeOpts = ['large', 'normal']
    const keyboardTypeOpts = [
      'default',
      'email-address',
      'numeric',
      'phone-pad',
      'visible-password',
      'ascii-capable',
      'numbers-and-punctuation',
      'url',
      'number-pad',
      'name-phone-pad',
      'decimal-pad',
      'twitter',
      'web-search',
    ]

    return (
      <MDInputItem
        type={select('type', typeOpts, 'text')}
        title={text('title')}
        placeholder={text('placeholder')}
        brief={text('brief')}
        error={text('error')}
        readonly={boolean('readonly', false)}
        disabled={boolean('disabled', false)}
        highlight={boolean('highlight', false)}
        material={boolean('material', false)}
        clearable={boolean('clearable', false)}
        maxlength={number('maxlength')}
        value={text('value')}
        align={select('align', alignOpts, 'left')}
        size={select('size', sizeOpts, 'normal')}
        keyboardType={select('keyboardType', keyboardTypeOpts)}
      />
    )
  })
  .add('Normal', () => {
    return <NormalInputDemo />
  }, {
      story: {
        code: NormalInputDemoCode
      }
    })
  .add('Business', () => {
    return <BussinessInputDemo />
  }, {
      story: {
        code: BussinessInputDemoCode
      }
    })
  .add('Control', () => {
    return <ControlInputDemo />
  }, {
      story: {
        code: ControlInputDemoCode
      }
    })
  .add('Float', () => {
    return <FloatInputDemo />
  }, {
      story: {
        code: FloatInputDemoCode
      }
    })
  .add('Error', () => {
    return <ErrorInputDemo />
  }, {
      story: {
        code: ErrorInputDemoCode
      }
    })
  .add('LargeSize', () => {
    return <LargeSizeInputDemo />
  }, {
      story: {
        code: LargeSizeInputDemoCode
      }
    })
