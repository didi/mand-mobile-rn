import React, { ReactNode } from 'react';
import { dialog } from '../../_styles/themes/default.components';
import guid from '../../_utils/guid';
import MDIcon from '../icon';
import RootView from '../root-view';
import Dialog, { IMDDialogBtnModel } from './dialog';

export interface IMDDialogProps {
  isVisible: boolean;
  closeable: boolean;
  icon?: ReactNode;
  iconColor?: string;
  title?: string;
  context: string;
  btns: IMDDialogBtnModel[];
}

export interface IMDConfirmPrams {
  isVisible: boolean;
  closeable: boolean;
  icon?: string;
  iconColor?: string;
  title?: string;
  context: string;
  cancelText?: string;
  confirmText: string;
  onConfirm?: () => void;
}

const MDDialog = (props: IMDDialogProps) => {
  const { isVisible, closeable, icon, iconColor, title, context, btns } = props;
  const _dialog = dialogWrapper(
    isVisible,
    closeable,
    icon!,
    iconColor!,
    title!,
    context,
    btns
  );
  return _dialog;
};

// 自定义
MDDialog.show = (prams: IMDDialogProps) => {
  const { isVisible, closeable, icon, iconColor, title, context, btns } = prams;
  const _dialog = dialogWrapper(
    isVisible,
    closeable!,
    icon!,
    iconColor!,
    title!,
    context,
    btns
  );
  RootView.add(_dialog);
  return _dialog;
};

MDDialog.alert = (prams: IMDConfirmPrams) => {
  const {
    isVisible,
    closeable,
    icon,
    iconColor,
    title,
    context,
    confirmText,
    onConfirm,
  } = prams;
  const _dialog = dialogWrapper(
    isVisible,
    closeable,
    icon!,
    iconColor!,
    title!,
    context,
    [
      {
        text: confirmText,
        handle: () => {
          onConfirm && onConfirm!();
          closeDialog();
        },
      },
    ]
  );
  function closeDialog () {
    if (_dialog.key) {
      MDDialog.hide(_dialog.key as string);
    }
  }
  RootView.add(_dialog);
  return _dialog;
};

MDDialog.confirm = (prams: IMDConfirmPrams) => {
  const {
    isVisible,
    closeable,
    icon,
    iconColor,
    title,
    context,
    cancelText,
    confirmText,
    onConfirm,
  } = prams;
  const _dialog = dialogWrapper(
    isVisible,
    closeable,
    icon!,
    iconColor!,
    title!,
    context,
    [
      {
        text: cancelText!,
        handle: closeDialog,
      },
      {
        text: confirmText,
        handle: () => {
          onConfirm && onConfirm!();
          closeDialog();
        },
      },
    ]
  );
  function closeDialog () {
    if (_dialog.key) {
      MDDialog.hide(_dialog.key as string);
    }
  }
  RootView.add(_dialog);
  return _dialog;
};

MDDialog.succeed = (props: any) => {
  props.icon = <MDIcon name='success-color' svg={true} size={dialog.iconSize} />;
  const _dialog = MDDialog.confirm({ ...props });
  return _dialog;
};

MDDialog.failed = (props: any) => {
  props.icon = <MDIcon name='warn-color' svg={true} size={dialog.iconSize} />;
  const _dialog = MDDialog.confirm({ ...props });
  return _dialog;
};

MDDialog.hide = (key: string) => RootView.remove(key);

const dialogWrapper = (
  isVisible: boolean,
  closeable: boolean,
  icon: ReactNode,
  iconColor: string,
  title: string,
  context: string,
  btns: IMDDialogBtnModel[]
) => {
  const _dialog = (
    <Dialog
      key={guid()}
      isVisible={isVisible}
      closeable={closeable}
      icon={icon}
      iconColor={iconColor}
      title={title}
      context={context}
      btns={btns}
    />
  );
  return _dialog;
};

export default MDDialog;
