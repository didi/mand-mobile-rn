import React, { createRef, ReactNode } from 'react';
import {
  findNodeHandle,
  MeasureOnSuccessCallback,
  NativeModules,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import { tip as TipBase } from '../../_styles/themes/default.components';
import guid from '../../_utils/guid';
import MDIcon from '../icon';
import RootView from '../root-view';

export interface IMDTipProps {
  styles?: IMDTipStyle;
  content: string | number;
  placement?: string;
  icon?: ReactNode;
  offset?: IMDOffset;
  fill?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

interface IMDOffset {
  left?: number;
  top?: number;
}

interface IMDTipState {
  visible?: boolean;
  eleAnchor?: any;
  tipAnchor?: any;
  tipGuid?: string;
}

interface IMDTipStyle {
  contentText?: TextStyle;
  tip?: ViewStyle;
  tipBg?: ViewStyle;
  tipArrow?: ViewStyle;
  arrowBottom?: ViewStyle;
  arrowLeft?: ViewStyle;
  arrowRight?: ViewStyle;
  tipsContent?: ViewStyle;
  iconClose?: ViewStyle;
  closeText?: TextStyle;
}

export const MDTipStyles: IMDTipStyle = {
  tip: {
    position: 'absolute',
    zIndex: TipBase.zIndex,
    display: 'flex',
  },
  tipBg: {
    position: 'absolute',
    borderRadius: TipBase.borderRadius,
    backgroundColor: TipBase.fill,
    opacity: TipBase.fillOpacity,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tipArrow: {
    position: 'absolute',
    left: '50%',
    bottom: TipBase.bottom,
    marginLeft: TipBase.marginLeft,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: TipBase.borderWidthL,
    borderRightWidth: TipBase.borderWidthR,
    borderBottomWidth: 0,
    borderLeftWidth: TipBase.borderWidthR,
    borderTopColor: TipBase.fill,
    borderRightColor: TipBase.tipTransp,
    borderBottomColor: TipBase.tipTransp,
    borderLeftColor: TipBase.tipTransp,
  },
  arrowBottom: {
    bottom: 'auto',
    top: TipBase.bottom,
    borderTopWidth: 0,
    borderRightWidth: TipBase.borderWidthR,
    borderBottomWidth: TipBase.borderWidthL,
    borderLeftWidth: TipBase.borderWidthR,
    borderTopColor: TipBase.tipTransp,
    borderRightColor: TipBase.tipTransp,
    borderBottomColor: TipBase.fill,
    borderLeftColor: TipBase.tipTransp,
  },
  arrowLeft: {
    bottom: 'auto',
    right: TipBase.right,
    left: 'auto',
    top: '50%',
    marginLeft: 0,
    marginTop: TipBase.marginLeft,
    borderTopWidth: TipBase.borderWidthR,
    borderRightWidth: 0,
    borderBottomWidth: TipBase.borderWidthR,
    borderLeftWidth: TipBase.borderWidthL,
    borderTopColor: TipBase.tipTransp,
    borderRightColor: TipBase.tipTransp,
    borderBottomColor: TipBase.tipTransp,
    borderLeftColor: TipBase.fill,
    zIndex: 999,
  },
  arrowRight: {
    bottom: 'auto',
    left: TipBase.right,
    top: '50%',
    marginLeft: 0,
    marginTop: TipBase.marginLeft,
    borderTopWidth: TipBase.borderWidthR,
    borderRightWidth: TipBase.borderWidthL,
    borderBottomWidth: TipBase.borderWidthR,
    borderLeftWidth: 0,
    borderTopColor: TipBase.tipTransp,
    borderRightColor: TipBase.fill,
    borderBottomColor: TipBase.tipTransp,
    borderLeftColor: TipBase.tipTransp,
  },
  contentText: {
    fontSize: TipBase.fontSize,
    color: TipBase.color,
    lineHeight: 14,
    marginTop: TipBase.marginTop,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsContent: {
    position: 'relative',
    paddingTop: TipBase.paddingVertical,
    paddingRight: TipBase.paddingHorizontal2,
    paddingBottom: TipBase.paddingVertical,
    paddingLeft: TipBase.paddingHorizontal,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  iconClose: {
    position: 'absolute',
    right: TipBase.closeRight,
    top: '50%',
    width: TipBase.closeSize,
    height: TipBase.closeSize,
  },
  closeText: {
    fontSize: TipBase.fontSize,
    color: TipBase.color,
  },
};

const styles = StyleSheet.create<IMDTipStyle>(MDTipStyles);

export default class MDTip extends React.Component<IMDTipProps, IMDTipState> {
  public static defaultProps = {
    styles,
    placement: 'top',
    fill: false,
    offset: {},
  };

  constructor (props: IMDTipProps) {
    super(props);
    this.state = {
      visible: false,
      eleAnchor: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      tipAnchor: {
        width: 0,
        height: 0,
      },
      tipGuid: '',
    };
  }
  private touchable = createRef<View>();
  public componentWillUnmount () {
    RootView.removeAll();
  }
  public render () {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onHandlePress.bind(this)}>
          <View ref={this.touchable}>{this.props.children}</View>
        </TouchableWithoutFeedback>
        {this.state.visible ? this.renderTip() : null}
      </View>
    );
  }
  private onClose (_guid: any) {
    const { onHide } = this.props;
    if (_guid) {
      RootView.remove(_guid);
    }
    this.setState(
      {
        visible: false,
      },
      () => {
        onHide && onHide();
      }
    );
  }

  private onHandlePress () {
    if (this.state.visible) {
      return;
    }
    const handle = findNodeHandle(this.touchable.current);
    if (handle) {
      NativeModules.UIManager.measure(handle, this.onTouchableMeasured);
    }
  }
  private onTouchableMeasured: MeasureOnSuccessCallback = (
    x0,
    y0,
    width,
    height,
    x,
    y
  ) => {
    const { onShow } = this.props;
    const tipGuid = `TIPELE${guid()}`; // generator only guid
    this.setState(
      {
        visible: true,
        eleAnchor: { x, y, width, height },
        tipGuid,
      },
      () => {
        onShow && onShow();
      }
    );
    return;
  }
  private onTipMeasured: MeasureOnSuccessCallback = (width, height) => {
    this.setState({
      tipAnchor: {
        width,
        height,
      },
    });
  }
  private getPosition () {
    const {
      eleAnchor: { x, y, width, height },
      tipAnchor,
    } = this.state;
    const { fill, offset, placement } = this.props;
    const offsetLeft = offset && offset.left ? offset.left : 0;
    const offsetTop = offset && offset.top ? offset.top : 0;
    let tipWidth = tipAnchor.width;
    let tipHeight = tipAnchor.height;
    let left;
    let top;
    if (fill && (placement === 'top' || placement === 'bottom')) {
      tipWidth = width + TipBase.bottom;
    }
    if (fill && (placement === 'left' || placement === 'left')) {
      tipHeight = height;
    }
    switch (placement) {
      case 'left':
        top = y + (height - tipHeight) / 2;
        left = x - tipWidth - 7;
        break;
      case 'right':
        top = y + (height - tipHeight) / 2;
        left = x + width + 7;
        break;
      case 'bottom':
        top = y + height + 9;
        left = x + (width - tipWidth) / 2;
        break;
      default:
        top = y - tipHeight - 9;
        left = x + (width - tipWidth) / 2;
        break;
    }
    return {
      left: left + offsetLeft,
      top: top + offsetTop,
      tipWidth,
      tipHeight,
    };
  }

  private measureContent (event: any) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      tipAnchor: {
        width,
        height,
      },
    });
  }
  private renderTip () {
    const { placement, icon, fill, content, offset } = this.props;
    if (!content) {
      return;
    }
    const { tipAnchor, tipGuid, visible, eleAnchor } = this.state;
    const _styles = this.props.styles!;
    const tips = [_styles.tip];
    const tipArrow = [_styles.tipArrow];
    const contentText = [_styles.contentText];
    const tipBg = [_styles.tipBg];
    const tipsContent = [_styles.tipsContent];
    const iconClose = [_styles.iconClose];
    const closeText = [_styles.closeText];
    const positionTip = this.getPosition();
    const { tipWidth, tipHeight } = positionTip;
    switch (placement) {
      case 'bottom':
        tipArrow.push(_styles.arrowBottom);
        tips.push({
          left: positionTip.left,
          top: positionTip.top,
        });
        break;
      case 'left':
        tipArrow.push(_styles.arrowLeft);
        tips.push({
          left: positionTip && positionTip.left,
          top: positionTip && positionTip.top,
        });
        break;
      case 'right':
        tipArrow.push(_styles.arrowRight);
        tips.push({
          left: positionTip && positionTip.left,
          top: positionTip && positionTip.top,
        });
        break;
      default:
        tips.push({
          left: positionTip.left,
          top: positionTip.top,
        });
        break;
    }
    if (fill && positionTip && positionTip.tipWidth) {
      contentText.push({
        width: positionTip.tipWidth - 66,
      });
    } else if (!fill && (placement === 'right' || placement === 'left')) {
      contentText.push({
        width: 'auto',
        maxWidth: TipBase.maxWidth,
      });
    } else if (!fill && (placement === 'bottom' || placement === 'top')) {
      contentText.push({
        width: 'auto',
        maxWidth: eleAnchor.width - 66,
      });
    }
    let iconComponent = null;
    if (icon && typeof icon === 'string') {
      iconComponent = (
        <MDIcon
          name={icon}
          color={base.colors.textBaseInverse}
          size={TipBase.closeSize}
          style={{ marginRight: base.gapSize.hXSmall }}
        />
      );
    } else if (React.isValidElement(icon)) {
      iconComponent = icon;
    }
    const iconCloseComponent = (
      <MDIcon
        name='close'
        color={base.colors.textBaseInverse}
        size={TipBase.closeSize}
      />
    );
    const element = (
      <View
        style={tips}
        onLayout={this.measureContent.bind(this)}
        key={tipGuid}
      >
        <View style={tipsContent}>
          {iconComponent}
          {content ? <Text style={contentText}>{content}</Text> : null}
          <View style={iconClose}>
            <TouchableWithoutFeedback
              onPress={this.onClose.bind(this, tipGuid)}
            >
              {iconCloseComponent}
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={tipBg}>
          <View style={tipArrow} />
        </View>
      </View>
    );

    if (!tipWidth || !tipHeight) {
      return element;
    }
    RootView.add(element);
  }
}
