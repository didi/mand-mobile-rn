// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import MDTabs, { MDTabsStyles } from '../index';
const styles = Object.assign({}, MDTabsStyles, {
  wrapper: {
    position: 'relative',
    backgroundColor: '#ddd',
  },
});
configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDTabs />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDTabs styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom style', () => {
  const component = renderer.create(<MDTabs styles={styles} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with hasInk', () => {
  const component = renderer.create(<MDTabs hasInk={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with cur', () => {
  const component = renderer.create(<MDTabs currentIndex={1} />).toJSON();
  expect(component).toMatchSnapshot();
});
