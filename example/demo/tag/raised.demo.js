import * as React from 'react'
import { View } from 'react-native'
import { MDTag } from '../../../src'
import style from './style'

export default class RisedDemo extends React.Component {
    render() {
      return (
        <View style={style.container}>
          <MDTag
            type={'fill'}
            size={'large'}
            shape={'square'}
            fillColor={'rgba(0,0,0,0)'}
            textColor={'#333'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            $3600
          </MDTag>
          <MDTag
            type={'fill'}
            size={'small'}
            shape={'square'}
            fillColor={'rgba(0,0,0,0)'}
            textColor={'#333'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            $3600
          </MDTag>
        </View>
      )
    }
  }
