import React, { SFC, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MDIcon } from '../../src';

export interface IBlockProps {
  name: string;
  ccname: string;
  color: string;
}

export const Block: SFC<IBlockProps> = ({color, ccname, name, children}) => {
  const [fold, setFold] = useState(false);
  const iconName = fold ? 'arrow-down' : 'arrow-right';
  const list = fold ? children : null;

  return (
    <View style={styles.block}>
      <TouchableOpacity
        style={[styles.blockTitle, { borderLeftColor: color }]}
        onPress={() => {
          setFold(!fold);
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.blockTitleEn}>
            {name}&nbsp;&nbsp;&nbsp;
          </Text>
          <Text style={styles.blockTitleCn}>{ccname}</Text>
        </View>
        <MDIcon
          name={iconName}
          color="#333"
          size={22}
        />
      </TouchableOpacity>
      {list}
    </View>
  )
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
