import React, { ReactNode } from 'react';
import base from '../../_styles/themes/default.basic';
import guid from '../../_utils/guid';
import MDActivityIndicator from '../activity-indicator';
import RootView from '../root-view';
import MDToastView from './toast';
import MDToastWrapper from './wrapper';

const toastKeys: string[] = [];
export interface IMDToastProps {
  content: string;
  icon?: string;
  duration?: number;
  position?: string;
  hasMask?: boolean;
}

const setting = (
  content: string,
  duration: number = 3000,
  hasMask: boolean = false,
  icon: ReactNode = null,
  position: string = 'center'
) => {
  if (!content) {
    console.warn('[MDToast]: content empty.');
  }
  const toastAndWrapper = (
    <MDToastWrapper key={guid()} hasMask={hasMask} position={position}>
      <MDToastView icon={icon} content={content} />
    </MDToastWrapper>
  );
  RootView.add(toastAndWrapper);

  if (duration) {
    setTimeout(() => RootView.remove(toastAndWrapper.key as string), duration);
  } else {
    toastKeys.push(toastAndWrapper.key as string);
  }
};

export default function MDToast (params: IMDToastProps) {
  // todo svg 设计上应该用上
  const { content, icon, duration, position, hasMask } = params;
  setting(content, duration, hasMask, icon, position);
}

MDToast.info = (content: string, duration?: number, hasMask?: boolean, icon?: ReactNode | string) => {
  setting(content, duration, hasMask, icon);
};

MDToast.warn = (content: string, duration?: number, hasMask?: boolean) => {
  setting(content, duration, hasMask, 'warn');
};

MDToast.succeed = (
  content: string = '操作成功',
  duration?: number,
  hasMask?: boolean
) => {
  setting(content, duration, hasMask, 'checked');
};

MDToast.failed = (
  content: string = '操作失败',
  duration?: number,
  hasMask?: boolean
) => {
  setting(content, duration, hasMask, 'clear');
};

MDToast.loading = (
  content: string = '加载中...',
  duration?: number,
  hasMask?: boolean
) => {
  const icon = (
    <MDActivityIndicator
      color={base.colors.textBaseInverse}
      size={base.fontSize.captionLarge}
      type='spinner'
    />
  );
  setting(content, duration, hasMask, icon);
};

MDToast.hide = () => {
  if (toastKeys.length > 0) {
    toastKeys.forEach((key) => {
      RootView.remove(key);
    });
    toastKeys.length = 0;
  }
};
