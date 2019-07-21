import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDPopupTitleBar, { MDPopupTitleBarStyles } from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDPopupTitleBar />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with normal props', () => {
  const component = renderer
    .create(
      <MDPopupTitleBar
        title='Prevent Mask Click'
        describe='Prevent Mask Click Prevent Mask Click'
        cancelText='cancel'
        okText='ok'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with solt', () => {
  const component = renderer
    .create(
      <MDPopupTitleBar
        title={<Text style={{ color: '#f4a' }}>Prevent Mask Click</Text>}
        cancelText={<Text style={{ color: '#f4a' }}>取消</Text>}
        okText={<Text style={{ color: '#f4a' }}>取消</Text>}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test press event', () => {
  const mockCancelCallBack = jest.fn();
  const mockConfirmCallBack = jest.fn();
  const component = shallow(
    <MDPopupTitleBar
      title='Prevent Mask Click'
      cancelText='cancel'
      okText='ok'
      onCancel={mockCancelCallBack}
      onConfirm={mockConfirmCallBack}
    />
  );
  component
    .find('TouchableWithoutFeedback')
    .first()
    .simulate('press');
  expect(mockCancelCallBack.mock.calls.length).toEqual(1);
  component
    .find('TouchableWithoutFeedback')
    .last()
    .simulate('press');
  expect(mockConfirmCallBack.mock.calls.length).toEqual(1);
});

it('test custom style', () => {
  const styles = {
    ...MDPopupTitleBarStyles,
    wrapper: {
      ...MDPopupTitleBarStyles.wrapper,
      backgroundColor: 'red',
    },
    icon: {
      ...MDPopupTitleBarStyles.wrapper,
      backgroundColor: 'green',
    },
  };
  const component = shallow(
    <MDPopupTitleBar
      styles={styles}
      title='Prevent Mask Click'
      cancelText='cancel'
      okText='ok'
    />
  );

  expect(component.find('View').get(0).props.style[0]).toHaveProperty(
    'backgroundColor',
    'red'
  );
});
