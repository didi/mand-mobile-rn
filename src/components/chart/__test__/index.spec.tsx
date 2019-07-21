import React from 'react';
import { Dimensions } from 'react-native';
import renderer from 'react-test-renderer';
import MDChart from '../index';
const width = Dimensions.get('window').width - 40; // 40 is card & container component paddings
const height = Math.round((width * 2) / 3);
const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const datasets = [
  {
    color: '#5e64ff',
    width: 1,
    theme: 'region',
    values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
  },
];

it('renders correctly with defaults', () => {
  const component = renderer
    .create(<MDChart labels={labels} datasets={datasets} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly without min and value greater than 10', () => {
  const testDatasets = datasets.slice();
  testDatasets[0].values = [20, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52];
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        max={60}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly without max and value greater than 10', () => {
  const testDatasets = datasets.slice();
  testDatasets.slice()[0].values = [
    20,
    15,
    20,
    23,
    20,
    30,
    32,
    38,
    36,
    40,
    50,
    55,
    52,
  ];
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with heat theme', () => {
  const testDatasets = datasets.slice();
  testDatasets[0].theme = 'heat';
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with heat theme', () => {
  const testDatasets = datasets.slice();
  testDatasets[0].theme = 'heat';
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly without format', () => {
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        step={10}
        lines={5}
        labels={labels}
        datasets={datasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly without width and color', () => {
  const testDatasets = [
    {
      theme: 'region',
      values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
    },
  ];
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        max={60}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders correctly with style', () => {
  const testDatasets = [
    {
      theme: 'region',
      values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
    },
  ];
  console.log(testDatasets);
  const component = renderer
    .create(
      <MDChart
        size={[width, height]}
        min={0}
        max={60}
        step={10}
        lines={5}
        format={(val) => val + '%'}
        labels={labels}
        datasets={testDatasets}
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
