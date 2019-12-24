import * as React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import MDTabbar from '../tab-bar';

import { tabs } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';
export interface IMDTabItem {
  name?: number;
  label?: string;
  icon?: string;
  disabled?: boolean;
}

export interface IMDTabsProps {
  styles?: IMDTabsStyle;
  currentIndex?: number; // 选中索引
  hasInk?: boolean; // 是否有下划线
}

export interface IMDTabsStyle {
  wrapper?: ViewStyle;
  content?: ViewStyle;
}

interface IMDTabBarState {
  currentIndex?: number;
  inkPos: Animated.Value;
}

export const MDTabsStyles: IMDTabsStyle = {
  wrapper: {
    position: 'relative',
    backgroundColor: base.colors.bgBase,
  },
  content: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
};

const styles = StyleSheet.create<IMDTabsStyle>(MDTabsStyles);

export default class MDTabs extends React.Component<
  IMDTabsProps,
  IMDTabBarState
> {
  public static defaultProps = {
    styles,
  };

  constructor (props: IMDTabsProps) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      currentIndex: props.currentIndex || 0,
      inkPos: new Animated.Value(0),
    };
  }
  private items: IMDTabItem[] = [];

  public componentWillReceiveProps (props: IMDTabsProps) {
    if (this.props.currentIndex !== props.currentIndex) {
      this.setState({
        currentIndex: props.currentIndex,
      });
    }
  }

  public render () {
    const sty = this.props.styles || {};
    const { hasInk, children } = this.props;
    const { currentIndex } = this.state;
    const childItem = this.childItem(children);
    return (
      <View style={sty.wrapper}>
        <MDTabbar
          hasInk={hasInk}
          onChange={this.onPress}
          currentIndex={currentIndex}
          items={this.items}
        />
        <View style={sty.content}>{childItem}</View>
      </View>
    );
  }

  private childItem (children: any): React.ReactNode {
    const { currentIndex } = this.state;
    if (React.Children.count(children) < 1) {
      return null;
    }
    this.items = [];

    return React.Children.map(children, (child: any) => {
      if (child.props && child.props.__name === 'MDTabPane') {
        this.items.push({
          name: child.props.__name,
          label: child.props.label,
          disabled: child.props.disabled || false,
        });
        return React.cloneElement(child, {
          curName: child.props.currentIndex || currentIndex,
        });
      }
      return child;
    });
  }

  private onPress (tabItem?: IMDTabItem, index?: number) {
    this.setState({
      currentIndex: index,
    });
  }
}
