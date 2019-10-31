// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
;
import { TouchableOpacity, View } from 'react-native';
import renderer from 'react-test-renderer';
import MDCodebox from '../../code-box/index';
import MDCountdown from '../countdown';
import MDCaptcha from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDCaptcha />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with title', () => {
  const component = renderer.create(<MDCaptcha title='title' />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with maxlength', () => {
  const component = renderer
    .create(<MDCaptcha title='title' maxlength={6} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha without maxlength', () => {
  const component = renderer
    .create(<MDCaptcha title='title' maxlength={-1} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with brief', () => {
  const component = renderer
    .create(
      <MDCaptcha
        title='title'
        maxlength={-1}
        brief='最新验证码依然有效，请勿重发'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with security', () => {
  const component = renderer
    .create(<MDCaptcha title='title' maxlength={-1} security={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with visible', () => {
  const component = renderer
    .create(<MDCaptcha title='title' maxlength={-1} isVisible={true} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with text slot', () => {
  const component = renderer
    .create(
      <MDCaptcha title='title' maxlength={-1}>
        testtest
      </MDCaptcha>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with ReactNode slot', () => {
  const component = renderer
    .create(
      <MDCaptcha title='title' maxlength={-1}>
        <View />
      </MDCaptcha>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with a view', () => {
  const component = renderer.create(<MDCaptcha isView={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with error', () => {
  const component = renderer
    .create(<MDCaptcha error='您的输入有误，请重新输入' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly captcha with custom countdown number', () => {
  const component = renderer
    .create(<MDCaptcha countdownNumber={120} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test show event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCaptcha onShow={mockCallBack} isVisible={false} />
  );
  component.setProps({ isVisible: true });
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('test dismiss event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCaptcha onDismiss={mockCallBack} isVisible={true} />
  );
  component.setProps({ isVisible: false });
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('test close event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCaptcha onClose={mockCallBack} isVisible={true} />
  );
  component
    .findWhere((n: any) => {
      return n.type() === TouchableOpacity && n.props().style.zIndex === 1301;
    })
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('test send event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCaptcha onSend={mockCallBack} isVisible={true} />
  );
  expect(component.find('MDCountdown')).toHaveLength(1);

  component
    .findWhere((n: any) => {
      return n.type() === Text && n.text() === '发送验证码';
    })
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('test submit event', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCaptcha onSubmit={mockCallBack} isVisible={true} />
  );
  expect(component.find('MDCodebox')).toHaveLength(1);
  component.find('MDCodebox').simulate('changeText', '1234');
  expect(mockCallBack.mock.calls.length).toEqual(1);
  expect(mockCallBack.mock.calls[0][1]).toEqual('1234');
});

it('test default countdown', () => {
  const component = renderer.create(<MDCountdown />).toJSON();
  expect(component).toMatchSnapshot();
});

it('test countdown number for countdown', () => {
  const mockCallBack = jest.fn();
  const component = shallow(
    <MDCountdown countdownNumber={50} onSend={mockCallBack} />
  );

  component
    .findWhere((n: any) => {
      return n.type() === Text && n.text() === '发送验证码';
    })
    .simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
