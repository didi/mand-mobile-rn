// @ts-ignore
import { configure, shallow } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import MDAgree from '../index';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const agree = renderer
    .create(<MDAgree content='勾选按钮' disabled={false} checked={true} />)
    .toJSON();
  expect(agree).toMatchSnapshot();
});

it('renders correctly with disabled', () => {
  const agree = renderer
    .create(<MDAgree content='勾选按钮' disabled={true} checked={false} />)
    .toJSON();
  expect(agree).toMatchSnapshot();
});

it('renders correctly with IconSize', () => {
  const agree = renderer
    .create(
      <MDAgree
        content='勾选按钮'
        size='large'
        disabled={false}
        checked={true}
      />
    )
    .toJSON();
  expect(agree).toMatchSnapshot();
});

it('renders custom content with solt', () => {
  const agree = renderer
    .create(
      <MDAgree
        content={
          <Text style={{ color: '#838794' }}>
            本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
            <Text style={{ color: '#5878b4' }}>《投保须知》</Text>,
            <Text style={{ color: '#5878b4' }}>《保险条款》</Text>
          </Text>}
      />
    )
    .toJSON();

  expect(agree).toMatchSnapshot();
});

it('test press event', () => {
  const mockCallBack = jest.fn();
  const cellItem = shallow(
    <MDAgree disabled={true} checked={true} onChange={mockCallBack} />
  );
  cellItem.find('TouchableOpacity').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

it('test disabled press event', () => {
  const mockCallBack = jest.fn();
  const cellItem = shallow(<MDAgree checked={false} onChange={mockCallBack} />);
  cellItem.find('TouchableOpacity').simulate('press');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
