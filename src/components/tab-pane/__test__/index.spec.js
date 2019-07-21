import React from 'react'
import renderer from 'react-test-renderer'
import MDTabPane from '../index'

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDTabPane />).toJSON()
  expect(component).toMatchSnapshot()
})
