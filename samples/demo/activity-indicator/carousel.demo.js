import React, { Fragment } from 'react'
import {
  MDActivityIndicator,
  MDButton,
} from 'mand-mobile-rn'

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
};

export default class CarouselDemo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state

    return (
      <Fragment>
        <MDActivityIndicator type="carousel" size={5} />
        <MDButton
          type="primary"
          style={{ marginTop: 20 }}
          onPress={() => {
            this.setState({ loading: !loading })
          }}
        >
          {loading ? (
            <MDActivityIndicator
              style={styles}
              type="carousel"
              size={5}
              color="#fff"
            />
          ) : (
              '确认支付'
            )}
        </MDButton>
      </Fragment>
    )
  }
}
