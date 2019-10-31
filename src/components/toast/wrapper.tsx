;
import { View } from 'react-native';
import MDPopup from '../popup';
import { MDPopupPos } from '../popup/types';
export interface IMDToastWrapperProps {
  position?: MDPopupPos | string;
  hasMask?: boolean;
}

export default class MDToastWrapper extends React.Component<
  IMDToastWrapperProps
> {
  public render () {
    const { position, hasMask, children } = this.props;

    let wrapperComponent = children;
    const isTop = position === 'top';
    const isBottom = position === 'bottom';

    if (isTop || isBottom) {
      const justifyContent = isTop ? 'flex-start' : 'flex-end';
      const margin = isTop ? { marginTop: 50 } : { marginBottom: 50 };
      wrapperComponent = (
        <View style={[{ flex: 1, justifyContent }, margin]}>{children}</View>
      );
    }

    return (
      <MDPopup hasMask={hasMask} isVisible={true} maskClosable={true}>
        {wrapperComponent}
      </MDPopup>
    );
  }
}
