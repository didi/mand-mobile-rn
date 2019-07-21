import * as React from 'react'
import { View, Text } from 'react-native'
import { MDBill, MDDetailItem, MDIcon, MDTag } from 'mand-mobile-rn'
import styles from './styles'

export default class BaseFieldDemo extends React.Component {
  render() {
    return (
      <MDBill
        header={
          <View style={styles.header}>
            <Text style={styles.title}>借款单据</Text>
            <Text style={styles.desc}>仔细阅读，关注您的利益、义务</Text>
          </View>
        }
        footer={
          <View style={styles.footer}>
            <Text style={styles.footText}>
              1 账单生成后显示在滴水贷首页，请按时还款避免逾期。
            </Text>
            <Text style={styles.footText}>
              2 整笔账单还款完成后，额度将恢复。暂不支持额度实时恢复。
            </Text>
            <Text style={styles.footText}>
              3 还款日将自动扣款，扣款顺序优先余额，其次还款账户：工商银行
              (尾号xxxx)。
            </Text>
          </View>
        }
      >
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
