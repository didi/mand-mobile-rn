import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select, object } from '@storybook/addon-knobs';
import { MDButton } from 'mand-mobile-rn';
import BaseButtonDemo from '@demo/button/base.demo'
import BaseButtonDemoCode from '!raw-loader!@demo/button/base.demo'
import RoundButtonDemo from '@demo/button/round.demo'
import RoundButtonDemoCode from '!raw-loader!@demo/button/round.demo'
import PlainButtonDemo from '@demo/button/plain.demo'
import PlainButtonDemoCode from '!raw-loader!@demo/button/plain.demo'
import ButtonSizeDemo from '@demo/button/size.demo'
import ButtonSizeDemoCode from '!raw-loader!@demo/button/size.demo'
import ButtonIconDemo from '@demo/button/icon.demo'
import ButtonIconDemoCode from '!raw-loader!@demo/button/icon.demo'
import Readme from './README.md';
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Basic/Button', module);

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
    const typeOpts = ['default', 'primary', 'warning', 'disabled', 'link']
    const sizeOpts = {
      large: 'large',
      small: 'small',
      'custom: { width: 300, height: 36, fontSize: 24 }': { width: 300, height: 36, fontSize: 24 },
      'custom: { width: 200, height: 28, fontSize: 12 }': { width: 200, height: 28, fontSize: 12 },
    }
    const styleObj = {
      // "backgroundColor": "#FF8A01",
      // "borderColor": "#000",
      // "borderWidth": 2,
      // "marginLeft": 0
    }
    return (
      <MDButton
        type={select('type', typeOpts, 'primary')}
        size={select('size', sizeOpts, 'large')}
        plain={boolean('plain', false)}
        round={boolean('round', false)}
        inactive={boolean('inactive', false)}
        icon={text('icon', 'message')}
        onPress={action('clicked')}
        style={object('style', styleObj)}
      >{text('children', 'Default')}</MDButton>
    )
  })
  .add('Base', () => <BaseButtonDemo onPress={action('clicked')} />, {
    story: {
      code: BaseButtonDemoCode
    }
  })
  .add('Round', () => <RoundButtonDemo onPress={action('clicked')} />, {
    story: {
      code: RoundButtonDemoCode
    }
  })
  .add('Plain', () => <PlainButtonDemo onPress={action('clicked')} />, {
    story: {
      code: PlainButtonDemoCode
    }
  })
  .add('Size', () => <ButtonSizeDemo onPress={action('clicked')} />, {
    story: {
      code: ButtonSizeDemoCode
    }
  })
  .add('Icon', () => <ButtonIconDemo onPress={action('clicked')} />, {
    story: {
      code: ButtonIconDemoCode
    }
  })
  // .add('Custom layout demo', () => (
  //   <React.Fragment>
  //     <MDButton icon='close' />
  //     <Marked md={'### INTRO '} />

  //     <MDButton icon='close' />
  //     <Marked md={ButtonReadme} />

  //     <MDButton icon='close' />
  //     <Marked md={'### OUTRO '} />
  //   </React.Fragment>
  // ))