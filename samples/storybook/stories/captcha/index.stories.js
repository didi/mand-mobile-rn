import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  color,
  object,
} from '@storybook/addon-knobs'
import { MDCaptcha } from 'mand-mobile-rn'
import Readme from './README.md'
import CaptchaDemo from '@demo/captcha/base.demo'
import CaptchaDemoCode from '!raw-loader!@demo/captcha/base.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Business/Captcha', module)

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
    }
  })
  .add('With knobs', () => {
    return (
      <MDCaptcha
        isView
        title={text('title', '输入验证码')}
        maxlength={number('maxlength', 4)}
        brief={text('brief', '最新验证码依然有效，请勿重发')}
        security={boolean('security', false)}
        system={boolean('system', false)}
        show={boolean('show', false)}
      >
        {text('children', '验证码已发送至 13800138000')}
      </MDCaptcha>
    )
  })
  .add('Basic', () => <CaptchaDemo />, {
    story: {
      code: CaptchaDemoCode
    }
  })
