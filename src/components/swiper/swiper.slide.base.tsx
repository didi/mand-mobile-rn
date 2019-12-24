import * as React from 'react';
import {
  InteractionManager,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { IMDSwiperProps, IMDSwiperStyle, MDSwiperStyles } from './swiper.base';

import SwiperDots from './swiper.dots';

export interface IMDSwiperSlideState {
  index: number;
  isStoped: boolean;
  autoplay: number;
  ready: boolean;
}

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

  if (children.props && children.props.name === 'MDSwiperItem') {
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
  } else if (React.Children.count(children) > 0) {
    const _children = [];
    // 用于循环，在最前面复制最后一条数据
    backup &&
      _children.push(
        addPropsToSwiperItem(
          children[children.length - 1],
          width,
          height,
          backup,
          transition,
          -1
        )
      );
    React.Children.forEach(children, (child, index) => {
      _children.push(
        addPropsToSwiperItem(child, width, height, backup, transition, index)
      );
    });

    // 用于循环，在最后面复制第一条数据
    backup &&
      _children.push(
        addPropsToSwiperItem(
          children[0],
          width,
          height,
          backup,
          transition,
          children.length
        )
      );
    return _children;
  }
  return children;
};

export default abstract class MDSwiperSlideIOS extends React.Component<
  IMDSwiperProps,
  IMDSwiperSlideState
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

  constructor (props: IMDSwiperProps) {
    super(props);
    // @ts-ignore
    const { defaultIndex, autoplay } = props;

    // @ts-ignore
    const _oCount = this.getOItemCount();
    const _defaultIndex = defaultIndex || 0;
    let index =
      _defaultIndex >= 0 && _defaultIndex < _oCount ? _defaultIndex : 0;

    if (this.isNeedBackup()) {
      index = index + 1;
    }

    this.fromIndex = index === 0 ? _oCount - 1 : index - 1;
    this.toIndex = index;
    this.userScrolling = false;

    this.state = {
      index,
      isStoped: false,
      autoplay: autoplay || 3000,
      ready: false,
    };
  }

  protected fromIndex: number;
  protected toIndex: number;
  protected timer: any;
  protected userScrolling: boolean;

  public componentDidMount () {
    const { children } = this.props;

    // @ts-ignore
    if (!children || !children.length) {
      return;
    }

    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.translate(this.state.index, false);
      }, 100);

      this.setState(
        {
          ready: true,
        },
        () => {
          this.startPlay();
        }
      );
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

    const oItemCount = this.getOItemCount();

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
    const { width, height } = this.props;
    const _styles = this.props.styles!;
    const _scrollView = this.renderScrollView();

    const _dots = (
      <SwiperDots
        index={this.originalIndex()}
        style={_styles}
        itemCount={this.getOItemCount()}
        isVertical={this.isVertical()}
      />
    );

    return (
      <View style={[_styles.wrapper, { width, height }]}>
        {_scrollView}
        {_dots}
      </View>
    );
  }

  protected abstract renderScrollView (): React.ReactNode;

  protected abstract translate (index: number, animated: boolean): void;

  protected abstract onScrollEnd (e: any): void;

  protected renderChildren () {
    const { children, width, height, transition } = this.props;
    return addPropsToSwiperItem(
      children,
      width,
      height,
      this.isNeedBackup(),
      transition!,
      0
    );
  }

  // MARK Calculate Method
  protected isFirstItem () {
    return this.state.index === 0;
  }

  protected isLastItem () {
    return this.state.index === this.getRItemCount() - 1;
  }

  protected originalIndex () {
    if (this.props.isLoop) {
      return this.state.index - 1;
    } else {
      return this.state.index;
    }
  }

  protected isVertical () {
    return this.props.transition === 'slideY';
  }

  protected getDimension () {
    return this.isVertical() ? this.props.height : this.props.width;
  }

  protected getOItemCount () {
    const { children } = this.props;
    return children ? React.Children.count(children) || 1 : 0;
  }

  protected getRItemCount () {
    const { isLoop } = this.props;
    const oItemCount = this.getOItemCount();
    if (!isLoop) {
      // 不循环：没有前后的加帧，返回原始count
      return oItemCount;
    }
    if (oItemCount <= 1) {
      // 循环，但原始count只有一个：没有前后的加帧，返回原始count
      return oItemCount;
    }
    // 循环，且原始count大于1：有前后的加帧，返回原始count + 2
    return oItemCount + 2;
  }

  protected isNeedBackup (): boolean {
    return this.getOItemCount() < this.getRItemCount();
  }

  protected getFirstIndex (): number {
    if (this.isNeedBackup()) {
      return 1;
    }
    return 0;
  }

  protected getLastIndex (): number {
    if (this.isNeedBackup()) {
      return this.getOItemCount();
    }
    return this.getOItemCount() - 1;
  }

  protected getIsNotDraggable (): boolean {
    return this.getOItemCount() === 1 || !this.props.dragable;
  }

  // MARK logic Method
  protected startPlay () {
    const { autoplay, isLoop } = this.props;
    const { index } = this.state;
    const oItemCount = this.getOItemCount();
    const rItemCount = this.getRItemCount();

    if (autoplay! > 0 && oItemCount > 1 && isLoop) {
      const _timer = setInterval(() => {
        if (!isLoop && index >= rItemCount - 1) {
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

  protected calcuRealIndex (index: number) {
    const oItemCount = this.getOItemCount();
    if (this.props.isLoop && oItemCount > 0) {
      return index - 1 < 0
        ? oItemCount - 1
        : index - 1 > oItemCount - 1
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
    const { index } = this.state;
    const { fromIndex, toIndex } = this;
    const oItemCount = this.getOItemCount();
    const rItemCount = this.getRItemCount();

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
      newIndex = options.index + (isLoop ? 1 : 0);
    } else if (towards === 'prev') {
      if (index > 0) {
        newIndex = index - 1;
      } else if (isLoop && index === 0) {
        newIndex = itemCount - 1;
      }
    } else if (towards === 'next') {
      if (index < itemCount - 1) {
        newIndex = index + 1;
      } else if (isLoop && index === itemCount - 1) {
        newIndex = 1;
      }
    }

    let newFromIndex = toIndex;
    let newToIndex = newIndex;

    if (isLoop) {
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
    this.fromIndex = newFromIndex;
    this.toIndex = newToIndex;

    this.setState(
      {
        index: newIndex,
      },
      () => {
        onBeforeChange && onBeforeChange(newFromIndex, newToIndex);
        this.translate(newIndex, true);
      }
    );
  }

  protected afterTrans () {
    const { isLoop, onAfterChange } = this.props;
    const { fromIndex, toIndex } = this;
    const firstIndex = this.getFirstIndex();
    const lastIndex = this.getLastIndex();

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
