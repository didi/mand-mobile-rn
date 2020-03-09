import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { chart } from '../../_styles/themes/default.components';

interface IMDChartDataset {
  color?: string;
  theme?: string;
  width?: number;
  values: number[];
}

interface IMDLineProps {
  stroke: string;
  strokeWidth: number;
  strokeLinecap: 'butt' | 'round' | 'square' | 'inherit';
}

interface IMDTextProps {
  fill: string;
  fontSize: number;
  textAnchor: string;
}

interface IMDChartProps {
  size?: number[];
  datasets: IMDChartDataset[];
  lines?: number;
  format?: (val: number) => string;
  max?: number;
  min?: number;
  step?: number;
  labels: string[];
  lineProps?: IMDLineProps;
  pathProps?: IMDLineProps;
  textXProps?: IMDTextProps;
  textYProps?: IMDTextProps;
}

const defalutLineProps: IMDLineProps = {
  stroke: chart.lineColor,
  strokeWidth: 0.5,
  strokeLinecap: 'square',
};
const defaultPathProps: IMDLineProps = {
  stroke: chart.pathColor,
  strokeWidth: 1,
  strokeLinecap: 'butt',
};

const defaultTextXProps: IMDTextProps = {
  fill: chart.textColor,
  fontSize: chart.labelFontSize,
  textAnchor: 'middle',
};
const defaultTextYProps: IMDTextProps = {
  fill: chart.textColor,
  fontSize: chart.valueFontSize,
  textAnchor: 'end',
};

interface IMDPathStyle {
  fill: string;
  stroke: string;
  strokeWidth?: number;
}

interface IMDPathObject {
  style: IMDPathStyle;
  value: string;
  area?: IMDPathObject;
}

const ticketHeight: number = 6;

export default class MDChart extends React.Component<IMDChartProps> {
  public static defaultProps = {
    size: [chart.width, chart.height],
    shift: 1,
    lines: 5,
    format: (val: number) => val,
    lineProps: defalutLineProps,
    pathProps: defaultPathProps,
    textXProps: defaultTextXProps,
    textYProps: defaultTextYProps,
  };

  constructor (props: IMDChartProps) {
    super(props);
  }

  public render () {
    const size = this.props.size!;
    const width = size[0];
    const height = size[1];
    const offset = {
      top: this.calcOffsetTop(),
      bottom: this.calcOffsetBottom(),
      left: this.calcOffsetLeft(),
      right: this.calcOffsetRight(),
    };
    const innerWidth = width - offset.left - offset.right;
    const innerHeight = height - offset.top - offset.bottom;

    return (
      <svg width={width} height={height}>
        <defs>{this.renderLinearGradient()}</defs>

        <g transform={`translate(${offset.left}, ${offset.top})`}>
          <g>{this.renderAxisY(innerWidth, innerHeight)}</g>
          <g transform={`translate(0, ${innerHeight})`}>
            {this.renderAxisX(innerWidth)}
          </g>
          <g>{this.renderPath(innerWidth, innerHeight)}</g>
        </g>
      </svg>
    );
  }

  private renderLinearGradient (): Array<React.ReactElement<any>> {
    const uniqueColors: string[] = [];
    this.props.datasets.map((data) => {
      if (data.color && uniqueColors.indexOf(data.color) === -1) {
        uniqueColors.push(data.color);
      }
    });
    return uniqueColors.map((color) => {
      return (
        <linearGradient
          id={`path-fill-gradient-${color}`}
          key={color}
          x1={'0%'}
          y1={'0%'}
          x2={'0%'}
          y2={'100%'}
        >
          <stop stopColor={color} offset={'0%'} stopOpacity={0.4} />
          <stop stopColor={color} offset={'50%'} stopOpacity={0.3} />
          <stop stopColor={color} offset={'100%'} stopOpacity={0.1} />
        </linearGradient>
      );
    });
  }

  private renderAxisY (
    innerWidth: number,
    innerHeight: number
  ): Array<React.ReactElement<any>> {
    const { lines, format, lineProps, textYProps } = this.props!;
    const { stroke, strokeWidth, strokeLinecap } = lineProps!;
    const { fill, fontSize, textAnchor } = textYProps!;
    const max = this.calcMax();
    const min = this.calcMin();
    const step = this.calcStep(min, max, lines!);
    const items = [];
    const deltaY = innerHeight / lines!;

    for (let i = 0; i < lines!; i++) {
      items.push({
        offset: i * deltaY,
        label: format!(max! - i * step!),
      });
    }

    items.push({
      offset: innerHeight,
      label: format!(min),
    });

    return items.map((item, index) => {
      return (
        <g key={index}>
          <g key={index} transform={`translate(0, ${item.offset})`}>
            <line
              x1={0}
              y1={0}
              x2={innerWidth}
              y2={0}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinecap={strokeLinecap}
            />
            <text
              x={0}
              y={0}
              dx={'-0.5em'}
              dy={'0.32em'}
              fill={fill}
              fontSize={fontSize}
              textAnchor={textAnchor}
            >
              {item.label}
            </text>
          </g>
        </g>
      );
    });
  }

