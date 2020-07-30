import * as React from 'react';
import { SvgUri, SvgXml } from 'react-native-svg';
import { IMDIconProps, MDIcon as MDIconAlias } from './icon';
import svgsXmlData from './xmldata';

export { IMDIconProps, MDIconSize } from './icon';

const MDIcon: React.FC<IMDIconProps> = (props) => {
  const { name, size, color, svg, svgXmlData, source } = props;
  if (!svg) {
    return <MDIconAlias {...props} />;
  }

  const commonProps = { width: size, height: size, fill: color };
  if (source && source.uri) {
    return <SvgUri uri={source.uri} {...commonProps} />;
  }
  // @ts-ignore
  const data = svgXmlData || svgsXmlData[name];
  if (!data) {
    console.warn(`[MDIcon] svg icon svgXmlData empty or ${name} not exists.`);
  }
  return <SvgXml xml={data} {...commonProps} />;
}

export default MDIcon;
