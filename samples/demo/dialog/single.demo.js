import * as React from 'react'
import { MDDialog, MDButton } from 'mand-mobile-rn'

export default class SingleDialogDemo extends React.Component {
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
        <MDButton style={{ marginVertical: 5 }} onPress={() => mdAlert()}>
          警告弹窗
        </MDButton>
        <MDButton style={{ marginVertical: 5 }} onPress={() => confirm()}>
          确认弹窗
        </MDButton>
        <MDButton style={{ marginVertical: 5 }} onPress={() => succeed()}>
          成功弹窗
        </MDButton>
        <MDButton style={{ marginVertical: 5 }} onPress={() => failed()}>
          失败弹窗
        </MDButton>
      </React.Fragment>
    )
  }
}

const mdAlert = () => {
  MDDialog.alert({
    isVisible: true,
    closeable: false,
    title: '警告',
    context: '您正在进行非法操作',
    confirmText: '确定',
    onConfirm: () => console.info('zzzz', 'warning'),
  })
}

const confirm = () => {
  MDDialog.confirm({
    isVisible: true,
    closeable: false,
    title: '确认',
    context: '请确认是否进行操作',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.info('zzzz', 'confirm'),
  })
}

const succeed = () => {
  MDDialog.succeed({
    isVisible: true,
    closeable: false,
    title: '成功',
    context: '恭喜您成功完成操作',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.info('zzzz', 'succeed'),
  })
}

const failed = () => {
  MDDialog.failed({
    isVisible: true,
    closeable: false,
    title: '失败',
    context: '操作失败，请稍后重试',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.info('zzzz', 'failed'),
  })
}
