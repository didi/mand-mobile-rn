import * as React from 'react';
import {
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import MDSwiperSlideBase from './swiper.slide.base';

export default class MDSwiperSlideIOS extends MDSwiperSlideBase {

  protected scrollView = React.createRef<ScrollView>();

  protected renderScrollView () {
    const { width, height } = this.props;
    const _children = this.renderChildren();

    let _style: ViewStyle = {
      width,
      height,
      position: 'relative',
      overflow: 'hidden',
      opacity: this.state.ready ? 1 : 0,
    };

    let _scrollStyle: ViewStyle = {
      width,
      height,
      overflow: 'hidden',
    };
    let _conStyle: ViewStyle = {
      height,
    };

    if (this.isVertical()) {
      _style = {
        width: height,
        height: width,
        overflow: 'hidden',
        alignSelf: 'center',
        transform: [
          {
            rotate: '90deg',
          },
        ],
      };
      _scrollStyle = {
        width: height,
        height: width,
        overflow: 'hidden',
      };
      _conStyle = {
        height: width,
      };
    }

    return (
      <View style={_style}>
        <ScrollView
          scrollEventThrottle={16}
          horizontal={true}
          pagingEnabled={true}
          ref={this.scrollView}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={_conStyle}
          style={_scrollStyle}
          onMomentumScrollEnd={this.onScrollEnd.bind(this)}
          onScrollBeginDrag={this.onBeginDrag.bind(this)}
        >
          {_children}
        </ScrollView>
      </View>
    );
  }

  protected solveContentOffset (e: any) {
    const contentOffset = e && e.nativeEvent && e.nativeEvent.contentOffset;
    return contentOffset;
  }

  protected onScrollEnd (e: any) {
    const { onBeforeChange } = this.props;
    const { index, isStoped } = this.state;
    const dimension = this.getDimension();

    if (!this.userScrolling) {
      this.afterTrans();
      return;
    }

    const contentOffset = this.solveContentOffset(e);

    if (!this.getIsNotDraggable()) {
      const offset = contentOffset.x;
      this.userScrolling = false;
      if (offset === dimension * index) {
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
            this.startPlay();
          }
          this.afterTrans();
          onBeforeChange && onBeforeChange(newFromIndex, newToIndex);
        }
      );
    }
  }

  protected onBeginDrag () {
    if (this.getIsNotDraggable()) {
      return;
    }
    this.userScrolling = true;
    this.clearTimer();
  }

  protected translate (index: number, animated = true) {
    const x = index * this.getDimension();
    const y = 0;
    this.scrollView.current &&
      this.scrollView.current.scrollTo({ x, y, animated });
  }
}
