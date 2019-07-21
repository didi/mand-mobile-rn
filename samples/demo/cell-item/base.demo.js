import * as React from 'react'
import { View } from 'react-native'
import { MDCellItem } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseCellItemDemo extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <MDCellItem
          title="普通条目"
          onPress={()=>{ this.props.onPress('普通条目'); }}
        />
        <MDCellItem
          title="动作条目"
          arrow
          onPress={()=>{ this.props.onPress('动作条目'); }}
        />
        <MDCellItem
          title="禁用条目"
          disabled
          onPress={()=>{ this.props.onPress('禁用条目'); }}
        />
      </View>
    )
  }
}
