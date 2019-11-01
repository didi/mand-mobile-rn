import * as React from 'react';
import renderer from 'react-test-renderer';
import MDIcon from '../index';

// const MDIconTypes = [
//   'MandMobile',
//   'AntDesign',
//   'Entypo',
//   'EvilIcons',
//   'Feather',
//   'FontAwesome',
//   'FontAwesome5',
//   'Foundation',
//   'Ionicons',
//   'MaterialCommunityIcons',
//   'MaterialIcons',
//   'Octicons',
//   'SimpleLineIcons',
//   'Zocial',
// ];

it('render correctly with default', () => {
  const icon = renderer
    .create(<MDIcon name='right' color='#fff' size='large' />)
    .toJSON();
  expect(icon).toMatchSnapshot();

  expect(() => renderer.create(<MDIcon name='' />)).toThrow();
});

// it('render correctly with vector icon', () => {
//   const icon = renderer
//     // @ts-ignore
//     .create(<MDIcon name='right' type='AntDesign' color='black' size='large' />)
//     .toJSON();
//   expect(icon).toMatchSnapshot();

//   const notExists = renderer
//     // @ts-ignore
//     .create(<MDIcon name='right' type='NotExists' />)
//     .toJSON();
//   expect(notExists).toBeNull();

//   MDIconTypes.map((key) => {
//     const _icon = renderer
//       // @ts-ignore
//       .create(<MDIcon name='arrow' type={MDIconType[key]} />)
//       .toJSON();
//     expect(_icon).toMatchSnapshot();
//   });
// });
