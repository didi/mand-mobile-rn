import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MDIcon } from '../../src';

interface ICategoryItem {
  name: string;
  ccname: string;
  path: string;

}

interface ICategoryProps {
  navigation: any;
  items: ICategoryItem[];
}

export const Category: React.SFC<ICategoryProps> = ({ items, navigation }) => {
  const _items = items
    .sort((a, b) => Number(a.path > b.path))
    .map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.categoryItem}
        onPress={() => {
          navigation.navigate(item.path)
        }}
      >
        <Text style={styles.categoryItemInner}>
          {item.name} - {item.ccname}
        </Text>
        <MDIcon
          name="arrow-right"
          color="#333"
          size={12}
        />
      </TouchableOpacity>
    ))

  return <View style={styles.categoryList}>{_items}</View>
}

const styles = StyleSheet.create({
  categoryList: {
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  categoryItem: {
    paddingHorizontal: 16,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  categoryItemInner: {
    color: '#666f83',
    fontSize: 13,
  },
})
