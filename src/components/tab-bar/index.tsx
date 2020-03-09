import * as React from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { tabs } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

export interface IMDTabBarItem {
  name?: number;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

export interface IMDTabBarProps {
  styles?: IMDTabBarStyle;
  items?: IMDTabBarItem[]; // 数据源
  hasInk?: boolean; // 是否有下划线
  currentIndex?: number; // 当前选中元素索引
  onChange?: (tabItem?: IMDTabBarItem, index?: number) => void;
}

interface IMDTabBarStyle {
  wrapper?: ViewStyle;
  tabbarList?: ViewStyle;
  tabbarItem?: ViewStyle;
  itemText?: TextStyle;
  isActive?: TextStyle;
  disabled?: TextStyle;
  tabBarInk?: ViewStyle;
  neckSpan?: ViewStyle;
}

interface IMDTabBarState {
  curIndex?: number; // 选中元素索引
  inkPos: Animated.Value; // 下划线位置
  inkWidth: number; // 下划线宽度
}

export const MDTabBarStyles: IMDTabBarStyle = {
  wrapper: {
    position: 'relative',
    paddingLeft: base.gapSize.hSuperLarge,
    paddingRight: base.gapSize.hSuperLarge,
    backgroundColor: base.colors.bgBase,
  },
  tabbarList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: '100%',
  },
  tabbarItem: {
    flexShrink: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: tabs.height,
    paddingLeft: tabs.itemGap,
  },
  itemText: {
    color: tabs.textColor,
    fontSize: tabs.fontSize,
    fontWeight: tabs.fontWeight as TextStyle['fontWeight'],
  },
  isActive: {
    color: tabs.activeColor,
  },
  disabled: {
    color: tabs.disabledColor,
  },
  tabBarInk: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: tabs.inkHeight,
    backgroundColor: tabs.activeColor,
  },
};

const styles = StyleSheet.create<IMDTabBarStyle>(MDTabBarStyles);

export default class MDTabBar extends React.Component<
  IMDTabBarProps,
  IMDTabBarState
> {
  public static defaultProps = {
    styles,
  };

  constructor (props: IMDTabBarProps) {
    super(props);
    this.state = {
      curIndex: props.currentIndex || 0,
      inkPos: new Animated.Value(0),
      inkWidth: 10,
    };
  }

  private widthArr: number[] = []; // 下划线宽度数组
  private leftArr: number[] = []; // 下划线位置数组

  public componentWillReceiveProps (props: IMDTabBarProps) {
    if (this.props.currentIndex !== props.currentIndex) {
      this.setState({
        curIndex: props.currentIndex,
      });
    }
  }

  public render () {
    const sty = this.props.styles || {};
    const { items, hasInk, children } = this.props;
    const { inkPos, inkWidth, curIndex } = this.state;
    const _item = this.renderItem(sty, children, items, curIndex);
    return (
      <View style={sty.wrapper}>
        <ScrollView horizontal={true}>
          <View style={sty.tabbarList}>
            {_item}
            {hasInk ? (
              <Animated.View // 使用专门的可动画化的View组件
                style={{
                  ...sty.tabBarInk,
                  width: inkWidth,
                  left: inkPos, // 将left指定为inkPos
                }}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }

  private renderItem (
    sty: IMDTabBarStyle,
    children?: any,
    items?: IMDTabBarItem[],
    curIndex?: number
  ) {
    if (!items || items.length < 1) {
      return null;
    }

    return items.map((tabItem, index) => {
      return (
        <TouchableOpacity
          style={sty.tabbarItem}
          key={`tabItem.name-${index}`}
          onPress={this.onPress.bind(this, tabItem, index)}
          onLayout={this.onLayout.bind(this, index, curIndex)} // 当组件挂载或者布局变化的时候调用
        >
          {children ? (
            React.cloneElement(children, {
              index,
              item: tabItem,
              currentIndex: curIndex,
            })
          ) : (
            <Text
              style={[
                sty.itemText,
                tabItem.disabled ? sty.disabled : null,
                curIndex === index ? sty.isActive : null,
              ]}
            >
              {tabItem.label}
            </Text>
          )}
        </TouchableOpacity>
      );
    });
  }

  private onPress (tabItem?: IMDTabBarItem, index?: number) {
    if (tabItem && tabItem.disabled) {
      return;
    }

    if (index !== undefined) {
      this.setState({
        curIndex: index,
        inkWidth: this.widthArr[index],
      });
      Animated.timing(
        // 随时间变化而执行动画
        this.state.inkPos, // 动画中的变量值
        {
          toValue: this.leftArr[index] + 3, // inkPos
          duration: 300, // 让动画持续一段时间
        }
      ).start();
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(tabItem, index);
    }
  }

  private onLayout (index?: number, curIndex?: number, e?: any) {
    const { width, x } = e.nativeEvent.layout; // 组件宽度和x坐标
    if (index !== undefined) {
      this.widthArr[index] = width;
      this.leftArr[index] = x;
      this.setState({
        inkWidth: this.widthArr[curIndex || 0],
      });

      Animated.timing(
        // 随时间变化而执行动画
        this.state.inkPos, // 动画中的变量值
        {
          toValue: this.leftArr[curIndex || 0] + 3, // inkPos
          duration: 100, // 让动画持续一段时间
        }
      ).start();
    }
  }
}
