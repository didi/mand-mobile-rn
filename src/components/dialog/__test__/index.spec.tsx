import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
;
import renderer from 'react-test-renderer';
import RootView from '../../root-view';
import Dialog from '../dialog';
import MDDialog from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const rootView = renderer.create(<RootView />);
  const component = renderer
    .create(
      <MDDialog
        isVisible={true}
        icon='location'
        iconColor='#868b9b'
        closeable={true}
        title='窗口标题'
        context='人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。'
        btns={[
          {
            text: '取消',
            handle: () => console.log('zzzz', 'cancel'),
          },
          {
            text: '确认操作',
            handle: () => console.log('zzzz', 'confirm'),
          },
        ]}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with close', () => {
  const rootView = renderer.create(<RootView />);
  const component = renderer
    .create(
      <MDDialog
        isVisible={true}
        closeable={true}
        title='窗口标题'
        context='人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。'
        btns={[
          {
            text: '取消',
            handle: () => console.log('zzzz', 'cancel'),
          },
          {
            text: '确认操作',
            handle: () => console.log('zzzz', 'confirm'),
          },
        ]}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with not action', () => {
  const component = renderer
    .create(
      <MDDialog
        isVisible={true}
        icon='location'
        iconColor='#868b9b'
        closeable={true}
        context='人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。'
        btns={[]}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with two action', () => {
  const onPressMock = jest.fn();
  const component = shallow(
    <Dialog
      isVisible={true}
      closeable={true}
      icon='location'
      iconColor='#868b9b'
      svg={true}
      closable={true}
      // @ts-ignore
      context={null}
      btns={[
        {
          text: '取消',
          handle: () => console.log('zzzz', 'cancle'),
        },
        {
          text: '确认',
          handle: onPressMock,
        },
      ]}
    />
  );
  component.setProps({ isVisible: true });
  const buttons = component.find('TouchableHighlight');
  expect(buttons.length).toEqual(2);
  component.find('TouchableHighlight').forEach((btn: any) => {
    btn.simulate('press');
  });
  expect(onPressMock).toBeCalledTimes(1);
  const closeButton = component.find('TouchableOpacity');
  expect(closeButton.length).toEqual(1);
});

it('renders correctly with alert', () => {
  renderer.create(<RootView />);
  MDDialog.alert({
    isVisible: true,
    closeable: false,
    title: '警告',
    context: '您正在进行非法操作',
    confirmText: '确定',
    onConfirm: () => console.log('zzzz', 'warning'),
  });
  expect(MDDialog).toMatchSnapshot();
});

it('renders correctly with confirm', () => {
  const rootView = renderer.create(<RootView />);
  MDDialog.confirm({
    isVisible: true,
    closeable: false,
    title: '确认',
    context: '请确认是否进行操作',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.log('zzzz', 'confirm'),
  });
  expect(MDDialog).toMatchSnapshot();
});

it('renders correctly with succeed', () => {
  const rootView = renderer.create(<RootView />);
  MDDialog.succeed({
    isVisible: true,
    closable: false,
    title: '成功',
    context: '恭喜您成功完成操作',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.log('zzzz', 'succeed'),
  });
  expect(MDDialog).toMatchSnapshot();
});

it('renders correctly with failed', () => {
  const rootView = renderer.create(<RootView />);
  MDDialog.failed({
    isVisible: true,
    closable: false,
    title: '失败',
    context: '操作失败，请稍后重试',
    cancelText: '取消',
    confirmText: '确定',
    onConfirm: () => console.log('zzzz', 'failed'),
  });
  expect(MDDialog).toMatchSnapshot();
});

it('renders correctly with show', () => {
  const rootView = renderer.create(<RootView />);
  const _dialog = MDDialog.show({
    isVisible: true,
    closeable: true,
    title: '窗口标题',
    context: '人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。',
    btns: [
      {
        text: '取消',
        handle: () => console.log('zzzz', 'cancel'),
        color: 'red',
      },
      {
        text: '确认操作',
        handle: () => console.log('zzzz', 'confirm'),
      },
    ],
  });
  MDDialog.hide(_dialog.key as string);
  expect(MDDialog).toMatchSnapshot();
});

it('renders correctly three action', () => {
  const rootView = renderer.create(<RootView />);
  const _dialog = MDDialog.show({
    isVisible: true,
    closeable: true,
    title: '窗口标题',
    context: '人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。',
    btns: [
      {
        text: '取消',
        handle: () => console.log('zzzz', 'cancel'),
      },
      {
        text: '确认操作',
        handle: () => console.log('zzzz', 'confirm'),
        color: 'red',
      },
      {
        text: '确认操作',
        handle: () => console.log('zzzz', 'confirm'),
      },
    ],
  });
  MDDialog.hide(_dialog.key as string);
  expect(MDDialog).toMatchSnapshot();
});
