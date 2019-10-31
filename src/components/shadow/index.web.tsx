;
import { View, ViewStyle } from 'react-native';

interface IMDShadowProps {
  style: ViewStyle;
  shadowColor: ViewStyle['shadowColor'];
  shadowOffset: ViewStyle['shadowOffset'];
  shadowOpacity: ViewStyle['shadowOpacity'];
  shadowRadius: ViewStyle['shadowOffset'];
}

export class MDBoxShadow extends React.PureComponent<IMDShadowProps> {
  public render () {
    const { style: _style, ...shadow } = this.props;
    return <View style={{ ..._style, ...shadow } as ViewStyle} />;
  }
}

export class MDBorderShadow extends React.PureComponent<IMDShadowProps> {
  public render () {
    const { style: _style, ...shadow } = this.props;
    return <View style={{ ..._style, ...shadow } as ViewStyle} />;
  }
}
