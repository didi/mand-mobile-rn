import React, { PureComponent } from 'react';
import { Animated, Easing, View } from 'react-native';
import { default as MDIndicatorAnimation } from './animation';
import { IMDIndicatorProps, IMDIndicatorState, styles } from './indicator-interface';

const hasLoopSupport = false;

export default class MDIndicator extends PureComponent<
  IMDIndicatorProps,
  IMDIndicatorState
> {
  public static defaultProps = {
    styles,
    type: 'roller',
    column: false,
    easing: Easing.linear,
    color: '#000',
    size: 40,
    duration: 1200,
    animating: true,
    interaction: true,
    count: 1,
  };

  constructor (props: IMDIndicatorProps) {
    super(props);

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
      animation: undefined,
    };
  }

  private mounted = false;

  public componentDidMount () {
    const { animating } = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  public componentWillUnmount () {
    this.mounted = false;
  }

  public componentWillReceiveProps (nextProps: IMDIndicatorProps) {
    const { animating } = this.props;

    if (animating !== nextProps.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  public render () {
    const { styles: _styles, count, size, type, ...props } = this.props;
    const lineStyle =
      type === 'roller'
        ? {
            width: size,
            height: size,
            borderColor: '#eee',
            borderWidth: size! / 10,
            borderRadius: size! / 2,
          }
        : null;

    return (
      <View style={[_styles!.container]}>
        <Animated.View
          style={[
            type === 'carousel'
              ? _styles!.carouseContainer
              : { width: size, height: size },
            lineStyle,
          ]}
          {...props}
        >
          {Array.from(new Array(count), this.renderComponent.bind(this))}
        </Animated.View>
      </View>
    );
  }

  private startAnimation (endResult?: Animated.EndResult) {
    const { progress } = this.state;
    const { interaction, easing, duration } = this.props;

    if (!this.mounted || (endResult && endResult.finished === false)) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration,
      easing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    if (hasLoopSupport) {
      Animated.loop(animation).start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }

    this.setState({ animation });
  }

  private stopAnimation () {
    const { animation } = this.state;

    if (!animation) {
      return;
    }

    animation.stop();
    this.setState({ animation: undefined });
  }

  private renderComponent (value: any, index: number) {
    const { progress } = this.state;
    const { type, ...props } = this.props;
    const renderComponent = MDIndicatorAnimation[type!];

    if (typeof renderComponent === 'function') {
      return renderComponent(index, progress, props);
    } else {
      return null;
    }
  }
}
