import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
;
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDPopup from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDPopup>
        <Text>Popup Center</Text>
      </MDPopup>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with props', () => {
  const component = renderer
    .create(
      <MDPopup
        position='center'
        transition='zoom'
        isVisible={true}
        hasMask={false}
        maskOpacity={0.3}
        maskColor='red'
        maskClosable={false}
      >
        <Text>Popup Center</Text>
      </MDPopup>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test changing props', () => {
  const mockBeforeShowCallBack = jest.fn();
  const mockShowCallBack = jest.fn();
  const mockBeforeHideCallBack = jest.fn();
  const mockHideCallBack = jest.fn();
  const component = shallow(
    <MDPopup
      position='center'
      isVisible={false}
      hasMask={true}
      maskOpacity={0.3}
      maskColor='red'
      maskClosable={false}
      onBeforeShow={mockBeforeShowCallBack}
      onShow={mockShowCallBack}
      onBeforeHide={mockBeforeHideCallBack}
      onHide={mockHideCallBack}
    >
      <Text>Popup Center</Text>
    </MDPopup>
  );

  const instance: any = component.instance();
  expect(instance.state.isVisible).toBe(false);
  component.setProps({ isVisible: true });
  expect(instance.state.isVisible).toBe(true);
  component.setProps({ isVisible: false });
  expect(instance.state.isVisible).toBe(false);

  expect(instance.state.backdropOpacity).toBe(0.3);
  component.setProps({ maskOpacity: 0.1 });
  expect(instance.state.backdropOpacity).toBe(0.1);
  component.setProps({ maskOpacity: 0.3, hasMask: false });
  expect(instance.state.backdropOpacity).toBe(0);

  component.setProps({ maskColor: 'gold' });
  expect(instance.state.backdropColor).toBe('gold');

  component.setProps({ position: 'bottom' });
  expect(instance.state.animationIn).toBe('slideInUp');
  expect(instance.state.animationOut).toBe('slideOutDown');
});

// it('test press event', () => {
//   const mockBeforeShowCallBack = jest.fn();
//   const mockShowCallBack = jest.fn();
//   const mockBeforeHideCallBack = jest.fn();
//   const mockHideCallBack = jest.fn();
//   const component = shallow(
//     <MDPopup
//       position='center'
//       transition='zoom'
//       isVisible={true}
//       hasMask={false}
//       maskOpacity={0.3}
//       maskColor='red'
//       maskClosable={true}
//       onBeforeShow={mockBeforeShowCallBack}
//       onShow={mockShowCallBack}
//       onBeforeHide={mockBeforeHideCallBack}
//       onHide={mockHideCallBack}
//     >
//       <Text>Popup Center</Text>
//     </MDPopup>
//   );

//   component
//     .find('ReactNativeModal')
//     .first()
//     .simulate('press');
//   expect(mockBeforeHideCallBack.mock.calls.length).toEqual(1);
//   expect(mockHideCallBack.mock.calls.length).toEqual(1);

//   component
//     .find('ReactNativeModal')
//     .first()
//     .simulate('press');
//   expect(mockBeforeShowCallBack.mock.calls.length).toEqual(1);
//   expect(mockShowCallBack.mock.calls.length).toEqual(1);
// });
