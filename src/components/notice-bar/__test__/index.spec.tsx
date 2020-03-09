// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';
import { Text } from 'react-native';

import renderer from 'react-test-renderer';
import MDNoticeBar, { MDNoticeBarStyles } from '../index';
const styles = Object.assign({}, MDNoticeBarStyles, {
  wrapper: {
    position: 'relative',
    backgroundColor: '#ddd',
  },
});
configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDNoticeBar />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with default type', () => {
  const component = renderer.create(<MDNoticeBar type='default' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with warning type', () => {
  const component = renderer.create(<MDNoticeBar type='warning' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with activity type', () => {
  const component = renderer.create(<MDNoticeBar type='activity' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with round', () => {
  const component = renderer.create(<MDNoticeBar round={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with no round', () => {
  const component = renderer.create(<MDNoticeBar round={false} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with security icon', () => {
  const component = renderer.create(<MDNoticeBar left='security' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with mode', () => {
  const component = renderer.create(<MDNoticeBar mode='close' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with multiRows', () => {
  const component = renderer
    .create(
      <MDNoticeBar multiRows={true}>
        testtesttesttesttesttesttesttesttesttest
      </MDNoticeBar>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with time', () => {
  const component = renderer.create(<MDNoticeBar time={5000} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with scrollable', () => {
  const component = renderer
    .create(
      <MDNoticeBar scrollable={true}>
        testtesttesttesttesttesttesttesttesttest
      </MDNoticeBar>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDNoticeBar styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom style', () => {
  const component = renderer.create(<MDNoticeBar styles={styles} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
  const component = renderer
    .create(
      <MDNoticeBar
        onPress={(value) => {
          console.log(value);
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with left', () => {
  const component = renderer
    .create(<MDNoticeBar left={<Text>test</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with right', () => {
  const component = renderer
    .create(<MDNoticeBar right={<Text>test</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
