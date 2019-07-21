import React from 'react';
import { Image } from 'react-native'
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ImgDemo from '@demo/landscape/img.demo'
import ImgDemoCode from '!raw-loader!@demo/landscape/img.demo'
import MaskClosableDemo from '@demo/landscape/maskcloseable.demo'
import MaskClosableDemoCode from '!raw-loader!@demo/landscape/maskcloseable.demo'
import FullScreenDemo from '@demo/landscape/fullscreen.demo'
import FullScreenDemoCode from '!raw-loader!@demo/landscape/fullscreen.demo'
import NoMaskDemo from '@demo/landscape/nomask.demo'
import NoMaskDemoCode from '!raw-loader!@demo/landscape/nomask.demo'
import ListenEventDemo from '@demo/landscape/listenevent.demo'
import ListenEventDemoCode from '!raw-loader!@demo/landscape/listenevent.demo'
import { MDLandscape } from 'mand-mobile-rn'
import { withStory } from '../../addons/story-panel/index';
import Readme from './README.md';

const stories = storiesOf('Components/Business/Landscape', module)

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
      <MDLandscape
        isVisible={boolean('isVisible', true)}
        hasMask={boolean('hasMask', false)}
        maskClosable={boolean('maskClosable', false)}
        fullScreen={boolean('fullScreen', false)}
        onShow={() => action('show')}
        onHide={() => action('hide')}
      >
        <Image
          source={{ uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz' }}
          style={{ width: 252, height: 328 }}
        />
      </MDLandscape>
    )
  })
  .add('Image ad', () => <ImgDemo />, {
    story: {
      code: ImgDemoCode
    }
  })
  .add('Mask closeable', () => <MaskClosableDemo />, {
    story: {
      code: MaskClosableDemoCode
    }
  })
  .add('Full screen', () => <FullScreenDemo />, {
    story: {
      code: FullScreenDemoCode
    }
  })
  .add('No mask', () => <NoMaskDemo />, {
    story: {
      code: NoMaskDemoCode
    }
  })
  .add('Listen event', () => <ListenEventDemo />, {
    story: {
      code: ListenEventDemoCode
    }
  })
