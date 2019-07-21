import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MDIcon } from 'mand-mobile-rn'

export class Category extends React.Component {
  render() {
    const items = this.props.items
      .sort((a, b) => a.path > b.path)
      .map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => {
            this.props.navigation.navigate(item.path)
          }}
        >
          <Text style={styles.categoryItemInner}>
            {item.name} - {item.ccname}
          </Text>
          <MDIcon
            style={styles.blockTitleIcon}
            name="arrow-right"
            color="#333"
            size={12}
          />
        </TouchableOpacity>
      ))

    return <View style={styles.categoryList}>{items}</View>
  }
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
