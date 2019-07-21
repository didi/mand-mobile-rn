import { Animated } from 'react-native';
import { MDPopupTrans } from './types';

const anims = {
  fade: buildFadeAnim(),
  'fade-up': buildFadeAnim('Y', 100),
  'fade-down': buildFadeAnim('Y', -100),
  'fade-left': buildFadeAnim('X', -100),
  'fade-right': buildFadeAnim('X', 100),
  bounce: buildScaleAnim(
    [0, 0.6, 1],
    [0, 1, 1],
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.3, 1.1, 0.9, 1.03, 0.97, 1]
  ),
  punch: buildScaleAnim([0, 0.5, 1], [0, 1, 1], [0, 1], [1.35, 1]),
  zoom: buildScaleAnim([0, 0.5, 1], [0, 1, 1], [0, 1], [0, 1]),
  'slide-up': buildTranslateAnim('Y', 100),
  'slide-down': buildTranslateAnim('Y', -100),
  'slide-left': buildTranslateAnim('X', -100),
  'slide-right': buildTranslateAnim('X', 100),
};

function buildFadeAnim (trans?: 'X' | 'Y', start?: number) {
  const anim: any = {
    opacity: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
  };

  return Object.assign({}, anim, buildTranslateAnim(trans, start));
}

function buildTranslateAnim (trans?: 'X' | 'Y', start?: number) {
  if (!trans || !start) {
    return {};
  }

  return {
    ['translate' + trans]: {
      inputRange: [0, 1],
      outputRange: [start, 0],
    },
  };
}

function buildScaleAnim (
  oin: number[],
  oout: number[],
  sin: number[],
  sout: number[]
) {
  return {
    opacity: {
      inputRange: oin,
      outputRange: oout,
    },
    scale: {
      inputRange: sin,
      outputRange: sout,
    },
  };
}

export default function buildAnimStyle (
  transition: MDPopupTrans,
  animTime: Animated.Value
): any {
  const anim = anims[transition];

  const animStyle: any = { transform: [] };
  if (anim.opacity) {
    animStyle.opacity = animTime.interpolate(anim.opacity);
  }
  if (anim.translateY) {
    animStyle.transform.push({
      translateY: animTime.interpolate(anim.translateY),
    });
  }
  if (anim.translateX) {
    animStyle.transform.push({
      translateX: animTime.interpolate(anim.translateX),
    });
  }
  if (anim.scale) {
    animStyle.transform.push({ scale: animTime.interpolate(anim.scale) });
  }

  return animStyle;
}
