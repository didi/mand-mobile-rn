;
import renderer from 'react-test-renderer';
import MDDetailItem from '../index';

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDDetailItem />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with content', () => {
  const component = renderer.create(<MDDetailItem content='test' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with title', () => {
  const component = renderer.create(<MDDetailItem title='test' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with bold', () => {
  const component = renderer.create(<MDDetailItem bold={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with content & bold', () => {
  const component = renderer
    .create(<MDDetailItem bold={true} content='test' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with styles', () => {
  const component = renderer.create(<MDDetailItem styles={{}} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with styles is null', () => {
  // @ts-ignore
  const component = renderer.create(<MDDetailItem styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});
