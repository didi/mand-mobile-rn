// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Text } from 'react-native';

import renderer from 'react-test-renderer';
import MDFieldItem from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDFieldItem />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with title', () => {
  const component = renderer.create(<MDFieldItem title='标题区域' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with placeholder', () => {
  const component = renderer
    .create(<MDFieldItem placeholder='提示文本' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with content', () => {
  const component = renderer.create(<MDFieldItem content='内容文本' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with addon', () => {
  const component = renderer.create(<MDFieldItem addon='次要信息' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with solid', () => {
  const component = renderer.create(<MDFieldItem solid={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with arrow', () => {
  const component = renderer.create(<MDFieldItem arrow={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const component = renderer.create(<MDFieldItem disabled={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with alignRight', () => {
  const component = renderer.create(<MDFieldItem alignRight={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with left', () => {
  const component = renderer
    .create(<MDFieldItem left={<Text>test</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
  const component = renderer
    .create(
      <MDFieldItem
        onPress={(value) => {
          console.log(value);
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty style', () => {
  // @ts-ignore
  const component = renderer.create(<MDFieldItem styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with child', () => {
  const component = renderer
    .create(<MDFieldItem children={<Text>这是子内容区域</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
