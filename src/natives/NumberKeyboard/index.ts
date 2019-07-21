import { NativeModules, Platform } from 'react-native';

let exportsObject;

if (Platform.OS === 'web') {
  exportsObject = {
    info: 'Native module could\'t working on web.',
    setup: () => {},
  };
} else {
  exportsObject = NativeModules.MDNumberKeyboard;
}

export default exportsObject;
