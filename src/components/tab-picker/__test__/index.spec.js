
import renderer from 'react-test-renderer'
import MDTabPicker from '../index'

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDTabPicker />).toJSON()
  expect(component).toMatchSnapshot()
})
