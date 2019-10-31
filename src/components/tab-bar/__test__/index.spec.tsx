// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

;
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDTabBar, { MDTabBarStyles } from '../index';
const styles = Object.assign({}, MDTabBarStyles, {
  wrapper: {
    position: 'relative',
    backgroundColor: '#ddd',
  },
});
configure({ adapter: new Adapter() });
const items = [{ name: 0, label: '标签1' }, { name: 1, label: '标签2' }];
it('renders correctly with defaults', () => {
  const component = renderer.create(<MDTabBar />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with hasInk', () => {
  const component = renderer.create(<MDTabBar hasInk={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with current', () => {
  const component = renderer.create(<MDTabBar currentIndex={0} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with items', () => {
  const component = renderer.create(<MDTabBar items={items} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom', () => {
  const component = renderer
    .create(
      <MDTabBar items={items}>
        <Text>test</Text>
      </MDTabBar>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDTabBar styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom style', () => {
  const component = renderer.create(<MDTabBar styles={styles} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with event', () => {
  const component = renderer
    .create(
      <MDTabBar
        onChange={() => {
          console.log('value');
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
