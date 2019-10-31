;
import renderer from 'react-test-renderer';
import MDSlider from '../index';

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDSlider />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDSlider />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with width', () => {
  const component = renderer.create(<MDSlider width={200} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with circleSize', () => {
  const component = renderer.create(<MDSlider circleSize={19} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with bothway', () => {
  const component = renderer.create(<MDSlider bothway={false} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with range', () => {
  const component = renderer.create(<MDSlider range={200} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with startValue', () => {
  const component = renderer.create(<MDSlider startValue={20} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with endValue', () => {
  const component = renderer.create(<MDSlider endValue={80} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with min', () => {
  const component = renderer.create(<MDSlider min={10} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with max', () => {
  const component = renderer.create(<MDSlider max={80} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with step', () => {
  const component = renderer.create(<MDSlider step={5} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with format', () => {
  const component = renderer.create(<MDSlider format={'$'} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with formatColor', () => {
  const component = renderer
    .create(<MDSlider formatColor={'#E5E5E5'} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const component = renderer.create(<MDSlider disabled={true} />).toJSON();
  expect(component).toMatchSnapshot();
});
