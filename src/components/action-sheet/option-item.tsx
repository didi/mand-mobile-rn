import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { MDIcon } from '../icon/icon';
import OptionModel from './option-model';

interface IMDOptionItemProps {
  styles?: IMDOptionItemStyle;
  type: string;
  data: OptionModel;
  checked: boolean;
  disabled: boolean;
  icon: MDIcon;
  iconPosition?: string;
  onItemPress?: () => void;
}

export interface IMDOptionItemStyle {
  itemWrapper?: ViewStyle;
  item?: TextStyle;
  itemInverse?: TextStyle;
  itemDisabled?: TextStyle;
  itemDescribe?: TextStyle;
}

export const MDOptionItemStyles: IMDOptionItemStyle = {
  itemWrapper: {
    marginLeft: base.gapSize.hLarge,
    marginRight: base.gapSize.hLarge,
    paddingTop: base.gapSize.vLarge,
    paddingBottom: base.gapSize.vLarge,
    backgroundColor: base.colors.bg,
    borderBottomWidth: base.borderWidth.base,
    borderBottomColor: base.colors.borderBase,
    justifyContent: 'center',
  },
  item: {
    textAlign: 'center',
    fontSize: base.fontSize.captionNormal,
    color: base.colors.textBody,
  },
  itemInverse: {
    textAlign: 'center',
    fontSize: base.fontSize.captionNormal,
    color: base.colors.textHighlight,
  },
  itemDisabled: {
    textAlign: 'center',
    fontSize: base.fontSize.captionNormal,
    color: base.colors.textDisabled,
  },
  itemDescribe: {
    paddingTop: base.gapSize.vMid,
    textAlign: 'center',
    fontSize: base.fontSize.bodyLarge,
    color: base.colors.textCaption,
  },
};

const itemStyles = StyleSheet.create<IMDOptionItemStyle>(MDOptionItemStyles);
export default class MDOptionItem extends React.Component<IMDOptionItemProps> {
  public static defaultProps = {
    styles: itemStyles,
  };
  constructor (props: IMDOptionItemProps) {
    super(props);
  }

  public render () {
    const type = this.props.type;
    if (type === 'default' || type === 'confirm') {
      return this.renderCommon(this.props);
    } else if (type === 'check') {
      return this.renderCheckMode(this.props);
    }
  }

  private renderCommon (props: IMDOptionItemProps) {
    const styles = props.styles || {};
    const { type, data } = props;
    const showDescribe = type === 'confirm' && data.optionDescribe;
    const describe = showDescribe ? (
      <Text
        style={[
          styles.itemDescribe,
          {
            color: props.disabled
              ? styles.itemDisabled!.color
              : styles.itemDescribe!.color,
          },
        ]}
      >
        {props.data.optionDescribe}
      </Text>
    ) : null;

    return (
      <TouchableWithoutFeedback
        onPress={props.disabled ? () => {} : this.props.onItemPress}
      >
        <View style={styles.itemWrapper}>
          <Text
            style={
              props.disabled
                ? styles.itemDisabled
                : props.checked
                ? styles.itemInverse
                : styles.item
            }
          >
            {props.data.optionContent}
          </Text>
          {describe}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private renderCheckMode (props: IMDOptionItemProps) {
    const { icon, iconPosition } = props;
    const styles = props.styles || {};
    const text = (
      <Text
        style={
          props.disabled
            ? styles.itemDisabled
            : props.checked
            ? styles.itemInverse
            : styles.item
        }
      >
        {props.data.optionContent}
      </Text>
    );

    return (
      <TouchableWithoutFeedback
        onPress={props.disabled ? () => {} : this.props.onItemPress}
      >
        <View
          style={[
            styles.itemWrapper,
            { flexDirection: 'row' },
            { justifyContent: 'space-between' },
          ]}
        >
          {iconPosition === 'right' ? text : icon}
          {iconPosition === 'right' ? icon : text}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
