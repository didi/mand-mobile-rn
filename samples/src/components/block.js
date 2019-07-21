import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MDIcon } from 'mand-mobile-rn'

export class Block extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fold: false,
    }
  }

  fold() {
    this.setState({
      fold: !this.state.fold,
    })
  }

  render() {
    const iconName = this.state.fold ? 'arrow-down' : 'arrow-right'
    const list = this.state.fold ? this.props.children : null

    return (
      <View style={styles.block}>
        <TouchableOpacity
          style={[styles.blockTitle, { borderLeftColor: this.props.color }]}
          onPress={this.fold.bind(this)}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.blockTitleEn}>
              {this.props.name}&nbsp;&nbsp;&nbsp;
            </Text>
            <Text style={styles.blockTitleCn}>{this.props.ccname}</Text>
          </View>
          <MDIcon
            style={styles.blockTitleIcon}
            name={iconName}
            color="#333"
            size={22}
          />
        </TouchableOpacity>
        {list}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 10,
  },
  blockTitle: {
    width: '100%',
    height: 60,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderTopColor: '#aaa',
    borderBottomColor: '#aaa',
    borderRightColor: '#aaa',
  },
  blockTitleEn: {
    fontSize: 22,
    color: '#111a34',
    lineHeight: 60,
  },
  blockTitleCn: {
    fontSize: 14,
    lineHeight: 60,
    color: '#666f83',
  },
})
