;
import LinearGradient from 'react-native-linear-gradient';
import { MDTag as MDTagAlias } from './tag';

export default class MDTag extends MDTagAlias {
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

export { MDTagStyles, IMDTagProps, IMDTagStyle } from './tag';
