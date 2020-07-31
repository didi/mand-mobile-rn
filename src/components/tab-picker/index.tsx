import * as React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import MDIcon from '../icon';
import MDPopup from '../popup';
import MDPopupTitlebar from '../popup-title-bar';
import MDRadioList from '../radio-list';
import MDTabPane from '../tab-pane';
import MDTabs from '../tabs';

import base from '../../_styles/themes/default.basic';
import { tabPicker } from '../../_styles/themes/default.components';

interface TabPickerData {
  name?: number | string | boolean;
  label: string;
  value?: string;
  options: any[];
}

export interface IMDTabPickerProps {
  styles?: IMDTabPickerStyle;
  title?: string;
  describe?: string;
  placeholder?: string;
  visible?: boolean;
  data?: TabPickerData | null;
  change: (options: any[]) => void;
}

export interface IMDTabPickerStyle {
  wrapper?: ViewStyle;
  content?: ViewStyle;
  tabPickerContent?: ViewStyle;
}

interface IMDTabPickerState {
  isPopupShow: boolean;
  selected: number;
}

export const MDTabPickerStyles: IMDTabPickerStyle = {
  wrapper: {
    position: 'relative',
    backgroundColor: base.colors.bgBase,
  },
  tabPickerContent: {
    backgroundColor: tabPicker.bg,
    width: '100%',
    height: tabPicker.height,
  },
  content: {
    paddingLeft: base.gapSize.hMid,
    paddingRight: base.gapSize.hMid,
  },
};

const styles = StyleSheet.create<IMDTabPickerStyle>(MDTabPickerStyles);

export default class MDTabPicker extends React.Component<
  IMDTabPickerProps,
  IMDTabPickerState
> {
  public static defaultProps = {
    styles,
    placeholder: '请选择',
  };

  constructor (props: IMDTabPickerProps) {
    super(props);
    const { data, placeholder } = props;
    const target: any = data || {};
    this.state = {
      isPopupShow: props.visible || false,
      selected: 0,
    };
    this.panes = [{
      name: target.name,
      label: target.label || placeholder,
      parentValue: '',
      value: null,
      selected: null,
      options: target.options,
    }];
  }
  private panes: any[];

  public UNSAFE_componentWillReceiveProps (props: IMDTabPickerProps) {
    this.setState({
      isPopupShow: !!props.visible,
    });
  }

  public render () {
    const sty = this.props.styles || {};
    const { title, describe, data } = this.props;
    const { isPopupShow } = this.state;
    const renderItem = this.renderItem(sty, data);
    return (
      <MDPopup position='bottom' maskClosable={true} isVisible={isPopupShow}>
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
          <MDPopupTitlebar
            title={title}
            describe={describe}
            cancelText={<MDIcon name='close' size={24} color='#333' />}
            onCancel={() => {
              this.setState({ isPopupShow: false });
            }}
          />
          <View style={sty.tabPickerContent}>{renderItem}</View>
        </View>
      </MDPopup>
    );
  }

  private renderItem (sty: IMDTabPickerStyle, data?: TabPickerData | null) {
    const panes = this.panes;
    const selected = this.state.selected;

    const radioList = panes.map((item, index) => {
      return (
        <MDTabPane
          key={`tabPane-${selected}-${item.parentValue}-${item.value}-${index}`}
          name={index}
          label={item.label}
          curName={selected}
        >
          <ScrollView style={sty.content}>
            <MDRadioList
              defaultValue={item.value}
              options={item.options}
              onChange={(value, _index) => {
                this.onSelectPaneItem(index, value, _index);
              }}
            />
          </ScrollView>
        </MDTabPane>
      );
    });

    if (data && data.options) {
      return (
        <MDTabs currentIndex={selected}>
          {radioList}
        </MDTabs>
      );
    } else {
      return null;
    }
  }

  private onSelectPaneItem (tabIndex: number, value: number | string | boolean, itemIndex: number) {
    const { placeholder, change } = this.props;
    let paneArr: any[] = [];
    const panes = this.panes;
    const curPane = panes[tabIndex];

    if (
      curPane &&
      curPane.options &&
      curPane.options[itemIndex] &&
      curPane.options[itemIndex].children
    ) {
      paneArr = JSON.parse(JSON.stringify(panes));

      const curOption = curPane.options[itemIndex];

      // 更新当前选中的值
      curPane.value = value;
      curPane.label = curOption.label;
      curPane.selected = curOption;
      paneArr.splice(tabIndex, paneArr.length - tabIndex);
      paneArr.push(curPane);
      this.panes = paneArr;

      // 将选中的options放入 panes 中
      const nextPane = curOption.children;
      const pane = {
        name: nextPane.name,
        label: nextPane.label || placeholder,
        value: null,
        parentValue: value,
        selected: null,
        options: nextPane.options,
      };
      paneArr.push(pane);

      this.setState({ selected: tabIndex + 1 });
      this.panes = paneArr;
      return;
    }

    if (!curPane.options[itemIndex] || !curPane.options[itemIndex].children) {
      setTimeout(() => {
        this.setState({
          isPopupShow: false,
        });
      }, 300);
      const pane = panes[tabIndex];
      curPane.selected = pane.options[itemIndex];
      curPane.value = value;
      curPane.label = pane.label;

      paneArr = JSON.parse(JSON.stringify(panes));

      paneArr.splice(tabIndex, paneArr.length - tabIndex);
      paneArr.push(curPane);

      this.setState({ selected: tabIndex });

      this.panes = paneArr;
      const options = this.getSelectedOptions(paneArr);
      change(options);
      return;
    }
  }

  private getSelectedOptions (panes: any[]) {
    if (panes && panes.length) {
      return panes.filter((pane) => pane.value).map((pane) => pane.selected);
    } else {
      return [];
    }
  }
}
