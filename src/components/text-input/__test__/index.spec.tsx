// @ts-ignore
import { configure, render, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
;
import { NativeModules } from 'react-native';
import renderer from 'react-test-renderer';
import MDTextInput, { MDTextInputRenderKeys } from '../index';

configure({ adapter: new Adapter() });
jest.useFakeTimers();

it('render correctly with default', () => {
  const component = renderer.create(<MDTextInput />).toJSON();
  expect(component).toMatchSnapshot();
});

it('test public method', (done) => {
  const component = shallow(<MDTextInput />);
  const instance: any = component.instance();
  instance.focus();
  setTimeout(() => {
    expect(instance.state.isEditing).toBe(true);
    done();
  }, 100);
  instance.blur();
  setTimeout(() => {
    expect(instance.state.isEditing).toBe(false);
    done();
  }, 100);
});

it('test focus and blur event', () => {
  const mockFocus = jest.fn();
  const mockBlur = jest.fn();
  const component = shallow(
    <MDTextInput onFocus={mockFocus} onBlur={mockBlur} />
  );
  component.find('TextInput').simulate('focus');
  expect(mockFocus.mock.calls.length).toEqual(1);
  component.find('TextInput').simulate('blur');
  expect(mockBlur.mock.calls.length).toEqual(1);
});

it('test change text event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(<MDTextInput onChangeText={mockCallBack} />);
  component.find('TextInput').simulate('changeText', '浙商银行');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][0]).toEqual('浙商银行');
});

it('test TextInput exist', () => {
  const component = shallow(<MDTextInput />);
  expect(component.find('TextInput')).toHaveLength(1);
});

it('test default keyboard type', () => {
  const component = shallow(<MDTextInput />);
  const keyboardType = component
    .find('TextInput')
    .shallow()
    .prop('keyboardType');
  expect(keyboardType).toEqual('default');
});

it('renders correctly with custom text', () => {
  const comment = renderer
    .create(
      <MDTextInput
        textRender={(value) => {
          if (value === '.') {
            return '^';
          }
        }}
      />
    )
    .toJSON();
  expect(comment).toMatchSnapshot();
});

it('renders correctly with ok text', () => {
  const comment = renderer.create(<MDTextInput okText='ok' />).toJSON();
  expect(comment).toMatchSnapshot();
});

it('renders correctly with shuffle keys', () => {
  const comment = renderer.create(<MDTextInput shuffle={true} />).toJSON();
  expect(comment).toMatchSnapshot();
});

it('renders correctly with custom text render', () => {
  const textRender = (value: MDTextInputRenderKeys) => {
    const values = {
      0: '零',
      1: '壹',
      2: '贰',
      3: '叁',
      4: '肆',
      5: '伍',
      6: '陆',
      7: '柒',
      8: '捌',
      9: '玖',
      '.': '點',
    };
    return values[value];
  };

  const comment = renderer
    .create(<MDTextInput textRender={textRender} />)
    .toJSON();
  expect(comment).toMatchSnapshot();
});

it('renders correctly with default value', () => {
  const comment1 = shallow(<MDTextInput defaultValue='default value' />);
  expect(comment1.state('value')).toEqual('default value');

  const comment2 = shallow(<MDTextInput value='default value' />);
  expect(comment2.state('value')).toEqual('default value');
});

it('renders correctly in android', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const androidComponent = renderer.create(<MDTextInput />).toJSON();
  expect(androidComponent).toMatchSnapshot();
});

it('renders correctly with clear button in android', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const clearButtonModes = [
    'never',
    'always',
    'while-editing',
    'unless-editing',
  ];

  for (const clearButtonMode of clearButtonModes) {
    const instance = renderer
      .create(<MDTextInput clearButtonMode={clearButtonMode as any} />)
      .toJSON();
    expect(instance).toMatchSnapshot();
  }
});

it('test clear button function', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });

  const component = shallow(
    <MDTextInput clearButtonMode='always' value='test' />
  );
  component.find('TouchableOpacity').simulate('press');
  expect(component.state('value')).toEqual('');
});

it('renders correctly with clearButtonMode equal to always', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const component = shallow(<MDTextInput clearButtonMode='always' />);
  expect(component.find('MDIcon')).toHaveLength(1);
});

it('renders correctly with clearButtonMode equal to never', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const component = shallow(
    <MDTextInput clearButtonMode='never' value='12333' />
  );
  expect(component.find('MDIcon')).toHaveLength(0);
});

it('renders correctly with clearButtonMode equal to while-editing', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const component = shallow(<MDTextInput clearButtonMode='while-editing' />);
  expect(component.find('MDIcon')).toHaveLength(0);
  component.find('TextInput').simulate('focus');
  component.find('TextInput').simulate('changeText', '浙商银行');
  expect(component.find('MDIcon')).toHaveLength(1);
});

it('renders correctly with clearButtonMode equal to unless-editing', () => {
  jest.mock('Platform', () => {
    return { OS: 'android' };
  });
  const component = shallow(<MDTextInput clearButtonMode='unless-editing' />);
  expect(component.find('MDIcon')).toHaveLength(1);
  component.find('TextInput').simulate('focus');
  component.find('TextInput').simulate('changeText', '浙商银行');
  expect(component.find('MDIcon')).toHaveLength(0);
});

it('renders correctly with received props', () => {
  const component = shallow(<MDTextInput />);
  component.setProps({ value: '123' });
  expect(component.state('value')).toBe('123');
});

it('test ummount function', () => {
  beforeAll(() => {
    // NativeModules.MDNumberKeyboard = { remove: jest.fn() };
  });
  const component = renderer.create(<MDTextInput />);
  component.unmount();
  expect(component.toJSON()).toMatchSnapshot();
});

it('test ummount function with web', () => {
  jest.mock('Platform', () => {
    return { OS: 'web' };
  });
  beforeAll(() => {
    // NativeModules.MDNumberKeyboard = { remove: jest.fn() };
  });
  const component = renderer.create(<MDTextInput />);
  component.unmount();
  expect(component.toJSON()).toMatchSnapshot();
});

it('test null function', () => {
  const component = shallow(
    <MDTextInput
      onBlur={undefined}
      onFocus={undefined}
      onChangeText={undefined}
    />
  );
  component.find('TextInput').simulate('focus');
  component.find('TextInput').simulate('blur');
  component.find('TextInput').simulate('changeText', '浙商银行');
  expect(component.state('value')).toEqual('浙商银行');
});

it('renders correctly with native type', () => {
  jest.mock('NativeModules', () => {
    return {
      NativeModules: {
        remove: jest.fn(),
        setup: jest.fn(),
      },
    };
  });

  const component1 = renderer.create(<MDTextInput type='professional' />);
  expect(component1.toJSON()).toMatchSnapshot();

  const component2 = renderer.create(<MDTextInput type='simple' />);
  expect(component2.toJSON()).toMatchSnapshot();

  const component3 = renderer.create(<MDTextInput type='system' />);
  expect(component3.toJSON()).toMatchSnapshot();
});
