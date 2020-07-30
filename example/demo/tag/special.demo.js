import * as React from 'react'
import { View, Platform } from 'react-native'
import { MDTag, MDIcon } from '../../../src'
import style from './style'

export default class SpecialDemo extends React.Component {
    render() {
      return (
        <View style={style.container}>
          <MDTag
            type={'fill'}
            size={'large'}
            shape={'coupon'}
            fillColor={'#fc9153'}
            textColor={'#ffffff'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            免息券
          </MDTag>
          <MDTag
            type={'fill'}
            size={'large'}
            shape={'quarter'}
            fillColor={'#fc9153'}
            textColor={'#ffffff'}
            fontWeight={'normal'}
            styles={style.tag}
          >
            <MDIcon name="right" color={'#ffffff'} size={16} />
          </MDTag>
          <MDTag
            type={'fill'}
            size={'large'}
            shape={'bubble'}
            textColor="#ffffff"
            gradientStyle={
              Platform.OS === 'web'
                ? null
                : {
                    colors: ['#FC7353', '#FC9153'],
                    start: { x: 0.0, y: 0.5 },
                    end: { x: 1.0, y: 0.5 },
                  }
            }
            styles={style.tag}
          >
            99
          </MDTag>
        </View>
      )
    }
  }
