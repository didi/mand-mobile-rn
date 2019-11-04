import * as React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { check } from '../../_styles/themes/default.components';
import MDCellItem, { MDCellItemStyles } from '../cell-item';
import MDIcon from '../icon';

import { IMDOptionSet, IMDOptionValue } from '../types';

export interface IMDCheckListProps {
  styles?: IMDCheckListStyle;
  options?: IMDOptionSet[];
  defaultValues?: IMDOptionValue[];
  alignCenter?: boolean;
  onChange?: (values?: IMDOptionValue[]) => void;
}

export interface IMDCheckListState {
  values: IMDOptionValue[];
}

export interface IMDCheckListStyle {
  wrapper?: ViewStyle;
  icon?: TextStyle;
}

export const MDCheckListStyles: IMDCheckListStyle = {
  wrapper: {
    justifyContent: 'center',
  },
  icon: {
    color: check.color,
  },
};

const styles = StyleSheet.create<IMDCheckListStyle>(MDCheckListStyles);

export default class MDCheckList extends React.Component<
  IMDCheckListProps,
  IMDCheckListState
> {
  public static defaultProps = {
    styles,
    options: [],
  };

  constructor (props: IMDCheckListProps) {
    super(props);
    this.state = {
      values: [],
    };

    this.onItemPressed = this.onItemPressed.bind(this);
  }

  public render () {
    const { alignCenter, options } = this.props;
    const _styles = this.props.styles || {};
    if (!options || options.length < 1) {
      return null;
    }

    const _items = this.renderCellItems(options, !!alignCenter, _styles);

    return <View style={_styles.wrapper}>{_items}</View>;
  }

  private renderCellItems (
    options: IMDOptionSet[],
    alignCenter: boolean,
    _styles: IMDCheckListStyle
  ) {
    let _cellItemStyle = MDCellItemStyles;
    if (alignCenter) {
      _cellItemStyle = Object.assign({}, MDCellItemStyles, {
        title: {
          textAlign: 'center',
        },
      });
    }
    const _iconStyle = [_styles.icon];
    const _items: React.ReactNode[] =
      options &&
      options.map((option: any, index: number) => {
        const _icon =
          !alignCenter && this.state.values.indexOf(option.value) !== -1 ? (
            <MDIcon
              style={_iconStyle as TextStyle[]}
              name='right'
              size='medium'
            />
          ) : null;

        return (
          <MDCellItem
            styles={_cellItemStyle}
            key={index}
            title={option.label}
            disabled={option.disabled}
            onPress={this.onItemPressed.bind(this, option, index)}
            right={_icon}
          />
        );
      });
    return _items;
  }

  private setValues (value: any) {
    let _values = this.state.values;
    const index = _values.indexOf(value);
    if (index === -1) {
      _values = _values.concat(value);
    } else {
      _values = _values.slice(0, index).concat(_values.slice(index + 1));
    }

    this.setState({
      values: _values,
    });

    this.props.onChange && this.props.onChange(_values);
  }

  private onItemPressed (option: IMDOptionSet, index: number) {
    this.setValues(option.value);
  }
}
