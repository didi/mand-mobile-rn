import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Readme from './README.md'
import BaseHorizontalDemo from '@demo/swiper/base-h.demo'
import BaseHorizontalDemoCode from '!raw-loader!@demo/swiper/base-h.demo'
import BaseVerticalDemo from '@demo/swiper/base-v.demo'
import BaseVerticalDemoCode from '!raw-loader!@demo/swiper/base-v.demo'
import FadeDemo from '@demo/swiper/fade.demo'
import FadeDemoCode from '!raw-loader!@demo/swiper/fade.demo'
import MulitItemDemo from '@demo/swiper/mulit-item.demo'
import MulitItemDemoCode from '!raw-loader!@demo/swiper/mulit-item.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Swiper', module)

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
  .add('Base', () => <BaseHorizontalDemo onPress={action('clicked')} />, {
    story: {
      code: BaseHorizontalDemoCode
    }
  })
  .add('Vertical', () => <BaseVerticalDemo onPress={action('clicked')} />, {
    story: {
      code: BaseVerticalDemoCode
    }
  })
  .add('Fade', () => <FadeDemo onPress={action('clicked')} />, {
    story: {
      code: FadeDemoCode
    }
  })
  .add('MulitItem', () => <MulitItemDemo onPress={action('clicked')} />, {
    story: {
      code: MulitItemDemoCode
    }
  })
