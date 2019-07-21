import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { MDField, MDFieldItem } from 'mand-mobile-rn'
import FieldDemo from '@demo/field/base.demo'
import FieldDemoCode from '!raw-loader!@demo/field/base.demo'
import Readme from './README.md'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Form/Field', module)

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
      <MDField
        title={text('header', '区域标题')}
        brief={text('brief', '区域描述性文本，可根据具体场景配置')}
      >
        <MDFieldItem
          solid={boolean('solid', false)}
          title={text('title', '标题区域')}
          placeholder={text('placeholder', '提示文本')}
          addon={text('addon', '次要信息')}
          onPress={action('clicked')}
        />
        <MDFieldItem
          title={text('title', '标题区域')}
          arrow={boolean('arrow', false)}
          content={text('content', '内容文本')}
          x
        />
        <MDFieldItem
          solid={boolean('solid', false)}
          title="禁用条目"
          content="内容禁用状态"
          disabled={boolean('disabled', true)}
        />
      </MDField>
    )
  })
  .add('Base', () => <FieldDemo />, {
    story: {
      code: FieldDemoCode
    }
  })
