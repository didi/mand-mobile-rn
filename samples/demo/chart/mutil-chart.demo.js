import * as React from "react";
import { MDChart } from "mand-mobile-rn";
import { width, height, labels } from "./data-store.demo";
export default class MutilChartDemo extends React.Component {
  render() {
    const datasets = [
      {
        color: "#5e64ff",
        width: 1,
        values: [8, 15, 20, 23, 20, 30, 32, 38, 36, 40, 50, 55, 52]
      },
      {
        width: 1,
        values: [10, 20, 25, 30, 28, 35, 38, 42, 40, 40, 45, 42, 45]
      }
    ];
    return (
      <MDChart
        size={[width, height]}
        max={60}
        min={0}
        step={10}
        lines={5}
        format={val => val + "%"}
        labels={labels}
        datasets={datasets}
      />
    );
  }
}
