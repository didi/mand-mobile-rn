;
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import {
  IMDBorderShadowProps,
  IMDBoxShadowProps,
  MDBorderShadow,
  MDBoxShadow,
} from '../index';

const BoxShadowOpt: IMDBoxShadowProps = {
  width: 100,
  height: 100,
  color: '#333',
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};

const BorderShadowOpt: IMDBorderShadowProps = {
  width: 100,
  color: '#333',
  border: 2,
  opacity: 0.2,
  side: 'bottom',
  inset: false,
  style: { marginVertical: 5 },
};

it('renders correctly with defaults', () => {
  const component = renderer.create(<MDBoxShadow />).toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with box shadow', () => {
  const component = renderer
    .create(
      <MDBoxShadow {...BoxShadowOpt}>
        <View style={{ width: 100, height: 100, backgroundColor: 'white' }} />
      </MDBoxShadow>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with border shadow', () => {
  const component = renderer
    .create(
      <MDBorderShadow {...BorderShadowOpt}>
        <View
          style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
        />
      </MDBorderShadow>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with invalid color string', () => {
  const invalidSetting = Object.assign({}, BoxShadowOpt, {
    color: '123',
  });
  try {
    renderer
      .create(
        <MDBoxShadow {...invalidSetting}>
          <View style={{ width: 100, height: 100, backgroundColor: 'white' }} />
        </MDBoxShadow>
      )
      .toJSON();
  } catch (error) {
    expect(error).toEqual(Error('Invalid Color!'));
  }
});

it('render correctly with top border shadow', () => {
  const borderShadowOpt = Object.assign({}, BorderShadowOpt, {
    side: 'top',
  });

  const component = renderer
    .create(
      <MDBorderShadow {...borderShadowOpt}>
        <View
          style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
        />
      </MDBorderShadow>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with other side border shadow', () => {
  const borderShadowOpt = Object.assign({}, BorderShadowOpt, {
    side: 'left',
  });

  try {
    renderer.create(
      <MDBorderShadow {...borderShadowOpt}>
        <View
          style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
        />
      </MDBorderShadow>
    );
  } catch (error) {
    expect(error).toEqual(
      Error('Wrong Type of Side! We just support \'top\' and \'bottom\'')
    );
  }
});

it('render border shadow correctly with string child', () => {
  const component = renderer
    .create(<MDBorderShadow {...BorderShadowOpt}>children</MDBorderShadow>)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render box shadow correctly with string child', () => {
  const component = renderer
    .create(<MDBoxShadow {...BoxShadowOpt}>children</MDBoxShadow>)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render border shadow correctly with true inset ', () => {
  const borderShadowOpt = Object.assign({}, BorderShadowOpt, {
    inset: true,
  });

  const component = renderer
    .create(
      <MDBorderShadow {...borderShadowOpt}>
        <View
          style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
        />
      </MDBorderShadow>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render border shadow correctly with undefined setting', () => {
  const component = renderer
    .create(
      <MDBorderShadow side='top'>
        <View
          style={{ width: 100, height: 100, backgroundColor: 'lightblue' }}
        />
      </MDBorderShadow>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render correctly with hex color string', () => {
  const invalidSetting = Object.assign({}, BoxShadowOpt, {
    color: '#123456AA',
  });
  try {
    renderer
      .create(
        <MDBoxShadow {...invalidSetting}>
          <View style={{ width: 100, height: 100, backgroundColor: 'white' }} />
        </MDBoxShadow>
      )
      .toJSON();
  } catch (error) {
    expect(error).toEqual(Error('Invalid Color!'));
  }
});
