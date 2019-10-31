;
import { ScrollView, View, ViewStyle } from 'react-native';

import MDSwiperCommon from './swiper';

// TODO: react-native-web scrollView not supputed touch event

export default class MDSwiperWeb extends MDSwiperCommon {
  protected renderScrollView () {
    const { width, height } = this.props;
    const _children = this.renderChildren();

    let _style: ViewStyle = {
      width,
      height,
      position: 'relative',
      overflow: 'hidden',
    };

    let _scrollStyle: ViewStyle = {
      width,
      height,
    };

    // @ts-ignore react-native-web will remove 'overflow', need to replace it by overflowX and overflowY
    _scrollStyle.overflowX = 'hidden';
    // @ts-ignore
    _scrollStyle.overflowY = 'hidden';

    let _conStyle: ViewStyle = {
      height,
      overflow: 'hidden',
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
      };
      // @ts-ignore
      _scrollStyle.overflowX = 'hidden';
      // @ts-ignore
      _scrollStyle.overflowY = 'hidden';
      _conStyle = {
        height: width,
        overflow: 'hidden',
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
          onScroll={this.onScrollEnd.bind(this)}
        >
          {_children}
        </ScrollView>
      </View>
    );
  }

  protected afterTrans () {
    const { isLoop, onAfterChange } = this.props;
    const { firstIndex, lastIndex, fromIndex, toIndex } = this.state;
    if (isLoop && (this.isLastItem() || this.isFirstItem())) {
      const _index = this.isLastItem() ? firstIndex : lastIndex;
      // Leave time to switch animations
      setTimeout(() => {
        this.setState(
          {
            index: _index,
          },
          () => {
            this.translate(_index, false);
          }
        );
      }, 300);
    }

    onAfterChange && onAfterChange(fromIndex, toIndex);
  }
}
