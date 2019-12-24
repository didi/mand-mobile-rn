import { Animated, ViewStyle } from 'react-native';
import { swiper } from '../../_styles/themes/default.components';

export interface IMDSwiperProps {
  styles?: IMDSwiperStyle;
  autoplay?: number;
  transition?: SwiperTrans;
  defaultIndex?: number;
  hasDots?: boolean;
  isLoop?: boolean;
  dragable?: boolean;
  width: number;
  height: number;
  onBeforeChange?: (from: number, to: number) => void;
  onAfterChange?: (from: number, to: number) => void;
}

export interface IMDSwiperStyle {
  wrapper?: ViewStyle;
  dots?: ViewStyle;
  dotsVertical?: ViewStyle;
  dot?: ViewStyle;
  dotVertical?: ViewStyle;
  dotActive?: ViewStyle;
}

export interface IMDSwiperState {
  opacityAnim: Animated.AnimatedValue;
  opacitys: Animated.AnimatedValue[];
  userScrolling: boolean;
  index: number;
  fromIndex: number;
  toIndex: number;
  firstIndex: number;
  lastIndex: number;
  oItemCount: number; // original item count
  rItemCount: number; // real item count
  dimension: number;
  timer: any;
  noDrag: boolean;
  isStoped: boolean;
  autoplay: number;
  ready: boolean;
}

type SwiperTrans = 'slide' | 'slideY' | 'fade';

export const MDSwiperStyles: IMDSwiperStyle = {
  wrapper: {
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotsVertical: {
    position: 'absolute',
    flexDirection: 'column',
    alignSelf: 'center',
    right: 10,
  },
  dot: {
    width: 8,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 1.5,
  },
  dotVertical: {
    width: 2,
    height: 8,
    backgroundColor: '#ddd',
    marginVertical: 1.2,
  },
  dotActive: {
    backgroundColor: swiper.indicatorFill,
  },
};
