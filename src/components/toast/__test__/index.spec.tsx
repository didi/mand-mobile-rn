import React from 'react';
import renderer from 'react-test-renderer';
import MDToast from '../index';
import MDToastView from '../toast';
import MDToastWrapper from '../wrapper';

it('renders correctly with defaults', () => {
  const component = renderer
    .create(
      <MDToastWrapper key={123} hasMask={true} position='center'>
        <MDToastView content='一段文本' />
      </MDToastWrapper>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom icon', () => {
  const component = renderer
    .create(
      <MDToastWrapper key={123} hasMask={true} position='center'>
        <MDToastView icon='right' content='一段文本' />
      </MDToastWrapper>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom position', () => {
  const component = renderer
    .create(
      <MDToastWrapper key={123} hasMask={true} position='top'>
        <MDToastView icon='right' content='一段文本' />
      </MDToastWrapper>
    )
    .toJSON();
  expect(component).toMatchSnapshot();

  const bottom = renderer
    .create(
      <MDToastWrapper key={123} hasMask={true} position='bottom'>
        <MDToastView icon='right' content='一段文本' />
      </MDToastWrapper>
    )
    .toJSON();
  expect(bottom).toMatchSnapshot();
});
