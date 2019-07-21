import * as React from 'react';
import SvgUri from 'react-native-svg-uri';
import { IMDIconProps, MDIcon as MDIconAlias } from './icon';
import svgsXmlData from './xmldata';

export { IMDIconProps, MDIconSize } from './icon';

export default class MDIcon extends React.Component<IMDIconProps> {
  public render () {
    const { name, size, color, svg, svgXmlData, source } = this.props;
    if (!svg) {
      return <MDIconAlias {...this.props} />;
    }

    const commonProps = { width: size, height: size, fill: color };
    if (source) {
      return <SvgUri source={source} {...commonProps} />;
    }
    // @ts-ignore
    const data = svgXmlData || svgsXmlData[name];
    if (!data) {
      console.warn(`[MDIcon] svg icon svgXmlData empty or ${name} not exists.`);
    }
    return <SvgUri svgXmlData={data} {...commonProps} />;
  }
}
