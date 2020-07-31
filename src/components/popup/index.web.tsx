import * as React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { popup } from '../../_styles/themes/default.components';

import buildAnimStyle from './anims';
import { MDPopupPos, MDPopupTrans, PosToTrans } from './types';

interface IMDPopupProps {
  isVisible: boolean;
  hasMask?: boolean;
  maskOpacity?: number;
  maskColor?: string;
  maskClosable?: boolean;
  position?: MDPopupPos;
  transition?: MDPopupTrans;
  onBeforeShow?: () => void;
  onShow?: () => void;
  onBeforeHide?: () => void;
  onHide?: () => void;
}
interface IMDPopupState {
  animTime: Animated.Value;
  isVisible: boolean;
  backdropOpacity: number;
  backdropColor: string;
}

export default class MDPopup extends React.Component<
  IMDPopupProps,
  IMDPopupState
> {
  public static defaultProps = {
    isVisible: false,
    position: 'center',
    maskClosable: true,
    hasMask: true,
    maskOpacity: 0.7,
  };

  constructor (props: IMDPopupProps) {
    const { isVisible, hasMask, maskOpacity, maskColor } = props;
    super(props);

    this.state = {
      animTime: new Animated.Value(0),
      isVisible,
      backdropOpacity: hasMask ? (maskOpacity ? maskOpacity : 0.7) : 0,
      backdropColor: maskColor ? maskColor : '#000',
    };

    this.setVisible = this.setVisible.bind(this);
  }

  public UNSAFE_componentWillReceiveProps (newProps: IMDPopupProps) {
    const { isVisible, hasMask, maskOpacity, maskColor } = newProps;
    const {
      isVisible: _isVisible,
      hasMask: _hasMask,
      maskOpacity: _maskOpacity,
      maskColor: _maskColor,
    } = this.props;

    if (isVisible !== _isVisible || isVisible !== this.state.isVisible) {
      this.setVisible(isVisible);
    }

    if (hasMask !== _hasMask || maskOpacity !== _maskOpacity) {
      this.setState({
        backdropOpacity: hasMask ? (maskOpacity ? maskOpacity : 0.7) : 0,
      });
    }

    if (maskColor !== _maskColor) {
      this.setState({
        backdropColor: maskColor ? maskColor : '#000',
      });
    }
  }

  public render () {
    const { backdropOpacity, backdropColor, isVisible } = this.state;
    const { transition, position, maskClosable } = this.props;
    if (!isVisible) {
      return null;
    }

    const _animStyle = this.transAnimStyle(transition, position);

    return (
      // @ts-ignore
      <View style={[styles.wrapper, { position: 'fixed' }]}>
        <View
          style={[
            styles.mask,
            {
              opacity: backdropOpacity,
              backgroundColor: backdropColor,
            },
          ]}
        />
        <Animated.View
          style={[styles.wrapper, { position: 'absolute' }, _animStyle]}
        >
          <TouchableWithoutFeedback
            style={styles.touchable}
            onPress={() => {
              maskClosable && this.setVisible(false);
            }}
          >
            <View style={styles.touchable} />
          </TouchableWithoutFeedback>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }

  private setVisible (show: boolean) {
    const { onBeforeShow, onBeforeHide } = this.props;
    show ? onBeforeShow && onBeforeShow() : onBeforeHide && onBeforeHide();
    if (!show) {
      // out
      Animated.timing(this.state.animTime, {
        toValue: 0,
        duration: 250,
      }).start(() => {
        this.setState({
          isVisible: show,
        });
      });
    } else {
      // in
      this.setState(
        {
          isVisible: show,
        },
        () => {
          Animated.timing(this.state.animTime, {
            toValue: 1,
            easing: Easing.bezier(0.215, 0.61, 0.355, 1),
            duration: 300,
          }).start();
        }
      );
    }
  }

  private transAnimStyle (
    transition?: MDPopupTrans,
    position?: MDPopupPos
  ): any {
    position = position || 'center';
    if (!transition) {
      transition = PosToTrans[position] as MDPopupTrans;
    }

    return buildAnimStyle(transition, this.state.animTime);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: popup.zIndex,
  },
  mask: {
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: -1,
  },
  touchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'transparent',
  },
});
