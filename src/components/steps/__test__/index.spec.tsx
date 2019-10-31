;
import renderer from 'react-test-renderer';
import MDSteps from '../index';

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<MDSteps steps={[{ title: '登录' }, { title: '成功' }]} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
