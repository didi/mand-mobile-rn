import React from 'react'
import { storiesOf } from '@storybook/react'
import Readme from './README.md'
import DateDemo from '@demo/date-picker/date.web.demo'
import DateDemoCode from '!raw-loader!@demo/date-picker/date.demo'
import TimeDemo from '@demo/date-picker/time.web.demo'
import TimeDemoCode from '!raw-loader!@demo/date-picker/time.demo'
import DateTimeDemo from '@demo/date-picker/date2.web.demo'
import DateTimeDemoCode from '!raw-loader!@demo/date-picker/date2.demo'
import CustomDemo from '@demo/date-picker/custom.web.demo'
import CustomDemoCode from '!raw-loader!@demo/date-picker/custom.demo'
import { withStory } from '../../addons/story-panel/index'

const stories = storiesOf('Components/Feedback/DatePicker', module)

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
  .add('Base', () => <DateDemo />, {
    story: {
      code: DateDemoCode,
    },
  })
  .add('Time', () => <TimeDemo />, {
    story: {
      code: TimeDemoCode,
    },
  })
  .add('DateTime', () => <DateTimeDemo />, {
    story: {
      code: DateTimeDemoCode,
    },
  })
  .add('CustomDemo', () => <CustomDemo />, {
    story: {
      code: CustomDemoCode,
    },
  })
