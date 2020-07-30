import * as React from 'react';
import { Shape, Path, Group } from '@react-native-community/art';
import { Platform } from 'react-native';

export interface IMDDoughnutProps {
  diameter: number;
  rotation: number;
  strokeWidth: number;
  color: string;
  proportion: number;
}

const circleRadians = Math.PI * 2;
const radiansPerDegree = Math.PI / 180;

export default class Doughunt extends React.Component<IMDDoughnutProps> {
  public static arcDegree (proportion: number) {
    return (360 * 0.9999 * proportion) / 100;
  }

  public render () {
    const { diameter, rotation, strokeWidth, color, proportion } = this.props;

    if (!proportion) {
      return null;
    }

    const arcProportion = this.extractProportion(proportion);
    const arcStart = rotation;
    const arcEnd = Doughunt.arcDegree(arcProportion) + rotation;
    const arcPath = this.createArcPath(
      arcStart,
      arcEnd,
      diameter / 2 - strokeWidth / 2,
      diameter / 2 - strokeWidth / 2
    );

    return (
      <Group originX={diameter / 2} originY={diameter / 2}>
        <Shape
          d={arcPath}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeCap='round'
        />
      </Group>
    );
  }

  private createArcPath (
    startAngle: number,
    endAngle: number,
    outRadius: number,
    inRadius: number
  ) {
    const path = new Path();
    // angles in radians
    const startAng = this.degreesToRadians(startAngle);
    const endAng = this.degreesToRadians(endAngle);

    // central arc angle in radians
    const centralAng =
      startAng > endAng ? circleRadians - startAng + endAng : endAng - startAng;

    // cached sine and cosine values
    const startSin = Math.sin(startAng);
    const endSin = Math.sin(endAng);
    const startCos = Math.cos(startAng);
    const endCos = Math.cos(endAng);

    // cached differences
    const diffSin = endSin - startSin;
    const diffCos = endCos - startCos;
    const diffRadius = inRadius - outRadius;

    // if the angle is over pi radians (180 degrees)
    // we will need to let the drawing method know.
    const large = centralAng > Math.PI;

    path
      .move(
        outRadius + outRadius * startSin + this.props.strokeWidth / 2,
        outRadius - outRadius * startCos + this.props.strokeWidth / 2
      ) // move to starting point
      .arc(
        outRadius * diffSin,
        outRadius * -diffCos,
        outRadius,
        outRadius,
        large
      ) // outer arc
      .line(diffRadius * endSin, diffRadius * -endCos); // width of arc or wedge

    if (inRadius) {
      path.counterArc(
        inRadius * -diffSin,
        inRadius * diffCos,
        inRadius,
        inRadius,
        large
      ); // inner arc
    }

    return path;
  }

  private degreesToRadians (degrees: number) {
    if (degrees !== 0 && degrees % 360 === 0) {
      // 360, 720, etc.
      return circleRadians;
    } else {
      return (degrees * radiansPerDegree) % circleRadians;
    }
  }

  private extractProportion = (arcProportion: number) =>
    Math.min(100, Math.max(0, arcProportion))
}
