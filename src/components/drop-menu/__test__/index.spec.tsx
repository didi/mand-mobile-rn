import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { IMDOptionSet } from '../../types';
import MDDropMenu from '../index';

// const renderer = new ShallowRenderer();

configure({ adapter: new Adapter() });
const data = [
  {
    text: '一级选项1',
    options: [
      { value: '0', label: '二级选项1' },
      { value: '1', label: '二级选项2' },
    ],
  },
];

const initData = [
  {
    text: '1.8L',
    options: [
      { value: '1.6', checked: false, label: '1.6L' },
      { value: '1.8', checked: false, label: '1.8L' },
      { value: '2.0', checked: false, label: '2.0L' },
      { value: '1.2', checked: false, label: '1.2T' },
      { value: '1.4', checked: false, label: '1.4T' },
      { value: '1.9', checked: false, label: '1.9T' },
    ],
  },
  {
    text: '自动挡',
    options: [
      { value: '0', label: '手动挡' },
      { value: '1', label: '自动挡' },
      { value: '2', label: '手动一体' },
    ],
  },
];

it('test menu press on web', () => {
  const change = jest.fn();
  const hide = jest.fn();

  const component = mount(
    <MDDropMenu
      isShow={true}
      data={initData}
      alignCenter={true}
      onChange={change}
      onShow={() => {}}
      onHide={hide}
      defaultValue={['1.9', '3']}
    />
  );
  const componentInstance: any = component.instance();

  const instance = component.find('TouchableHighlight').at(0);
  instance.simulate('press');
  jest.useFakeTimers();
  jest.advanceTimersByTime(2000);
  // 找到RadioList
  const radioList: any = component.find('MDRadioList');
  expect(radioList.shallow()).toHaveLength(1);
  expect(radioList.shallow().find('MDCellItem')).toHaveLength(6);

  radioList
    .shallow()
    .find('MDCellItem')
    .at(3)
    .simulate('press');
  jest.useFakeTimers();
  jest.advanceTimersByTime(200);

  expect(componentInstance.state.values).toEqual(['1.2', '3']);
  expect(componentInstance.state.isShow).toBe(false);

  // 测试收起
  instance.simulate('press'); // 展开
  jest.useFakeTimers();
  jest.advanceTimersByTime(200);
  expect(componentInstance.state.isShow).toBe(true);
  const webContentContainer = component.find('TouchableHighlight').at(2);

  webContentContainer.simulate('press'); // 展开
  jest.useFakeTimers();
  jest.advanceTimersByTime(200);

  expect(componentInstance.state.isShow).toBe(false);
  component.unmount();
});
