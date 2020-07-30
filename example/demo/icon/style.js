import { StyleSheet } from 'react-native'

export default style = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  iconWrap: { 
    borderWidth: .5, 
    borderRadius: 8,
    width: 110, 
    height: 110,
    borderColor: '#efefef', 
    marginHorizontal: 6, 
    marginVertical: 6, 
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginVertical: 10
  }
})