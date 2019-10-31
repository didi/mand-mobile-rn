import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import renderer from 'react-test-renderer';
import MDButton from '../../button';
import MDCaptcha from '../../captcha';
import MDIcon from '../../icon';
import MDNoticeBar from '../../notice-bar';
import MDCashierChannel from '../cashier-channel';
import MDCashier from '../index';

configure({ adapter: new Adapter() });

const channels = [
  {
    icon: <MDIcon name='close' size={24} />,
    text: '招商银行(0056)',
    value: '001',
  },
  {
    icon: <MDIcon name='arrow' size={24} />,
    text: '支付宝支付',
    value: '002',
  },
  {
    icon: <MDIcon name='scan' size={24} />,
    text: '微信支付',
    value: '003',
  },
  {
    icon: <MDIcon name='' size={24} />,
    text: '工商银行',
    value: '004',
  },
  {
    icon: <MDIcon name='right' size={24} />,
    text: '农业银行',
    value: '005',
  },
];

function renderChannel (channel: any, index: number) {
  return (
    <TouchableWithoutFeedback key={index}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {channel.icon}
          <Text style={{ marginLeft: 24, color: '#41485d' }}>
            {channel.text}
          </Text>
        </View>
        <MDIcon name='checked' size={16} />
      </View>
    </TouchableWithoutFeedback>
  );
}

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDCashierChannel
        channelData={[]}
        renderChannel={(a: object, i: number) => {
          return <View />;
        }}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with default cashier', () => {
  const component = renderer.create(<MDCashier />).toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with visiable cashier', () => {
  const component = renderer.create(<MDCashier visible={true} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with channels', () => {
  const component = renderer
    .create(<MDCashier channelData={channels} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom renderChannels', () => {
  const component = renderer
    .create(<MDCashier channelData={channels} renderChannel={renderChannel} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with paymentAmount', () => {
  const component1 = renderer
    .create(<MDCashier paymentAmount={1000} />)
    .toJSON();
  expect(component1).toMatchSnapshot();

  const component2 = renderer.create(<MDCashier paymentAmount={10} />).toJSON();
  expect(component2).toMatchSnapshot();
});

it('render cashier correctly with channelLimit', () => {
  const component = renderer.create(<MDCashier channelLimit={2} />).toJSON();
  expect(component).toMatchSnapshot();
});

it('render cashier correctly with header slot', () => {
  const component = renderer
    .create(
      <MDCashier
        header={
          <MDNoticeBar mode='close' left='security' type='warning'>
            该银行3:00-12:00系统维护，请更换其他银行卡
          </MDNoticeBar>
        }
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test onShow and on dismiss function', (done) => {
  const mockOnShow = jest.fn();
  const mockOnDismiss = jest.fn();
  const component = shallow(
    <MDCashier onShow={mockOnShow} onDismiss={mockOnDismiss} visible={false} />
  );
  component.setProps({ visible: true });
  setTimeout(() => {
    expect(mockOnShow.mock.calls.length).toEqual(1);
    done();
  }, 300);
  component.setProps({ visible: false });
  setTimeout(() => {
    expect(mockOnDismiss.mock.calls.length).toEqual(1);
    done();
  }, 300);
});

it('test onPay and onSelect function', () => {
  const mockOnPay = jest.fn();
  const mockOnSelect = jest.fn();
  const component = shallow(
    <MDCashier
      channelData={channels}
      onPay={mockOnPay}
      onSelect={mockOnSelect}
      visible={true}
      custom={<Text>测试scene</Text>}
    />
  );
  const cashier = component.find('MDCashierChannel').shallow();
  cashier
    .find('TouchableWithoutFeedback')
    .at(0)
    .simulate('press');
  expect(mockOnSelect.mock.calls.length).toEqual(1);
  component.find('MDButton').simulate('press');
  expect(mockOnPay.mock.calls.length).toEqual(1);
  expect(component.state('loading')).toBe(true);
});

it('test next function', () => {
  const component = shallow(<MDCashier />);
  const instance: any = component.instance();
  instance.next('loading');
  expect(component.state('scene')).toEqual('loading');
  // todo expect 1
  // expect(component.find('MDActivityIndicator')).toHaveLength(0);

  instance.next('captcha', {
    text: 'Verification code sent to 156 **** 8965',
    brief: 'The latest verification code is still valid',
    autoCountdown: false,
    countNormalText: 'Send Verification code',
    countActiveText: 'Retransmission after {$1}s',
  });
  expect(component.find('MDCaptcha')).toHaveLength(1);

  const mockSuccessHandler = jest.fn();
  instance.next('success', { buttonText: '成功', handler: mockSuccessHandler });
  expect(component.find('MDIcon')).toHaveLength(1);
  const successButton = component.findWhere((w) => {
    return w.type() === MDButton && w.props().children === '成功';
  });
  expect(successButton).toHaveLength(1);
  successButton.simulate('press');
  expect(mockSuccessHandler.mock.calls.length).toEqual(1);
  expect(component.state('isPopupShow')).toBe(false);

  instance.next('fail', { buttonText: '失败' });
  expect(component.find('MDIcon')).toHaveLength(1);
  expect(
    component.findWhere((w) => {
      return w.type() === MDButton && w.props().children === '失败';
    })
  ).toHaveLength(1);

  instance.next('choose');
  expect(component.find('MDCashierChannel')).toHaveLength(1);

  instance.next('custom');
  // todo expect 1
  expect(component.findWhere((w) => w.text() === '测试scene')).toHaveLength(0);

  instance.next('test');
  expect(component.find('MDCashierChannel')).toHaveLength(1);
});

it('test title bar action', () => {
  const component = shallow(<MDCashier channelData={channels} visible={true} />);
  component
    .find('MDPopupTitleBar')
    .shallow()
    .find('TouchableWithoutFeedback')
    .simulate('press');
  expect(component.state('isPopupShow')).toBe(false);
});

it('test null function', () => {
  const component = shallow(
    <MDCashier
      channelData={channels}
      visible={false}
      onShow={undefined}
      onDismiss={undefined}
      onPay={undefined}
      onSelect={undefined}
    />
  );
  component.setProps({ visible: true });
  expect(component.state('isPopupShow')).toBe(true);
  component.setProps({ visible: false });
  expect(component.state('isPopupShow')).toBe(false);

  const cashier = component.find('MDCashierChannel').shallow();
  cashier
    .find('TouchableWithoutFeedback')
    .at(0)
    .simulate('press');
  component.find('MDButton').simulate('press');
});

it('test public property', () => {
  const component = mount(<MDCashier channelData={channels} visible={true} />);
  const instance: any = component.instance();
  expect(instance.captcha).toBeNull();

  instance.next('captcha', {
    text: 'Verification code sent to 156 **** 8965',
    brief: 'The latest verification code is still valid',
    autoCountdown: false,
    countNormalText: 'Send Verification code',
    countActiveText: 'Retransmission after {$1}s',
  });
  expect(instance.captcha).toBeInstanceOf(MDCaptcha);
});
