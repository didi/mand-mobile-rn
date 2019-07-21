import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import MDCheckList, { MDCheckListStyles } from '../index';

configure({ adapter: new Adapter() });

const data = {
  favorites: ['apple'],
  fruits: [
    { value: 'watermelon', label: '西瓜' },
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'tomato', label: '西红柿', disabled: true },
  ],
};

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDCheckList options={data.fruits} defaultValues={data.favorites} />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDCheckList
        options={data.fruits}
        alignCenter={true}
        defaultValues={data.favorites}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty options', () => {
  const component = renderer
    // @ts-ignore
    .create(<MDCheckList options={null} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test onChange event', () => {
  const mockCallBack = jest.fn();
  const check = shallow(
    <MDCheckList
      onChange={mockCallBack}
      options={data.fruits}
      defaultValues={data.favorites}
    />
  );
  expect(check.find('MDCellItem')).toHaveLength(5);

  check
    .find('MDCellItem')
    .last()
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual(['tomato']);

  check
    .find('MDCellItem')
    .last()
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(2);
  expect(mockCallBack.mock.calls[1][0]).toEqual([]);
});

it('test custom style', () => {
  const styles = {
    ...MDCheckListStyles,
    wrapper: {
      ...MDCheckListStyles.wrapper,
      backgroundColor: 'red',
    },
    icon: {
      ...MDCheckListStyles.wrapper,
      backgroundColor: 'green',
    },
  };
  const component = shallow(
    <MDCheckList
      styles={styles}
      options={data.fruits}
      defaultValues={data.favorites}
    />
  );

  expect(component.find('View').get(0).props.style).toHaveProperty(
    'backgroundColor',
    'red'
  );

  component
    .find('MDCellItem')
    .last()
    .simulate('press');

  expect(
    component
      .find('MDCellItem')
      .last()
      .shallow()
      .find('MDIcon')
      .get(0).props.style[0]
  ).toHaveProperty('backgroundColor', 'green');
});
