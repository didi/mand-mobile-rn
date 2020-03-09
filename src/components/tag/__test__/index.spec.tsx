import * as React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import MDTag from '../index';

it('renders correctly with different type', () => {
  const tagType = ['fill', 'ghost'];
  for (const item in tagType) {
    if (tagType.hasOwnProperty(item)) {
      const element = tagType[item] as any;
      const instance = renderer
        .create(<MDTag type={element}>{item} tag</MDTag>)
        .toJSON();
      expect(instance).toMatchSnapshot();
    }
  }
});

it('renders correctly with different size', () => {
  const tagSize = ['tiny', 'small', 'large'];
  for (const item in tagSize) {
    if (tagSize.hasOwnProperty(item)) {
      const element = tagSize[item] as any;
      const instance = renderer
        .create(<MDTag size={element}>{item} tag</MDTag>)
        .toJSON();
      expect(instance).toMatchSnapshot();
    }
  }
});

it('renders correctly with different shape', () => {
  const tagShape = ['square', 'circle', 'fillet', 'quarter', 'coupon', 'bubble'];
  for (const item in tagShape) {
    if (tagShape.hasOwnProperty(item)) {
      const element = tagShape[item] as any;
      const instance = renderer
        .create(<MDTag shape={element}>{item} tag</MDTag>)
        .toJSON();
      expect(instance).toMatchSnapshot();
    }
  }
});

it('renders correctly with different sharp', () => {
  const tagSharpType = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  for (const item in tagSharpType) {
    if (tagSharpType.hasOwnProperty(item)) {
      const element = tagSharpType[item] as any;
      const instance = renderer
        .create(
          <MDTag shape='circle' sharp={element}>
            {item} tag
          </MDTag>
        )
        .toJSON();
      expect(instance).toMatchSnapshot();
    }
  }
});

it('renders correctly with gradient style', () => {
  const component = renderer
    .create(
      <MDTag
        gradientStyle={{
          colors: ['#FC7353', '#FC9153'],
          start: { x: 0.0, y: 0.5 },
          end: { x: 1.0, y: 0.5 },
        }}
      >
        99
      </MDTag>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly width children', () => {
  const component = renderer
    .create(
      <MDTag>
        <View style={{ width: 20, height: 20 }} />
      </MDTag>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
