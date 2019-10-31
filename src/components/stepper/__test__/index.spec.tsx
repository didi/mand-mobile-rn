// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
;
import renderer from 'react-test-renderer';
import MDStepper from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const instance = renderer.create(<MDStepper />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with defaultValue', () => {
  const instance = renderer.create(<MDStepper defaultValue={10} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with value', () => {
  const instance = renderer.create(<MDStepper value={1.22} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with step', () => {
  const instance = renderer.create(<MDStepper step={1.22} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with min', () => {
  const instance = renderer.create(<MDStepper min={-10} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with max', () => {
  const instance = renderer.create(<MDStepper min={10} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const onChangeMock = jest.fn();
  const component = shallow(<MDStepper disabled={true} />);
  component.find('TouchableOpacity').forEach((btn: any) => {
    btn.simulate('press');
  });
  expect(onChangeMock).toHaveBeenCalledTimes(0);
});

it('renders correctly with readOnly', () => {
  const instance = renderer.create(<MDStepper readOnly={true} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with isInteger', () => {
  const instance = renderer.create(<MDStepper isInteger={true} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with change callback', () => {
  const onChangeMock = jest.fn();
  const component = shallow(<MDStepper onChange={onChangeMock} />);
  component.find('TouchableOpacity').forEach((btn: any) => {
    btn.simulate('press');
  });
  component.find('TextInput').simulate('changeText', '123');
  expect(onChangeMock).toHaveBeenCalledTimes(3);
});

it('renders correctly with callback is undefind', () => {
  const component = shallow(<MDStepper onChange={void 0} />);
  component.find('TouchableOpacity').forEach((btn: any) => {
    btn.simulate('press');
  });
  component.find('TextInput').simulate('changeText', '123');
  expect(component.prop('onChange')).toBeUndefined();
});

it('renders correctly with min greater than max', () => {
  const instance = renderer.create(<MDStepper min={10} max={0} />).toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with recevie new props', () => {
  const component = shallow(<MDStepper />);
  component.setProps({ value: 5 });
  expect(component.state('currentNum')).toEqual(5);
  component.setProps({ value: 5 });
  expect(component.state('currentNum')).toEqual(5);
  component.setProps({ value: '8' });
  expect(component.state('currentNum')).toEqual(8);
  component.setProps({ value: ' ' });
  expect(component.state('currentNum')).toEqual(0);
  component.setProps({ value: undefined });
  expect(component.state('currentNum')).toEqual(0);
  component.setProps({ value: false });
  expect(component.state('currentNum')).toEqual(0);
});

it('renders correctly with styles is null', () => {
  // @ts-ignore
  const component = renderer.create(<MDStepper styles={null} />).toJSON();
  expect(component).toMatchSnapshot();
});
