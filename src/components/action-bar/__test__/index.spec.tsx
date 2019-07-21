// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDButton from '../../button';
import MDActionBar from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  // @ts-ignore
  const component = renderer.create(<MDActionBar />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with one action', () => {
  const onPressMock = jest.fn();
  const component = shallow(
    <MDActionBar
      actions={[{ text: 'text', disabled: false, onPress: onPressMock }]}
    />
  );

  const buttons = component.find('MDButton');
  expect(buttons.length).toEqual(1);
  component.find('MDButton').simulate('press');
  expect(onPressMock).toHaveBeenCalled();
});

it('renders correctly with two actions', () => {
  const onPressMock = jest.fn();
  const component = shallow(
    <MDActionBar
      actions={[
        { text: 'text', disabled: false, onPress: onPressMock },
        { disabled: true, onPress: onPressMock },
        { disabled: true },
      ]}
    />
  );
  const buttons = component.find('MDButton');
  expect(buttons.length).toEqual(2);
  component.find('MDButton').forEach((btn: any) => {
    btn.simulate('press');
  });
  expect(onPressMock).toHaveBeenCalled();
  expect(onPressMock).toBeCalledTimes(1);
});

it('renders correctly with slot', () => {
  const component = renderer
    .create(
      // @ts-ignore
      <MDActionBar>
        <Text>test</Text>
      </MDActionBar>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with styles is null', () => {
  // @ts-ignore
  const component = renderer.create(<MDActionBar styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});
