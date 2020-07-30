import React, { Fragment } from 'react'
import { MDActivityIndicator } from '../../../src'
import { View } from 'react-native'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
}

export default class SpinnerDemo extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <MDActivityIndicator
          color="dark"
          style={styles}
          type="spinner"
          size={10}
          textSize={8}
        >
          加载中...
        </MDActivityIndicator>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: 2,
            padding: 10,
          }}
        >
          <MDActivityIndicator
            style={styles}
            color="light"
            type="spinner"
            size={15}
            textSize={10}
          >
            加载中...
          </MDActivityIndicator>
        </View>
      </Fragment>
    )
  }
}
