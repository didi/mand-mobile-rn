import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Text } from 'react-native'
import { MDButton } from 'mand-mobile-rn'

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
}

const CenteredView = ({ children }) => <View style={style}>{children}</View>

storiesOf('CenteredView').add('default view', () => (
  <MDButton title="sfssfs">
    <Text>sfssfs</Text>
  </MDButton>
))
