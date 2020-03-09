import * as React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { IMDSwiperProps, IMDSwiperStyle, MDSwiperStyles } from './swiper.base';

import SwiperDots from './swiper.dots';

export interface IMDSwiperFadeState {
  opacityAnim: Animated.AnimatedValue;
  opacitys: Animated.AnimatedValue[];
  index: number;
  isStoped: boolean;
  autoplay: number;
  ready: boolean;
}

const styles = StyleSheet.create<IMDSwiperStyle>(MDSwiperStyles);

const addAnimToSwiperItem = (
  children: any,
  width: number,
  height: number,
  opacitys: Animated.AnimatedValue[],
  key: any
): React.ReactNode | React.ReactNode[] => {
  if (React.Children.count(children) < 1) {
    return null;
  }
  return React.Children.map(children, (child: any, index: number) => {
    if (child.props && child.props.__name === 'MDSwiperItem') {
      const _style: ViewStyle = {
        width,
        height,
        position: 'absolute',
        top: 0,
        left: 0,
      };
      return (
        <Animated.View
          key={index}
          style={[_style, { opacity: opacitys[index] }]}
        >
          {child}
        </Animated.View>
      );
    }
    return child;
  });
};

export default class MDSwiperFade extends React.Component<
  IMDSwiperProps,
  IMDSwiperFadeState
> {
  public static defaultProps = {
    styles,
    autoplay: 3000,
    transition: 'fade',
    defaultIndex: 0,
    hasDots: true,
    isLoop: true,
    dragable: true,
  };

  constructor (props: IMDSwiperProps) {
    super(props);
    // @ts-ignore
    const { children, defaultIndex, autoplay } = props;

    // @ts-ignore
    const _oCount = children ? React.Children.count(children) || 1 : 0;
    const opacitys = new Array(_oCount).fill(0);
    opacitys[defaultIndex || 0] = 1;
    const _defaultIndex = defaultIndex || 0;
    const index =
      _defaultIndex >= 0 && _defaultIndex < _oCount ? _defaultIndex : 0;

    this.fromIndex = index === 0 ? _oCount - 1 : index - 1;
    this.toIndex = index;

    this.state = {
      opacityAnim: new Animated.Value(0),
      opacitys,
      index,
      isStoped: false,
      autoplay: autoplay || 3000,
      ready: false,
    };
  }

  private fromIndex: number;
  private toIndex: number;
  private timer: any;

  public componentDidMount () {
    const { children } = this.props;

    // @ts-ignore
    if (!children || !children.length) {
      return;
    }

    this.opacity(false);
    this.startPlay();
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

    const oItemCount = this.getItemCount();

    if (index === this.state.index || index < 0 || index >= oItemCount) {
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
    return this.state.index;
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
    const { width, height } = this.props;
    const _styles = this.props.styles!;
    const _scrollView = this.renderFadeView();
    const _dots = (
      <SwiperDots
        index={this.state.index}
        style={_styles}
        itemCount={this.getItemCount()}
      />
    );

    return (
      <View style={[_styles.wrapper, { width, height }]}>
        {_scrollView}
        {_dots}
      </View>
    );
  }

  protected renderChildren () {
    const { children, width, height } = this.props;
    return addAnimToSwiperItem(children, width, height, this.state.opacitys, 0);
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

  protected renderDots () {
    const { index } = this.state;
    const _styles = this.props.styles!;
    const dotsStyle = _styles.dots;
    const dotStyle = [_styles.dot];

    const dots = [];
    for (let i = 0; i < this.getItemCount(); i++) {
      const _dotStyle = Array.prototype.concat.call([], dotStyle);
      if (i === index) {
        _dotStyle.push(_styles.dotActive!);
      }
      dots.push(<View key={i} style={_dotStyle} />);
    }

    return <View style={dotsStyle}>{dots}</View>;
  }

  protected opacity (animate = true, opacity?: number) {
    const { onAfterChange } = this.props;
    const { fromIndex, toIndex } = this;

    if (fromIndex === toIndex) {
      return;
    }

    this.setState(
      {
        opacitys: this.interpolateAnim(),
      },
      () => {
        Animated.timing(this.state.opacityAnim, {
          duration: 500,
          toValue: 1,
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

  protected interpolateAnim (): any[] {
    const { fromIndex, toIndex } = this;
    const oItemCount = this.getItemCount();
    if (oItemCount && oItemCount <= 1) {
      return [1];
    }

    const opacitys = [];

    for (let index = 0; index < oItemCount; index++) {
      if (fromIndex === index) {
        opacitys.push(
          this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })
        );
      } else if (toIndex === index) {
        opacitys.push(
          this.state.opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          })
        );
      } else {
        opacitys.push(0);
      }
    }

    return opacitys;
  }

  protected getItemCount () {
    const { children } = this.props;
    // @ts-ignore
    return children ? React.Children.count(children) || 1 : 0;
  }

  protected startPlay () {
    const { autoplay, isLoop } = this.props;
    const { index } = this.state;
    const oItemCount = this.getItemCount();

    if (autoplay! > 0 && oItemCount > 1 && isLoop) {
      const _timer = setInterval(() => {
        if (!isLoop && index >= oItemCount - 1) {
          return this.clearTimer();
        }
        this.doTransition('next');
      }, this.state.autoplay);

      this.timer = _timer;
    }
  }

  protected clearTimer () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  protected calcuNewIndex (
    towards: string,
    options?: { index: number }
  ): { newFromIndex: number; newToIndex: number; newIndex: number } {
    const { isLoop } = this.props;
    const { index } = this.state;
    const { fromIndex, toIndex } = this;

    const oItemCount = this.getItemCount();
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

    let newIndex = index;

    if (!towards) {
      return result;
    }

    if (options && options.index) {
      newIndex = options.index;
    } else if (towards === 'prev') {
      if (index > 0) {
        newIndex = index - 1;
      } else if (index === 0) {
        newIndex = oItemCount - 1;
      } else if (isLoop && index === 0) {
        newIndex = oItemCount - 1;
      } else {
        // next illegal index，重置 toIndex
        newIndex = 0;
      }
    } else if (towards === 'next') {
      if (index < oItemCount - 1) {
        newIndex = index + 1;
      } else if (index === oItemCount - 1) {
        newIndex = 0;
      } else if (isLoop && index === oItemCount - 1) {
        newIndex = 1;
      } else {
        // next illegal index，重置 toIndex
        newIndex = 0;
      }
    }

    const newFromIndex = toIndex;
    const newToIndex = newIndex;

    return { newFromIndex, newToIndex, newIndex };
  }

  protected doTransition (towards: string, options?: any) {
    const { onBeforeChange } = this.props;
    const { newFromIndex, newToIndex, newIndex } = this.calcuNewIndex(
      towards,
      options
    );

    this.fromIndex = newFromIndex;
    this.toIndex = newToIndex;

    this.setState(
      {
        index: newIndex,
      },
      () => {
        onBeforeChange && onBeforeChange(newFromIndex, newToIndex);
        this.opacity();
      }
    );
  }
}
