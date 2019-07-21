import React from 'react'
import { View, StyleSheet } from 'react-native'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  select,
  color,
} from '@storybook/addon-knobs'
import { MDTag, MDTagStyles } from 'mand-mobile-rn'
import Readme from './README.md'
import HalfRoundDemo from '@demo/tag/half.demo';
import HalfRoundDemoCode from '!raw-loader!@demo/tag/half.demo'
import RoundDemo from '@demo/tag/round.demo';
import RoundDemoCode from '!raw-loader!@demo/tag/round.demo'
import RisedDemo from '@demo/tag/raised.demo';
import RisedDemoCode from '!raw-loader!@demo/tag/raised.demo'
import GhostDemo from '@demo/tag/ghost.demo';
import GhostDemoCode from '!raw-loader!@demo/tag/ghost.demo'
import SpecialDemo from '@demo/tag/special.demo';
import SpecialDemoCode from '!raw-loader!@demo/tag/special.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Tag', module)

const tagStyles = Object.assign({}, MDTagStyles, {
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 20,
  }
})

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
    },
  })
  .add('With knobs', () => {
    const typeOpts = ['fill', 'ghost']
    const sizeOpts = ['large', 'small', 'tiny']
    const shapeOpts = ['square', 'circle', 'fillet', 'quarter', 'coupon']
    const fontWeightOpts = ['normal', 'bold', 'bolder']
    const sharpOpts = [
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      null,
    ]

    return (
      <View style={[styles.iconWrap, { height: 120 }]}>
        <MDTag
          type={select('type', typeOpts, 'ghost')}
          size={select('size', sizeOpts, 'large')}
          shape={select('shape', shapeOpts, 'square')}
          sharp={select('sharp', sharpOpts, null)}
          fillColor={color('fill color', '#ffffff')}
          textColor={color('font color', '#fc9153')}
          fontWeight={select('font weight', fontWeightOpts, 'normal')}
          styles={tagStyles}
        >
          {text('title', 'Default')}
        </MDTag>
      </View>
    )
  })
  .add('Half Round', () => <HalfRoundDemo />, {
    story: {
      code: HalfRoundDemoCode
    }
  })
  .add('Round', () => <RoundDemo />, {
    story: {
      code: RoundDemoCode
    }
  })
  .add('Rised', () => <RisedDemo />, {
    story: {
      code: RisedDemoCode
    }
  })
  .add('Ghost', () => <GhostDemo />, {
    story: {
      code: GhostDemoCode
    }
  })
  .add('Special', () => <SpecialDemo />, {
    story: {
      code: SpecialDemoCode
    }
  });

const styles = StyleSheet.create({
  iconWrap: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#efefef',
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 10,
  },
})
