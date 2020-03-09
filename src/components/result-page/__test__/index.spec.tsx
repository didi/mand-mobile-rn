import * as React from 'react';
import renderer from 'react-test-renderer';
import MDResultPage, {
  IMDResultPageButtonSet as ButtonProps,
  MDResultPageStyles,
  MDResultPageType,
} from '../index';

const ResultPageType = ['empty', 'lost', 'network'];

it('renders correctly with defaults', () => {
  for (const key in ResultPageType) {
    if (key) {
      const component = renderer
        .create(<MDResultPage type={key as MDResultPageType} />)
        .toJSON();
      expect(component).toMatchSnapshot();
    }
  }
});

it('renders correctly with not exists type', () => {
  const component = renderer
    .create(<MDResultPage type={'NotExists' as MDResultPageType} />)
    .toJSON();
  expect(component).toMatchSnapshot();

  const otherComponent = renderer
    .create(
      <MDResultPage
        type={'NotExists' as MDResultPageType}
        subtext='sub text'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with empty type', () => {
  const component = renderer
    .create(<MDResultPage type={'' as MDResultPageType} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom text and subtext', () => {
  const component = renderer
    .create(<MDResultPage text='主信息' subtext='副标题' />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom image', () => {
  const component = renderer
    .create(
      <MDResultPage
        text='主信息'
        subtext='副标题'
        imgUrl='https://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/empty.png'
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with custom buttons', () => {
  const firstButton: ButtonProps = {
    type: 'primary',
    text: '刷新试试',
    handler: () => console.log('refresh'),
  };

  const secondButton: ButtonProps = {
    type: 'default',
    text: '返回试试',
    handler: () => console.log('back'),
  };
  const imgUrl =
    'https://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.0/empty.png';
  const styles = {
    ...MDResultPageStyles,
    buttonWrapper: {
      marginHorizontal: 10,
    },
  };
  const component = renderer
    .create(
      <MDResultPage
        styles={styles}
        buttons={firstButton}
        text='主文案'
        subtext='副文案'
        imgUrl={imgUrl}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();

  const component2 = renderer
    .create(
      <MDResultPage
        buttons={[firstButton, secondButton, {} as ButtonProps]}
        text='主文案'
        subtext='副文案'
      />
    )
    .toJSON();
  expect(component2).toMatchSnapshot();
});
