import * as React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MDIcon from '../icon';

import { noticeBar } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

export interface IMDNoticeBarProps {
  styles?: IMDNoticeBarStyle;
  type?: 'default' | 'activity' | 'warning'; // 主题样式
  left?: React.ReactNode;
  right?: React.ReactNode;
  mode?: string; // 右边提示类型
  time?: number; // 显示时长
  round?: boolean; // 圆角展示
  multiRows?: boolean; // 内容超出多行展示
  scrollable?: boolean; // 内容超出滚动展示
  onPress?: (param: string) => void;
}

export interface IMDNoticeBarState {
  isShow: boolean;
  X?: any;
}

export interface IMDNoticeBarStyle {
  wrapper?: ViewStyle;
  noticeBar?: ViewStyle;
  noticeBarRound?: ViewStyle;
  noticeBarText?: TextStyle;
  activityText?: TextStyle;
  activity?: ViewStyle;
  warning?: ViewStyle;
  warnText?: TextStyle;
  noticeBarLeft?: ViewStyle;
  noticeBarRight?: ViewStyle;
  noticeBarEmpty?: ViewStyle;
  noticeBarContent?: ViewStyle;
  noticeBarMultiContent?: TextStyle;
}

export const MDNoticeBarStyles: IMDNoticeBarStyle = {
  wrapper: {
    position: 'relative',
  },

  noticeBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: noticeBar.zIndex,
    backgroundColor: noticeBar.fill,
    position: 'relative',
    minHeight: noticeBar.height,
    paddingLeft: noticeBar.borderRadius,
    paddingRight: noticeBar.paddingRight,
  },

  noticeBarText: {
    fontSize: noticeBar.fontSize,
    color: noticeBar.color,
  },

  noticeBarRound: {
    borderRadius: noticeBar.borderRadius,
  },

  activity: {
    backgroundColor: noticeBar.fillActivity,
  },

  activityText: {
    color: noticeBar.colorActivity,
  },

  warning: {
    backgroundColor: noticeBar.fillWarning,
  },

  warnText: {
    color: noticeBar.colorWarning,
  },

  noticeBarLeft: {
    display: 'flex',
    alignItems: 'center',
    marginRight: noticeBar.marginRight,
  },

  noticeBarRight: {
    display: 'flex',
    alignItems: 'center',
  },

  noticeBarEmpty: {
    paddingRight: 0,
  },

  noticeBarContent: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 'auto',
    width: 'auto',
    overflow: 'hidden',
  },

  noticeBarMultiContent: {
    paddingTop: base.gapSize.hMid,
    paddingBottom: base.gapSize.hMid,
    lineHeight: base.fontSize.captionLarge,
  },
};

const styles = StyleSheet.create<IMDNoticeBarStyle>(MDNoticeBarStyles);

export default class MDNoticeBar extends React.Component<
  IMDNoticeBarProps,
  IMDNoticeBarState
> {
  public static defaultProps = {
    styles,
  };

  constructor (props: IMDNoticeBarProps) {
    super(props);
    this.state = {
      isShow: true, // 是否显示
      X: new Animated.Value(300),
    };
    // 显示时长
    if (props.time) {
      setTimeout(() => {
        this.setState({
          isShow: false,
        });
      }, props.time);
    }
  }

  public render () {
    const sty = this.props.styles || {};
    const _notice = this.renderNotice(sty);
    return <View style={sty.wrapper}>{_notice}</View>;
  }

  private renderNotice (sty: IMDNoticeBarStyle) {
    const { left, multiRows, right, mode, scrollable, type, round } = this.props;
    const _left = this.renderLeft(sty, left, type);
    const _content = this.renderContent(sty, multiRows, type, scrollable);
    const _right = this.renderRight(sty, right, mode, type);
    const styArr = [
      sty.noticeBar,
      round && sty.noticeBarRound,
      type === 'activity' ? sty.activity : {},
      type === 'warning' ? sty.warning : {},
    ];
    return this.state.isShow ? (
      <View style={styArr}>
        {_left}
        {_content}
        {_right}
      </View>
    ) : null;
  }

  private renderLeft (sty: IMDNoticeBarStyle, left?: React.ReactNode, type?: string) {
    if (!left) {
      return null;
    }
    if (typeof left === 'string') {
      return (
        <View style={sty.noticeBarLeft}>
          <MDIcon
            name={left}
            color={
              type === 'activity'
                ? noticeBar.colorActivity
                : type === 'warning'
                ? noticeBar.colorWarning
                : noticeBar.color
            }
            size={18}
          />
        </View>
      );
    }
    return <View style={sty.noticeBarLeft}>{left}</View>;
  }

  private renderContent (
    sty: IMDNoticeBarStyle,
    multiRows?: boolean,
    type?: string,
    scrollable?: boolean
  ) {
    const styArr = [
      sty.noticeBarText,
      type === 'activity' ? sty.activityText : {},
      type === 'warning' ? sty.warnText : {},
    ];
    if (multiRows) {
      styArr.push(sty.noticeBarMultiContent);
      return (
        <View style={sty.noticeBarContent}>
          <Text style={styArr}>{this.props.children}</Text>
        </View>
      );
    }
    if (scrollable) {
      return (
        <View
          style={sty.noticeBarContent}
          onLayout={this.onLayoutContainer.bind(this)}
        >
          <Animated.View // Special animatable View
            style={{
              flexDirection: 'row',
              left: this.state.X, // Bind left to animated value
            }}
          >
            <Text style={styArr}>{this.props.children}</Text>
          </Animated.View>
        </View>
      );
    }
    return (
      <View
        style={sty.noticeBarContent}
        onLayout={this.onLayoutContainer.bind(this)}
      >
        <Text style={styArr}>{this.props.children}</Text>
      </View>
    );
  }

  private renderRight (
    sty: IMDNoticeBarStyle,
    right?: React.ReactNode,
    mode?: string,
    type?: string
  ) {
    if (right) {
      return <View style={sty.noticeBarRight}>{right}</View>;
    }
    if (mode) {
      return (
        <TouchableOpacity
          style={sty.noticeBarRight}
          onPress={() => {
            this.onPress(mode);
          }}
        >
          <MDIcon
            name={mode}
            color={
              type === 'activity'
                ? noticeBar.colorActivity
                : type === 'warning'
                ? noticeBar.colorWarning
                : noticeBar.color
            }
            size={18}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  private onPress (mode?: string) {
    if (mode === 'close') {
      this.setState({
        isShow: false,
      });
    } else {
      this.props.onPress && this.props.onPress(mode!);
    }
  }

  private onLayoutContainer (e: any) {
    const width = e.nativeEvent.layout.width;
    if (this.props.scrollable) {
      this.move(width);
    }
  }
  // 跑马灯效果
  private move (width: number) {
    Animated.loop(
      Animated.timing(
        // Animate over time
        this.state.X, // The animated value to drive
        {
          toValue: -width, // Animate to left: width (opaque)
          duration: 10000, // Make it take a while
          easing: Easing.linear,
        }
      )
    ).start();
  }
}
