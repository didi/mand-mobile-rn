import React, { ReactNode } from 'react';
import base from '../../_styles/themes/default.basic';
import {
  IMDOptionItemStyle,
  MDOptionItemStyles,
} from '../action-sheet/option-item';
import OptionModel from '../action-sheet/option-model';
import { MDIcon } from '../icon/icon';
import MDBaseSelector from './base-selector';

export interface IMDSelectorProps<T> {
  styles?: IMDOptionItemStyle;
  type?: string;
  title?: string;
  okText?: ReactNode;
  cancelText?: ReactNode;
  maskClosable?: string;
  icon?: MDIcon; // 默认图标(Selector type为Check时显示)
  iconInverse?: MDIcon; // 选中图标(Selector type为Check时显示)
  iconDisabled?: MDIcon; // 禁用图标(Selector type为Check时显示)
  options: T[];
  isVisible?: boolean;
  showTitle?: boolean;
  defaultIndex?: number;
  iconPosition?: string;
  onChoose?: (index: number, data: T) => void;
  onCancle?: () => void;
  onConfirm?: (index: number, data: T) => void;
  renderItem?: (index: number, data: T) => ReactNode;
}

export const MDSelectorStyles = {
  ...MDOptionItemStyles,
};

export default class MDSelector extends React.Component<
  IMDSelectorProps<OptionModel>
> {
  public static defaultProps = {
    styles: MDSelectorStyles,
    icon: <MDIcon name={'check'} size='medium' color={base.colors.textBody} />,
    iconInverse: (
      <MDIcon
        name={'checked'}
        size='medium'
        color={base.colors.textHighlight}
      />
    ),
    iconDisabled: (
      <MDIcon
        name={'check-disabled'}
        size='medium'
        color={base.colors.textDisabled}
      />
    ),
  };

  public render () {
    const { type, okText, cancelText } = this.props;
    const callBackImmediately = type === 'default' || type === 'custom';
    const _cancelText = callBackImmediately ? (
      <MDIcon name='close' size='large' />
    ) : (
      cancelText
    );

    return (
      <MDBaseSelector
        {...this.props}
        cancelText={_cancelText}
        okText={callBackImmediately ? '' : okText}
        callBackImmediately={callBackImmediately}
      />
    );
  }
}
