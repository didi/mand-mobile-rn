import * as React from 'react';
import { ImageURISource, ViewStyle } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { icon } from '../../_styles/themes/default.components';

// tslint:disable-next-line:no-var-requires
const section = require('../../assets/fonts/selection.json');
const Icon = createIconSetFromIcoMoon(section);

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

export class MDIcon extends React.Component<IMDIconProps> {
  public static defaultProps = {
    size: 'medium',
  };

  constructor (props: IMDIconProps) {
    super(props);
    if (!props.svg && !props.name) {
      throw new Error('[MDIcon] must have A name props.');
    }
  }

  public render () {
    const { size } = this.props;
    const _size = typeof size === 'string' ? MDIconSizeToNum[size] : size;
    return <Icon {...this.props} size={_size} />;
  }
}
