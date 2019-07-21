import * as React from 'react'
import { View } from 'react-native'
import { MDTag } from 'mand-mobile-rn'
import style from './style'

export default class GhostDemo extends React.Component {
    render() {
      return (
        <View style={style.container}>
          <MDTag
            type={'ghost'}
            size={'large'}
            shape={'square'}
            fillColor={'#ffffff'}
            textColor={'#FF8843'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            可选
          </MDTag>
          <MDTag
            type={'ghost'}
            size={'small'}
            shape={'square'}
            fillColor={'#ffffff'}
            textColor={'#28AA91'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            可选
          </MDTag>
        </View>
      )
    }
  }