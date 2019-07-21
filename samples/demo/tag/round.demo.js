import * as React from 'react'
import { View } from 'react-native'
import { MDTag } from 'mand-mobile-rn'
import style from './style'

export default class RoundDemo extends React.Component {
    render() {
      return (
        <View style={style.container}>
          <MDTag
            type={'fill'}
            size={'large'}
            shape={'fillet'}
            fillColor={'rgba(255, 91, 96, .1)'}
            textColor={'#FF5B60'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            逾期23天
          </MDTag>
        </View>
      )
    }
  }
