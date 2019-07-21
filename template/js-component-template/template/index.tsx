import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface IMD{{ccname}}Props {
  styles?: IMD{{ccname}}Style,
}

interface IMD{{ccname}}State {
  text: string;
}

interface IMD{{ccname}}Style {
  wrapper?: ViewStyle,
  text?: TextStyle,
}

export const MD{{ccname}}Styles: IMD{{ccname}}Style = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  text: {
    color: '#ea4'
  }
}

const styles = StyleSheet.create<IMD{{ccname}}Style>(MD{{ccname}}Styles)

export default class MD{{ccname}} extends React.Component<IMD{{ccname}}Props, IMD{{ccname}}State> {

  public static defaultProps = {
    styles: styles
  }

  constructor(props: IMD{{ccname}}Props) {
    super(props)
    this.state = {
      text: 'MD{{ccname}}'
    }
  }

  render() {
    const styles = this.props.styles || {}

    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>{this.state.text}</Text>
      </View>
    )
  }
}
