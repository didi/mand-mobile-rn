import * as React from 'react';
import { ImageURISource, ViewStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { icon } from '../../_styles/themes/default.components';
import MandMobileConfig from '../../assets/fonts/mand-mobile.json';

const Icon = createIconSetFromIcoMoon(MandMobileConfig);

export type MDIconSize = 'smaller' | 'small' | 'medium' | 'large';

export const MDIconSizeToNum = {
  smaller: icon.smaller,
  small: icon.small,
  medium: icon.medium,
  large: icon.large,
};

export interface IMDIconProps {
  name: string;
  size?: number | MDIconSize;
  color?: string;
  style?: ViewStyle | ViewStyle[];
  svg?: boolean;
  svgXmlData?: string;
  source?: ImageURISource;
}

export const MDIcon: React.SFC<IMDIconProps> = ({ size = 'medium', svg, name, ...otherProps}) => {
  if (!svg && !name) {
    throw new Error('[MDIcon] must have A name props.');
  }

  const _size = typeof size === 'string' ? MDIconSizeToNum[size] : size;
  return <Icon {...otherProps} name={name} size={_size} />;
}
