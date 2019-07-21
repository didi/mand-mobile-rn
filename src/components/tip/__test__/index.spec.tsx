// @ts-ignore
import { configure, mount, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDButton from '../../button/index';
import MDTip from '../index';

configure({ adapter: new Adapter() });

// NativeModules.UIManager.measure 暂时没有找到方法进行UT测试

it('renders correctly with defaults', () => {
  const component = renderer.create(
    <MDTip content='不错哦' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom icon', () => {
    const component = renderer.create(<MDTip content='不错哦' icon='security' fill={true} />).toJSON();
    expect(component).toMatchSnapshot();
});

it('renders correctly with custom placement', () => {
    const component = renderer.create(<MDTip content='不错哦' placement='bottom' />).toJSON();
    expect(component).toMatchSnapshot();
});

it('renders correctly with press event', () => {
  const component = shallow(
    <MDTip content='不错哦哦' placement='left' fill={true}>
      <MDButton>点击我</MDButton>
    </MDTip>
  );
  const instance = component.instance();
  expect(component.state('visible')).toEqual(false);
  component.find('TouchableWithoutFeedback').simulate('press');
});

it('renders correctly with onShow && onHide', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDTip content='不错哦哦' placement='left' fill={true} onShow={mockCallBack} onHide={mockCallBack}>
      <MDButton>点击我</MDButton>
    </MDTip>
  );
});
