import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import MDCheckBox from '../../check-box/index';
import MDCheck from '../../check/index';
import MDCheckGroup from '../index';

configure({ adapter: new Adapter() });

const data = [
  { value: 'self', label: '自己' },
  { value: 'couple', label: '配偶' },
  { value: 'parent', label: '父母' },
  { value: 'child', label: '子女' },
];

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDCheckGroup>
        <View>
          {data.map((item, index) => {
            return (
              <MDCheckBox
                key={index}
                value={item.value}
                label={item.label}
                disabled={true}
              />
            );
          })}
        </View>
        <View>
          <MDCheck value='watermelon' label='西瓜' />
          <MDCheck value='apple' label='苹果' />
          <MDCheck value='banana' label='香蕉' />
          <MDCheck value='tomato' label='西红柿' disabled={true} />
        </View>
        <View>
          <MDCheck label='旅游' />
          <MDCheck label='阅读' />
        </View>
        <View>
          <Text>最喜欢那些</Text>
        </View>
        <View />
      </MDCheckGroup>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with not children', () => {
  const component = renderer.create(<MDCheckGroup />).toJSON();
  expect(component).toMatchSnapshot();
});

it('test onChange event', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheckGroup onChange={mockCallBack}>
      <MDCheckBox value='self' label='自己' disabled={true} />
      <MDCheckBox value='couple' label='配偶' />
      <MDCheckBox value='parent' label='父母' />
      <MDCheckBox value='child' label='子女' />
    </MDCheckGroup>
  );
  expect(check.find('MDCheckBox')).toHaveLength(4);
  check
    .find('MDCheckBox')
    .last()
    .shallow()
    .find('TouchableWithoutFeedback')
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(['child']);
});

it('test children onChange event', () => {
  const mockCallBack = jest.fn();
  const mockCallBack2 = jest.fn();
  const check = shallow(
    <MDCheckGroup onChange={mockCallBack}>
      <MDCheckBox value='self' label='自己' disabled={true} />
      <MDCheckBox value='couple' label='配偶' />
      <MDCheckBox value='parent' label='父母' />
      <MDCheckBox onChange={mockCallBack2} value='child' label='子女' />
    </MDCheckGroup>
  );
  expect(check.find('MDCheckBox')).toHaveLength(4);
  check
    .find('MDCheckBox')
    .last()
    .shallow()
    .find('TouchableWithoutFeedback')
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(['child']);
  expect(mockCallBack2.mock.calls.length).toEqual(1);
  expect(mockCallBack2.mock.calls[0][0]).toEqual(true);
  expect(mockCallBack2.mock.calls[0][1]).toEqual('child');
});

it('test public method', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCheckGroup onChange={mockCallBack}>
      <MDCheckBox value='self' label='自己' disabled={true} />
      <MDCheckBox value='couple' label='配偶' />
      <MDCheckBox value='parent' label='父母' />
      <MDCheckBox value='child' label='子女' />
    </MDCheckGroup>
  );

  const instance: any = component.instance();
  expect(instance.state.values).toEqual([]);
  instance.check('couple');
  expect(instance.state.values).toEqual(['couple']);
  instance.check('parent');
  expect(instance.state.values).toEqual(['couple', 'parent']);
  instance.check('self');
  expect(instance.state.values).toEqual(['couple', 'parent', 'self']);
  instance.uncheck('parent');
  expect(instance.state.values).toEqual(['couple', 'self']);
  instance.toggle('parent');
  expect(instance.state.values).toEqual(['couple', 'self', 'parent']);
  instance.toggle('parent');
  expect(instance.state.values).toEqual(['couple', 'self']);

  instance.uncheck('boy');
  expect(instance.state.values).toEqual(['couple', 'self']);

  instance.check('boy');
  expect(instance.state.values).toEqual(['couple', 'self', 'boy']);
  instance.check('boy');
  expect(instance.state.values).toEqual(['couple', 'self', 'boy']);
});

it('test custom style', () => {
  const component = shallow(
    <MDCheckGroup style={{ backgroundColor: 'red' }}>
      <MDCheckBox value='self' label='自己' disabled={true} />
      <MDCheckBox value='couple' label='配偶' />
      <MDCheckBox value='parent' label='父母' />
      <MDCheckBox value='child' label='子女' />
    </MDCheckGroup>
  );

  expect(component.find('View').get(0).props.style).toHaveProperty(
    'backgroundColor',
    'red'
  );
});
