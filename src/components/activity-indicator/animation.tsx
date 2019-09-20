import React from 'react';
import { Animated, Easing } from 'react-native';
import { IMDIndicatorProps, styles } from './indicator-interface';

export default {
  roller (index: number, progress: Animated.Value, props: IMDIndicatorProps) {
    const { size, color, duration } = props;

    const frames = (60 * duration!) / 1000;
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

    const inputRange = Array.from(
      new Array(frames),
      (value, i) => i / (frames - 1)
    );
    const outputRange = Array.from(new Array(frames), (value, i) => {
      const rotation = index ? 360 - 15 : -(180 - 15);
      const direction = index ? -1 : 1;
      let _progress = (2 * i) / (frames - 1);

      if (_progress > 1.0) {
        _progress = 2.0 - _progress;
      }

      return direction * (180 - 30) * easing(_progress) + rotation + 'deg';
    });

    const layerStyle = {
      width: size,
      height: size,
      transform: [
        {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0 + 30 + 15 + 'deg', 2 * 360 + 30 + 15 + 'deg'],
          }),
        },
      ],
    };

    const viewportStyle = {
      width: size,
      height: size,
      transform: [
        {
          translateY: index ? -size! / 2 : 0,
        },
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    const containerStyle = {
      width: size,
      height: size! / 2,
      overflow: 'hidden',
    };

    const offsetStyle = index ? { top: size! / 2 } : null;

    const lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderWidth: size! / 10,
      borderRadius: size! / 2,
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View
            style={[containerStyle, offsetStyle]}
            collapsable={false}
          >
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  },

  spinner (index: number, progress: Animated.Value, props: IMDIndicatorProps) {
    const { size, color, count } = props;
    const angle = (index * 360) / count!;

    const layerStyle = {
      transform: [
        {
          rotate: angle + 'deg',
        },
      ],
    };

    const inputRange = Array.from(
      new Array(count! + 1),
      (value, _index) => _index / count!
    );

    const outputRange = Array.from(new Array(count), (value, _index) =>
      Math.max(1.0 - _index * (1 / (count! - 1)), 0)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop()!);
    }

    outputRange.unshift(...outputRange.slice(-1));

    const barStyle = {
      width: size! / 10,
      height: size! / 4,
      borderRadius: size! / 20,
      backgroundColor: color,
      opacity: progress.interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View
        style={[styles.spinnerLayer, layerStyle]}
        {...{ key: index }}
      >
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  },

  carousel (index: number, progress: Animated.Value, props: IMDIndicatorProps) {
    const { size, color, count } = props;

    const inputRange = [
      0.0,
      (index + 0.5) / (count! + 1),
      (index + 1.0) / (count! + 1),
      (index + 1.5) / (count! + 1),
      1.0,
    ];
    const opacityOutputRange = [0.5, 0.8, 1, 0.7, 0.5];
    const scaleOutputRange = [1.0, 1.36, 1.56, 1.06, 1.0];

    const style = {
      width: size,
      height: size,
      margin: size! / 2,
      borderRadius: size! / 2,
      backgroundColor: color,
      opacity: progress.interpolate({
        inputRange,
        outputRange: opacityOutputRange,
      }),
      transform: [
        {
          scale: progress.interpolate({
            inputRange,
            outputRange: scaleOutputRange,
          }),
        },
      ],
    };

    return <Animated.View style={style} {...{ key: index }} />;
  },
};
