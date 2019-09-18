import * as React from 'react';
import { findNodeHandle, Platform, requireNativeComponent, UIManager } from 'react-native';

const NativeRefreshControl =
  Platform.OS === 'web' ? undefined : requireNativeComponent('MDRefreshControl');

export type MDRefreshControlType = 'default' | 'roller';

export interface IMDRefreshControlProps {
  type?: MDRefreshControlType;
  refreshing?: boolean;
  stateHidden?: boolean;
  timeHidden?: boolean;
  stateFontSize?: number;
  timeFontSize?: number;
  stateTextColor?: string;
  timeTextColor?: string;
  indicatorColor?: string;
  refreshText?: string; // 待刷新文案
  refreshActiveText?: string; // 释放刷新文案
  refreshingText?: string; // 刷新中...
  onRefresh?: () => void;
}

export default class MDRefreshControl extends React.Component<
  IMDRefreshControlProps
> {
  public static defaultProps = {
    type: 'roller',
    refreshing: false,
    stateHidden: false,
    timeHidden: true,
    stateTextColor: '#aaaaaa',
    timeTextColor: '#aaaaaa',
    indicatorColor: '#2F86F6',
    refreshText: '下拉刷新',
    refreshActiveText: '松开刷新',
    refreshingText: '刷新中...',
  };

  public refreshControl: any = null;

  public render () {
    if (Platform.OS === 'web') {
      return null;
    }
    return <NativeRefreshControl {...this.props} ref={(ref: any) => this.refreshControl = ref} />;
  }

  /**
   * 开始刷新
   */
  public beginRefreshing () {
    // @ts-ignore
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refreshControl),
      this.refreshControl.viewConfig.Commands.beginRefreshing,
      []
    );
  }

  /**
   * 停止刷新
   */
  public endRefreshing () {
    // @ts-ignore
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refreshControl),
      this.refreshControl.viewConfig.Commands.endRefreshing,
      []
    );
  }
}
