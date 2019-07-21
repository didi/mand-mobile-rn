import { Platform } from 'react-native';
import { default as MDSwiperAndroid } from './index.android';
import { default as MDSwiperIOS } from './index.ios';
import { default as MDSwiperWeb } from './index.web';

let exportsObject;
if (Platform.OS === 'web') {
  exportsObject = MDSwiperWeb;
} else if (Platform.OS === 'android') {
  exportsObject = MDSwiperAndroid;
} else {
  exportsObject = MDSwiperIOS;
}

export { MDSwiperStyles } from './swiper';

export default exportsObject;
