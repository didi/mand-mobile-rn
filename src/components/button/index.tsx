import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { MDButton as MDButtonAlias } from './button';

export default class MDButton extends MDButtonAlias {
  public render () {
    if (!this.props.gradientStyle) {
      return super.render();
    }

    const content = this.renderContent();
    return (
      <LinearGradient {...this.props.gradientStyle} style={this.wrapperStyle}>
        {content}
      </LinearGradient>
    );
  }
}

export { IMDButtonProps, MDButtonSizeSet, MDButtonSize, MDButtonType, MDIconPosition } from './button';
