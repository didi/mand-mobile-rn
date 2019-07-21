import * as React from 'react';
import { Animated, Easing, View } from 'react-native';
import { progress } from '../../_styles/themes/default.components';

export interface IMDProgressProps {
  progress: number;
  animate?: boolean;
  height?: number;
  itemWidth: number;
  upperColor?: string;
  underColor?: string;
}

export interface IMDProgressState {
  curProgress: Animated.Value;
}

export default class MDProgress extends React.Component<
  IMDProgressProps,
  IMDProgressState
> {
  public static defaultProps = {
    height: 5,
    animate: false,
    progress: 0,
    upperColor: progress.upperColor,
    underColor: progress.underColor,
  };

  constructor (props: IMDProgressProps) {
    super(props);
    this.state = {
      curProgress: new Animated.Value(0),
    };
  }

  public componentDidMount () {
    if (this.props.progress && this.props.progress >= 0) {
      if (this.props.animate) {
        const preProps = { progress: 0 };
        setTimeout(() => {
          this.startAnimatedFill(preProps);
        }, 300);
      } else {
        this.setState({
          curProgress: new Animated.Value(this.props.progress),
        });
      }
    }
  }

  public componentDidUpdate (prevProps: IMDProgressProps) {
    if (
      this.props.progress &&
      this.props.progress >= 0 &&
      this.props.progress !== prevProps.progress
    ) {
      if (this.props.animate) {
        this.startAnimatedFill(prevProps);
      } else {
        this.setState({
          curProgress: new Animated.Value(this.props.progress),
        });
      }
    }
  }

  public render () {
    const { height, itemWidth, upperColor, underColor } = this.props;
    const fillWidth = this.state.curProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * itemWidth, 1 * itemWidth],
    });
    return (
      <View
        style={[
          {
            height,
            width: itemWidth,
            backgroundColor: underColor,
            overflow: 'hidden',
          },
        ]}
      >
        <Animated.View
          style={[
            {
              height,
              width: fillWidth,
              backgroundColor: upperColor,
            },
          ]}
        />
      </View>
    );
  }

  private startAnimatedFill (prevProps: any) {
    Animated.timing(this.state.curProgress, {
      toValue: this.props.progress,
      easing: Easing.linear,
      duration:
        10 *
        Math.abs(this.props.progress - prevProps.progress) *
        this.props.itemWidth,
    }).start();
  }
}
