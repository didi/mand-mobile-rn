import React, { createRef } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { toArray } from '../../_utils';
import MDPicker from '../picker/index';

export interface IMDDatePickerProps {
  style?: ViewStyle;
  type?: 'date' | 'time' | 'datetime' | 'custom';
  customTypes?: Array<'yyyy' | 'MM' | 'dd' | 'hh' | 'mm'>;
  minDate?: Date;
  maxDate?: Date;
  defaultDate?: Date;
  minuteStep?: number;
  unitText?: string[];
  todayText?: string;
  textRender?: () => string | undefined;
  onChange?: (
    columnIndex: number,
    itemIndex: number,
    value: { text: string; value: any; typeFormat: any }
  ) => void;
  onConfirm?: (
    columnsValue: Array<{ text: string; value: any; typeFormat: any }>
  ) => void;
  onShow?: () => void;
  onHide?: () => void;
  onCancel?: () => void;

  isView?: boolean;
  isVisable?: boolean;
  title?: string;
  describe?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
}

export interface IMDDatePickerState {
  isPickerShow: boolean;
  columnData: any[];
  columnDataDefault: any[];
}

// yyyy-MM-dd hh:mm:ss => Year-Month-Date Hour:Minute
const TYPE_FORMAT: { [key: string]: string } = {
  yyyy: 'Year',
  MM: 'Month',
  dd: 'Date',
  hh: 'Hour',
  mm: 'Minute',
};

const TYPE_FORMAT_INVERSE: { [key: string]: string } = {
  Year: 'yyyy',
  Month: 'MM',
  Date: 'dd',
  Hour: 'hh',
  Minute: 'mm',
};

const TYPE_METHODS: { [key: string]: string } = {
  Year: 'getFullYear',
  Month: 'getMonth',
  Date: 'getDate',
  Hour: 'getHours',
  Minute: 'getMinutes',
};

export default class MDDatePicker extends React.Component<
  IMDDatePickerProps,
  IMDDatePickerState
