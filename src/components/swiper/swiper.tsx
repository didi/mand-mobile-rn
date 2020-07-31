import * as React from 'react';
import {
  Animated,
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { swiper } from '../../_styles/themes/default.components';

export interface IMDSwiperProps {
  styles?: IMDSwiperStyle;
  autoplay?: number;
  transition?: SwiperTrans;
  defaultIndex?: number;
  hasDots?: boolean;
  isLoop?: boolean;
  dragable?: boolean;
  width: number;
  height: number;
  onBeforeChange?: (from: number, to: number) => void;
  onAfterChange?: (from: number, to: number) => void;
}

interface IMDSwiperState {
  opacityAnim: Animated.AnimatedValue;
  opacitys: Animated.AnimatedValue[];
  userScrolling: boolean;
  index: number;
  fromIndex: number;
  toIndex: number;
  firstIndex: number;
  lastIndex: number;
  oItemCount: number; // original item count
  rItemCount: number; // real item count
  dimension: number;
  timer: any;
  noDrag: boolean;
  isStoped: boolean;
  autoplay: number;
  ready: boolean;
}

export interface IMDSwiperStyle {
  wrapper?: ViewStyle;
  dots?: ViewStyle;
  dotsVertical?: ViewStyle;
  dot?: ViewStyle;
  dotVertical?: ViewStyle;
  dotActive?: ViewStyle;
}

type SwiperTrans = 'slide' | 'slideY' | 'fade';

export const MDSwiperStyles: IMDSwiperStyle = {
  wrapper: {
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotsVertical: {
    position: 'absolute',
    flexDirection: 'column',
    alignSelf: 'center',
    right: 10,
  },
  dot: {
    width: 8,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 1.5,
  },
  dotVertical: {
    width: 2,
    height: 8,
    backgroundColor: '#ddd',
    marginVertical: 1.2,
  },
  dotActive: {
    backgroundColor: swiper.indicatorFill,
  },
};

const styles = StyleSheet.create<IMDSwiperStyle>(MDSwiperStyles);

const addPropsToSwiperItem = (
  children: any,
  width: number,
  height: number,
  backup: boolean,
  transition: string,
  key: any
): React.ReactNode | React.ReactNode[] => {
  if (!children) {
    return null;
  }
  if (React.Children.count(children) > 0) {
    const _children = [];
    // 用于循环，在最前面复制最后一条数据
    backup &&
      _children.push(
        renderSwiperItem(
          children[children.length - 1],
          width,
          height,
          transition,
          -1
        )
      );
    React.Children.forEach(children, (child, index) => {
      _children.push(
        renderSwiperItem(child, width, height, transition, index)
      );
    });

    // 用于循环，在最后面复制第一条数据
    backup &&
      _children.push(
        renderSwiperItem(
          children[0],
          width,
          height,
          transition,
          children.length
        )
      );
    return _children;
  }
  return children;
};

const renderSwiperItem = (
  children: any,
  width: number,
  height: number,
  transition: string,
  key: any
): React.ReactNode | React.ReactNode[] => {
  if (children.props.isSwiperItem) {
    // 有 type 属性，代表是一个 React.ReactNode
    const _style: ViewStyle = {
      width,
      height,
    };
    if (transition === 'slideY') {
      const _styleWrapper: ViewStyle = {
        height: width,
        width: height,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      };

      return (
        <View key={key} style={_styleWrapper}>
          <View style={[_style, { transform: [{ rotate: '-90deg' }] }]}>
            {children}
          </View>
        </View>
      );
    }
    return (
      <View key={key} style={_style}>
        {children}
      </View>
    );
  }
};

const addAnimToSwiperItem = (
  children: any,
  width: number,
  height: number,
  opacitys: Animated.AnimatedValue[],
  key: any
): React.ReactNode | React.ReactNode[] => {
  if (!children) {
    return null;
  }
  if (children.type && children.type.name === 'MDSwiperItem') {
    // 有 type 属性，代表是一个 React.ReactNode
    const _style: ViewStyle = {
      width,
      height,
      position: 'absolute',
      top: 0,
      left: 0,
    };
    return (
      <Animated.View key={key} style={[_style, { opacity: opacitys[key] }]}>
        {children}
      </Animated.View>
    );
  } else if (React.Children.count(children) > 0) {
    const _children: any[] = [];
    React.Children.forEach(children, (child, index) => {
      _children.push(addAnimToSwiperItem(child, width, height, opacitys, index));
    });
    return _children;
  }
  return children;
};

export default class MDSwiperCommon extends React.Component<
  IMDSwiperProps,
  IMDSwiperState
> {
  public static defaultProps = {
    styles,
    autoplay: 3000,
    transition: 'slide',
    defaultIndex: 0,
    hasDots: true,
    isLoop: true,
    dragable: true,
  };

  protected scrollView = React.createRef<ScrollView>();

  constructor (props: IMDSwiperProps) {
    super(props);
    // @ts-ignore
    const { children, defaultIndex, autoplay } = props;

    // @ts-ignore
    const _oCount = children ? React.Children.count(children) || 1 : 0;
    const opacitys = new Array(_oCount).fill(0);
    opacitys[defaultIndex || 0] = 1;

    this.state = {
      opacityAnim: new Animated.Value(0),
      opacitys,
      userScrolling: false,
      index: defaultIndex || 0,
      fromIndex: 0,
      toIndex: 0,
      firstIndex: 0,
      lastIndex: 0,
      oItemCount: _oCount, // original item count
      rItemCount: _oCount, // real item count
      dimension: 0,
      timer: null,
      noDrag: false,
      isStoped: false,
      autoplay: autoplay || 3000,
      ready: false,
    };
  }

  public componentDidMount () {
    const { children } = this.props;

    // @ts-ignore
    if (!children || !children.length) {
      return;
    }

    this.getDimension();

    this.initState(() => {
      if (this.isSlide()) {
        this.calcuItemCount(() => {
          InteractionManager.runAfterInteractions(() => {
            this.setState({
              ready: true
            }, () => {
              this.translate(this.state.index, false);
              this.startPlay();
            });
          });
        });
      } else {
        this.opacity(false);
        this.startPlay();
      }
    });
  }

  public componentWillUnmount () {
    this.clearTimer();
  }

  // MARK: public methods
  public next () {
    this.doTransition('next');
  }

  public prev () {
    this.doTransition('prev');
  }

  public goto (index: number) {
    if (isNaN(index)) {
      return;
    }

    if (
      index === this.state.index ||
      index < 0 ||
      index >= this.state.oItemCount
    ) {
      return;
    }
    this.clearTimer();
    const towards = index > this.state.index ? 'next' : 'prev';
    this.setState({
      index,
    });
    this.doTransition(towards, { index });
    this.startPlay();
  }

  public getIndex (): number {
    return this.calcuRealIndex(this.state.index);
  }

  public play (autoplay = 3000) {
    this.clearTimer();
    if (autoplay < 500) {
      return;
    }

    this.setState({
      autoplay: autoplay || this.props.autoplay || 3000,
      isStoped: false,
    });
    this.startPlay();
  }

  public stop () {
    this.clearTimer();
    this.setState({
      isStoped: true,
    });
  }

  public render () {
    const { width, height, transition } = this.props;
    const _styles = this.props.styles!;
    const _scrollView =
      transition === 'fade' ? this.renderFadeView() : this.renderScrollView();
    const _dots = this.renderDots();

    return (
      <View style={[_styles.wrapper, { width, height }]}>
        {_scrollView}
        {_dots}
      </View>
    );
  }

  protected renderChildren () {
    const { children, width, height, isLoop, transition } = this.props;
    if (transition === 'fade') {
      return addAnimToSwiperItem(
        children,
        width,
        height,
        this.state.opacitys,
        0
      );
    }
    return addPropsToSwiperItem(
      children,
      width,
      height,
      this.isSlide() && !!isLoop,
      transition!,
      0
    );
  }

  protected renderFadeView () {
    const { width, height } = this.props;
    const _children = this.renderChildren();

    const _style: ViewStyle = {
      width,
      height,
      position: 'relative',
      overflow: 'hidden',
    };

    return <View style={_style}>{_children}</View>;
  }

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

  protected renderDots () {
    const _styles = this.props.styles!;
    let dotsStyle = _styles.dots;
    let dotStyle = [_styles.dot];
    if (this.isVertical()) {
      dotsStyle = _styles.dotsVertical;
      dotStyle = [_styles.dotVertical];
    }

    const dots = [];
    for (let index = 0; index < this.state.oItemCount; index++) {
      const _dotStyle = Array.prototype.concat.call([], dotStyle);
      if (index === this.originalIndex()) {
        _dotStyle.push(_styles.dotActive!);
      }
      dots.push(<View key={index} style={_dotStyle} />);
    }

    return <View style={dotsStyle}>{dots}</View>;
  }

  protected solveContentOffset (e: any) {
    const contentOffset = e && e.nativeEvent && e.nativeEvent.contentOffset;
    return contentOffset;
  }

  protected onScrollEnd (e: any) {
    const { onBeforeChange } = this.props;
    const { dimension, index, userScrolling, noDrag, isStoped } = this.state;

    if (!userScrolling) {
      this.afterTrans();
      return;
    }

    const contentOffset = this.solveContentOffset(e);

    if (!noDrag) {
      const offset = contentOffset.x;
      this.setState(
        {
          userScrolling: false,
        },
        () => {
          if (offset === dimension * index) {
            return;
          }
          const towards = offset > dimension * index ? 'next' : 'prev';
          const { newFromIndex, newToIndex, newIndex } = this.calcuNewIndex(
            towards
          );
          this.setState(
            {
              index: newIndex,
              fromIndex: newFromIndex,
              toIndex: newToIndex,
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
      );
    }
  }

  protected onBeginDrag () {
    if (this.state.noDrag) {
      return;
    }
    this.setState({
      userScrolling: true,
    });
    this.clearTimer();
  }

  protected translate (index: number, animated = true) {
    const x = index * this.state.dimension;
    const y = 0;
    this.scrollView.current &&
      this.scrollView.current.scrollTo({ x, y, animated });
  }

  protected opacity (animate = true, opacity?: number) {
    const { onAfterChange } = this.props;
    const { fromIndex, toIndex, rItemCount } = this.state;

    if (fromIndex === toIndex) {
      return;
    }

    this.setState(
      {
        opacitys: this.interpolateAnim(fromIndex, toIndex, rItemCount),
      },
      () => {
        Animated.timing(this.state.opacityAnim, {
          duration: 500,
          toValue: 1,
          useNativeDriver: false
        }).start();
      }
    );

    if (animate) {
      setTimeout(() => {
        this.setState({
          opacityAnim: new Animated.Value(0),
        });
        onAfterChange && onAfterChange(fromIndex, toIndex);
      }, 800);
    }
  }

  protected interpolateAnim (
    fromIndex: number,
    toIndex: number,
    rItemCount: number
  ): any[] {
    if (rItemCount && rItemCount <= 1) {
      return [1];
    }

    const opacitys = [];

    for (let index = 0; index < rItemCount; index++) {
      if (fromIndex === index) {
        opacitys.push(
          this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })
        );
        // opacitys.push(0)
      } else if (toIndex === index) {
        opacitys.push(
          this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          })
        );
        // opacitys.push(1)
      } else {
        opacitys.push(0);
      }
    }

    return opacitys;
  }

  protected isFirstItem () {
    return this.state.index === 0;
  }

  protected isLastItem () {
    return this.state.index === this.state.rItemCount - 1;
  }

  protected originalIndex () {
    if (this.props.isLoop && this.isSlide()) {
      return this.state.index - 1;
    } else {
      return this.state.index;
    }
  }

  protected isSlide () {
    return this.props.transition!.toLowerCase().indexOf('slide') > -1;
  }

  protected isVertical () {
    return this.props.transition === 'slideY';
  }

  protected getDimension () {
    this.setState({
      dimension: this.isVertical() ? this.props.height : this.props.width,
    });
  }

  protected initState (cb?: () => void) {
    const { defaultIndex, dragable, children } = this.props;
    const { index, firstIndex, lastIndex } = this.state;

    const _defaultIndex = defaultIndex!;
    // @ts-ignore
    const _lenght = children.length;

    const rItemCount = _lenght;
    const oItemCount = _lenght;
    const noDrag = _lenght === 1 || !dragable;
    const _index =
      _defaultIndex >= 0 && _defaultIndex < _lenght ? _defaultIndex : 0;
    const _firstIndex = 0;
    const _lastIndex = _lenght - 1;
    const fromIndex = index === firstIndex ? lastIndex : index + 1;
    const toIndex = index;

    this.setState(
      {
        rItemCount,
        oItemCount,
        noDrag,
        index: _index,
        firstIndex: _firstIndex,
        lastIndex: _lastIndex,
        fromIndex,
        toIndex,
      },
      () => {
        cb && cb();
      }
    );
  }

  protected startPlay () {
    const { autoplay, isLoop } = this.props;
    const { oItemCount, rItemCount, index } = this.state;

    if (autoplay! > 0 && oItemCount > 1 && isLoop) {
      const _timer = setInterval(() => {
        if (!isLoop && index >= rItemCount - 1) {
          return this.clearTimer();
        }
        this.doTransition('next');
      }, this.state.autoplay);

      this.setState({
        timer: _timer,
      });
    }
  }

  protected clearTimer () {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
      });
    }
  }

  protected calcuItemCount (cb: () => void) {
    // @ts-ignore
    if (
      this.props.children &&
      React.Children.count(this.props.children) > 1 &&
      this.props.isLoop
    ) {
      const { firstIndex, lastIndex, index, rItemCount } = this.state;
      this.setState(
        {
          firstIndex: firstIndex + 1,
          lastIndex: lastIndex + 1,
          index: index + 1,
          rItemCount: rItemCount + 2,
        },
        () => {
          cb && cb();
        }
      );
    }
  }

  protected calcuRealIndex (index: number) {
    if (this.props.isLoop && this.isSlide() && this.state.oItemCount > 0) {
      return index - 1 < 0
        ? this.state.oItemCount - 1
        : index - 1 > this.state.oItemCount - 1
        ? 0
        : index - 1;
    }
    return index;
  }

  protected calcuNewIndex (
    towards: string,
    options?: any
  ): { newFromIndex: number; newToIndex: number; newIndex: number } {
    const { isLoop } = this.props;
    const { oItemCount, rItemCount, index, fromIndex, toIndex } = this.state;
    const result = {
      newFromIndex: fromIndex,
      newToIndex: toIndex,
      newIndex: index,
    };
    if (oItemCount === 0) {
      return result;
    }
    if (!options && oItemCount < 2) {
      return result;
    }

    const itemCount = rItemCount;
    let newIndex = index;
    const oldIndex = index;

    if (!towards) {
      return result;
    }

    if (options && options.index) {
      newIndex = options.index + (isLoop && this.isSlide() ? 1 : 0);
    } else if (towards === 'prev') {
      if (index > 0) {
        newIndex = index - 1;
      } else if (!this.isSlide() && index === 0) {
        newIndex = itemCount - 1;
      } else if (isLoop && index === 0) {
        newIndex = itemCount - 1;
      }
    } else if (towards === 'next') {
      if (index < itemCount - 1) {
        newIndex = index + 1;
      } else if (!this.isSlide() && index === itemCount - 1) {
        newIndex = 0;
      } else if (isLoop && index === itemCount - 1) {
        newIndex = 1;
      }
    }

    let newFromIndex = toIndex;
    let newToIndex = newIndex;

    if (isLoop && this.isSlide()) {
      newFromIndex = this.calcuRealIndex(oldIndex);
      newToIndex = this.calcuRealIndex(newIndex);
    }

    return { newFromIndex, newToIndex, newIndex };
  }

  protected doTransition (towards: string, options?: any) {
    const { onBeforeChange } = this.props;
    const { newFromIndex, newToIndex, newIndex } = this.calcuNewIndex(
      towards,
      options
    );

    this.setState(
      {
        index: newIndex,
        fromIndex: newFromIndex,
        toIndex: newToIndex,
      },
      () => {
        onBeforeChange && onBeforeChange(newFromIndex, newToIndex);

        if (!this.isSlide()) {
          this.opacity();
          return;
        }
        this.translate(newIndex);
      }
    );
  }

  protected afterTrans () {
    const { isLoop, onAfterChange } = this.props;
    const { firstIndex, lastIndex, fromIndex, toIndex } = this.state;
    if (isLoop && (this.isLastItem() || this.isFirstItem())) {
      const _index = this.isLastItem() ? firstIndex : lastIndex;
      this.setState(
        {
          index: _index,
        },
        () => {
          this.translate(_index, false);
        }
      );
    }
    onAfterChange && onAfterChange(fromIndex, toIndex);
  }
}
