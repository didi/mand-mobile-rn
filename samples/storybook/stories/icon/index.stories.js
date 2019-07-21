import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, select, color } from '@storybook/addon-knobs'
import Readme from './README.md'
import AllIconDemo from '@demo/icon/all.demo'
import AllIconDemoCode from '!raw-loader!@demo/icon/all.demo'
import SingleIconDemo from '@demo/icon/single.demo'
import SingleIconDemoCode from '!raw-loader!@demo/icon/single.demo'
import ColorIconDemo from '@demo/icon/color.demo'
import ColorIconDemoCode from '!raw-loader!@demo/icon/color.demo'
import { withStory } from '../../addons/story-panel/index';

import fonts from '@demo/icon/fonts'

const stories = storiesOf('Components/Basic/Icon', module)

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
  .add('With knobs', () => (
    <SingleIconDemo
      name={select('name', fonts, 'rectangle')}
      color={color('color', 'orange')}
      size={number('size', 24)}
    />
  ))
  .add('Base', () => <SingleIconDemo name="scan" size={18} />, {
    story: {
      code: SingleIconDemoCode
    }
  })
  .add('Color', () => <ColorIconDemo />, {
    story: {
      code: ColorIconDemoCode
    }
  })
  .add('Mand mobile icons', () => <AllIconDemo />, {
    story: {
      code: AllIconDemoCode
    }
  })
