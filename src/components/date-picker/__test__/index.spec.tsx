import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
;
import renderer from 'react-test-renderer';
import MDDatePicker from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDDatePicker />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with Date mode', () => {
  const component = renderer
    .create(
      <MDDatePicker
        todayText='今天'
        minDate={new Date('2013/9/9')}
        maxDate={new Date('2020/9/9')}
        defaultDate={new Date('2019/9/9')}
        isView={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with Time mode', () => {
  const component = renderer
    .create(
      <MDDatePicker
        type='time'
        unit-text={['', '', '', '\'', '\'\'']}
        minute-step='1'
        isView={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with DateTime mode', () => {
  const component = renderer
    .create(
      <MDDatePicker
        type='datetime'
        minDate={new Date('2019/9/9')}
        isView={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with cuntom mode', () => {
  const component = renderer
    .create(
      <MDDatePicker
        type='custom'
        title='选择出险时间'
        textRender={() => {
          // @ts-ignore
          const args = Array.prototype.slice.call(arguments);
          const typeFormat = args[0]; // 类型
          // const column0Value = args[1] // 第1列选中值
          // const column1Value = args[2] // 第2列选中值
          const column2Value = args[3]; // 第3列选中值
          if (typeFormat === 'dd') {
            return `*${column2Value}日`;
          }
        }}
        customTypes={['yyyy', 'MM', 'dd', 'hh', 'mm']}
        defaultDate={new Date('2019/9/9')}
        isView={true}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('test public method', () => {
  const component = mount(
    <MDDatePicker
      type='custom'
      title='选择出险时间'
      textRender={() => {
        // @ts-ignore
        const args = Array.prototype.slice.call(arguments);
        const typeFormat = args[0]; // 类型
        // const column0Value = args[1] // 第1列选中值
        // const column1Value = args[2] // 第2列选中值
        const column2Value = args[3]; // 第3列选中值
        if (typeFormat === 'dd') {
          return `*${column2Value}日`;
        }
      }}
      customTypes={['yyyy', 'MM', 'dd', 'hh', 'mm']}
      defaultDate={new Date()}
      isView={true}
    />
  );

  const instance: any = component.instance();
  expect(instance.getFormatDate('yyyy-MM-dd hh:mm')).toEqual('1');
  // expect(instance.getColumnValue(1)).toEqual('1');
  // expect(instance.getColumnValues()).toEqual('1');
  // expect(instance.getColumnIndex(1)).toEqual('1');
  // expect(instance.getColumnIndexs()).toEqual('1');
});
