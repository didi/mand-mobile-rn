import { storiesOf } from '@storybook/react'
import Readme from '../../../../README.md'
import customize from '../../../../documents/customize.md'
import development from '../../../../documents/development.md'
import quickstart from '../../../../documents/quick-start.md'

const stories = storiesOf('Mand Mobile RN', module)

stories
  .addParameters({
    viewport: { defaultViewport: '' },
    options: {
      showPanel: false,
      isToolshown: false,
    },
    readme: {
      content: '',
    },
  })
  // .add('介绍', () => { }, {
  //   readme: {
  //     content: Readme,
  //   }
  // })
  .add('快速接入', () => { }, {
    readme: {
      content: quickstart,
    }
  })
  .add('开发指南', () => { }, {
    readme: {
      content: development,
    }
  })
  .add('主题定制', () => { }, {
    readme: {
      content: customize,
    }
  })
