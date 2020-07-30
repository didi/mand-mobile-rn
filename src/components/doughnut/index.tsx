import * as React from 'react';
import { Surface } from '@react-native-community/art';
import {
  Animated,
  Easing,
  EasingFunction,
  Platform,
  View,
} from 'react-native';
import Doughnut from './doughnut';

// @ts-ignore
const AnimatedDoughnut = Animated.createAnimatedComponent(Doughnut);

export interface IMDDoughnutArcSet {
  color: string;
  proportion: number; // todo
}

export interface IMDDoughnutProps {
  // 时间属性
  radius: number;
  strokeWidth: number;
  animate?: boolean;
  animateTime?: number;
  data: IMDDoughnutArcSet[];
}

export interface IMDDoughnutState {
  arcProportAnimatedValues: Animated.Value[];
  arcProportValues: number[];
}

export default class MDDoughnut extends React.Component<
  IMDDoughnutProps,
  IMDDoughnutState
> {
  public static defaultProps = {
    animate: true,
    animateTime: 1000,
  };
  constructor (props: IMDDoughnutProps) {
    super(props);
    this.state = {
      arcProportAnimatedValues: [],
      arcProportValues: [],
    };
  }

  private isAnimating: boolean = false;
  private data: IMDDoughnutArcSet[] = [];

  public componentDidMount () {
    if (this.props.animate && Platform.OS !== 'web') {
      this.isAnimating = true;
      setTimeout(() => {
        this.startAnimatedFill();
      }, 100);
    }
  }

  public componentDidUpdate () {
    if (this.props.animate) {
      this.isAnimating = true;
      setTimeout(() => {
        this.startAnimatedFill();
      }, 100);
    }
  }

  public shouldComponentUpdate (nextProps: IMDDoughnutProps) {
    if (
      JSON.stringify(this.props.data) === JSON.stringify(nextProps.data) ||
      this.isAnimating
    ) {
      return false;
    }
    return true;
  }

  public componentWillReceiveProps (nextProps: IMDDoughnutProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data))
      this.setState({
        arcProportValues: [],
        arcProportAnimatedValues: [],
      });
  }

  public render () {
    const { radius, strokeWidth, data } = this.props;
    this.data = [];
    this.data.push(...data);
    const diameter = radius * 2;
    if (!this.data || !this.data.length) {
      return null;
    }
    return (
      <View>
        <Surface
          width={diameter}
          height={diameter}
          style={{ transform: [{ rotateY: '180deg' }] }}
        >
          {this.combineCircle(this.data, diameter, strokeWidth)}
        </Surface>
      </View>
    );
  }

  private startAnimatedFill () {
    const values = this.state.arcProportValues;
    const animatedValues = this.state.arcProportAnimatedValues;
    const arcWalker = (index: number) => {
      if (index < values.length) {
        Animated.timing(animatedValues[index], {
          duration: this.animateDuration(index, values.length),
          easing: this.animateType(),
          toValue: values[index],
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => {
            arcWalker(++index);
          }, 0);
        });
      } else {
        this.isAnimating = false;
      }
    };

    setTimeout(() => {
      values.length && arcWalker(0);
    }, 0);
  }

  private animateDuration (index: number, maxLength: number) {
    const per = this.props.animateTime! / maxLength;
    return index === maxLength - 1 ? per / 2 : (maxLength - index) * per;
  }

  private animateType (): EasingFunction {
    return Easing.in(Easing.sin);
  }

  private combineCircle (
    data: IMDDoughnutArcSet[],
    diameter: number,
    strokeWidth: number
  ) {
    if (!data || !data.length) {
      return null;
    }

    // 为最后一个环带添加尾部用于遮盖第一个环带
    const arcNum = data.length;
    const lastArc = data[arcNum - 1];
    lastArc.proportion -= 3.5;
    data.push({
      color: lastArc.color,
      proportion: 3,
    });

    let lastArcDegree = 0;
    const arcs = [];
    for (let index = 0, len = data.length; index < len; index++) {
      const arcData = data[index];
      const arcProportion = this.extractProportion(arcData.proportion);
      const arcProportionAnimatedValue = new Animated.Value(0);
      this.state.arcProportValues.push(arcProportion);
      this.state.arcProportAnimatedValues.push(arcProportionAnimatedValue);

      const arc = this.renderArc(
        this.props.animate === true
          ? this.state.arcProportAnimatedValues[index]
          : this.state.arcProportValues[index],
        diameter,
        lastArcDegree,
        strokeWidth,
        arcData.color,
        index
      );

      // 计算上个环带的角度，用于下一个环带的rotation
      lastArcDegree += Doughnut.arcDegree(arcProportion);

      /**
       * 后面的Path在前一个Path上层，无法用zIndex更改
       * 后出现的环带在下层，倒序插入渲染数组中
       * 最后的环带尾部添加渲染数字最后
       */
      if (index < len - 1) {
        arcs.unshift(arc);
      } else {
        arcs.push(arc);
      }
    }

    return arcs;
  }

  private renderArc (
    proportion: number | Animated.Value,
    diameter: number,
    rotation: number,
    strokeWidth: number,
    color: string,
    index: number
  ) {
    return (
      <AnimatedDoughnut
        rotation={rotation}
        diameter={diameter}
        strokeWidth={strokeWidth}
        color={color}
        proportion={proportion}
        key={`arc-${index}`}
      />
    );
  }

  private extractProportion = (proportion: number) =>
    Math.min(100, Math.max(0, proportion))
}
