import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, object } from '@storybook/addon-knobs';
import { MDAgree } from 'mand-mobile-rn';
import Readme from './README.md';
import { Text } from 'react-native';
import CheckedAgreeDemo from '@demo/agree/checked.demo';
import CheckedAgreeDemoCode from '!raw-loader!@demo/agree/checked.demo';
import UnCheckedAgreeDemo from '@demo/agree/unchecked.demo';
import UnCheckedAgreeDemoCode from '!raw-loader!@demo/agree/unchecked.demo';
import DisableCheckedAgreeDemo from '@demo/agree/disable.demo';
import DisableCheckedAgreeDemoCode from '!raw-loader!@demo/agree/disable.demo';
import DisableUnCheckedAgreeDemo from '@demo/agree/disable-unchecked.demo';
import DisableUnCheckedAgreeDemoCode from '!raw-loader!@demo/agree/disable-unchecked.demo';
import CheckSizeAgreeDemo from '@demo/agree/check-size.demo';
import CheckSizeAgreeDemoCode from '!raw-loader!@demo/agree/check-size.demo';
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Agree', module);

stories.addDecorator(withKnobs);
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
    const styleOpts = {
      content: {
        color: '#838794',
        textAlign: 'left',
        marginLeft: 10,
        flex: 1,
      },
      disable: {
        opacity: 0.2
      }
    }

    const iconOps = ['smaller', 'small', 'medium', 'large', 20, 30, 40];
    return (
      <MDAgree
        content={//text("text") ||
          <Text>
            本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
          <Text style={{ color: '#5878b4' }}>
              《投保须知》
          </Text>
            ,
          <Text style={{ color: '#5878b4' }}>
              《保险条款》
          </Text>
          </Text>
        }
        disabled={boolean("disabled", false)}
        checked={boolean("checked", true)}
        size={select('size', iconOps, 'medium')}
        style={object("style", styleOpts)}
      ></MDAgree>
    );
  })
  .add('Base', () => <CheckedAgreeDemo />, {
    story: {
      code: CheckedAgreeDemoCode
    }
  })
  .add('Unchecked', () => <UnCheckedAgreeDemo />, {
    story: {
      code: UnCheckedAgreeDemoCode
    }
  })
  .add('Disable Checked', () => <DisableCheckedAgreeDemo />, {
    story: {
      code: DisableCheckedAgreeDemoCode
    }
  })
  .add('Disable Unchecked', () => <DisableUnCheckedAgreeDemo />, {
    story: {
      code: DisableUnCheckedAgreeDemoCode
    }
  })
  .add('Custom Size', () => <CheckSizeAgreeDemo />, {
    story: {
      code: CheckSizeAgreeDemoCode
    }
  })