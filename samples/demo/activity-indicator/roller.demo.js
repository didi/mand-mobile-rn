import React, { Fragment } from 'react'
import { MDActivityIndicator } from 'mand-mobile-rn'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
};

export default class RollerDemo extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <MDActivityIndicator style={styles} size={10} textSize={8}>
          加载中...
        </MDActivityIndicator>
        <MDActivityIndicator style={styles} size={10} textSize={8} column>
          column loading
        </MDActivityIndicator>
        <MDActivityIndicator style={styles}>loading...</MDActivityIndicator>
      </Fragment>
    )
  }
}
