import * as React from 'react';

import { IMDSwiperProps, IMDSwiperState } from './swiper.base';
import MDSwiperFade from './swiper.fade';
import MDSwiperSlideWeb from './swiper.slide.web';

export default class MDSwiperWeb extends React.Component<
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
      <MDSwiperSlideWeb {...this.props}>
        {this.props.children}
      </MDSwiperSlideWeb>
    );
  }
}
