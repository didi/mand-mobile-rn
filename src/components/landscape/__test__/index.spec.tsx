import React from 'react'
import { Image } from 'react-native'
import renderer from 'react-test-renderer'
import MDLandscape from '../index'

it('renders correctly with defaults', () => {
  const component = renderer.create(
    <MDLandscape isVisible maskClosable hasMask>
      <Image
        source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
        style={{width: 252, height: 328}}
      />
    </MDLandscape>
  ).toJSON();
  expect(component).toMatchSnapshot();
})

it('renders correctly with fullscreen', () => {
  const component = renderer.create(
    <MDLandscape isVisible maskClosable fullScreen>
      <Image
        source={{uri: 'http://manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz'}}
        style={{width: 252, height: 328}}
      />
    </MDLandscape>
  ).toJSON();
  expect(component).toMatchSnapshot();
})