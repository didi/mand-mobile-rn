// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

;
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDField, { MDFieldStyles } from '../index';
const styles = Object.assign({}, MDFieldStyles, {
  wrapper: {
    position: 'relative',
    backgroundColor: '#ddd',
  },
});
configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDField />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with title', () => {
  const component = renderer.create(<MDField title='区域标题' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with brief', () => {
  const component = renderer
    .create(<MDField brief='区域描述性文本，可根据具体场景配置' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with action', () => {
  const component = renderer
    .create(<MDField action={<Text>操作</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with plain', () => {
  const component = renderer.create(<MDField isPlain={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDField styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom style', () => {
  const component = renderer.create(<MDField styles={styles} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const component = renderer.create(<MDField disabled={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with footer', () => {
  const component = renderer
    .create(<MDField footer={<Text>操作</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
