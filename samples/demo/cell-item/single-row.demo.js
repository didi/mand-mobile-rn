import * as React from 'react'
import { View, Text } from 'react-native'
import { MDCellItem, MDSwitch } from 'mand-mobile-rn'
import styles from './styles'

export default class SingleRowCellItemDemo extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <MDCellItem title="滴水贷" addon="可用8000.34" arrow />
        <MDCellItem title="滴水贷" addon="可用8000.34" />
        <MDCellItem
          title="滴水贷"
          addon="可用8000.34"
          right={<MDSwitch></MDSwitch>}
        />
        <MDCellItem
          title="滴水贷"
          addon="可用8000.34"
          right={<MDSwitch type='disabled' onPress={()=>{this.props.onPress('点击领取')}}></MDSwitch>}
          disabled
        />
        <MDCellItem
          title="滴水贷"
          addon="可用8000.34"
          arrow
          left={<View style={styles.holder}></View>}
        />
        <MDCellItem
          arrow
        >
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <View style={styles.holder}></View>
            <Text style={{marginLeft: 15, color: '#2F86F6', fontSize: 16}}>信用付</Text>
          </View>
          
        </MDCellItem>
      </View>
    )
  }
}
