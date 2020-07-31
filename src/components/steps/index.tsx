import * as React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { steps as theme } from '../../_styles/themes/default.components';
import MDIcon from '../icon';

export interface IMDStepsItem {
  title: string;
  brief?: string;
}

type MDStepsDirection = 'horizontal' | 'vertical';

type MDStepStatus = 'current' | 'reached' | 'unreached';

export type MDStepsRenderFunc = (
  status: MDStepStatus,
  index: number
) => React.ReactNode;

export interface IMDStepsProps {
  styles?: IMDStepsStyle;
  steps: IMDStepsItem[];
  current?: number;
  direction?: MDStepsDirection;
  transition?: boolean;
  iconRender?: MDStepsRenderFunc;
  titleRender?: MDStepsRenderFunc;
  briefRender?: MDStepsRenderFunc;
}

export interface IMDStepsState {
  current: number;
}

const BAR_SIZE = 1;
const VERTICAL_LEFT = 40;
const HORIZONTAL_TOP = 24;
const VERTICAL_GAP = 24;
const BAR_WRAPPER_WIDTH = 16;
const BAR_VERTICAL_HEIGHT = 100;
const TRANSITION_DURATION = 1000;

const isDecimal = (num: number = 0): boolean => num.toString().indexOf('.') >= 0;

export interface IMDStepsStyle {
  wrapper?: ViewStyle;
  backgroundBar?: ViewStyle;
  nodeWrapper?: ViewStyle;
  defaultIconWrapper?: ViewStyle;
  defaultIcon?: ViewStyle;
  title?: TextStyle;
  brief?: TextStyle;
  unactive?: ViewStyle;
  active?: ViewStyle;
}

export const MDStepsStyles: IMDStepsStyle = {
  wrapper: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
    width: '100%',
  },
  backgroundBar: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  nodeWrapper: {
    justifyContent: 'center',
  },
  defaultIconWrapper: {
    width: BAR_WRAPPER_WIDTH,
    height: BAR_WRAPPER_WIDTH,
    backgroundColor: 'transparent',
    borderRadius: BAR_WRAPPER_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIcon: {
    height: 3,
    width: 3,
    borderRadius: 3,
  },
  title: {
    position: 'absolute',
    fontSize: 16,
    color: theme.textColor,
  },
  brief: {
    position: 'absolute',
    fontSize: 13,
    color: theme.descColor,
  },
  unactive: {
    backgroundColor: theme.color,
  },
  active: {
    backgroundColor: theme.colorActive,
  },
};

const defaultStyles = StyleSheet.create<IMDStepsStyle>(MDStepsStyles);

export default class MDSteps extends React.Component<
  IMDStepsProps,
  IMDStepsState
