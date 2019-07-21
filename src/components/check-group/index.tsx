import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type MDCheckGroupValues = Array<boolean | string | number>;

export interface IMDCheckGroupProps {
  style?: ViewStyle;
  defaultValues?: MDCheckGroupValues;
  children?: ReactNode;
  onChange?: (values?: MDCheckGroupValues) => void;
}

export interface IMDCheckGroupState {
  values: MDCheckGroupValues;
}

export default class MDCheckGroup extends React.Component<
  IMDCheckGroupProps,
  IMDCheckGroupState
> {
  constructor (props: IMDCheckGroupProps) {
    super(props);

    this.onCheckItemPress = this.onCheckItemPress.bind(this);
    const _values = props.defaultValues || [];
    this.state = {
      values: _values,
    };
  }

  public render () {
    const { style, children } = this.props;
    return (
      <View
        style={[
          {
            justifyContent: 'center',
          },
          style,
        ]}
      >
        {this.addOnPressToCheckItem(children, this.state.values)}
      </View>
    );
  }

  public check (value: boolean | string | number) {
    this.setValues(value, true);
  }

  public uncheck (value: boolean | string | number) {
    this.setValues(value, false);
  }

  public toggle (value: boolean | string | number) {
    this.setValues(value);
  }

  private addOnPressToCheckItem (children: any, values: any): ReactNode {
    if (React.Children.count(children) < 1) {
      return null;
    }

    return React.Children.map(children, (child: any) => {
      if (child.type) {
        // 有 type 属性，代表是一个 ReactNode
        if (child.type.name === 'MDCheck' || child.type.name === 'MDCheckBox') {
          let _onChange = this.onCheckItemPress;
          if (child.props.onChange) {
            _onChange = (checked: any, value: any) => {
              child.props.onChange(checked, value);
              this.onCheckItemPress(checked, value);
            };
          }

          return React.cloneElement(child, {
            onChange: _onChange,
            checked: child.props && values.indexOf(child.props.value) > -1,
            key: child.key || child.props.value || Math.random(),
          });
        }
        if (child.props.children) {
          return React.cloneElement(child, {
            children: this.addOnPressToCheckItem(child.props.children, values),
          });
        }
        return child;
      }
      return child;
    });
  }

  private setValues (value: any, checked?: boolean) {
    let _values = this.state.values;
    const index = _values.indexOf(value);
    if (index === -1) {
      if (checked === true || typeof checked === 'undefined') {
        _values = _values.concat(value);
      }
    } else {
      if (checked === false || typeof checked === 'undefined') {
        _values = _values.slice(0, index).concat(_values.slice(index + 1));
      }
    }

    this.setState({
      values: _values,
    });

    this.props.onChange && this.props.onChange(_values);
  }

  private onCheckItemPress (checked: boolean, value: any) {
    this.setValues(value, checked);
  }
}
