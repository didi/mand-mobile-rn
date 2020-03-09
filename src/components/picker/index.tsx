import * as React from 'react';
import { View } from 'react-native';
import { default as base } from '../../_styles/themes/default.basic';
import MDPopupTitleBar from '../popup-title-bar/index';
import MDPopup from '../popup/index';
import Picker from './picker';

export interface IMDPickerProps {
  defaultIndex?: number[];
  defaultValue?: string[];
  invalidIndex?: number[][];
  isView?: boolean;
  isCascade?: boolean;
  data: any[][];
  cols?: number;
  itemHeight?: number;
  pickerWidth: number;
  pickerHeight: number;
  isVisible?: boolean;
  okText?: string;
  cancelText?: string;
  title?: string;
  onChange?: (columnIndex: number, itemIndex: number, value: any) => void;
  onConfirm?: (columnsValue: any[]) => void;
  onCancel?: () => void;
  onShow?: () => void;
  onHide?: () => void;
}

interface IMDPickerState {
  isVisible: boolean;
}

export default class MDPicker extends React.Component<
  IMDPickerProps,
  IMDPickerState
> {
  public static defaultProps = {
    cancelText: '取消',
    okText: '确认',
  };

  public constructor (props: IMDPickerProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  private _picker = React.createRef<Picker>();
  private selectedColumn: number = 0;

  public componentWillReceiveProps (nextProps: IMDPickerProps) {
    this.setUpVisibleState(nextProps.isVisible!);
  }

  public renderPicker () {
    if (this.props.isView) {
      return (
        <Picker
          ref={this._picker}
          {...this.props}
          onPickerSelected={(columnIndex: number) => {
            this.selectedColumn = columnIndex;
            this.onSelected();
          }}
        />
      );
    } else {
      return (
        <MDPopup
          position='bottom'
          isVisible={this.state.isVisible}
          maskClosable={false}
          onShow={() => {
            if (this.props.onShow) {
              this.props.onShow();
            }
          }}
          onHide={() => {
            if (this.props.onHide) {
              this.props.onHide();
            }
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <MDPopupTitleBar
              title={this.props.title}
              cancelText={this.props.cancelText}
              okText={this.props.okText}
              onCancel={() => {
                this.onCancel();
              }}
              onConfirm={() => {
                this.onConfirm();
              }}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: base.colors.textBaseInverse,
              }}
            >
              <Picker
                ref={this._picker}
                {...this.props}
                onPickerSelected={(columnIndex: number) => {
                  this.selectedColumn = columnIndex;
                  this.onSelected();
                }}
              />
            </View>
          </View>
        </MDPopup>
      );
    }
  }
  public render () {
    return <React.Fragment>{this.renderPicker()}</React.Fragment>;
  }

  public refresh (callback: () => void) {
    this.forceUpdate();
    callback();
  }

  public getColumnValue (index: number) {
    const activeValues = this.getColumnValues();
    return activeValues[index];
  }

  public getColumnValues () {
    if (this._picker.current) {
      return this._picker.current.getActiveValues();
    }
    return [];
  }

  public getColumnIndex (index: number) {
    const activeIndexs = this.getColumnIndexs();
    return activeIndexs[index];
  }

  public getColumnIndexs () {
    if (this._picker.current) {
      return this._picker.current.getActiveIndexs();
    }
    return [];
  }

  public setColumnValues (index: number, values: any[], callback?: () => void) {
    if (this._picker && this._picker.current) {
      this._picker.current.setColumnValues(index, values);
    }
    callback && callback();
  }

  private onSelected () {
    if (this.props.onChange) {
      const index = this.selectedColumn;
      this.props.onChange(
        index,
        this.getColumnIndex(index),
        this.getColumnValue(index)
      );
    }
  }

  private onConfirm () {
    this.setUpVisibleState(false);
    this.props.onConfirm && this.props.onConfirm(this.getColumnValues());
  }

  private onCancel () {
    this.setUpVisibleState(false);
    this.props.onCancel && this.props.onCancel();
  }

  private setUpVisibleState (visible: boolean) {
    this.setState({
      isVisible: visible,
    });
  }
}
