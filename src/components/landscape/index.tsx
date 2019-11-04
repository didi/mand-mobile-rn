import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import base from '../../_styles/themes/default.basic';
import {
  button as btn,
  landscape,
} from '../../_styles/themes/default.components';
import MDIcon from '../icon/index';
import MDPopup from '../popup/index';

export interface IMDLandscapeProps {
  styles?: IMDLandscapeStyle;
  isVisible?: boolean;
  hasMask?: boolean;
  maskClosable?: boolean;
  fullScreen?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface IMDLandscapeState {
  text?: string;
  isVisible?: boolean;
}

export interface IMDLandscapeStyle {
  closeWrapper?: ViewStyle;
  fullScreeWrapper?: ViewStyle;
}

export const MDLandscapeStyles: IMDLandscapeStyle = {
  fullScreeWrapper: {
    justifyContent: 'center',
    backgroundColor: landscape.fullscreenBg,
    paddingVertical: base.gapSize.vLarge,
    paddingHorizontal: base.gapSize.hLarge,
    borderWidth: 0,
    // width: screenW,
    // height: screenH,
  },
  closeWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: base.gapSize.hLarge,
    top: base.gapSize.vLarge,
    backgroundColor: '#999',
    width: btn.smallHeight,
    height: btn.smallHeight,
    borderRadius: btn.smallHeight / 2,
  },
};

const styles = StyleSheet.create<IMDLandscapeStyle>(MDLandscapeStyles);

export default class MDLandscape extends React.Component<
  IMDLandscapeProps,
  IMDLandscapeState
> {
  public static defaultProps = {
    styles,
    isVisible: false,
    hasMask: true,
    maskClosable: false,
    fullScreen: false,
  };

  constructor (props: IMDLandscapeProps) {
    super(props);
    this._closePopup = this._closePopup.bind(this);
    this.state = {
      isVisible: props.isVisible,
    };
  }

  // static getDerivedStateFromProps(props: IMDLandscapeProps, state: IMDLandscapeState) {
  //   console.log('getDerivedStateFromProps', props.vModel, state.isVisible)
  //   state.isVisible = props.vModel !== state.isVisible
  //   return state
  // }

  public shouldComponentUpdate (
    nextProps: IMDLandscapeProps,
    nextState: IMDLandscapeState
  ) {
    console.log(
      'this.props',
      this.props.isVisible,
      'nextProps',
      nextProps.isVisible,
      'this.state',
      this.state.isVisible,
      'nextState',
      nextState.isVisible
    );
    if (
      this.props.isVisible !== nextProps.isVisible ||
      this.props.isVisible !== this.state.isVisible
    ) {
      nextState.isVisible = nextProps.isVisible;
      // this.setState({isVisible: nextProps.isVisible})
    }
    return true;
  }

  public _closePopup () {
    this.setState({ isVisible: false });
  }

  public render () {
    const _styles = this.props.styles || {};
    const { hasMask, maskClosable, fullScreen, children } = this.props;

    const closeButton = (style?: ViewStyle) => (
      <TouchableOpacity style={style} onPress={this._closePopup}>
        <MDIcon name='close' size={25} color={base.colors.bg} />
      </TouchableOpacity>
    );

    const fullScreenComponent = (_children: React.ReactNode | React.ReactNode[]) => (
      <ScrollView contentContainerStyle={_styles.fullScreeWrapper}>
        {_children}
        {closeButton(_styles.closeWrapper)}
      </ScrollView>
    );

    const wrapper = (
      _children: React.ReactNode | React.ReactNode[],
      colseButton?: React.ReactNode
    ) => (
      <MDPopup
        isVisible={this.state.isVisible}
        hasMask={hasMask}
        maskClosable={maskClosable}
        onShow={this.props.onShow}
        onHide={this.props.onHide}
      >
        {_children}
        {colseButton}
      </MDPopup>
    );

    return fullScreen
      ? wrapper(fullScreenComponent(children))
      : wrapper(children, closeButton());
  }
}
