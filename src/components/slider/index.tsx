import * as React from 'react';
import {
  Dimensions,
  PanResponder,
  PanResponderGestureState,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { slider } from '../../_styles/themes/default.components';
import { scaleFont } from '../../_styles/themes/responsive';

const screenWidth = Dimensions.get('window').width;

export interface IMDSliderProps {
  styles?: IMDSliderStyle;
  width?: number; // 组件宽度
  circleSize?: number; // 滑块大小
  bothway?: boolean; // 是否启用双向滑动
  range?: number; // 范围,从0开始
  startValue?: number; // 起始值
  endValue?: number; // 结束值
  min?: number; // 可拖动的最小值
  max?: number; // 可拖动的最大值
  step?: number; // 步长
  format?: string; // 格式化
  formatColor?: string; // 格式化颜色
  disabled?: boolean; // 是否可滑动
  onChange: (startValue: number, endAmount: number) => void; // 回调
}
interface IMDSliderState {
  range: number;
  startValue: number;
  endValue: number;
  start: number;
  end: number;
  resetFocus: boolean;
}

export interface IMDSliderStyle {
  container?: ViewStyle;
  hanlder?: ViewStyle;
  hanlderDisabled?: ViewStyle;
  circle?: ViewStyle;
}

export const MDSelectorStyles: IMDSliderStyle = {
  container: {
    height: slider.height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: slider.bg,
  },
  hanlder: {
    backgroundColor: slider.bgHandler,
    height: slider.progressBarHeight,
  },
  hanlderDisabled: {
    backgroundColor: slider.bgHandlerDisabled,
    height: slider.progressBarHeight,
  },
  circle: {
    position: 'absolute',
    borderColor: slider.circleBorderColor,
    borderWidth: scaleFont(1),
    backgroundColor: slider.bg,
  },
};
export default class MDSlider extends React.Component<
  IMDSliderProps,
  IMDSliderState
> {
  public static defaultProps: IMDSliderProps = {
    styles: MDSelectorStyles,
    circleSize: 22,
    width: screenWidth - 40,
    bothway: false,
    range: 100,
    startValue: 0,
    endValue: 50,
    min: 0,
    step: 1,
    disabled: false,
    format: '',
    formatColor: slider.formatColor,
    onChange () {},
  };

  constructor (props: IMDSliderProps) {
    super(props);
    const { width, circleSize, range, startValue, endValue } = this.props;
    const scale = (width! - circleSize!) / range!;
    const start = startValue === 0 ? 0 : scale * startValue!;
    const end = scale * endValue!;
    this.state = {
      range: range!,
      startValue: startValue!,
      endValue: endValue!,
      start,
      end,
      resetFocus: false,
    };
  }
  private startPanResponder = PanResponder.create({});
  private endPanResponder = PanResponder.create({});

  public componentWillReceiveProps (nextProps: any) {
    const { range, startValue, endValue } = this.props;
    if (
      range !== nextProps.range ||
      startValue !== nextProps.startValue ||
      endValue !== nextProps.endValue
    ) {
      const scale = (nextProps.width - nextProps.circleSize) / nextProps.range;
      const start =
        nextProps.startValue === 0 ? 0 : scale * nextProps.startValue;
      const end = scale * nextProps.endValue;
      this.setState({
        range: nextProps.range,
        startValue: nextProps.startValue,
        endValue: nextProps.endValue,
        start,
        end,
      });
    }
  }

  public componentWillMount () {
    const { disabled } = this.props;
    this.startPanResponder = this.initStartPanResponder(disabled!);
    this.endPanResponder = this.initEndPanResponder(disabled!);
  }

  public render () {
    const { start, end, startValue, endValue, resetFocus } = this.state;
    const { styles, width, circleSize, disabled, bothway, format } = this.props;
    const startTip = this.renderFormat(
      false,
      bothway!,
      startValue,
      start,
      format!
    );
    const startCircle = this.renderCircle(
      true,
      bothway!,
      circleSize!,
      start,
      end
    );
    const endTip = this.renderFormat(true, bothway!, endValue, end, format!);
    const endCircle = this.renderCircle(false, false, circleSize!, start, end);
    const containerBar = this.renderContainerBar(width!, disabled!, start, end);
    return (
      <View style={styles!.container}>
        {startTip}
        {endTip}
        {containerBar}
        {resetFocus ? startCircle : endCircle}
        {resetFocus ? endCircle : startCircle}
      </View>
    );
  }

  private initStartPanResponder (disabled: boolean) {
    return PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.forceUpdate();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (disabled) {
          return;
        }
        const { offset, amount } = this.countStepInfo(gestureState, true);
        this.setState({
          start: offset,
          startValue: amount,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (disabled) {
          return;
        }
        const { offset, amount } = this.countStepInfo(gestureState, true);
        this.setState(
          {
            start: offset,
            startValue: amount,
          },
          () => {
            this.props.onChange(this.state.startValue, this.state.endValue);
          }
        );
      },
    });
  }

  private initEndPanResponder (disabled: boolean) {
    return PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
          this.forceUpdate();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (disabled) {
          return;
        }
        const { offset, amount } = this.countStepInfo(gestureState, false);
        this.setState({
          end: offset,
          endValue: amount,
        });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (disabled) {
          return;
        }
        const { offset, amount } = this.countStepInfo(gestureState, false);
        if (this.state.endValue === 0 || this.state.endValue === this.props.min!) {
          this.setState({resetFocus: true});
        } else {
          this.setState({resetFocus: false});
        }
        this.setState(
          {
            end: offset,
            endValue: amount,
          },
          () => {
            this.props.onChange(this.state.startValue, this.state.endValue);
          }
        );
      },
    });
  }

  private renderFormat (
    isEnd: boolean,
    bothway: boolean,
    amount: number,
    offset: number,
    format: string
  ) {
    const formatView = (
      <Text
        style={[
          { position: 'absolute' },
          {
            left: offset,
          },
          { top: -3 },
          { color: this.props.formatColor },
        ]}
      >
        {format + amount}
      </Text>
    );
    return isEnd ? formatView : bothway ? formatView : null;
  }
  private renderCircle (
    isStart: boolean,
    bothway: boolean,
    circleSize: number,
    start: number,
    end: number
  ) {
    if (isStart && !bothway) {
      return null;
    }
    const styles = this.props.styles || {};
    const handler = isStart
      ? this.startPanResponder.panHandlers
      : this.endPanResponder.panHandlers;
    return (
      <View
        style={[
          styles.circle,
          { left: isStart ? start : end },
          { width: circleSize },
          { height: circleSize },
          { borderRadius: circleSize / 2 },
        ]}
        {...handler}
      />
    );
  }

  private renderContainerBar (
    width: number,
    disabled: boolean,
    start: number,
    end: number
  ) {
    const styles = this.props.styles || {};
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            disabled ? styles.hanlderDisabled : styles.hanlder,
            { backgroundColor: 'transparent' },
            { width: start },
          ]}
        />
        <View
          style={[
            disabled ? styles.hanlderDisabled : styles.hanlder,
            { width: end - start },
          ]}
        />
        <View
          style={[
            styles.hanlder,
            { backgroundColor: 'transparent' },
            { width: width - end },
          ]}
        />
      </View>
    );
  }

  private countStepInfo (
    gestureState: PanResponderGestureState,
    isStart: boolean
  ) {
    const { width, circleSize, range, step, min } = this.props;
    const max = this.props.max || this.props.range!;
    const { start, end } = this.state;
    const scale = (width! - circleSize!) / range!;
    const realStep = step! * scale;
    let offset = gestureState.moveX;
    let amount = 0;
    if (isStart) {
      offset = offset >= end ? end : gestureState.moveX - 2 * circleSize!;
      offset = parseFloat('' + offset / realStep) * realStep;
      amount = Math.ceil(start / scale);
      if (amount > max!) {
        amount = max!;
        offset = Math.ceil(max! * scale);
      }
      if (offset <= circleSize!) {
        offset = 0;
        amount = 0;
      }
      if (amount < min!) {
        amount = min!;
        offset = Math.ceil(min! * scale);
      }
    } else {
      offset = offset <= start ? start : gestureState.moveX - 2 * circleSize!;
      offset = parseFloat('' + offset / realStep) * realStep;
      amount = Math.ceil(offset / scale);
      if (amount < min!) {
        amount = min!;
        offset = Math.ceil(min! * scale);
      }
      if (amount > max!) {
        amount = max!;
        offset = Math.ceil(max! * scale);
      }
      if (offset >= width! - circleSize!) {
        offset = width! - circleSize!;
        amount = range!;
      }
    }
    return {
      offset,
      amount,
    };
  }
}
