// @ts-ignore
import { configure, render, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDIcon from '../../icon/index';
import MDInputItem from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDInputItem />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly normal input', () => {
  const component = renderer
    .create(
      <MDInputItem
        value='我输入的内容'
        placeholder='普通文本'
        title='普通文本'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled input item', () => {
  const component = renderer
    .create(<MDInputItem value='禁用表单' title='禁用表单' disabled={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with disabled input item focus function', () => {
  const component = shallow(
    <MDInputItem value='禁用表单' title='禁用表单' disabled={true} />
  );
  expect(component.find('MDTextInput')).toHaveLength(0);
  expect(component.state('value')).toEqual('禁用表单');
});

it('renders correctly with readonly input item', () => {
  const component = renderer
    .create(<MDInputItem value='只读表单' title='只读表单' readonly={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with readonly input item focus function', () => {
  const component = shallow(
    <MDInputItem value='只读表单' title='只读表单' readonly={true} />
  );
  expect(component.find('MDTextInput')).toHaveLength(0);
  expect(component.state('value')).toEqual('只读表单');
});

it('renders correctly with highlight input item', () => {
  const component = renderer
    .create(
      <MDInputItem placeholder='高亮表单' title='高亮表单' highlight={true} />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with input item highlight function', () => {
  const component = shallow(
    <MDInputItem placeholder='高亮表单' title='高亮表单' highlight={true} />
  );
  const textInput = component.find('MDTextInput');
  expect(textInput).toHaveLength(1);
  textInput.simulate('focus');
  expect(component.state('highlight')).toBe(true);
});

it('renders correctly with input item align center', () => {
  const component = renderer
    .create(
      <MDInputItem placeholder='文本居中' title='文本居中' align='center' />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with input item align center', () => {
  const component = shallow(
    <MDInputItem placeholder='文本居中' title='文本居中' align='center' />
  );
  const style = component
    .find('MDTextInput')
    .shallow()
    .props().style as any;
  expect(style[1]).toHaveProperty('textAlign', 'center');
});

it('renders correctly with input item align right', () => {
  const component = shallow(
    <MDInputItem placeholder='文本居中' title='文本居中' align='right' />
  );
  const style = component
    .find('MDTextInput')
    .shallow()
    .props().style as any;
  expect(style[1]).toHaveProperty('textAlign', 'right');
});

it('renders correctly with input item default align', () => {
  const component = shallow(
    <MDInputItem placeholder='文本居左' title='文本居左' />
  );
  const style = component
    .find('MDTextInput')
    .shallow()
    .props().style as any;
  expect(style[1]).toHaveProperty('textAlign', 'left');
});

it('renders correctly with different input item type', () => {
  const types = ['bank-card', 'password', 'phone', 'money', 'digit', 'text'];
  for (const type of types) {
    const component = renderer
      .create(
        <MDInputItem
          placeholder='bankCard xxxx xxxx xxxx xxxx'
          title='银行卡'
          type={type as any}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  }
});

it('renders correctly with text input item', () => {
  const component = shallow(
    <MDInputItem placeholder='文本' title='text' type='text' />
  );
  component.find('MDTextInput').simulate('changeText', '清泉石上流');
  expect(component.state('value')).toEqual('清泉石上流');
});

it('renders bank-card correctly', () => {
  const component = shallow(
    <MDInputItem
      placeholder='bankCard xxxx xxxx xxxx xxxx'
      title='银行卡'
      type='bank-card'
    />
  );
  component.find('MDTextInput').simulate('changeText', '6225230137797347');
  expect(component.state('value')).toEqual('6225 2301 3779 7347');
  component.find('MDTextInput').simulate('changeText', '');
  expect(component.state('value')).toEqual('');
});

it('renders correctly with phone input item', () => {
  const component = shallow(
    <MDInputItem
      placeholder='phone xxx xxxx xxxx'
      title='手机号'
      type='phone'
    />
  );
  component.find('MDTextInput').simulate('changeText', '13512345678');
  expect(component.state('value')).toEqual('135 1234 5678');
});

it('renders correctly with money input item', () => {
  const component = shallow(
    <MDInputItem placeholder='money xx,xxx.xxxx' title='金额' type='money' />
  );
  component.find('MDTextInput').simulate('changeText', '12345678.1234');
  expect(component.state('value')).toEqual('12,345,678.1234');
});

it('renders correctly with password input item', () => {
  const component = shallow(
    <MDInputItem placeholder='password *******' title='密码' type='password' />
  );
  component.find('MDTextInput').simulate('changeText', '12345678');
  expect(component.find('MDTextInput').prop('secureTextEntry')).toBe(true);
});

it('renders correctly with password digit item', () => {
  const component = shallow(
    <MDInputItem placeholder='digit 12344545' title='数字' type='digit' />
  );
  component.find('MDTextInput').simulate('changeText', '12345678');
  expect(component.state('value')).toEqual('12345678');
});

it('render correcttly with left and right slot', () => {
  const component = renderer
    .create(
      <MDInputItem
        placeholder='left/right slot'
        left={<MDIcon name='checked' size={24} />}
        right={<MDIcon name='info' size={24} color='gray' />}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render with financial number keyboard', () => {
  const component = renderer
    .create(
      <MDInputItem
        title='金融键盘'
        placeholder='financial number keyboard'
        numberKeyboard={true}
        clearable={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render with clear button', () => {
  const component = renderer
    .create(
      <MDInputItem
        title='清空按钮'
        placeholder='normal text'
        clearable={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render with Material input', () => {
  const component = renderer.create(
    <MDInputItem placeholder='投保人姓名' material={true} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

it('render Material input with text', () => {
  const component = renderer
    .create(
      <MDInputItem
        placeholder='投保人姓名'
        material={true}
        value='投保人姓名'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with error message', () => {
  const component = renderer
    .create(
      <MDInputItem
        title='手机号码'
        placeholder='手机号码'
        type='phone'
        error='手机号码无效'
        clearable={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with error slot', () => {
  const component = shallow(
    <MDInputItem
      title='银行卡号'
      placeholder='bankCard xxxx xxxx xxxx xxxx'
      type='bank-card'
      error={<Text>查看支持银行列表</Text>}
    />
  );
  component.setProps({ error: '不支持当前银行' });
  const errorSlot = component
    .find('Text')
    .findWhere((w) => w.text() === '查看支持银行列表')
    .first();
  expect(errorSlot).toHaveLength(1);
});

it('render correctly with large size', () => {
  const component = shallow(
    <MDInputItem
      placeholder='最多30万元'
      brief='理财提示文案，字符超出10个自动变小'
      type='money'
      amount={true}
      highlight={true}
    />
  );
  const input = component.find('MDTextInput');
  input.simulate('changeText', '123123217392187389');
  component.setProps({ size: 'large' });
  const style = input.shallow().props().style as any;
  expect(style[2]).toHaveProperty('fontSize');
});

it('render correctly with android large size', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const component = shallow(
    <MDInputItem
      placeholder='最多30万元'
      brief='理财提示文案，字符超出10个自动变小'
      type='money'
      amount={true}
      highlight={true}
    />
  );
  const input = component.find('MDTextInput');
  input.simulate('changeText', '123123217392187389');
  component.setProps({ size: 'large' });
  const style = input.shallow().props().style as any;
  expect(style[2]).toHaveProperty('fontSize');
});

it('test callback', () => {
  const onFocusCallback = jest.fn();
  const onBlurCallback = jest.fn();
  const onChangeTextCallback = jest.fn();
  const component = shallow(
    <MDInputItem
      placeholder='最多30万元'
      onFocus={onFocusCallback}
      onBlur={onBlurCallback}
      onChangeText={onChangeTextCallback}
    />
  );
  component.find('MDTextInput').simulate('focus');
  expect(onFocusCallback.mock.calls.length).toBe(1);
  component.find('MDTextInput').simulate('blur');
  expect(onBlurCallback.mock.calls.length).toBe(1);
  component.find('MDTextInput').simulate('changeText', '12321');
  expect(onChangeTextCallback.mock.calls[0][0]).toEqual('12321');
});

it('test null callback', () => {
  const component = shallow(
    <MDInputItem
      placeholder='最多30万元'
      onFocus={undefined}
      onBlur={undefined}
      onChangeText={undefined}
    />
  );
  component.find('MDTextInput').simulate('changeText', '12321');
  expect(component.state('value')).toEqual('12321');
});

it('render correctly with max length', () => {
  const component = shallow(
    <MDInputItem placeholder='最多30万元' maxLength={5} />
  );
  component.find('MDTextInput').simulate('changeText', '123211');
  expect(component.state('value')).toEqual('12321');
});
