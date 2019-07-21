import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import MDCodeBox from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDCodeBox />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with maxlength equal to 6', () => {
  const component = shallow(<MDCodeBox maxlength={6} />);
  const input = component.find('MDTextInput');
  expect(input).toHaveLength(1);
  const text = component.find('Text');
  expect(text).toHaveLength(6);
});

it('renders correctly with infinite length', () => {
  const component = shallow(<MDCodeBox maxlength={-1} />);
  const input = component.find('MDTextInput');
  expect(input).toHaveLength(1);
  expect(input.first().props().maxLength).toEqual(-1);
  const text = component.find('Text');
  expect(text).toHaveLength(0);
});

it('renders correctly with security', () => {
  const component = shallow(<MDCodeBox security={true} />);
  const security = component
    .find('MDTextInput')
    .first()
    .prop('secureTextEntry');
  expect(security).toEqual(true);
});

it('renders codebox correctly with system keyboard', () => {
  const component = shallow(<MDCodeBox system={true} />);
  const keyboard = component.find('MDNumberKeyboard');
  expect(keyboard).toHaveLength(0);
});

it('test focus and blur event', () => {
  const mockFocus = jest.fn();
  const mockBlur = jest.fn();
  const component = shallow(
    <MDCodeBox system={true} onFocus={mockFocus} onBlur={mockBlur} />
  );
  const input = component.find('MDTextInput');
  input.simulate('focus');
  expect(mockFocus.mock.calls.length).toEqual(1);
  expect(component.state('focused')).toEqual(true);

  input.simulate('blur');
  expect(mockBlur.mock.calls.length).toEqual(1);
  expect(component.state('focused')).toEqual(false);
});

it('test change text event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCodeBox system={true} onChangeText={mockCallBack} />
  );
  component.find('MDTextInput').simulate('changeText', '0123');
  expect(mockCallBack.mock.calls[0][0]).toEqual('0123');
});

it('test cursor blink when maxlength equal to -1', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCodeBox system={true} onChangeText={mockCallBack} maxlength={-1} />
  );
  const input = component.find('MDTextInput');
  input.simulate('focus');
  input.simulate('changeText', '0123');
  expect(mockCallBack.mock.calls[0][0]).toEqual('0123');
  input.simulate('blur');
});

it('test security dot', (done) => {
  const component = shallow(<MDCodeBox system={true} security={true} />);
  const input = component.find('MDTextInput');
  input.simulate('changeText', '0123');
  setTimeout(() => {
    const dot = component.findWhere((w) => {
      return (
        w.type() === View &&
        w.prop('style').width === 6 &&
        w.prop('style').height === 6
      );
    });
    expect(dot).toHaveLength(4);
    done();
  }, 300);
});
