import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCellItem, MDSwitch } from '../../../src'
import styles from './styles'

export default class MultiRowCellItemDemo extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <MDCellItem title="交通银行(尾号3089)" brief="展示摘要描述" />
        <MDCellItem
          title="招商银行(尾号2342)"
          brief="展示摘要描述"
          right={<MDSwitch onPress={()=>{this.props.onPress('点击领取')}}></MDSwitch>}
        />
        <MDCellItem
          title="交通银行(尾号3089)"
          brief="展示摘要描述"
          addon="附加文案"
          arrow
        />
        <MDCellItem
          title="交通银行"
          brief="展示摘要描述"
          addon="附加文案"
          arrow
          left={<View style={styles.holder2}></View>}
        />
        <MDCellItem
          title="招商银行"
          brief="展示摘要描述"
          addon="禁用的项目"
          arrow
          disabled
          left={<View style={styles.holder2}></View>}
        />
        <MDCellItem
          title="Mand Mobile"
          brief="A mobile UI toolkit"
          arrow
          below={
            <Text style={{fontSize:12, color: '#858B9C'}}>
              面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
            </Text>
          }
        />
      </View>
    )
  }
}
