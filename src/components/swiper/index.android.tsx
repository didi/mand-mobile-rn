import * as React from 'react';

import { IMDSwiperProps, IMDSwiperState } from './swiper.base';
import MDSwiperFade from './swiper.fade';
import MDSwiperSlideAndroid from './swiper.slide.android';

export default class MDSwiperIOS extends React.Component<
IMDSwiperProps,
IMDSwiperState
> {
  public render () {
    const { transition } = this.props;
    if (transition === 'fade') {
      return (
        <MDSwiperFade {...this.props}>
          {this.props.children}
        </MDSwiperFade>
      );
    }

    return (
      <MDSwiperSlideAndroid {...this.props}>
        {this.props.children}
      </MDSwiperSlideAndroid>
    );
  }
}
