import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  color,
} from '@storybook/addon-knobs'
import { MDActivityIndicator } from 'mand-mobile-rn'
import Readme from './README.md'
import RollerDemo from '@demo/activity-indicator/roller.demo'
import RollerDemoCode from '!raw-loader!@demo/activity-indicator/roller.demo'
import SpinnerDemo from '@demo/activity-indicator/spinner.demo'
import SpinnerDemoCode from '!raw-loader!@demo/activity-indicator/spinner.demo'
import CarouselDemo from '@demo/activity-indicator/carousel.demo'
import CarouselDemoCode from '!raw-loader!@demo/activity-indicator/carousel.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/ActivityIndicator', module)

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
    }
  })
  .add('With knobs', () => {
    const typeOpts = ['roller', 'spinner', 'carousel']

    return (
      <MDActivityIndicator
        type={select('type', typeOpts, 'roller')}
        size={number('size', 35)}
        color={color('color', '#fc9153')}
        textColor={color('textColor', '#999')}
        textSize={number('textSize', 35)}
        column={boolean('column', true)}
      >
        {text('children', '加载中...')}
      </MDActivityIndicator>
    )
  })
  .add('Roller', () => <RollerDemo />, {
    story: {
      code: RollerDemoCode
    }
  })
  .add('Spinner', () => <SpinnerDemo />, {
    story: {
      code: SpinnerDemoCode
    }
  })
  .add('Carousel', () => <CarouselDemo />, {
    story: {
      code: CarouselDemoCode
    }
  })
