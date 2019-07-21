import React from 'react'
import { View } from 'react-native'
import { MDAmount } from 'mand-mobile-rn'
import { storiesOf } from '@storybook/react'
import {
  text,
  boolean,
  number,
  select,
  color,
  object,
  withKnobs,
} from '@storybook/addon-knobs'
import Readme from './README.md'
import Notes from './NOTES.md'
import AmountBaseDemo from '@demo/amount/base.demo'
import AmountBaseDemoCode from '!raw-loader!@demo/amount/base.demo'
import AmountFormatDemo from '@demo/amount/format.demo'
import AmountFormatDemoCode from '!raw-loader!@demo/amount/format.demo'
import AmountMaskDemo from '@demo/amount/mask.demo'
import AmountMaskDemoCode from '!raw-loader!@demo/amount/mask.demo'
import AmountAnimDemo from '@demo/amount/anim.demo'
import AmountAnimDemoCode from '!raw-loader!@demo/amount/anim.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Business/Amount', module)

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
    const formatOpts = ['%v%s', '%s%v', '%s %v', '%s (%v)', '%s --']
    const styleOpts = {
      backgroundColor: '#FFFFFF',
    }
    const amount = number('amount', 12823823.9840099342)
    return (
      <MDAmount
        amount={amount}
        precision={number('precision', 6)}
        symbol={text('symbol', '$')}
        thousand={text('thousand', ',')}
        decimal={text('decimal', '.')}
        format={select(
          'format(%s = symbol, %v = value/number, Your can edit.)',
          formatOpts,
          '%s%v',
        )}
        fontFamily={text('fontFamily', 'DIN Medium')}
        fontSize={number('fontSize', 24)}
        color={color('color', '#9013FE')}
        style={object('style', styleOpts)}
        mask={boolean('mask', false)}
        transition={boolean('transition', false)}
        fontHeight={number('fontHeight', 40)}
        containerHeight={number('containerHeight', 40)}
        containerStyle={object('containerStyle', styleOpts)}
        duration={number('duration', 1000)}
        startAnim={boolean('startAnim', false)}
      />
    )
  }, {
      readme: {
        content: Notes
      }
    })
  .add('Base', () => <AmountBaseDemo style={{ justifyContent: 'center' }} />, {
    story: {
      code: AmountBaseDemoCode
    }
  })
  .add('Format', () => <AmountFormatDemo style={{ justifyContent: 'center' }} />, {
    story: {
      code: AmountFormatDemoCode
    }
  })
  .add('Toggle/Mask', () =>
    (
      <View style={{ justifyContent: 'center' }}>
        <AmountMaskDemo />
      </View>
    ), {
      story: {
        code: AmountMaskDemoCode
      }
    }
  )
  .add('Anim', () =>
    (
      <View style={{ justifyContent: 'center' }}>
        <AmountAnimDemo />
      </View>
    ), {
      story: {
        code: AmountAnimDemoCode
      }
    }
  )