> {
  public static defaultProps = {
    type: 'date',
    customTypes: [],
    minuteStep: 1,
    unitText: ['年', '月', '日', '时', '分'],
    todayText: '',
    textRender: '',
    isVisable: false,
    isView: false,
    maskClosable: true,
  };

  constructor (props: IMDDatePickerProps) {
    super(props);
    this.state = {
      isPickerShow: false,
      columnData: [],
      columnDataDefault: [],
    };
  }

  private picker = createRef<MDPicker>();

  private currentDateIns = new Date();
  private columnData: any[] = [];
  private oldColumnData: any = null;
  private columnDataDefault: number[] = [];
  private columnDataGenerator: Array<{ generator: any; type: string }> = [];

  public componentDidMount () {
    this.initPicker();
  }

  public componentWillReceiveProps (nextProps: IMDDatePickerProps) {
    if (nextProps.isVisable !== this.props.isVisable) {
      this.setState({
        isPickerShow: !!nextProps.isVisable,
      });
    }
    if (
      nextProps.defaultDate !== this.props.defaultDate ||
      nextProps.minDate !== this.props.minDate ||
      nextProps.maxDate !== this.props.maxDate
    ) {
      this.initPickerColumn();
    }
  }

  public render () {
    const { style, okText, cancelText, title, isView } = this.props;
    const { isPickerShow, columnData, columnDataDefault } = this.state;
    return (
      <View
        style={[
          {
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <MDPicker
          ref={this.picker}
          defaultValue={columnDataDefault}
          isView={isView}
          data={columnData}
          cols={columnData.length}
          pickerHeight={200}
          pickerWidth={350}
          itemHeight={40}
          isVisible={isPickerShow}
          okText={okText}
          cancelText={cancelText}
          title={title}
          onChange={this.onPickerChange.bind(this)}
          onCancel={this.onPickerCancel.bind(this)}
          onConfirm={this.onPickerConfirm.bind(this)}
          onHide={this.onPickerHide.bind(this)}
          onShow={this.onPickerShow.bind(this)}
        />
      </View>
    );
  }

  public getFormatDate (format = 'yyyy-MM-dd hh:mm'): string {
    if (!this.picker.current) {
      return '';
    }
    const columnValues = this.picker.current.getColumnValues();

    columnValues.forEach((item) => {
      if (!item) {
        return;
      }

      let value = item.value;

      if (value < 10) {
        value = '0' + value;
      }

      format = format.replace(item.type, value);
      format = format.replace(TYPE_FORMAT_INVERSE[item.type], value);
    });

    return format;
  }

  public getColumnValue (index: number): any {
    if (this.picker.current) {
      return this.picker.current.getColumnValue(index);
    }
    return;
  }

  public getColumnValues (): any[] {
    if (this.picker.current) {
      return this.picker.current.getColumnValues();
    }
    return [];
  }

  public getColumnIndex (index: number): number {
    if (this.picker.current) {
      return this.picker.current.getColumnIndex(index);
    }
    return 0;
  }

  public getColumnIndexs (): number[] {
    if (this.picker.current) {
      return this.picker.current.getColumnIndexs();
    }
    return [];
  }

  private currentYear () {
    return this.currentDateIns.getFullYear();
  }

  private currentMonth () {
    return this.currentDateIns.getMonth() + 1;
  }

  private currentDate () {
    return this.currentDateIns.getDate();
  }

  private currentHours () {
    return this.currentDateIns.getHours();
  }

  private currentMinutes () {
    return this.currentDateIns.getMinutes();
  }

  private initPicker () {
    if (!this.props.isView && this.props.isVisable) {
      this.setState({
        isPickerShow: this.props.isVisable,
      });
    }

    // this.picker.inheritPickerApi(this);
    this.initPickerColumn();
  }

  private initPickerColumn () {
    this.resetPickerColumn();
    this.initColumnDataGenerator();
    this.initColumnData(0, this.columnDataDefault);
  }

  private resetPickerColumn () {
    this.setState({
      columnData: [],
      columnDataDefault: [],
    });
    this.oldColumnData = null;
    this.columnData = [];
    this.columnDataDefault = [];
    this.columnDataGenerator = [];
  }

  private setPickerColumnState () {
    this.setState({
      columnData: this.columnData,
      columnDataDefault: this.columnDataDefault,
    });
  }

  private initColumnData (
    columnIndex: number,
    defaultDates: any[] = [],
    isSetColumn = true
  ) {
    const columnData = this.columnData;
    const columnDataGenerator = this.columnDataGenerator;
    for (let i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
      // Collect parameters for columnDataGenerator
      const columnDataGeneratorParams = [];
      const generator = columnDataGenerator[i];
      for (let j = 0; j < i; j++) {
        const _generator = columnDataGenerator[j];
        if (defaultDates[j] && _generator) {
          columnDataGeneratorParams.push({
            type: _generator.type,
            value: defaultDates[j],
          });
          continue;
        }

        let itemIndex = 0;
        if (this.picker.current) {
          itemIndex = this.picker.current.getColumnIndex(j) || 0;
        }
        if (this.state.columnData[j]) {
          columnDataGeneratorParams.push(this.state.columnData[j][itemIndex]);
        } else {
          columnDataGeneratorParams.push('');
          // warn(`DatePicker columnData of index ${j} is void`);
        }
      }
      // Generator colume data with columnDataGeneratorParams
      const curColumnData = generator
        ? generator.generator.apply(this, columnDataGeneratorParams)
        : '';
      // set picker column data & refresh picker
      if (this.picker.current) {
        isSetColumn && this.picker.current.setColumnValues(i, curColumnData);
      }

      // store column date
      this.columnData[i] = curColumnData;
      this.setPickerColumnState();
    }
    // isSetColumn && this.picker.current.refresh(null, columnIndex);
  }

  private initColumnDataGenerator () {
    const defaultDate = this.getDefaultDate();
    switch (this.props.type) {
      case 'date':
        this.initColumnDataGeneratorForDate(defaultDate);
        break;
      case 'time':
        this.initColumnDataGeneratorForTime(defaultDate);
        break;
      case 'datetime':
        this.initColumnDataGeneratorForDate(defaultDate);
        this.initColumnDataGeneratorForTime(defaultDate);
        break;
      default:
        this.initColumnDataGeneratorForCustom(defaultDate);
        break;
    }
  }

  private initColumnDataGeneratorForDate (defaultDate?: Date) {
    this.columnDataGenerator = this.columnDataGenerator.concat([
      { generator: this.generateYearData, type: 'Year' },
      { generator: this.generateMonthData, type: 'Month' },
      { generator: this.generateDateData, type: 'Date' },
    ]);

    this.columnDataDefault = defaultDate
      ? this.columnDataDefault.concat([
          defaultDate.getFullYear(),
          defaultDate.getMonth() + 1,
          defaultDate.getDate(),
        ])
      : [];
  }

  private initColumnDataGeneratorForTime (defaultDate?: Date) {
    this.columnDataGenerator = this.columnDataGenerator.concat([
      { generator: this.generateHourData, type: 'Hour' },
      { generator: this.generateMinuteData, type: 'Minute' },
    ]);
    this.columnDataDefault = defaultDate
      ? this.columnDataDefault.concat([
          defaultDate.getHours(),
          defaultDate.getMinutes(),
        ])
      : [];
  }

  private initColumnDataGeneratorForCustom (defaultDate?: Date) {
    this.props.customTypes!.forEach((type: string) => {
      type = TYPE_FORMAT[type] || type;
      this.columnDataGenerator.push({
        // @ts-ignore
        generator: this[`generate${type}Data`],
        type,
      });

      if (defaultDate) {
        // @ts-ignore defaultDate['getFullYear']()
        let value = defaultDate[TYPE_METHODS[type]]();

        if (type === 'Month') {
          value += 1;
        }

        this.columnDataDefault.push(value);
      }
    });
  }

  private getDefaultDate (): Date | undefined {
    const defaultDate = this.props.defaultDate;
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;
    if (!defaultDate) {
      return defaultDate;
    }

    if (minDate && defaultDate.getTime() < minDate.getTime()) {
      return minDate;
    }

    if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
      return maxDate;
    }

    return defaultDate;
  }

  private getGeneratorArguments (
    args: Array<{ type: string; value: number }>
  ): { [key: string]: number } {
    const defaultArguments: { [key: string]: number } = {
      Year: this.currentYear(),
      Month: this.currentMonth(),
      Date: this.currentDate(),
      Hour: this.currentHours(),
      Minute: this.currentMinutes(),
    };
    args.map((item) => {
      defaultArguments[item.type] = item.value;
    });
    return defaultArguments;
  }

  private generateYearData () {
    const start = this.props.minDate
      ? this.props.minDate.getFullYear()
      : this.currentYear() - 20;
    const end = this.props.maxDate
      ? this.props.maxDate.getFullYear()
      : this.currentYear() + 20;
    if (start > end) {
      // warn('MinDate Year should be earlier than MaxDate');
      return;
    }
    return this.generateData(start, end, 'Year', this.props.unitText![0], 1);
  }

  private generateMonthData () {
    // @ts-ignore
    const args = this.getGeneratorArguments(toArray(arguments));
    let start;
    let end;
    if (
      this.props.minDate &&
      this.isDateTimeEqual(this.props.minDate, args.Year)
    ) {
      start = this.props.minDate.getMonth() + 1;
    } else {
      start = 1;
    }

    if (
      this.props.maxDate &&
      this.isDateTimeEqual(this.props.maxDate, args.Year)
    ) {
      end = this.props.maxDate.getMonth() + 1;
    } else {
      end = 12;
    }
    return this.generateData(
      start,
      end,
      'Month',
      this.props.unitText![1] || '',
      1,
      arguments
    );
  }

  private generateDateData () {
    // @ts-ignore
    const args = this.getGeneratorArguments(toArray(arguments));

    let start;
    let end;

    if (
      this.props.minDate &&
      this.isDateTimeEqual(this.props.minDate, args.Year, args.Month)
    ) {
      start = this.props.minDate.getDate();
    } else {
      start = 1;
    }

    if (
      this.props.maxDate &&
      this.isDateTimeEqual(this.props.maxDate, args.Year, args.Month)
    ) {
      end = this.props.maxDate.getDate();
    } else {
      end = new Date(args.Year, args.Month, 0).getDate();
    }

    const dateData = this.generateData(
      start,
      end,
      'Date',
      this.props.unitText![2] || '',
      1,
      arguments
    );

    if (
      this.isDateTimeEqual(this.currentDateIns, args.Year, args.Month) &&
      this.currentDate() >= start &&
      this.currentDate() <= end &&
      this.props.todayText
    ) {
      const currentDateIndex = this.currentDate() - start;
      const currentDate = dateData[currentDateIndex].text;
      dateData[currentDateIndex].text = this.props.todayText.replace(
        '&',
        currentDate
      );
    }

    return dateData;
  }

  private generateHourData () {
    // @ts-ignore
    const args = this.getGeneratorArguments(toArray(arguments));
    let start;
    let end;

    if (
      this.props.minDate &&
      this.isDateTimeEqual(this.props.minDate, args.Year, args.Month, args.Date)
    ) {
      start = this.props.minDate.getHours();
    } else {
      start = 0;
    }

    if (
      this.props.maxDate &&
      this.isDateTimeEqual(this.props.maxDate, args.Year, args.Month, args.Date)
    ) {
      end = this.props.maxDate.getHours();
    } else {
      end = 23;
    }

    if (end < start) {
      end = 23;
    }

    if (start > end) {
      // warn('MinDate Hour should be earlier than MaxDate');
      return;
    }

    return this.generateData(
      start,
      end,
      'Hour',
      this.props.unitText![3] || '',
      1,
      arguments
    );
  }

  private generateMinuteData () {
    // @ts-ignore
    const args = this.getGeneratorArguments(toArray(arguments));
    let start;
    let end;

    if (
      this.props.minDate &&
      this.isDateTimeEqual(
        this.props.minDate,
        args.Year,
        args.Month,
        args.Date,
        args.Hour
      )
    ) {
      start = this.props.minDate.getMinutes();
    } else {
      start = 0;
    }

    if (
      this.props.maxDate &&
      this.isDateTimeEqual(
        this.props.maxDate,
        args.Year,
        args.Month,
        args.Date,
        args.Hour
      )
    ) {
      end = this.props.maxDate.getMinutes();
    } else {
      end = 59;
    }

    return this.generateData(
      start,
      end,
      'Minute',
      this.props.unitText![4] || '',
      this.props.minuteStep,
      arguments
    );
  }

  private generateData (
    from: number,
    to: number,
    type: string,
    unit: string,
    step = 1,
    args: any = []
  ) {
    let count = from;
    let text;
    const data = [];
    const defaultArgs = toArray(args).map((item) => {
      return typeof item === 'object' ? item.value : item;
    });

    while (count <= to) {
      if (this.props.textRender) {
        // @ts-ignore
        text = this.props.textRender.apply(this, [
          TYPE_FORMAT_INVERSE[type],
          ...defaultArgs,
          count,
        ]);
      }

      data.push({
        text: text || `${count}${unit}`,
        value: count,
        typeFormat: TYPE_FORMAT_INVERSE[type] || type,
        type,
      });
      count += step;
    }
    return data;
  }

  /**
   * Determine whether year, month, date, etc of
   * the current date are equal to the given value
   * @params Date
   * @params year, month, date ...
   */
  private isDateTimeEqual (date?: Date, ...args: number[]) {
    const methods = Object.keys(TYPE_METHODS).map((key: string) => {
      return TYPE_METHODS[key];
    });
    let res = true;
    if (!date) {
      return (res = false);
    }

    for (let i = 0; i < args.length; i++) {
      const methodName = methods[i];
      // @ts-ignore date['getFullYear']()
      const curVal = date[methodName]() + Number(methodName === 'getMonth');
      const targetVal = +args[i];

      if (curVal !== targetVal) {
        res = false;
        break;
      }
    }
    return res;
  }

  private transHourTo12 (hour: number) {
    if (hour < 12) {
      return {
        hour,
        ap: 0, // 0 a.m, 1 p.m
      };
    } else {
      return {
        hour: hour - 12,
        ap: 1, // 0 a.m, 1 p.m
      };
    }
  }

  // MARK: events handler
  private onPickerShow () {
    this.oldColumnData = [...this.state.columnData];
    // this.setState({
    //   oldColumnData,
    // });
    this.props.onShow && this.props.onShow();
  }

  private onPickerHide () {
    this.props.onHide && this.props.onHide();
  }

  private onPickerChange (columnIndex: number, itemIndex: any, value: any) {
    this.props.onChange && this.props.onChange(columnIndex, itemIndex, value);

    if (columnIndex < this.state.columnData.length - 1) {
      this.initColumnData(columnIndex + 1);
    }
  }

  private onPickerConfirm (columnsValue: any) {
    this.props.onConfirm && this.props.onConfirm(columnsValue);
  }

  private onPickerCancel () {
    this.props.onCancel && this.props.onCancel();
    if (this.oldColumnData) {
      this.columnData = [...this.oldColumnData];
      this.setState({
        columnData: this.columnData,
      });
    }
  }
}
