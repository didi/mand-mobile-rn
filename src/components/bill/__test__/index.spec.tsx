// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDBill, { MDBillStyles } from '../index';
const styles = Object.assign({}, MDBillStyles, {
  wrapper: {
    position: 'relative',
    backgroundColor: '#ddd',
  },
});
configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDBill />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDBill styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom style', () => {
  const component = renderer.create(<MDBill styles={styles} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with title', () => {
  const component = renderer.create(<MDBill title='借款电子票据' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty title', () => {
  const component = renderer.create(<MDBill title='' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with no', () => {
  const component = renderer.create(<MDBill no='12345689' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty no', () => {
  const component = renderer.create(<MDBill no='' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with waterMark', () => {
  const component = renderer
    .create(<MDBill waterMark='MAND-MOBILE-RN' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with header', () => {
  const component = renderer
    .create(<MDBill header={<Text>test</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with footer', () => {
  const component = renderer
    .create(<MDBill footer={<Text>test</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with slot', () => {
  const component = renderer
    .create(
      <MDBill>
        <Text>test</Text>
      </MDBill>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
