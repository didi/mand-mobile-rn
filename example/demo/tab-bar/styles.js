import { StyleSheet } from 'react-native'

export default (styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  subtitle: {
    fontSize: 12,
    color: '#666f83',
    paddingBottom: 18,
  },
  customItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100%',
    flex: 1,
  },
  tabText: {
    fontSize: 10,
  },
}))
