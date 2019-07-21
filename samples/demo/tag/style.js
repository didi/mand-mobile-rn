import { MDTagStyles } from 'mand-mobile-rn'

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
