import React, { ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { dialog } from '../../_styles/themes/default.components';
import { scaleSize } from '../../_styles/themes/responsive';
import MDIcon from '../icon/index';
import MDPopup from '../popup/index';

export interface IMDDialogBtnModel {
  color?: string;
  text: string;
  handle: () => void;
}

export interface IMDDialogProps {
  styles?: IMDDialogStyle;
  isVisible: boolean;
  closeable?: boolean;
  icon?: ReactNode;
  iconColor?: string;
  title?: string;
  context: string;
  btns: IMDDialogBtnModel[];
}

interface IMDDialogState {
  isVisible: boolean;
}

export interface IMDDialogStyle {
  container?: ViewStyle;
  body?: ViewStyle;
  close?: ViewStyle;
  icon?: ViewStyle;
  title?: TextStyle;
  context?: TextStyle;
  footer?: ViewStyle;
  action?: ViewStyle;
  actionTitle?: TextStyle;
}

const IMDDialogStyles: IMDDialogStyle = {
  container: {
    display: 'flex',
    width: dialog.width,
    borderRadius: dialog.radius,
    backgroundColor: '#fff',
  },
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  close: {
    display: 'flex',
    position: 'absolute',
    marginTop: 15,
    marginLeft: dialog.width - 20 - dialog.closeWidth,
    zIndex: 15,
  },
  icon: {
    position: 'relative',
    marginBottom: 20,
  },
  title: {
    position: 'relative',
    color: dialog.titleColor,
    fontSize: dialog.titleFontSize,
    textAlign: 'center',
    marginBottom: 15,
  },
  context: {
    position: 'relative',
    maxWidth: '100%',
    textAlign: 'left',
    color: dialog.textColor,
    fontSize: dialog.textFontSize,
    lineHeight: dialog.textFontSize + 5,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  action: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    position: 'relative',
    height: scaleSize(100),
    minWidth: dialog.width / 2,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: dialog.borderColor,
  },
  actionTitle: {
    position: 'relative',
    fontSize: dialog.actionFontSize,
    textAlign: 'center',
    fontWeight: 'bold',
    color: dialog.actionColor,
  },
};

const styles = StyleSheet.create<IMDDialogStyle>(IMDDialogStyles);

export default class Dialog extends React.Component<
  IMDDialogProps,
  IMDDialogState
> {
  public static defaultProps = {
    styles,
  };

  constructor (props: IMDDialogProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  public componentDidMount () {
    if (this.props.isVisible) {
      this.visible(true);
    }
  }

  public componentWillReceiveProps (nextProps: IMDDialogProps) {
    if (nextProps.isVisible) {
      this.visible(true);
    }
  }

  public render () {
    const _styles = this.props.styles || {};
    return (
      <MDPopup
        position={'center'}
        transition={'zoom'}
        isVisible={this.state.isVisible}
        maskClosable={false}
      >
        <View style={_styles.container}>
          {this.showClose()}
          <View style={_styles.body}>
            {this.showTitle()}
            {this.props.context ? (
              <Text style={_styles.context}>{this.props.context}</Text>
            ) : null}
          </View>
          <View
            style={[
              _styles.footer,
              { flexDirection: this.props.btns.length > 2 ? 'column' : 'row' },
            ]}
          >
            {this.showAction()}
          </View>
        </View>
      </MDPopup>
    );
  }

  private showClose () {
    if (this.props.closeable) {
      return (
        <TouchableOpacity
          style={this.props.styles!.close}
          onPress={() => this.close()}
        >
          <MDIcon name='close' color={dialog.iconFill} />
        </TouchableOpacity>
      );
    }
  }

  private showTitle () {
    const { icon, iconColor, title } = this.props;
    let _icon = icon;
    if (typeof _icon === 'string') {
      _icon = <MDIcon name={_icon} color={iconColor} size={dialog.iconSize} />;
    }

    return (
      <View>
        {icon ? <View style={this.props.styles!.icon}>{_icon}</View> : null}
        {title ? <Text style={this.props.styles!.title}>{title}</Text> : null}
      </View>
    );
  }

  private showAction () {
    const items: ReactNode[] = [];
    if (this.props.btns && this.props.btns.length > 0) {
      this.props.btns.map((item: IMDDialogBtnModel, index: number) => {
        const action = this.getActionStyle(index);
        const actionTitle = this.getActionTitleStyle(item, index);
        items.push(
          <TouchableHighlight
            key={index}
            style={action}
            underlayColor='#fff'
            onPress={this.onPress.bind(this, item)}
          >
            <Text style={actionTitle}>{item.text || null}</Text>
          </TouchableHighlight>
        );
      });
    }

    return items;
  }

  private getActionStyle (index: number) {
    const action = [this.props.styles!.action];
    if (this.props.btns && this.props.btns.length === 2 && index !== 1) {
      action.push({
        borderRightWidth: 1,
      });
    }
    return action;
  }

  private getActionTitleStyle (item: IMDDialogBtnModel, index: number) {
    const actionTitle = [this.props.styles!.actionTitle];
    const count: number = this.props.btns.length;
    switch (count) {
      case 1:
        actionTitle.push({
          color: item.color || dialog.actionHightColor,
        });
        break;
      case 2:
        if (index === 1) {
          actionTitle.push({
            color: item.color || dialog.actionHightColor,
          });
        } else if (item.color) {
          actionTitle.push({
            color: item.color,
          });
        }
        break;
      default:
        if (index === 0) {
          actionTitle.push({
            color: item.color || dialog.actionHightColor,
          });
        } else if (item.color) {
          actionTitle.push({
            color: item.color,
          });
        }
        break;
    }
    return actionTitle;
  }

  private visible (isVisible: boolean) {
    this.setState({
      isVisible,
    });
  }

  private close () {
    this.visible(false);
  }

  private onPress (btn: IMDDialogBtnModel) {
    if (typeof btn.handle === 'function') {
      btn.handle();
    }
    this.close();
  }
}
