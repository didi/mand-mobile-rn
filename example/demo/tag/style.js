import { MDTagStyles } from '../../../src'

export default {
  tag: Object.assign({}, MDTagStyles, {
    wrapper: {
      marginHorizontal: 10,
      marginVertical: 20,
    }
  }),
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}
