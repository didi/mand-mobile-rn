import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, object, array, text } from '@storybook/addon-knobs'
import Readme from './README.md'
import { MDChart } from 'mand-mobile-rn'
import MutilChartDemo from '@demo/chart/mutil-chart.demo'
import MutilChartDemoCode from '!raw-loader!@demo/chart/mutil-chart.demo'
import GradientChartDemo from '@demo/chart/gradient-chart.demo'
import GradientChartDemoCode from '!raw-loader!@demo/chart/gradient-chart.demo'
import FillChartDemo from '@demo/chart/fill-chart.demo'
import FillChartDemoCode from '!raw-loader!@demo/chart/fill-chart.demo'
import { width, height, labels } from '@demo/chart/data-store.demo'
import { withStory } from '../../addons/story-panel/index';

const stories = storiesOf('Components/Business/Chart', module)

stories.addDecorator(withStory);

stories
  .addParameters({
    readme: {
      sidebar: Readme
    },
    options: {
      showPanel: true,
      isToolshown: true,
    }
  })
  .add('With knobs', () => {
    const datasets = [
      {
        color: '#5e64ff',
        width: 1,
        theme: 'heat',
        values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52],
      },
    ]
    return (
      <MDChart
        size={[number('width', width), number('height', height)]}
        max={number('max', 60)}
        min={number('min', 0)}
        step={number('step', 10)}
        lines={number('line', 5)}
        format={(val) => {
          return text('format', '{val}%').replace(/\{val\}/g, val)
        }}
        labels={array('labels', labels)}
        datasets={object('datasets', datasets)}
      />
    )
  })
  .add('Multiple fold lines', () => <MutilChartDemo />, {
    story: {
      code: MutilChartDemoCode
    }
  })
  .add('Gradient fold line', () => <GradientChartDemo />, {
    story: {
      code: GradientChartDemoCode
    }
  })
  .add('Area fill', () => <FillChartDemo />, {
    story: {
      code: FillChartDemoCode
    }
  })
