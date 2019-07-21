import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, Text, StyleSheet } from 'react-native'
import Readme from './README.md'
import BillDemo from '@demo/bill/base.demo'
import BillDemoCode from '!raw-loader!@demo/bill/base.demo'
import BillSlotDemo from '@demo/bill/slot.demo'
import BillSlotDemoCode from '!raw-loader!@demo/bill/slot.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Business/Bill', module)

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
  .add('Base', () => <View style={styles.container}><BillDemo /></View>, {
    story: {
      code: BillDemoCode
    }
  })
  .add('Slot', () => <View style={styles.container}><BillSlotDemo /></View>, {
    story: {
      code: BillSlotDemoCode
    }
  })

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  shadow: {
    shadowColor: '#111A34',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.1,
  },
  intr: {
    fontSize: 13,
    paddingBottom: 20,
    paddingTop: 20,
  },
})
