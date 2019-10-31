;
import renderer from 'react-test-renderer';
import MDWaterMark from '../index';

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDWaterMark />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with content', () => {
  const component = renderer
    .create(<MDWaterMark content={'滴滴金融'} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with color', () => {
  const component = renderer.create(<MDWaterMark color={'#00BFFF'} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with fontSize', () => {
  const component = renderer.create(<MDWaterMark fontSize={15} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with spacing', () => {
  const component = renderer.create(<MDWaterMark spacing={80} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with rotate', () => {
  const component = renderer.create(<MDWaterMark rotate={-25} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with repeatX', () => {
  const component = renderer.create(<MDWaterMark repeatX={false} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with repeatY', () => {
  const component = renderer.create(<MDWaterMark repeatY={false} />).toJSON();
  expect(component).toMatchSnapshot();
});
