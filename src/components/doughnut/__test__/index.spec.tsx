import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
;
import renderer from 'react-test-renderer';
import MDDoughnut from '../index';

configure({ adapter: new Adapter() });
beforeEach(() => {
  jest.useFakeTimers();
});

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<MDDoughnut radius={100} strokeWidth={15} data={[]} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with not animation1', () => {
  const component = renderer
    .create(
      <MDDoughnut radius={100} strokeWidth={15} animate={true} data={[]} />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation2', () => {
  const component = renderer
    .create(
      <MDDoughnut radius={100} strokeWidth={15} animate={false} data={[]} />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation3', () => {
  const component = renderer
    .create(
      <MDDoughnut
        radius={100}
        strokeWidth={15}
        animate={true}
        data={[
          { color: '#ff0000', proportion: 30 },
          { color: '#ffff00', proportion: 40 },
          { color: '#ffc0cb', proportion: 30 },
        ]}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation4', () => {
  const component = renderer
    .create(
      <MDDoughnut
        radius={100}
        strokeWidth={15}
        data={[{ color: '#ff0000', proportion: 100 }]}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with animation', () => {
  const component = shallow(
    <MDDoughnut
      radius={100}
      strokeWidth={15}
      animate={true}
      data={[
        { color: '#ff0000', proportion: 30 },
        { color: '#ffff00', proportion: 40 },
        { color: '#ffc0cb', proportion: 30 },
      ]}
    />
  );
  component.setProps({ size: 100, autoStart: false });
  component.setProps({ size: 100, autoStart: true });
  jest.runOnlyPendingTimers();
  jest.advanceTimersByTime(1000);
  const b: any[] = component.state('arcProportAnimatedValues');
  expect(b.length).toEqual(6);
  jest.useRealTimers();
});
