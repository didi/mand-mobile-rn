import React from 'react'
import Container from '../../../components/container'
import Card from '../../../components/card'
import MutilChartDemo from '../../../../demo/chart/mutil-chart.demo'
import GradientChartDemo from '../../../../demo/chart/gradient-chart.demo'
import FillChartDemo from '../../../../demo/chart/fill-chart.demo'

export class ChartScreen extends React.Component {
  static navigationOptions = {
    title: 'Chart',
  }

  render() {
    return (
      <Container>
        <Card title="多折线">
          <MutilChartDemo />
        </Card>
        <Card title="渐变折线">
          <GradientChartDemo />
        </Card>
        <Card title="区域填充">
          <FillChartDemo />
        </Card>
      </Container>
    )
  }
}
