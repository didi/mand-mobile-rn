import React from 'react';
import { storiesOf } from '@storybook/react';
import Readme from './README.md';
import OpenSwitchDemo from '@demo/switch/base.demo'
import OpenSwitchDemoCode from '!raw-loader!@demo/switch/base.demo'
import CloseSwitchDemo from '@demo/switch/close.demo'
import CloseSwitchDemoCode from '!raw-loader!@demo/switch/close.demo'
import OpenDisabledSwitchDemo from '@demo/switch/open-disabled.demo'
import OpenDisabledSwitchDemoCode from '!raw-loader!@demo/switch/open-disabled.demo'
import CloseDisabledSwitchDemo from '@demo/switch/close-disabled.demo'
import CloseDisabledSwitchDemoCode from '!raw-loader!@demo/switch/close-disabled.demo'
import CustomSwitchDemo from '@demo/switch/custom.demo'
import CustomSwitchDemoCode from '!raw-loader!@demo/switch/custom.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Switch', module)

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
  .add('Base', () => <OpenSwitchDemo />, {
    story: {
      code: OpenSwitchDemoCode
    }
  })
  .add('Close', () => <CloseSwitchDemo />, {
    story: {
      code: CloseSwitchDemoCode
    }
  })
  .add('Custom width && height', () => <CustomSwitchDemo />, {
    story: {
      code: CustomSwitchDemoCode
    }
  })
  .add('Open && Disabled', () => <OpenDisabledSwitchDemo />, {
    story: {
      code: OpenDisabledSwitchDemoCode
    }
  })
  .add('Close && Disabled', () => <CloseDisabledSwitchDemo />, {
    story: {
      code: CloseDisabledSwitchDemoCode
    }
  })