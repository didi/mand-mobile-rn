import { Animated, EasingFunction, StyleSheet, ViewStyle } from 'react-native';

export interface IMDIndicatorProps {
  styles?: IMDIndicatorStyle;
  type?: 'roller' | 'spinner' | 'carousel';
  color?: string;
  size?: number;
  easing?: EasingFunction;
  duration?: number;
  animating?: boolean;
  interaction?: boolean;
  count?: number;
}

export interface IMDIndicatorState {
  progress: Animated.Value;
  animation?: Animated.CompositeAnimation;
}

export interface IMDIndicatorStyle {
  wrapper?: ViewStyle;
  container?: ViewStyle;
  layer?: ViewStyle;
  spinnerLayer?: ViewStyle;
  carouseContainer?: ViewStyle;
}

export const MDIndicatorStyles: IMDIndicatorStyle = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  carouseContainer: {
    flexDirection: 'row',
  },
};

export const styles: any = StyleSheet.create<IMDIndicatorStyle>(MDIndicatorStyles);
