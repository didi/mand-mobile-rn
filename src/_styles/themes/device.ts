import { Dimensions, NativeModules, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

// export const screenW =
//   Platform.OS === 'android'
//     ? NativeModules.ExtraDimensions.REAL_WINDOW_WIDTH
//     : Dimensions.get('window').width;
// export const screenH =
//   Platform.OS === 'android'
//     ? NativeModules.ExtraDimensions.USABLE_WINDOW_HEIGHT
//     : Dimensions.get('window').height;
// export const statusBarH =
//   Platform.OS === 'android'
//     ? NativeModules.ExtraDimensions.STATUS_BAR_HEIGHT
//     : 20;
export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;
export const statusBarH = 20;

export const safeAreaOffsetTop = isIphoneX() ? 44 : 0;
export const safeAreaOffsetBottom = isIphoneX() ? 34 : 0;

export function isIphoneX () {
  return (
    (Platform.OS === 'ios' &&
      ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
        (screenH === X_WIDTH && screenW === X_HEIGHT))) ||
    ((screenH === XSMAX_HEIGHT && screenW === XSMAX_WIDTH) ||
      (screenH === XSMAX_WIDTH && screenW === XSMAX_HEIGHT))
  );
}
