import * as React from 'react'
import { View, Platform } from 'react-native'
import { MDTag } from 'mand-mobile-rn'
import style from './style'

export default class HalfRoundDemo extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <MDTag
          type={'fill'}
          size={'small'}
          shape={'circle'}
          fillColor={'#fc9153'}
          textColor={'#ffffff'}
          fontWeight={'normal'}
          styles={style.tag}
        >
          特惠
        </MDTag>
        <MDTag
          type={'fill'}
          size={'large'}
          shape={'circle'}
          fillColor={'#fc9153'}
          textColor={'#ffffff'}
          fontWeight={'normal'}
          styles={style.tag}
        >
          返5000
        </MDTag>
        <MDTag
          type={'ghost'}
          size={'tiny'}
          shape={'circle'}
          fillColor={'#ffffff'}
          textColor={'#fc9153'}
          fontWeight={'normal'}
          styles={style.tag}
        >
          特惠
        </MDTag>
        <MDTag
          type={'fill'}
          size={'small'}
          shape={'circle'}
          sharp="bottom-left"
          fillColor={'#fc9153'}
          textColor={'#ffffff'}
          fontWeight={'normal'}
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
          续保3折起
        </MDTag>
      </View>
    )
  }
}
