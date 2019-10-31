import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
;
import { Animated } from 'react-native';
import renderer from 'react-test-renderer';
import MDProgress from '../index';

configure({ adapter: new Adapter() });
beforeEach(() => {
  jest.useFakeTimers();
});

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDProgress itemWidth={300} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with not animation', () => {
  const component = renderer
    .create(<MDProgress itemWidth={300} progress={0.8} animate={false} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation', () => {
  const component = renderer
    .create(<MDProgress itemWidth={300} progress={0.8} animate={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation', () => {
  const component = shallow(
    <MDProgress itemWidth={300} progress={0.5} animate={true} />
  );
  component.setProps({ progress: 0.7, isAnimate: true });
  jest.runOnlyPendingTimers();
  jest.advanceTimersByTime(300);
  const b: any = component.state('curProgress');
  expect(b._value).toEqual(0.7);
  jest.useRealTimers();
});

it('renders correctly with set state', () => {
  const component = shallow(
    <MDProgress itemWidth={300} progress={0.8} animate={false} />
  );
  component.setProps({ progress: 0.7, isAnimate: false });
  expect(component.state('curProgress')).toEqual(new Animated.Value(0.7));
});
