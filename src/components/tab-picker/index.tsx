import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import MDPopup from '../popup';

import MDTabs from '../tabs';

import MDTabPane from '../tab-pane';

import MDIcon from '../icon';

import MDPopupTitlebar from '../popup-title-bar';

import MDRadioList from '../radio-list';

import { tabPicker, tabs } from '../../_styles/themes/default.components';

import base from '../../_styles/themes/default.basic';

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
  panes: any[];
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
    this.state = {
      isPopupShow: props.visible || false,
      panes: [],
    };
    this.selected = 0;
  }
  private selected: number;

  public componentWillMount () {
    const { data, placeholder } = this.props;
    if (data && data.name) {
      const pane = {
        name: data.name,
        label: data.label || placeholder,
        // value: data.value || 0,
        selected: 0,
        options: data.options,
      };
      this.setState({ panes: [pane] });
    }
  }

  public componentWillReceiveProps (props: IMDTabPickerProps) {
    this.setState({
      isPopupShow: !!props.visible,
    });
  }

  public render () {
    const sty = this.props.styles || {};
    const { title, describe, children, data } = this.props;
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
    const { panes } = this.state;
    if (data && data.options) {
      return (
        <MDTabs currentIndex={this.selected}>
          {panes.map((item, index) => {
            return (
              <MDTabPane
                key={'tabPane-' + index}
                name={index}
                label={item.label}
              >
                <ScrollView style={sty.content}>
                  <MDRadioList
                    defaultValue={index}
                    options={item.options}
                    onChange={(value) => {
                      this.onSelectPaneItem(index, value);
                    }}
                  />
                </ScrollView>
              </MDTabPane>
            );
          })}
        </MDTabs>
      );
    } else {
      return null;
    }
  }

  private onSelectPaneItem (index: number, value?: number | string | boolean) {
    const { data, placeholder, change } = this.props;
    let target = data;
    let cursor = 0;
    let paneArr = [];
    const { panes } = this.state;
    const nextPane = panes[this.selected];

    /* istanbul ignore else */
    if (
      nextPane &&
      nextPane.options &&
      nextPane.options[index] &&
      nextPane.options[index].children &&
      panes.length > 1 &&
      target
    ) {
      paneArr = panes;
      cursor++;
      paneArr.splice(paneArr.length - 1, 1);
      target = target.options[this.selected].children;
    } else if (!nextPane.options[index] || !nextPane.options[index].children) {
      setTimeout(() => {
        this.setState({
          isPopupShow: false,
        });
      }, 300);
      const pane = panes[this.selected];
      pane.selected = pane.options.filter(
        (item: any) => item.value === value
      )[0];
      paneArr = panes;
      paneArr.splice(paneArr.length - 1, 1);
      paneArr.push(pane);
      this.setState({ panes: paneArr });
      const options = this.getSelectedOptions();
      change(options);
      return;
    }

    while (target && target.name) {
      const pane = {
        name: target.name,
        label: target.label || placeholder,
        value,
        selected: null,
        options: target.options,
      };
      let find = false;
      for (let i = 0, len = target.options.length; i < len; i++) {
        if (target.options[i].value === value) {
          pane.label = target.options[i].label;
          pane.selected = target.options[i];
          target = target.options[i].children;
          find = true;
          cursor++;
          this.selected = cursor;
          break;
        }
      }
      if (!find) {
        target = null;
      }
      paneArr.push(pane);
    }

    this.setState({ panes: paneArr });
  }

  private getSelectedOptions () {
    const { panes } = this.state;
    if (panes && panes.length) {
      return panes.filter((pane) => pane.value).map((pane) => pane.selected);
    } else {
      return [];
    }
  }
}
