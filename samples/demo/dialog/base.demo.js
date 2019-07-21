import * as React from 'react'
import { MDDialog, MDButton } from 'mand-mobile-rn'

export default class BaseDialogDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleName: '',
    }
  }

  onPressBase() {
    this.setState({
      visibleName: 'base',
    })
  }

  onPressIcon() {
    this.setState({
      visibleName: 'icon',
    })
  }

  onPressWarning() {
    this.setState({
      visibleName: 'warn',
    })
  }

  onPressOptions() {
    this.setState({
      visibleName: 'options',
    })
  }

  render() {
    return (
      <React.Fragment>
        <MDButton
          onPress={() => {
            this.onPressBase()
          }}
        >
          基本
        </MDButton>
        <MDDialog
          {...baseProps.base}
          isVisible={this.state.visibleName === 'base'}
        />
        <MDButton
          onPress={() => {
            this.onPressIcon()
          }}
        >
          带图标
        </MDButton>
        <MDDialog
          {...baseProps.icon}
          isVisible={this.state.visibleName === 'icon'}
        />
        <MDButton
          onPress={() => {
            this.onPressWarning()
          }}
        >
          警示操作
        </MDButton>
        <MDDialog
          {...baseProps.warning}
          isVisible={this.state.visibleName === 'warn'}
        />
        <MDButton
          onPress={() => {
            this.onPressOptions()
          }}
        >
          多操作
        </MDButton>
        <MDDialog
          {...baseProps.options}
          isVisible={this.state.visibleName === 'options'}
        />
      </React.Fragment>
    )
  }
}

const baseProps = {
  base: {
    closeable: true,
    title: '窗口标题',
    context: '人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。',
    btns: [
      {
        text: '取消',
        handle: () => console.info('zzzz', 'cancel'),
      },
      {
        text: '确认操作',
        handle: () => console.info('zzzz', 'confirm'),
      },
    ],
  },
  icon: {
    closeable: false,
    icon: 'location',
    iconColor: '#868b9b',
    context:
      '围在城里的人想逃出来，城外的人想冲进去，对婚姻也罢，职业也罢，人生的愿望大都如此。',
    btns: [
      {
        text: '确认操作',
        handle: () => console.info('zzzz', 'confirm'),
      },
    ],
  },
  warning: {
    closeable: false,
    title: '警示操作',
    context:
      '或是因为习惯了孤独，我们渴望被爱；又或是害怕爱而不得，我们最后仍然选择孤独。',
    btns: [
      {
        text: '取消',
        handle: () => console.info('zzzz', 'cancel'),
      },
      {
        text: '警示操作',
        handle: () => console.info('zzzz', 'sure'),
      },
    ],
  },
  options: {
    closeable: false,
    title: '窗口标题',
    context:
      '据说每个人需要一面镜子，可以常常自照，知道自己是个什么东西。不过，能自知的人根本不用照镜子；不自知的东西，照了镜子也没有用。',
    btns: [
      {
        text: '操作一',
        handle: () => console.info('zzzz', 'cancel'),
      },
      {
        text: '操作二',
        handle: () => console.info('zzzz', 'sure'),
      },
      {
        text: '操作三',
        handle: () => console.info('zzzz', 'sure'),
      },
      {
        text: '操作四',
        handle: () => console.info('zzzz', 'sure'),
      },
    ],
  },
}
