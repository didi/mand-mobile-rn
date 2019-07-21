import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import OptionModel from '../../action-sheet/option-model';
import MDIcon from '../../icon';
import MDSelector from '../index';
configure({ adapter: new Adapter() });

const dataList: OptionModel[] = [];
dataList.push({
  optionContent: '选项1',
  optionDescribe: '这是一段内容描述1',
  disabled: false,
});
dataList.push({
  optionContent: '选项2',
  optionDescribe: '这是一段内容描述2',
  disabled: false,
});
dataList.push({
  optionContent: '选项3',
  optionDescribe: '这是一段内容描述3',
  disabled: false,
});
dataList.push({
  optionContent: '选项4',
  optionDescribe: '这是一段内容描述4',
  disabled: true,
});
dataList.push({
  optionContent: '选项5',
  optionDescribe: '这是一段内容描述5',
  disabled: false,
});

it('renders correctly with default mode', () => {
  const component = renderer
    .create(<MDSelector type={'default'} options={dataList} isVisible={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with confirm mode', () => {
  const component = renderer
    .create(<MDSelector type={'confirm'} options={dataList} isVisible={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with check mode', () => {
  const component = renderer
    .create(<MDSelector type={'check'} options={dataList} isVisible={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test press event', () => {
  const mockCancelCallBack = jest.fn();
  const component = shallow(
    <MDSelector
      type={'check'}
      options={dataList}
      isVisible={true}
      onCancle={mockCancelCallBack}
    />
  );
  // component.find('TouchableWithoutFeedback').simulate('press');
  // expect(mockCancelCallBack.mock.calls.length).toEqual(1);
});
