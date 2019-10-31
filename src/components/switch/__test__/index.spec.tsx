// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import renderer from 'react-test-renderer';
import MDSwitch from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const mockCallBack = jest.fn();
  const component = renderer
    .create(
      <MDSwitch />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with press event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDSwitch checked={true} onChange={mockCallBack} />
  );
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(false);
});

it('renders correctly with Open && Disabled', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDSwitch disabled={true} checked={true} onChange={mockCallBack} />
  );
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('renders correctly with width && height', () => {
  const mockCallBack = jest.fn();
  const component = renderer
    .create(
      <MDSwitch checked={true} width={80} height={50} onChange={mockCallBack}/>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test instance state with press', () => {
  const mockCallBack = jest.fn();
  const component = shallow(<MDSwitch checked={false} onChange={mockCallBack} />);
  const instance = component.instance();
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(component.state('checked')).toBe(true);
  component.setProps({ checked: false });
  expect(component.state('checked')).toBe(false);
});

it('test instance state with change checked', () => {
  const mockCallBack = jest.fn();
  const component = shallow(<MDSwitch checked={true} onChange={mockCallBack}/>);
  const instance = component.instance();
  component.setProps({ checked: false });
  expect(component.state('checked')).toBe(false);
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(component.state('checked')).toBe(true);
  component.find('TouchableWithoutFeedback').simulate('press');
  expect(component.state('checked')).toBe(false);
  component.setProps({ checked: false });
  expect(component.state('checked')).toBe(false);
});
