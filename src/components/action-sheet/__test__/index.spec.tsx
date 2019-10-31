import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import renderer from 'react-test-renderer';
import MDActionSheet from '../index';
import OptionModel from '../option-model';

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

it('renders correctly with props', () => {
  const component = renderer
    .create(
      <MDActionSheet
        options={dataList}
        title={'标题'}
        isVisible={true}
        cancelText={'取消'}
        defaultIndex={2}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test changing props', () => {
  const mockOnChooseCallBack = jest.fn();
  const mockOnCancleCallBack = jest.fn();
  const component = shallow(
    <MDActionSheet
      options={dataList}
      title={'标题'}
      isVisible={true}
      cancelText={'取消'}
      defaultIndex={2}
      onChoose={mockOnChooseCallBack}
      onCancle={mockOnCancleCallBack}
    />
  );

  // const instance: any = component.instance();
  // component.setProps({ isVisible: true });
  // component.setProps({ defaultIndex: 1 });
});