  private renderAxisX (innerWidth: number): Array<React.ReactElement<any>> {
    const { labels, lineProps, textXProps } = this.props;
    const { stroke, strokeWidth, strokeLinecap } = lineProps!;
    const { fill, fontSize, textAnchor } = textXProps!;
    const deltaX = innerWidth / (labels.length - 1);
    const items = labels.map((label, index) => {
      return { offset: index * deltaX, label };
    });
    return items.map((item, index) => {
      return (
        <g key={index} transform={`translate(${item.offset}, 0)`}>
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={ticketHeight}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
          />
          <text
            x={0}
            y={0}
            dy={'2em'}
            fill={fill}
            fontSize={fontSize}
            textAnchor={textAnchor}
          >
            {item.label}
          </text>
        </g>
      );
    });
  }

  private renderPath (
    innerWidth: number,
    innerHeight: number
  ): Array<React.ReactElement<any>> {
    const items: Array<React.ReactElement<any>> = [];
    this.calcPaths(innerWidth, innerHeight).map((path, index) => {
      items.push(
        <path
          id={path.value}
          key={`line-${index}`}
          d={path.value}
          fill={path.style.fill}
          stroke={path.style.stroke}
          strokeWidth={path.style.strokeWidth}
        />
      );
      if (path.area) {
        items.push(
          <path
            id={path.area.value}
            key={`area-${index}`}
            d={path.area.value}
            fill={path.area.style.fill}
            stroke={path.area.style.stroke}
          />
        );
      }
    });
    return items;
  }

  private calcPaths (innerWidth: number, innerHeight: number) {
    const { datasets, lines } = this.props;
    const max = this.calcMax();
    const min = this.calcMin();
    const step = this.calcStep(min, max, lines!);
    const lower = max - (lines! - 1) * step!;
    return datasets.map((data) => {
      const deltaX = innerWidth / (data.values.length - 1);
      const deltaY = innerHeight / lines!;
      const points = data.values.map((value, index) => {
        if (value < lower) {
          return {
            x: index * deltaX,
            y: innerHeight - (1 - (lower - value) / (lower - min)) * deltaY,
          };
        } else {
          return {
            x: index * deltaX,
            y: (1 - (value - lower) / (max - lower)) * (innerHeight - deltaY),
          };
        }
      });

      const ret: IMDPathObject = {
        style: {
          fill: 'none',
          stroke: data.color || '#fa8919',
          strokeWidth: data.width || 1,
        },
        value: '',
      };

      if (data.theme === 'heat') {
        ret.style.stroke = `url(#path-fill-gradient-${data.color})`;
      }
      if (data.theme === 'region') {
        ret.area = {
          value:
            `M0,${innerHeight} ` +
            points.map((point) => `L${point.x},${point.y}`).join(' ') +
            ` L${points[points.length - 1].x},${innerHeight}`,
          style: {
            fill: `url(#path-fill-gradient-${data.color})`,
            stroke: 'none',
          },
        };
      }

      ret.value =
        `M0,${points.shift()!.y} ` +
        points.map((point) => `L${point.x},${point.y}`).join(' ');

      return ret;
    });
  }

  private calcMax (): number {
    if (this.props.max) {
      return this.props.max;
    }
    let max = Math.max.apply(
      Math,
      this.props.datasets.map((data) => Math.max.apply(Math, data.values))
    );
    let multiple = 1;
    while (max > 10) {
      multiple *= 10;
      max /= 10;
    }
    max = Math.ceil(max) * multiple;
    return max;
  }

  private calcMin (): number {
    if (this.props.min || this.props.min === 0) {
      return this.props.min;
    }
    let min = Math.min.apply(
      Math,
      this.props.datasets.map((data) => Math.min.apply(Math, data.values))
    );
    let multiple = 1;
    while (min > 10) {
      multiple *= 10;
      min /= 10;
    }
    min = Math.floor(min) * multiple;
    return min;
  }

  private calcStep (min: number, max: number, lines: number): number {
    if (this.props.step) {
      return this.props.step;
    }
    return (max - min) / lines;
  }

  private calcOffsetTop (): number {
    return this.props.textYProps!.fontSize / 2;
  }
  private calcOffsetBottom (): number {
    const fontSize = this.props.textYProps!.fontSize;
    return ticketHeight + fontSize * 2;
  }
  private calcOffsetLeft (): number {
    const fontSize = this.props.textYProps!.fontSize;
    const format = this.props.format!;
    const max = this.calcMax();
    const labes = format(max);
    return labes.length * fontSize;
  }
  private calcOffsetRight (): number {
    const fontSize = this.props.textXProps!.fontSize;
    const labels = this.props.labels;
    let labelMaxLength = 1;

    labels.forEach((label) => {
      if (label.length > labelMaxLength) {
        labelMaxLength = label.length;
      }
    });

    return (fontSize * labelMaxLength) / 2;
  }
}
