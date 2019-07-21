import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select, object } from '@storybook/addon-knobs'
import { MDResultPage } from 'mand-mobile-rn'
import Readme from './README.md'
import { View, StyleSheet, Dimensions, Alert } from 'react-native'
import { withStory } from '../../addons/story-panel/index'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: Dimensions.get('window').height - 300,
  },
})

const stories = storiesOf('Components/Business/ResultPage', module)

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
    },
  })
  .add('With knobs', () => {
    const typeOpts = ['empty', 'lost', 'network']
    const buttons = [{ text: '' }, { text: '', type: 'primary' }]
    return (
      <View style={styles.container}>
        <MDResultPage
          type={select('type', typeOpts, 'empty')}
          text={text('text', '')}
          subtext={text('subtext', '')}
          buttons={object('buttons（Modify text show buttons）', buttons)}
          imgUrl={text('imgUrl', '')}
        />
      </View>
    )
  })
  .add('404', () => (
    <View style={styles.container}>
      <MDResultPage type="lost" />
    </View>
  ))
  .add('网络异常', () => (
    <View style={styles.container}>
      <MDResultPage type="network" subtext="点击屏幕，重新加载" />
    </View>
  ))
  .add('按钮', () => {
    const buttons = [
      {
        text: '普通按钮',
        handler: action('clicked'),
      },
      {
        type: 'primary',
        text: '高亮按钮',
        handler: function () {
          Alert.alert('Title')
        },
      },
    ]
    return (
      <View style={styles.container}>
        <MDResultPage buttons={buttons} />
      </View>
    )
  })
  .add('自定义图案', () => (
    <View style={styles.container}>
      <MDResultPage
        text="不太确定自己错在了哪里..."
        imgUrl="http://manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp"
        subtext="要不然返回试试？"
      />
    </View>
  ))
