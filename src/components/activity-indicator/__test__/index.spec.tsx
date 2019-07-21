import React from 'react';
import { View, ViewStyle } from 'react-native';
import renderer from 'react-test-renderer';
import MDActivityIndicator, { MDActivityIndicatorType } from '../index';

const _style: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
};

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDActivityIndicator />).toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with normal roller', () => {
  const component = renderer
    .create(
      <MDActivityIndicator style={_style} size={10} textSize={8}>
        加载中
      </MDActivityIndicator>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with column roller', () => {
  const component = renderer
    .create(
      <MDActivityIndicator style={_style} size={10} textSize={8} column={true}>
        column loading
      </MDActivityIndicator>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with text', () => {
  const component = renderer
    .create(
      <MDActivityIndicator style={_style}>loading...</MDActivityIndicator>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with dark spinner', () => {
  const component = renderer
    .create(
      <MDActivityIndicator
        color='dark'
        style={_style}
        type='spinner'
        size={10}
        textSize={8}
      >
        加载中...
      </MDActivityIndicator>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with light spinner', () => {
  const component = renderer
    .create(
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 2,
          padding: 10,
        }}
      >
        <MDActivityIndicator
          style={_style}
          color='light'
          type='spinner'
          size={15}
          textSize={10}
        >
          加载中...
        </MDActivityIndicator>
      </View>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with Carousel', () => {
  const component = renderer
    .create(
      <MDActivityIndicator type='carousel' size={5} />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with Carousel set color', () => {
  const component = renderer
    .create(
      <MDActivityIndicator
        style={_style}
        type='carousel'
        size={5}
        color='#fff'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with stop animating', () => {
  const component = renderer
    .create(
      <MDActivityIndicator style={_style} animating={false}>
        loading...
      </MDActivityIndicator>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
