import React, { createRef } from 'react';
import { ViewPagerAndroid, ViewStyle } from 'react-native';

import MDSwiperCommon from './swiper';

export default class MDSwiperAndroid extends MDSwiperCommon {
  protected viewPager = createRef<ViewPagerAndroid>();

  protected renderScrollView () {
    const { index } = this.state;
    const { width, height } = this.props;
    const _children = this.renderChildren();

    let _style: ViewStyle = {
      width,
      height,
      overflow: 'hidden',
    };

    if (this.isVertical()) {
      _style = {
        width: height,
        height: width,
        alignSelf: 'center',
        transform: [
          {
            rotate: '90deg',
          },
        ],
      };
    }

    return (
      <ViewPagerAndroid
        initialPage={index}
        onPageScrollStateChanged={this.onPageChanged.bind(this)}
        onPageSelected={this.onEndDrag.bind(this)}
        ref={this.viewPager}
        style={_style}
      >
        {_children}
      </ViewPagerAndroid>
    );
  }

  protected onPageChanged (state: string) {
    const { index, userScrolling } = this.state;
    if (state === 'dragging') {
      this.onBeginDrag();
    } else if (state === 'idle') {
      if (!userScrolling) {
        this.onScrollEnd({ nativeEvent: { position: index } });
      } else {
        this.onEndDrag({ nativeEvent: { position: index } });
      }
    }
  }

  protected solveContentOffset (e: any) {
    const contentOffset = { x: 0, y: 0 };
    contentOffset.x = e.nativeEvent.position * this.state.dimension;
    return contentOffset;
  }

  protected translate (index: number, animated = true) {
    if (this.viewPager.current) {
      animated
        ? this.viewPager.current.setPage(index)
        : this.viewPager.current.setPageWithoutAnimation(index);
    }
  }
}
