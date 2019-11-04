import * as React from 'react';
import ReactDOM from 'react-dom';
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
import MDIcon from '../icon';

export interface IMDTipProps {
  styles?: IMDTipStyle;
  content: string | number;
  placement?: string;
  icon?: React.ReactNode;
  offset?: IMDOffset;
  fill?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface IMDOffset {
  left?: number;
  top?: number;
}

interface IMDTipState {
  visible?: boolean;
  eleAnchor?: any;
  tipAnchor?: any;
}

export interface IMDTipStyle {
  wrapper?: ViewStyle;
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
  wrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tip: {
    position: 'absolute',
    zIndex: TipBase.zIndex,
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
    right: TipBase.rightWeb,
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
  },
  arrowRight: {
    bottom: 'auto',
    left: TipBase.rightWeb,
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
    marginTop: TipBase.closeTop,
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
    };
  }
  private touchable = null;
  private refContainer = [];
  private _overlayContainer: any = null;
  private _overlayInstance: any = null;
  public componentDidMount () {
    this._overlayContainer = document.createElement('div');
    document.body.appendChild(this._overlayContainer);
    this.refContainer.map((ref) => {
      this.touchable = ref;
    });
  }
  public componentWillUnmount () {
    document.body.removeChild(this._overlayContainer);
  }
  public render () {
    const { placement, icon, fill, content, offset } = this.props;
    const _styles = this.props.styles!;
    const wrapper = [_styles.wrapper];
    const children: any = this.props.children;
    const childrenStyle =
      children && children.props && children.props.style
        ? children.props.style
        : {};
    const { width, height } = childrenStyle;
    if (width) {
      wrapper.push({
        width,
      });
    }
    if (height) {
      wrapper.push({
        height,
      });
    }
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.onTipPress.bind(this)}>
          <View
            style={wrapper}
            ref={(ref: any) => {
              this.touchable = ref;
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
        {this.state.visible ? this.renderTip() : null}
      </React.Fragment>
    );
  }
  private onClose () {
    const { onHide } = this.props;
    if (this._overlayContainer) {
      ReactDOM.unmountComponentAtNode(this._overlayContainer);
      this._overlayInstance = null;
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
  private onTipPress () {
    const handle = ReactDOM.findDOMNode(this.touchable);
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
    this.setState(
      {
        visible: true,
        eleAnchor: { x, y, width, height },
      },
      () => {
        onShow && onShow();
      }
    );
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
    const { x, y, width, height } = event.nativeEvent.layout;
    this.setState({
      tipAnchor: {
        width,
        height,
      },
    });
  }
  private renderTip () {
    const { placement, icon, fill, content, offset } = this.props;
    const {
      tipAnchor,
      tipAnchor: { width, height },
      eleAnchor,
    } = this.state;
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
        width: '100%',
        maxWidth: TipBase.maxWidth,
      });
    } else if (!fill && (placement === 'bottom' || placement === 'top')) {
      contentText.push({
        width: 'auto',
        maxWidth: eleAnchor.width,
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
    this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      // tslint:disable-next-line:jsx-wrap-multiline
      <View style={tips} onLayout={this.measureContent.bind(this)}>
        <View style={tipsContent}>
          {iconComponent}
          {content ? <Text style={contentText}>{content}</Text> : null}
          <View style={iconClose}>
            <TouchableWithoutFeedback onPress={this.onClose.bind(this)}>
              {iconCloseComponent}
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={tipBg}>
          <View style={tipArrow} />
        </View>
      </View>,
      this._overlayContainer
    );
  }
}
