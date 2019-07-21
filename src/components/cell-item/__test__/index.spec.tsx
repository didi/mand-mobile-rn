// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import MDCellItem from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDCellItem />).toJSON();
  expect(component).toMatchSnapshot();
});

it('test press event', () => {
  const mockCallBack = jest.fn();
  const cellItem = shallow(<MDCellItem onPress={mockCallBack} />);
  cellItem.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('test disabled press event', () => {
  const mockCallBack = jest.fn();
  const cellItem = shallow(
    <MDCellItem disabled={true} onPress={mockCallBack} />
  );
  cellItem.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('renders correctly with "title"', () => {
  const component = renderer
    .create(
      <MDCellItem
        title='普通条目'
        onPress={() => {
          console.log('press');
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with "arrow" and "disable"', () => {
  const component = renderer
    .create(<MDCellItem title='普通条目' arrow={true} disabled={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with "brief" and "addon"', () => {
  const component = renderer
    .create(
      <MDCellItem
        title='招商银行(尾号2342)'
        brief='展示摘要描述'
        addon='附加文案'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with solt', () => {
  const component = renderer
    .create(
      <MDCellItem
        title='招商银行(尾号2342)'
        brief='展示摘要描述'
        addon='附加文案'
        right={
          <View
            style={{
              width: 44,
              height: 44,
              backgroundColor: '#E6E6E6',
              borderRadius: 22,
            }}
          />
        }
        left={
          <View
            style={{
              width: 44,
              height: 44,
              backgroundColor: '#E6E6E6',
              borderRadius: 22,
            }}
          />
        }
        below={
          <Text style={{ fontSize: 12, color: '#858B9C' }}>
            面向金融场景的Vue移动端UI组件库，丰富、灵活、实用，快速搭建优质的金融类产品，让复杂的金融场景变简单。基于「合理、好用」设计价值观，从交互操作、视觉抽象、图形可视等角度共同解决问题。
          </Text>}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with "children"', () => {
  const component = renderer
    .create(
      <MDCellItem arrow={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 24, height: 24, backgroundColor: '#E6E6E6' }} />
          <Text style={{ marginLeft: 15, color: '#2F86F6', fontSize: 16 }}>
            信用付
          </Text>
        </View>
      </MDCellItem>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('rendering fails when sytles is null', () => {
  // @ts-ignore
  const component = renderer.create(<MDCellItem styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});
