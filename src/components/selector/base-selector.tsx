import * as React from 'react';
import { View } from 'react-native';
import base from '../../_styles/themes/default.basic';
import { safeAreaOffsetBottom } from '../../_styles/themes/device';
import MDOptionItem, { IMDOptionItemStyle } from '../action-sheet/option-item';
import OptionModel from '../action-sheet/option-model';
import { MDIcon } from '../icon/icon';
import MDPopup from '../popup';
import MDPopupTitleBar from '../popup-title-bar';

interface IMDBaseSelectorProps<T> {
  styles?: IMDOptionItemStyle;
  type?: string; // 类型
  title?: string; // 标题
  okText?: React.ReactNode; // 确认文案
  cancelText?: React.ReactNode; // 取消文案
  maskClosable?: string;
  icon?: MDIcon; // 默认图标(Selector type为Check时显示)
  iconInverse?: MDIcon; // 选中图标(Selector type为Check时显示)
  iconDisabled?: MDIcon; // 禁用图标(Selector type为Check时显示)
  options: T[]; // 数据列表
  isVisible?: boolean; // 是否可见
  showTitle?: boolean; // 标题是否可见
  defaultIndex?: number; // 默认选中索引
  iconPosition?: string; // 图标位置(Selector type为Check时可用)
  cancleItem?: any; // 取消Item(MDActionSheet底部取消按钮)
  callBackImmediately?: boolean; // 选中item时是否立即回调
  onChoose?: (index: number, data: T) => void; // Item被选中是回调
  onCancle?: () => void; // 取消回调
  onConfirm?: (index: number, data: T) => void; // 确认回调
  renderItem?: (index: number, data: T) => React.ReactNode; // 自定义渲染Item
}

interface IMDBaseSelectorState {
  checkedIndex: number;
  lastIndex: number;
}

export type MDSelectorIconPos = 'left' | 'right';

export type MDSelectorType = 'default' | 'confirm' | 'check' | 'custom';

export default class MDBaseSelector extends React.Component<
  IMDBaseSelectorProps<OptionModel>,
  IMDBaseSelectorState
> {
  public static defaultProps = {
    type: 'default',
    title: '标题',
    okText: '确定',
    cancelText: '取消',
    maskClosable: false,
    isVisible: false,
    showTitle: true,
    defaultIndex: -1,
    iconPosition: 'right',
    callBackImmediately: false,
  };

  constructor (props: IMDBaseSelectorProps<OptionModel>) {
    super(props);
    const { defaultIndex } = props;
    this.state = { checkedIndex: defaultIndex!, lastIndex: defaultIndex! };
  }

  public render () {
    const {
      title,
      okText,
      cancelText,
      isVisible,
      showTitle,
      options,
      renderItem,
      cancleItem,
      onConfirm,
      onCancle,
    } = this.props;
    const itemList = [];
    if (options && options.length > 0) {
      options.forEach((option, index) => {
        const item = renderItem
          ? renderItem(index, option)
          : this.renderItem(this.props, index);
        itemList.push(item);
      });
      if (cancleItem) {
        itemList.push(cancleItem);
      }
    }

    return (
      <MDPopup position={'bottom'} isVisible={isVisible}>
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
          {showTitle ? (
            <MDPopupTitleBar
              title={title}
              cancelText={cancelText}
              okText={okText}
              onConfirm={() => {
                this.setState({
                  lastIndex: this.state.checkedIndex,
                });
                if (onConfirm) {
                  onConfirm(
                    this.state.checkedIndex,
                    options[this.state.checkedIndex]
                  );
                }
              }}
              onCancel={() => {
                if (onCancle) {
                  onCancle();
                }
                this.setState({
                  checkedIndex: this.state.lastIndex,
                });
              }}
            />
          ) : null}
          <View
            style={{
              backgroundColor: base.colors.bg,
              paddingBottom: safeAreaOffsetBottom,
            }}
          >
            {itemList}
          </View>
        </View>
      </MDPopup>
    );
  }

  private renderItem (props: any, index: number) {
    const { checkedIndex } = this.state;
    const option = props.options[index];
    const { onChoose, icon, iconInverse, iconDisabled } = props;
    const _icon =
      index === checkedIndex
        ? iconInverse
        : option.disabled!
        ? iconDisabled
        : icon;
    return (
      <MDOptionItem
        {...props}
        key={index}
        data={option}
        icon={_icon}
        checked={index === checkedIndex}
        disabled={option.disabled!}
        onItemPress={() => {
          if (props.callBackImmediately && onChoose) {
            onChoose(index, option);
          }
          this.setState({
            checkedIndex: index,
          });
        }}
      />
    );
  }
}
