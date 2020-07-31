import * as React from 'react';
import Modal from 'react-native-modal';

import { MDPopupPos, MDPopupTrans, PosToTrans, TransToAnim } from './types';

export interface IMDPopupProps {
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
  isVisible: boolean;
  animationIn: string;
  animationOut: string;
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
    super(props);
    const {
      position,
      transition,
      isVisible,
      hasMask,
      maskOpacity,
      maskColor,
    } = props;
    const animation = this.transTransition(position, transition);

    this.state = {
      isVisible,
      animationIn: animation.in,
      animationOut: animation.out,
      backdropOpacity: hasMask ? (maskOpacity ? maskOpacity : 0.7) : 0,
      backdropColor: maskColor || '#000',
    };

    this.setVisible = this.setVisible.bind(this);
  }

  public UNSAFE_componentWillReceiveProps (newProps: IMDPopupProps) {
    const {
      isVisible,
      hasMask,
      maskOpacity,
      maskColor,
      position,
      transition,
    } = newProps;

    const {
      isVisible: _isVisible,
      hasMask: _hasMask,
      maskOpacity: _maskOpacity,
      maskColor: _maskColor,
      position: _position,
      transition: _transition,
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

    if (position !== _position || transition !== _transition) {
      const animation = this.transTransition(position, transition);
      this.setState({
        animationIn: animation.in,
        animationOut: animation.out,
      });
    }
  }

  public render () {
    const {
      isVisible,
      animationIn,
      animationOut,
      backdropOpacity,
      backdropColor,
    } = this.state;
    const { onShow, onHide, maskClosable } = this.props;

    return (
      <Modal
        style={{
          flex: 1,
          width: '100%',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={isVisible}
        animationIn={animationIn}
        animationOut={animationOut}
        backdropOpacity={backdropOpacity}
        backdropColor={backdropColor}
        onModalShow={onShow}
        onModalHide={onHide}
        onBackdropPress={() => {
          maskClosable && this.setVisible(false);
        }}
      >
        {this.props.children}
      </Modal>
    );
  }

  private setVisible (show: boolean) {
    const { onBeforeShow, onBeforeHide } = this.props;
    show ? onBeforeShow && onBeforeShow() : onBeforeHide && onBeforeHide();

    this.setState({
      isVisible: show,
    });
  }

  private transTransition (position?: MDPopupPos, transition?: MDPopupTrans) {
    position = position || 'center';
    if (!transition) {
      transition = PosToTrans[position] as MDPopupTrans;
    }

    return TransToAnim[transition];
  }
}
