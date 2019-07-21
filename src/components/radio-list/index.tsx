import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { check } from '../../_styles/themes/default.components';
import MDCellItem, { IMDCellItemStyle, MDCellItemStyles } from '../cell-item';
import MDIcon from '../icon';
import MDInputItem from '../input-item';
import { IMDOptionSet, IMDOptionValue } from '../types';

interface IMDRadioListProps {
  style?: ViewStyle | ViewStyle[];
  options?: IMDOptionSet[];
  defaultValue?: IMDOptionValue;
  hasInput?: boolean;
  inputLabel?: string;
  inputPlaceHolder?: string;
  alignCenter?: boolean;
  optionRender?: (option: IMDOptionSet) => ReactNode;
  onChange?: (value: IMDOptionValue, index: number) => void;

  icon?: ReactNode;
  iconInverse?: ReactNode;
  iconDisabled?: ReactNode;
  iconPosition?: 'left' | 'right';
}

interface IMDRadioListState {
  value: any;
  inputText: string;
}

export default class MDRadioList extends React.Component<
  IMDRadioListProps,
  IMDRadioListState
> {
  public static defaultProps = {
    options: [],
    hasInput: false,
    inputLabel: '',
    inputPlaceholder: '',
    alignCenter: false,
    icon: <MDIcon name='checked' color={check.color} size='medium' />,
    iconInverse: <MDIcon name='check' color={check.color} size='medium' />,
    iconDisabled: (
      <MDIcon name='check-disabled' color={check.disabledColor} size='medium' />
    ),
    iconPosition: 'left',
  };

  constructor (props: IMDRadioListProps) {
    super(props);
    this.state = {
      value: props.defaultValue,
      inputText: '',
    };

    this.onItemPressed = this.onItemPressed.bind(this);
  }

  public componentWillReceiveProps (nextProps: IMDRadioListProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        value: nextProps.defaultValue,
      });
    }
  }

  public render () {
    const _items = this.renderOptionItems();

    return (
      <View style={[{ justifyContent: 'center' }, this.props.style]}>
        {_items}
      </View>
    );
  }

  // MARK: public methods
  public select (value: IMDOptionValue) {
    this.setState({
      value,
    });
  }

  public selectByIndex (index: number) {
    const { options } = this.props;
    if (options) {
      const item = options[index];
      if (item) {
        this.select(item.value);
      }
    }
  }

  private renderOptionItems () {
    const {
      alignCenter,
      hasInput,
      optionRender,
      icon,
      iconInverse,
      iconDisabled,
      iconPosition,
      options,
    } = this.props;

    if (!options) {
      return null;
    }

    let _cellItemStyle = MDCellItemStyles;
    if (alignCenter) {
      _cellItemStyle = Object.assign({}, MDCellItemStyles, {
        title: {
          textAlign: 'center',
        },
      });
    }

    const _items: ReactNode[] =
      options &&
      options.map((option: any, index: number) => {
        let _icon = !!alignCenter
          ? null
          : option.disabled
          ? iconDisabled
          : option.value === this.state.value
          ? icon
          : iconInverse;

        if (typeof _icon === 'string') {
          _icon = (
            <MDIcon
              name={_icon}
              color={!option.disabled ? check.color : check.disabledColor}
              size='medium'
            />
          );
        }

        return (
          <MDCellItem
            styles={_cellItemStyle}
            key={index}
            title={option.label}
            brief={option.brief}
            disabled={option.disabled}
            onPress={this.onItemPressed.bind(this, option, index)}
            right={iconPosition === 'right' ? _icon : null}
            left={iconPosition === 'left' ? _icon : null}
          >
            {optionRender && optionRender(option)}
          </MDCellItem>
        );
      });

    if (hasInput) {
      const _inputItem = this.renderInputItem(_cellItemStyle);
      _items.push(_inputItem);
    }

    return _items;
  }

  private renderInputItem (cellItemStyle: IMDCellItemStyle) {
    const { options, inputLabel, inputPlaceHolder } = this.props;
    const _key = options!.length;

    return (
      <MDCellItem styles={cellItemStyle} key={_key} title={inputLabel || ''}>
        <MDInputItem
          onFocus={this.onItemPressed.bind(
            this,
            { value: this.state.inputText, label: inputLabel || '' },
            _key
          )}
          onChangeText={this.onInputChange.bind(this)}
          placeholder={inputPlaceHolder}
        />
      </MDCellItem>
    );
  }

  private onInputChange (name: string | undefined, text: string) {
    const { options, onChange } = this.props;
    const index = options!.length;
    this.setState({
      inputText: text,
    });
    onChange && onChange(text, index);
  }

  private onItemPressed (option: IMDOptionSet, index: number) {
    this.setState({
      value: option.value,
    });
    this.props.onChange && this.props.onChange(option.value, index);
  }
}