> {
  public static defaultProps = {
    styles: defaultStyles,
    current: 0,
    direction: 'horizontal',
    transition: false,
  };

  constructor (props: IMDStepsProps) {
    super(props);
    for (let i = 0; i < props.steps.length - 1; i++) {
      this.animatedValues.push(new Animated.Value(0));
    }
    this.state = {
      current: 0,
    };
  }

  private animatedValues: Animated.Value[] = [];

  public componentDidMount () {
    const { steps, transition, direction, current } = this.props;

    this.startAnimByIndex(
      this.state.current,
      !!transition,
      direction,
      current,
      steps.length
    );
  }

  public UNSAFE_componentWillReceiveProps (nextProps: IMDStepsProps) {
    const { transition, direction, steps } = this.props;
    const current: number = this.props.current as number;
    const nextCurrent: number = nextProps.current as number;

    if (nextCurrent !== current) {
      this.startAnimByIndex(
        this.state.current,
        !!transition,
        direction,
        nextCurrent,
        steps.length,
        nextCurrent > current
      );
    }
  }

  public render () {
    const { steps } = this.props;
    const _styles = this.props.styles || {};

    const _steps = steps.map((item, index) => {
      const _bar = index !== steps.length - 1 ? this.renderBar(index) : null;

      return (
        <React.Fragment key={index}>
          <View
            style={[
              _styles.nodeWrapper,
              { alignItems: this.isVertical() ? 'flex-start' : 'center' },
            ]}
          >
            {this.renderIcon(index)}
            {this.renderTitle(index, item.title)}
            {this.renderBrief(index, item.brief)}
          </View>
          {_bar}
        </React.Fragment>
      );
    });

    return (
      <View
        style={[
          _styles.wrapper,
          { flexDirection: this.isVertical() ? 'column' : 'row' },
        ]}
      >
        {_steps}
      </View>
    );
  }

  private startAnimByIndex (
    index: number,
    transition: boolean,
    direction: MDStepsDirection = 'horizontal',
    current: number = 0,
    length: number,
    isAddStep = true
  ) {
    const toValue = direction === 'vertical' ? BAR_VERTICAL_HEIGHT : 100;
    const _index = isAddStep ? Math.floor(index) : Math.ceil(index);
    let diff = isAddStep ? 1 : 0;
    const _current = isAddStep ? _index : _index - 1;
    const next = isAddStep ? _index + 1 : _index - 1;

    if (isAddStep) {
      if (isDecimal(current) && current < _index) {
        // 在 步进 的情况下，目标 current 为小数，且小于想要去变化的 index，如：2.4 < 3，则不做处理
        return;
      }

      // 如果 index 是个小数（一般出现在，前一个props为小数情况下），则在下一个步进动画完成后，
      // 再设置 current 来触发渲染 icon
      !isDecimal(index) &&
        this.setState({
          current: _current,
        });

      if (!isDecimal(current) && (length - 1 <= _index || current <= _index)) {
        // 在 步进 的情况下，目标 current 为整数，且小于等于想要去变化的 index，或 index 大于等于 步进 的长度，则不继续处理
        return;
      }

      if (isDecimal(current) && current < _index + 1 && current > _index) {
        diff = +(+current.toFixed(2) - _index).toFixed(2);
        this.setState({
          current,
        });
      }
    } else {
      if (current >= _index || _index < 0) {
        // 在 步减 的情况下，目标 current 为整数，且大于等于想要去变化的 index，或 index 小于 0 的长度，则不继续处理
        return;
      }

      this.setState({
        current: _current,
      });

      if (isDecimal(current) && current < _index && current > _index - 1) {
        diff = 1 - +(_index - +current.toFixed(2)).toFixed(2);
        this.setState({
          current,
        });
      }
    }

    Animated.timing(this.animatedValues[_current], {
      toValue: toValue * diff,
      duration: !transition || !isAddStep ? 0 : TRANSITION_DURATION,
      useNativeDriver: false
    }).start(() => {
      this.startAnimByIndex(
        next,
        transition,
        direction,
        current,
        length,
        isAddStep
      );
    });
  }

  private _getStatus (index: number, current: number = 0): MDStepStatus {
    return current === index
      ? 'current'
      : index < current
      ? 'reached'
      : 'unreached';
  }

  private renderBar (index: number): React.ReactNode {
    const { current = 0 } = this.props;

    const animatedVales = this.animatedValues;
    const _v = this.isVertical();
    const _barWrapperStyle = this.genBarWrapperStyle();

    const size = _v
      ? { height: animatedVales[index] }
      : {
          width: animatedVales[index].interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        };

    return (
      <View style={_barWrapperStyle}>
        <View
          style={[
            this.genBarStyle(false),
            _v ? { height: BAR_VERTICAL_HEIGHT } : { width: '100%' },
          ]}
        />
        <Animated.View
          style={[
            this.genBarStyle(index < current),
            size,
            { position: 'absolute' },
          ]}
        />
      </View>
    );
  }

  private genBarWrapperStyle (): StyleProp<ViewStyle> {
    const _styles = this.props.styles || {};
    const _v = this.isVertical();

    return StyleSheet.flatten([
      _styles.backgroundBar,
      { flexDirection: _v ? 'column' : 'row' },
      _v ? { width: BAR_WRAPPER_WIDTH } : { height: BAR_WRAPPER_WIDTH },
    ]);
  }

  private genBarStyle (actived: boolean) {
    const _styles = this.props.styles || {};
    const _v = this.isVertical();
    return StyleSheet.flatten([
      _v ? { width: BAR_SIZE } : { height: BAR_SIZE },
      actived ? _styles.active : _styles.unactive,
    ]);
  }

  private renderIcon (index: number): React.ReactNode {
    const { iconRender } = this.props;
    const { current } = this.state;
    const _styles = this.props.styles || {};

    const status: MDStepStatus = this._getStatus(index, current);
    const margin = this.isVertical()
      ? { marginVertical: 5 }
      : { marginHorizontal: 5 };

    if (iconRender) {
      const icon: React.ReactNode = iconRender(status, index);
      if (icon) {
        return <View style={margin}>{icon}</View>;
      }
    }

    if (status === 'current') {
      return (
        <MDIcon
          style={margin}
          size={BAR_WRAPPER_WIDTH}
          name='checked'
          color={theme.colorActive}
        />
      );
    }
    return (
      <View style={[_styles.defaultIconWrapper, margin]}>
        <View
          style={[
            _styles.defaultIcon,
            status === 'reached' ? _styles.active : _styles.unactive,
          ]}
        />
      </View>
    );
  }

  private renderTitle (index: number, title: string): React.ReactNode {
    const { titleRender } = this.props;
    const { current } = this.state;
    const _isVertical = this.isVertical();

    if (titleRender) {
      const ele: React.ReactNode = titleRender(this._getStatus(index, current), index);
      if (ele && React.isValidElement(ele)) {
        const _flatStyle = Object.assign(
          { position: 'absolute' },
          !_isVertical ? { top: HORIZONTAL_TOP } : null,
          _isVertical ? { left: VERTICAL_LEFT } : null
        ) as ViewStyle;
        return <View style={_flatStyle}>{ele}</View>;
      }
    }

    const _titleStyle = this.genTitleStyle(index);

    return title ? <Text style={_titleStyle}>{title}</Text> : null;
  }

  private genTitleStyle (index: number): StyleProp<TextStyle> {
    const { current } = this.state;
    const _styles = this.props.styles || {};
    const _v = this.isVertical();
    const _c = index === current;

    return StyleSheet.flatten([
      _styles.title,
      _c ? { color: theme.colorActive } : null,
      { textAlign: _v ? 'left' : 'center' },
      { width: _v ? 200 : 120 },
      _v ? { left: VERTICAL_LEFT } : { top: HORIZONTAL_TOP },
    ]);
  }

  private renderBrief (index: number, brief?: string): React.ReactNode {
    const { briefRender } = this.props;
    const { current } = this.state;
    const _isVertical = this.isVertical();

    if (briefRender) {
      const ele: React.ReactNode = briefRender(this._getStatus(index, current), index);
      if (ele && React.isValidElement(ele)) {
        const _flatStyle = Object.assign(
          {
            position: 'absolute',
            top: _isVertical ? VERTICAL_GAP : VERTICAL_GAP + HORIZONTAL_TOP,
          },
          _isVertical ? { left: VERTICAL_LEFT } : null
        ) as ViewStyle;
        return <View style={_flatStyle}>{ele}</View>;
      }
    }

    return brief ? <Text style={this.genBriefStyle()}>{brief}</Text> : null;
  }

  private genBriefStyle (): TextStyle {
    const _styles = this.props.styles || {};
    const _v = this.isVertical();

    return StyleSheet.flatten([
      _styles.brief,
      {
        textAlign: !_v ? 'center' : 'left',
      },
      { width: !_v ? 120 : 200 },
      { top: _v ? VERTICAL_GAP : HORIZONTAL_TOP + VERTICAL_GAP },
      _v ? { left: VERTICAL_LEFT } : null,
    ]);
  }

  private isVertical () {
    return this.props.direction === 'vertical';
  }
}
