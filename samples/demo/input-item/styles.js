import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 15
  }
});
