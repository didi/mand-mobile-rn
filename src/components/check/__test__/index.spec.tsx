// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import MDCheck, { MDCheckStyles } from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<MDCheck label='复选项' checked={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test press event', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheck label='复选项' value='apple' onChange={mockCallBack} />
  );
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(true);
  expect(mockCallBack.mock.calls[0][1]).toEqual('apple');
});

it('test press event with disabled', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheck label='复选项' disabled={true} onChange={mockCallBack} />
  );
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('test instance state with press', () => {
  const check = shallow(<MDCheck label='复选项' checked={false} />);
  const instance: any = check.instance();
  check.find('TouchableWithoutFeedback').simulate('press');
  expect(instance.state.checked).toBe(true);
  check.setProps({ checked: false });
  expect(instance.state.checked).toBe(false);
});

it('test instance state with change checked', () => {
  const check = shallow(<MDCheck label='复选项' checked={true} />);
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

it('renders correctly with custom icon', () => {
  const component = renderer
    .create(
      <MDCheck
        label='复选项'
        icon='visible'
        iconInverse='right'
        iconDisabled='wrong'
        checked={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty icon', () => {
  const component = renderer
    .create(
      <MDCheck
        label='复选项'
        icon=''
        iconInverse=''
        iconDisabled=''
        checked={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test custom style', () => {
  const styles = {
    ...MDCheckStyles,
    wrapper: {
      ...MDCheckStyles.wrapper,
      backgroundColor: 'red',
    },
    icon: {
      ...MDCheckStyles.wrapper,
      backgroundColor: 'green',
    },
    label: {
      ...MDCheckStyles.wrapper,
      backgroundColor: 'gold',
    },
  };
  const component = shallow(
    <MDCheck styles={styles} value='day' checked={true} label='日缴' />
  );

  expect(component.find('View').get(0).props.style).toHaveProperty(
    'backgroundColor',
    'red'
  );

  expect(component.find('MDIcon').get(0).props.style[0]).toHaveProperty(
    'backgroundColor',
    'green'
  );

  expect(component.find('Text').get(0).props.style[0]).toHaveProperty(
    'backgroundColor',
    'gold'
  );
});
