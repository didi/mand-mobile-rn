import React from 'react';
import { Alert } from 'react-native';
import Container from '../../../components/container'
import Card from '../../../components/card'
import BaseCellItemDemo from '../../../../demo/cell-item/base.demo'
import SingleRowCellItemDemo from '../../../../demo/cell-item/single-row.demo'
import MultiRowsCellItemDemo from '../../../../demo/cell-item/multi-rows.demo'

export class CellItemScreen extends React.Component {
  static navigationOptions = {
    title: 'CellItem',
  };

  render() {
    return (
      <Container>
        <Card title='Base'>
          <BaseCellItemDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </BaseCellItemDemo>
        </Card>
        <Card title='Single Row'>
          <SingleRowCellItemDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </SingleRowCellItemDemo>
        </Card>
        <Card title='Mutli Rows'>
          <MultiRowsCellItemDemo onPress={ (param)=>{ Alert.alert(param) }}>
          </MultiRowsCellItemDemo>
        </Card>
      </Container>
    );
  }
}
