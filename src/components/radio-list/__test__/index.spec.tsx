// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDCellItem from '../../cell-item/index';
import MDRadioList from '../index';

configure({ adapter: new Adapter() });

const blanks = [
  {
    value: '0',
    label: '交通银行(尾号3089)',
    brief: '选项摘要描述',
  },
  {
    value: '1',
    label: '招商银行(尾号2342)',
    brief: '选项摘要描述',
    checked: true,
  },
  {
    value: '2',
    label: '建设银行(尾号4321)',
    brief: '选项摘要描述',
    disabled: true,
  },
];

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDRadioList options={blanks} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with input', () => {
  const component = renderer
    .create(
      <MDRadioList
        options={blanks}
        defaultValue=''
        hasInput={true}
        inputLabel='其他'
        inputPlaceHolder='请输入银行'
        onChange={(value, index) => {
          console.log(value, index);
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty options', () => {
  // @ts-ignore mock jsx
  const component = renderer.create(<MDRadioList options={null} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with wrong props', () => {
  const component = renderer
    // @ts-ignore mock jsx
    .create(<MDRadioList hasInput={true} inputLabel={null} options={null} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty inputLabel', () => {
  const component = renderer
    // @ts-ignore mock jsx
    .create(<MDRadioList hasInput={true} inputLabel={null} options={blanks} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with alignCenter', () => {
  const component = renderer
    .create(<MDRadioList options={blanks} defaultValue='' alignCenter={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with optionRender', () => {
  const component = renderer
    .create(
      <MDRadioList
        options={blanks}
        optionRender={(option: any) => {
          return <Text>{option.label}</Text>;
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom icon', () => {
  const component = renderer
    .create(
      <MDRadioList
        options={blanks}
        icon='visible'
        iconInverse='right'
        iconDisabled='wrong'
        iconPosition='right'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom icon 2', () => {
  const component = renderer
    .create(
      <MDRadioList
        options={blanks}
        icon='visible'
        iconInverse='right'
        iconDisabled='wrong'
        iconPosition='left'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty icon', () => {
  const component = renderer
    .create(
      <MDRadioList options={blanks} icon='' iconInverse='' iconDisabled='' />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test instance state with change defaultValue', () => {
  const component = shallow(<MDRadioList options={blanks} defaultValue='' />);
  expect(component.state('value')).toBe('');
  component.setProps({ defaultValue: '0' });
  expect(component.state('value')).toBe('0');
  component.setProps({ defaultValue: '1' });
  expect(component.state('value')).toBe('1');
});

it('test press event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDRadioList
      options={blanks}
      defaultValue=''
      hasInput={true}
      inputLabel='其他'
      inputPlaceHolder='请输入银行'
      onChange={mockCallBack}
    />
  );
  expect(component.find('MDCellItem')).toHaveLength(4);
  component
    .findWhere((n: any) => {
      return n.type() === MDCellItem && n.props().title === '交通银行(尾号3089)';
    })
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual('0');
  expect(mockCallBack.mock.calls[0][1]).toEqual(0);
  component
    .findWhere((n: any) => {
      return n.type() === MDCellItem && n.props().title === '招商银行(尾号2342)';
    })
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(2);
  expect(mockCallBack.mock.calls[1][0]).toEqual('1');
  expect(mockCallBack.mock.calls[1][1]).toEqual(1);
});

it('test focus and change text event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDRadioList
      options={blanks}
      defaultValue=''
      hasInput={true}
      inputLabel='其他'
      inputPlaceHolder='请输入银行'
      onChange={mockCallBack}
    />
  );
  expect(component.find('MDInputItem')).toHaveLength(1);

  component.find('MDInputItem').simulate('focus');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual('');
  expect(mockCallBack.mock.calls[0][1]).toEqual(3);
  component.find('MDInputItem').simulate('changeText', '浙商银行');
  expect(mockCallBack.mock.calls.length).toEqual(2);
  expect(mockCallBack.mock.calls[1][0]).toEqual('浙商银行');
  expect(mockCallBack.mock.calls[1][1]).toEqual(3);
});

it('test public method', () => {
  const component = shallow(
    <MDRadioList
      options={blanks}
      defaultValue='1'
      hasInput={true}
      inputLabel='其他'
      inputPlaceHolder='请输入银行'
    />
  );

  const instance: any = component.instance();
  expect(component.state('value')).toEqual('1');
  instance.select('0');
  expect(component.state('value')).toEqual('0');
  instance.selectByIndex(1);
  expect(component.state('value')).toEqual('1');
  instance.selectByIndex(4);
  expect(component.state('value')).toEqual('1');
  component.setProps({ options: null });
  instance.selectByIndex(1);
  expect(component.state('value')).toEqual('1');
});
