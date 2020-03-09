// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDRadio from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDRadio label='单选项' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with react node label', () => {
  const component = renderer
    .create(<MDRadio label={<Text>单选项</Text>} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test press event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDRadio label='单选项' value='apple' onChange={mockCallBack} />
  );
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(true);
  expect(mockCallBack.mock.calls[0][1]).toEqual('apple');
});

it('test press event with disabled', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDRadio label='单选项' disabled={true} onChange={mockCallBack} />
  );
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('test instance state with press', () => {
  const component = shallow(
    <MDRadio label='单选项' value='apple' selected='orange' />
  );
  const instance = component.instance();
  expect(component.state('checked')).toBe(false);
  component.setProps({ selected: 'orange' });
  expect(component.state('checked')).toBe(false);
  component.setProps({ selected: 'apple' });
  expect(component.state('checked')).toBe(true);
});

it('test instance state with change checked', () => {
  const component = shallow(
    <MDRadio label='单选项' value='apple' selected='orange' />
  );
  const instance = component.instance();
  expect(component.state('checked')).toBe(false);
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(component.state('checked')).toBe(true);
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(component.state('checked')).toBe(true);
});

it('renders correctly with custom icon', () => {
  const component = renderer
    .create(
      <MDRadio
        label='单选项'
        icon='visible'
        iconInverse='right'
        iconDisabled='wrong'
        selected={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty icon', () => {
  const component = renderer
    .create(
      <MDRadio
        label='单选项'
        icon=''
        iconInverse=''
        iconDisabled=''
        selected={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
