import React from 'react'
import { storiesOf } from '@storybook/react'
import { MDCodeBox } from 'mand-mobile-rn'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/CodeBox', module)

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
  .add('Base', () => <MDCodeBox />)
