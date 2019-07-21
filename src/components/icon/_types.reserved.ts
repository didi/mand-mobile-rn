export type MDIconType =
  | 'MandMobile'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

export const getIconType = (iconType: MDIconType) => {
  let VectorIcon = null;
  switch (iconType) {
    case 'AntDesign':
      VectorIcon = require('react-native-vector-icons/dist/AntDesign').default;
      break;
    case 'Entypo':
      VectorIcon = require('react-native-vector-icons/dist/Entypo').default;
      break;
    case 'EvilIcons':
      VectorIcon = require('react-native-vector-icons/dist/EvilIcons').default;
      break;
    case 'Feather':
      VectorIcon = require('react-native-vector-icons/dist/Feather').default;
      break;
    case 'FontAwesome':
      VectorIcon = require('react-native-vector-icons/dist/FontAwesome').default;
      break;
    case 'FontAwesome5':
      VectorIcon = require('react-native-vector-icons/dist/FontAwesome5')
        .default;
      break;
    case 'Foundation':
      VectorIcon = require('react-native-vector-icons/dist/Foundation').default;
      break;
    case 'Ionicons':
      VectorIcon = require('react-native-vector-icons/dist/Ionicons').default;
      break;
    case 'MaterialCommunityIcons':
      VectorIcon = require('react-native-vector-icons/dist/MaterialCommunityIcons')
        .default;
      break;
    case 'MaterialIcons':
      VectorIcon = require('react-native-vector-icons/dist/MaterialIcons')
        .default;
      break;
    case 'Octicons':
      VectorIcon = require('react-native-vector-icons/dist/Octicons').default;
      break;
    case 'SimpleLineIcons':
      VectorIcon = require('react-native-vector-icons/dist/SimpleLineIcons')
        .default;
      break;
    case 'Zocial':
      VectorIcon = require('react-native-vector-icons/dist/Zocial').default;
      break;
    default:
      break;
  }
  return VectorIcon;
};
