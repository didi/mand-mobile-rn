import * as React from 'react'
import { View, Text } from 'react-native'
import { MDBill, MDDetailItem, MDIcon, MDTag } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseFieldDemo extends React.Component {
  render() {
    return (
      <MDBill title="借款电子票据" no="12345689" waterMark="MAND-MOBILE-RN">
        <MDDetailItem title="借款金额">
          <Text style={{ color: '#41485D' }}>&yen;30,000</Text>
        </MDDetailItem>
        <MDDetailItem title="收款账户">
          <View style={styles.rightWrap}>
            <MDIcon name="info" />
            <View style={{ marginLeft: 6 }}>
              <Text style={{ color: '#41485D' }}>招商银行(尾号xxxx)</Text>
            </View>
          </View>
        </MDDetailItem>
        <MDDetailItem title="借款期数" content="12期" />
        <MDDetailItem title="正常还款总息">
          <Text style={{ color: '#41485D' }}>&yen;140.50</Text>
        </MDDetailItem>
        <MDDetailItem title="还款">
          <View style={styles.rightWrap}>
            <MDTag
              size={'small'}
              shape={'fillet'}
              type={'fill'}
              fillColor={'#858B9C'}
              fontColor={'#ffffff'}
            >
              首次
            </MDTag>
            <View style={{ marginLeft: 6 }}>
              <Text style={{ color: '#41485D' }}>
                &yen;404.50&nbsp;(9月22日)
              </Text>
            </View>
          </View>
        </MDDetailItem>
      </MDBill>
    )
  }
}
