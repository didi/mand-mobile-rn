import React from 'react'
import { storiesOf } from '@storybook/react'
import { MDButton } from 'mand-mobile-rn'
import Readme from './README.md'
import style from '@demo/button/style'
import { View, Text } from 'react-native'
import { withStory } from '../../addons/story-panel/index'
import BaseDemo from '@demo/number-keyboard/base.web.demo'

const stories = storiesOf('Components/Form/NumberKeyboard', module)

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
  .add('Base', () => <BaseDemo />, {
    story: {
      code: () => {
        return (
          <View style={style.container}>
            <Text style={{ color: 'orange', marginBottom: 10 }}>
              请在手机端查看本组件效果
            </Text>
            <MDButton
              style={style.margin}
              type="primary"
              size="large"
              plain={false}
              round={false}
              inactive={false}
              onPress={() => {
                console.info('唤起有小数点的键盘')
              }}
            >
              唤起键盘，有小数点
            </MDButton>
            <MDButton
              style={style.margin}
              type="primary"
              size="large"
              plain={false}
              round={false}
              inactive={false}
              onPress={() => {
                console.info('唤起有小数点的键盘')
              }}
            >
              唤起键盘，无小数点
            </MDButton>
            <MDButton
              style={style.margin}
              type="primary"
              size="large"
              plain={false}
              round={false}
              inactive={false}
              onPress={() => {
                console.info('唤起有小数点的键盘')
              }}
            >
              唤起键盘，替换键值
            </MDButton>
            <MDButton
              style={style.margin}
              type="primary"
              size="large"
              plain={false}
              round={false}
              inactive={false}
              onPress={() => {
                console.info('唤起有小数点的键盘')
              }}
            >
              唤起键盘，简单类型
            </MDButton>
            <MDButton
              style={style.margin}
              type="primary"
              size="large"
              plain={false}
              round={false}
              inactive={false}
              onPress={() => {
                console.info('唤起有小数点的键盘')
              }}
            >
              唤起键盘，数字键乱序
            </MDButton>
          </View>
        )
      },
    },
  })
