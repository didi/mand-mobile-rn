import * as React from 'react'
import { View } from 'react-native'
import { MDSteps, MDButton } from 'mand-mobile-rn'

export default class AnimatedDemo extends React.Component {
  state = {
    current: 0,
  }
  onPress0() {
    this.setState({ current: 0 })
  }

  onPress() {
    this.setState({ current: 2 })
  }

  onPress2() {
    this.setState({ current: 4 })
  }

  onPress3() {
    this.setState({ current: 2.4 })
  }
  onPress4() {
    this.setState({ current: 3 })
  }

  render() {
    const steps = [
      {
        title: '步骤1',
        brief: '描述1',
      },
      {
        title: '步骤2',
        brief: '描述2',
      },
      {
        title: '步骤3',
        brief: '描述3',
      },
      {
        title: '步骤4',
        brief: '描述4',
      },
      {
        title: '步骤5',
        brief: '描述5',
      },
    ]
    return (
      <View>
        <MDSteps
          steps={steps}
          direction="vertical"
          current={this.state.current}
          transition
        />
        <MDSteps steps={steps} current={this.state.current} transition />
        <MDButton
          style={{ marginVertical: 10 }}
          type="primary"
          onPress={this.onPress0.bind(this)}
        >
          current=0
        </MDButton>
        <MDButton
          style={{ marginVertical: 10 }}
          type="primary"
          onPress={this.onPress.bind(this)}
        >
          current=2
        </MDButton>
        <MDButton
          style={{ marginVertical: 10 }}
          type="primary"
          onPress={this.onPress4.bind(this)}
        >
          current=3
        </MDButton>
        <MDButton type="primary" onPress={this.onPress2.bind(this)}>
          current=4
        </MDButton>
        <MDButton
          style={{ marginVertical: 10 }}
          type="primary"
          onPress={this.onPress3.bind(this)}
        >
          current=2.4
        </MDButton>
      </View>
    )
  }
}
