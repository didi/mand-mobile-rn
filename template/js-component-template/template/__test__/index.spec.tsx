import React from 'react';
import renderer from 'react-test-renderer';
import MD{{ccname}} from '../index'

it('renders correctly with defaults', () => {
  const component = renderer.create(<MD{{ccname}}></MD{{ccname}}>).toJSON();
  expect(component).toMatchSnapshot();
})