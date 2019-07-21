import React from 'react';
import { Text, TextStyle } from 'react-native';
import base from '../../_styles/themes/default.basic';
import MDBaseSelector from '../selector/base-selector';
import { IMDOptionItemStyle, MDOptionItemStyles } from './option-item';
import IActionOptionSet from './option-model';

export interface IMDActionSheetProps {
  styles?: IMDActionSheetStyle;
  title?: string;
  options: IActionOptionSet[];
  isVisible?: boolean;
  cancelText?: string;
  defaultIndex?: number;
  onChoose?: (index: number, data: IActionOptionSet) => void;
  onCancle?: () => void;
}
export interface IMDActionSheetStyle extends IMDOptionItemStyle {
  itemCancle: TextStyle;
}

export const MDActionSheetStyles = {
  itemCancle: {
    marginTop: base.gapSize.vLarge,
    textAlign: 'center',
    backgroundColor: base.colors.bg,
    fontSize: base.fontSize.captionNormal,
    color: base.colors.textMinor,
  },
  ...MDOptionItemStyles,
};
export default class MDActionSheet extends React.Component<
  IMDActionSheetProps
> {
  public static defaultProps = {
    styles: MDActionSheetStyles,
    cancelText: '取消', // ActionSheet的取消位选项位于item底部
  };
  public render () {
    const { styles, cancelText, onCancle, options } = this.props;
    const cancleView = this.renderCancleItem(styles!, cancelText!, onCancle);
    return (
      <MDBaseSelector
        {...this.props}
        options={options}
        cancelText={''}
        okText={''}
        cancleItem={cancleView}
        callBackImmediately={true}
      />
    );
  }

  private renderCancleItem (
    styles: IMDActionSheetStyle,
    cancelText: string,
    onCancle: any
  ) {
    return (
      <Text
        key={100}
        style={styles.itemCancle}
        onPress={() => {
          if (onCancle) {
            onCancle();
          }
        }}
      >
        {cancelText}
      </Text>
    );
  }
}
