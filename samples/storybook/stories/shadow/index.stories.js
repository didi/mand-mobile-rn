import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  number,
  color,
} from '@storybook/addon-knobs'
import Readme from './README.md'
import { View } from 'react-native'
import { MDBoxShadow, MDBorderShadow } from 'mand-mobile-rn'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Shadow', module)

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
  .add('With knobs', () => {
    const shadowOpts = {
      shadowColor: color('shadowColor', '#333'),
      shadowOffset: {
        width: number('shadowOffsetWidth', 0),
        height: number('shadowOffsetHeight', 0),
      },
      shadowOpacity: number('shadowOpacity', 0.2),
      shadowRadius: number('shadowRadius', 10),
    }

    return (
      <View>
        <MDBoxShadow
          style={{
            width: 100,
            height: 100,
          }}
          {...shadowOpts}
        />
        <MDBorderShadow
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
          }}
          {...shadowOpts}
        />
      </View>
    )
  })
