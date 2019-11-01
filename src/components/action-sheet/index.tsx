import * as React from 'react';
import { Text, TextStyle } from 'react-native';
import base from '../../_styles/themes/default.basic';
import MDBaseSelector from '../selector/base-selector';
import { IMDOptionItemStyle, MDOptionItemStyles } from './option-item';
import IActionOptionSet from './option-model';

export interface IMDActionOptionSet extends IActionOptionSet {
  temp?: string; // 无任何作用，保留
}

export interface IMDActionSheetProps {
  styles?: IMDActionSheetStyle;
  title?: string;
  options: IMDActionOptionSet[];
  isVisible?: boolean;
  cancelText?: string;
  defaultIndex?: number;
  onChoose?: (index: number, data: IMDActionOptionSet) => void;
  onCancle?: () => void;
}

interface IMDActionSheetState {
  isVisible: boolean;
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
  IMDActionSheetProps,
  IMDActionSheetState
> {
  public static defaultProps = {
    styles: MDActionSheetStyles,
    cancelText: '取消', // ActionSheet的取消位选项位于item底部
  };

  constructor (props: IMDActionSheetProps) {
    super(props);
    this.state = {
      isVisible: props.isVisible!,
    };
  }

  public componentWillReceiveProps (nextProps: IMDActionSheetProps) {
    this.setState({
      isVisible: nextProps.isVisible!,
    });
  }

  public render () {
    const { styles, cancelText, onCancle, options, title } = this.props;
    const cancleView = this.renderCancleItem(styles!, cancelText!, onCancle);
    return (
      <MDBaseSelector
        {...this.props}
        isVisible={this.state.isVisible}
        showTitle={title!.length > 0}
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
