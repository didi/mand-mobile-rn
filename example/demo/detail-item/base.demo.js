import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MDDetailItem } from '../../../src'

export default class BaseDetailItemDemo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MDDetailItem title={'承保公司'} content={'众安'} bold={true} />
        <MDDetailItem title={'投保人'} content={'张三'} />
        <MDDetailItem title={'被保人'} content={'李四'} />
        <MDDetailItem title={'保险费用'} content={'0.1元/日'} />
        <MDDetailItem title={'保障日期'} content={'2018/08/08 ~ 2019/08/08'} />
        <MDDetailItem title={'保单号'} content={'123456789'} />
        <MDDetailItem title={'保单协议'}>
          <Text style={styles.links}>查看</Text>
        </MDDetailItem>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 10,
  },
  links: {
    color: '#5878b4',
    fontSize: 14,
    textAlign: 'right',
  },
})
