import * as React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';
import MDButton, { MDButtonType } from '../index';

const ButtonTypeEnum = ['default', 'primary', 'warning', 'disabled', 'link'];

it('renders correctly with different type', () => {
  for (const item in ButtonTypeEnum) {
    const instance = renderer
      .create(
        <MDButton type={ButtonTypeEnum[item] as MDButtonType}>
          {item} button
        </MDButton>
      )
      .toJSON();
    expect(instance).toMatchSnapshot();
  }
});

it('renders correctly with round', () => {
  const round = renderer
    .create(<MDButton round={true}>Default & Round button</MDButton>)
    .toJSON();
  expect(round).toMatchSnapshot();
});

it('renders correctly with plain', () => {
  for (const key in ButtonTypeEnum) {
    const instance = renderer
      .create(
        <MDButton type={ButtonTypeEnum[key] as MDButtonType} plain={true}>
          Default & Plain button
        </MDButton>
      )
      .toJSON();
    expect(instance).toMatchSnapshot();
  }
});

it('renders correctly with size', () => {
  const instance = renderer
    .create(<MDButton size={'small'}>Default & Small button</MDButton>)
    .toJSON();
  expect(instance).toMatchSnapshot();

  const customWidth = renderer
    .create(<MDButton size={{ width: 150 }}>Custom size button</MDButton>)
    .toJSON();
  expect(customWidth).toMatchSnapshot();

  const customHeight = renderer
    .create(<MDButton size={{ height: 50 }}>Custom size button</MDButton>)
    .toJSON();
  expect(customHeight).toMatchSnapshot();

  const customFontSize = renderer
    .create(<MDButton size={{ fontSize: 24 }}>Custom size button</MDButton>)
    .toJSON();
  expect(customFontSize).toMatchSnapshot();
});

it('renders correctly with icon', () => {
  const instance = renderer
    .create(
      <MDButton size={'small'} iconPosition={'right'} icon='setting'>
        Default & icon button
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();

  const pureIconButton = renderer
    .create(<MDButton icon='setting' round={true} />)
    .toJSON();
  expect(pureIconButton).toMatchSnapshot();
});

it('renders correctly with inactive', () => {
  const instance = renderer
    .create(
      <MDButton size={'small'} inactive={true}>
        Default & icon button
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with custom children', () => {
  const instance = renderer
    .create(
      <MDButton size={'small'} inactive={true}>
        <Text style={{ fontSize: 17 }}>Custom children</Text>
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();

  expect(renderer.create(<MDButton>{''}</MDButton>).toJSON).toMatchSnapshot;
});

it('renders correctly with custom style', () => {
  const instance = renderer
    .create(
      <MDButton style={{ marginVertical: 10 }} size={'small'} inactive={true}>
        Default & Custom style
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with onPress', () => {
  const instance = renderer
    .create(
      <MDButton onPress={() => console.log('press')}>
        Default & onPress event
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();
});

it('renders correctly with custom props', () => {
  const instance = renderer
    .create(
      <MDButton
        onPress={() => console.log('press')}
        style={{ backgroundColor: '#fff' }}
        size={'small'}
        inactive={true}
        round={true}
        plain={true}
        type={'primary'}
      >
        <View>
          <Text>Custom children</Text>
        </View>
      </MDButton>
    )
    .toJSON();
  expect(instance).toMatchSnapshot();

  const pureIconButton = renderer
    .create(
      <MDButton
        onPress={() => console.log('press')}
        size={'small'}
        inactive={true}
        round={true}
        plain={true}
        type={'warning'}
        icon='setting'
      />
    )
    .toJSON();
  expect(pureIconButton).toMatchSnapshot();
});
