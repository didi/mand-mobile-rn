import * as React from 'react';
import { ViewPagerAndroid, ViewStyle } from 'react-native';
import MDSwiperSlideBase from './swiper.slide.base';

export default class MDSwiperSlideAndroid extends MDSwiperSlideBase {
  protected viewPager = React.createRef<ViewPagerAndroid>();

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
        onPageScroll={this.onPageScroll.bind(this)}
        onPageScrollStateChanged={this.onPageScrollStateChanged.bind(this)}
        ref={this.viewPager}
        style={_style}
      >
        {_children}
      </ViewPagerAndroid>
    );
  }

  protected onScrollEnd (e: any) {
    const { onBeforeChange } = this.props;
    const { index, isStoped } = this.state;
    const dimension = this.getDimension();

    if (!this.userScrolling) {
      this.afterTrans();
      return;
    }

    if (!this.getIsNotDraggable()) {
      this.userScrolling = false;

      const offset = e.nativeEvent.position * dimension;
      if (offset === dimension * index) {
      // 小幅度拖动，回弹后不切换 index
        if (!isStoped) {
          this.startPlay();
        }
        return;
      }

      const towards = offset > dimension * index ? 'next' : 'prev';
      const { newFromIndex, newToIndex, newIndex } = this.calcuNewIndex(towards);

      this.fromIndex = newFromIndex;
      this.toIndex = newToIndex;

      this.setState(
        {
          index: newIndex,
        },
        () => {
          if (!isStoped) {
            this.startPlay(); // Android 下，打开 debug，setTimeout和setInterval的时间间隔会失效，表现为：不管延迟时间设置为多少，都是会马上执行或者没反应。
          }
          this.afterTrans();
          onBeforeChange && onBeforeChange(newFromIndex, newToIndex);
        }
      );
    }
  }

  protected translate (index: number, animated = true) {
    if (this.viewPager.current) {
      animated
        ? this.viewPager.current.setPage(index)
        : this.viewPager.current.setPageWithoutAnimation(index);
    }
  }

  private onPageScroll (event: any) {
    if (!event.nativeEvent.offset) { // offset 为 0 表示，滑动结束
      this.onScrollEnd(event);
    }
  }

  private onPageScrollStateChanged (event: any) {
    const state = event.nativeEvent.pageScrollState;
    if (state === 'dragging') {
      if (this.getIsNotDraggable()) {
        return;
      }
      this.userScrolling = true;
      this.clearTimer();
    }
  }
}
