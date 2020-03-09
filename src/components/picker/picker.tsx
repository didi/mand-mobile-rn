import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { default as base } from '../../_styles/themes/default.basic';
import { picker } from '../../_styles/themes/default.components';
import { innerScaleSize } from '../../_styles/themes/responsive';
import PickerColumn from './picker-column';
import PickerColumnAndroid from './picker-column.android';

interface IMDPickerProps {
  itemHeight?: number;
  pickerWidth: number;
  pickerHeight: number;
  onPickerSelected?: (columnIndex: number) => void;
  defaultIndex?: number[];
  defaultValue?: string[];
  invalidIndex?: number[][];
  data: any[][];
  cols?: number;
  isCascade?: boolean;
}

export interface IMDItemModel {
  label: string;
  value: string;
  children?: IMDItemModel[];
}

interface IMDPickerState {
  columns: any[];
  activeIndexs: number[];
}

export default class Picker extends React.Component<
  IMDPickerProps,
  IMDPickerState
> {
  public static defaultProps = {
    itemHeight: innerScaleSize(40 * 2),
    pickerHeight: innerScaleSize((40 + 2 * 80) * 2),
  };

  constructor (props: IMDPickerProps) {
    super(props);
    this.state = {
      columns: props.data,
      activeIndexs: [],
    };
  }
  private activeIndexs: number[] = [];
  private activeValues: any[] = [];
  private columnValues: any[] = [];

  public componentWillReceiveProps (nextProps: IMDPickerProps) {
    this.initActiveIndexsByNextProps(nextProps);
    this.initColumnValues();
    this.setupStateColumns();
  }

  public componentWillMount () {
    this.initActiveIndexs();
    this.initColumnValues();
    this.setupStateColumns();
  }

  public componentDidMount () {
    this.initActiveValues();
  }

  public render () {
    const maskHeight = (this.props.pickerHeight - this.props.itemHeight!) / 2;
    return (
      <View
        style={[
          styles.container,
          { width: this.props.pickerWidth, height: this.props.pickerHeight },
        ]}
      >
        <View
          style={[styles.maskTop, { height: maskHeight }]}
          pointerEvents={'none'}
        />
        <View
          style={[styles.maskBottom, { height: maskHeight }]}
          pointerEvents={'none'}
        />
        <View style={styles.columns}>{this.renderColumns()}</View>
      </View>
    );
  }

  public setColumnValues (index: number, values: any[]) {
    if (index === undefined || values === undefined) {
      return;
    }

    this.updateActiveIndexs(index, 0);
    this.columnValues[index] = values;
    if (this.props.isCascade) {
      this.cascadePicker(this.columnValues[index], index, this.props.cols!);
    }
    this.setupStateColumns();
    const selectIndex = this.activeIndexs[index];
    this.updateActiveValues(index, values[selectIndex]);
  }

  public getActiveValues () {
    return this.activeValues || [];
  }
  public getActiveIndexs () {
    return this.activeIndexs || [];
  }

  private renderColumns () {
    if (Platform.OS === 'ios') {
      return this.state.columns.map((column, index) => {
        return (
          <PickerColumn
            key={index}
            columnIndex={index}
            selectIndex={this.state.activeIndexs[index]}
            invalidItemIndexs={this.getInvalidIndexs(index)}
            itemHeight={this.props.itemHeight}
            offsetY={(this.props.pickerHeight - this.props.itemHeight!) / 2}
            column={column}
            width={this.props.pickerWidth / this.props.cols!}
            onPickerSelected={this.onSeleted.bind(this)}
          />
        );
      });
    } else {
      return this.state.columns.map((column, index) => {
        return (
          <PickerColumnAndroid
            key={index}
            columnIndex={index}
            selectIndex={this.state.activeIndexs[index]}
            invalidItemIndexs={this.getInvalidIndexs(index)}
            itemHeight={this.props.itemHeight}
            offsetY={(this.props.pickerHeight - this.props.itemHeight!) / 2}
            column={column}
            width={this.props.pickerWidth / this.props.cols!}
            onPickerSelected={this.onSeleted.bind(this)}
          />
        );
      });
    }
  }

  private cascadePicker (
    columValue: any[],
    curColumnIndex: number,
    maxCols: number
  ) {
    if (!this.props.isCascade) {
      return;
    }
    let valuesChange = false;
    let colIndex = curColumnIndex;
    let nextIndex = this.activeIndexs[colIndex];
    let nextValue: any = columValue[nextIndex];

    while (colIndex < maxCols - 1) {
      if (
        nextValue &&
        nextValue.children !== undefined &&
        nextValue.children.length > 0
      ) {
        this.columnValues[++colIndex] = nextValue.children
          ? nextValue.children
          : [];
        nextIndex = this.activeIndexs[colIndex];
        nextValue = this.columnValues[colIndex][nextIndex];
      } else {
        this.columnValues[++colIndex] = [];
      }
      valuesChange = true;
    }

    if (valuesChange) {
      this.setupStateColumns();
    }
  }

  private initColumnValues () {
    this.columnValues = this.props.data;
    if (this.columnValues.length > 0 && this.props.isCascade) {
      this.cascadePicker(this.columnValues[0], 0, this.props.cols!);
    }
  }

  private initActiveIndexsByNextProps (nextProps: IMDPickerProps) {
    const { defaultIndex, defaultValue } = nextProps;
    if (
      defaultIndex &&
      defaultIndex.length > 0 &&
      JSON.stringify(defaultIndex) !== JSON.stringify(this.props.defaultIndex)
    ) {
      this.activeIndexs = defaultIndex;
    } else if (
      defaultValue &&
      defaultValue.length > 0 &&
      JSON.stringify(defaultValue) !== JSON.stringify(this.props.defaultValue)
    ) {
      this.activeIndexs = this.getIndexsByDefaultValues(nextProps);
    }
  }

  private initActiveIndexs () {
    const { defaultIndex, defaultValue } = this.props;
    if (defaultIndex && defaultIndex.length > 0) {
      this.activeIndexs = defaultIndex;
    } else if (defaultValue && defaultValue.length > 0) {
      this.activeIndexs = this.getIndexsByDefaultValues(this.props);
    } else {
      let i = 0;
      while (i < this.props.cols!) {
        this.activeIndexs[i] = 0;
        i++;
      }
    }
  }

  private getIndexsByDefaultValues (props: IMDPickerProps) {
    const indexs: number[] = [];
    const values: any[] = props.defaultValue || [];
    const cValues: any[] = props.data;
    if (props.isCascade) {
      let i = 0;
      let lastFind: boolean = true;
      while (i < props.cols!) {
        const value: string = i < values.length ? values[i] : '';
        const cValue: any[] = i < cValues.length ? cValues[i] : [];
        indexs[i] = 0;
        if (value.length > 0 && cValue.length > 0 && lastFind) {
          lastFind = false;
          cValue.map((item, index) => {
            if (
              item.value === value ||
              item.label === value ||
              item.text === value
            ) {
              indexs[i] = index;
              lastFind = true;
              if (item.children && item.children.length > 0) {
                cValues[i + 1] = item.children;
              }
            }
          });
        }
        ++i;
      }
    } else {
      let i = 0;
      while (i < props.cols!) {
        const value: string = i < values.length ? values[i] : '';
        const cValue: any[] = i < cValues.length ? cValues[i] : [];
        indexs[i] = 0;
        if (cValue.length > 0) {
          cValue.map((item, index) => {
            if (
              item.value === value ||
              item.label === value ||
              item.text === value
            ) {
              indexs[i] = index;
            }
          });
        }
        ++i;
      }
    }
    return indexs;
  }

  private setupStateColumns () {
    this.setState({
      columns: this.columnValues,
      activeIndexs: this.activeIndexs,
    });
  }

  private updateActiveIndexs (curColumnIndex: number, itemIndex: number) {
    this.activeIndexs[curColumnIndex] = itemIndex;
    if (this.props.isCascade) {
      while (++curColumnIndex < this.props.cols!) {
        this.activeIndexs[curColumnIndex] = 0;
      }
    }
  }

  private initActiveValues () {
    this.setBehindActiveValues(0);
  }

  private setBehindActiveValues (index: number) {
    let i = index;
    while (i < this.props.cols!) {
      const pIndex = this.activeIndexs[i];
      if (this.state.columns[i] && pIndex < this.state.columns[i].length) {
        const item = this.state.columns[i][pIndex];
        this.activeValues[i] = item;
      } else {
        this.activeValues[i] = null;
      }
      ++i;
    }
  }

  private updateActiveValues (curColumnIndex: number, itemValue: any) {
    this.activeValues[curColumnIndex] = itemValue;
    if (this.props.isCascade) {
      this.setBehindActiveValues(++curColumnIndex);
    }
  }

  private onSeleted (itemIndex: number, itemValue: any, columnIndex: number) {
    if (columnIndex < this.props.cols!) {
      this.updateActiveIndexs(columnIndex, itemIndex);
      if (this.props.isCascade) {
        this.cascadePicker(
          this.columnValues[columnIndex],
          columnIndex,
          this.props.cols!
        );
      }
      this.updateActiveValues(columnIndex, itemValue);
    }
    this.props.onPickerSelected!(columnIndex);
  }

  private getInvalidIndexs (index: number) {
    if (this.props.invalidIndex && this.props.invalidIndex.length > index) {
      return this.props.invalidIndex[index];
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: base.colors.textBaseInverse,
  },
  maskTop: {
    position: 'relative',
    width: '100%',
    borderColor: picker.borderColor,
    borderBottomWidth: 1,
    zIndex: 2,
  },
  maskBottom: {
    position: 'relative',
    width: '100%',
    borderTopWidth: 1,
    borderColor: picker.borderColor,
    zIndex: 2,
  },
  columns: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
