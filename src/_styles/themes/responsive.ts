import { PixelRatio } from 'react-native';
import { screenW } from './device';

// 返回字体大小缩放比例
const fontScale: number = PixelRatio.getFontScale();

// 当前设备的像素密度
const pixelRatio = PixelRatio.get();

// 默认的像素密度
const defaultPixel = 2;

// 获取各屏幕比例
// isInner 是否为组件库内部调用
// 组件库的设计宽度固定为 750
const scale = function (isInner: boolean) {
  // @ts-ignore
  let designWidth = global.MD_DESIGN_WIDTH || 750;
  if (isInner) {
    designWidth = 750;
  }
  return Math.min(screenW / (designWidth / defaultPixel));
};

export function innerScaleFont (size: number, isInner = true): number {
  // @ts-ignore
  if (global.MD_OPEN_RESPONSIVE_SCALE) {
    return (
      Math.round((size * scale(isInner) * pixelRatio) / fontScale) /
      pixelRatio /
      2
    );
  }
  return size / 2;
}

export function innerScaleSize (size: number, isInner = true): number {
  // @ts-ignore
  if (global.MD_OPEN_RESPONSIVE_SCALE) {
    return +((size * scale(isInner)) / 2).toFixed(2);
  }
  return +(size / 2).toFixed(2);
}

export function scaleFont (size: number): number {
  return innerScaleFont(size, false);
}

export function scaleSize (size: number): number {
  return innerScaleSize(size, false);
}

export function onePixcel (): number {
  return 1 / pixelRatio;
}
