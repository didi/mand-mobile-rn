import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDCheckBox, { MDCheckBoxStyles } from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<MDCheckBox value='day' label='日缴' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheckBox
      value='day'
      label='日缴'
      disabled={true}
      onChange={mockCallBack}
    />
  );
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('renders correctly with children', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheckBox
      value='day'
      label='日缴'
      disabled={true}
      onChange={mockCallBack}
    >
      <Text> children </Text>
    </MDCheckBox>
  );
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('test onChange event', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheckBox value='day' label='日缴' onChange={mockCallBack} />
  );
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(true);
  expect(mockCallBack.mock.calls[0][1]).toEqual('day');

  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(2);
  expect(mockCallBack.mock.calls[1][0]).toEqual(false);
  expect(mockCallBack.mock.calls[1][1]).toEqual('day');
});

it('test instance state with press', () => {
  const check = shallow(<MDCheckBox label='复选项' checked={false} />);
  const instance: any = check.instance();
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(instance.state.checked).toBe(true);
  check.setProps({ checked: false });
  expect(instance.state.checked).toBe(false);
});

it('test instance state with change checked', () => {
  const check = shallow(<MDCheckBox label='复选项' checked={true} />);
  const instance: any = check.instance();
  check.setProps({ checked: false });
  expect(instance.state.checked).toBe(false);
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(instance.state.checked).toBe(true);
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(instance.state.checked).toBe(false);
  check.setProps({ checked: false });
  expect(instance.state.checked).toBe(false);
});

it('test custom style', () => {
  const styles = {
    ...MDCheckBoxStyles,
    wrapper: {
      ...MDCheckBoxStyles.wrapper,
      backgroundColor: 'red',
    },
    tag: {
      ...MDCheckBoxStyles.wrapper,
      backgroundColor: 'green',
    },
    label: {
      ...MDCheckBoxStyles.wrapper,
      backgroundColor: 'gold',
    },
  };
  const component = shallow(
    <MDCheckBox styles={styles} value='day' checked={true} label='日缴' />
  );

  expect(component.find('View').get(0).props.style[0]).toHaveProperty(
    'backgroundColor',
    'red'
  );

  expect(component.find('View').get(1).props.style).toHaveProperty(
    'backgroundColor',
    'green'
  );

  expect(component.find('Text').get(0).props.style[0]).toHaveProperty(
    'backgroundColor',
    'gold'
  );
});
