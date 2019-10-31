;
import {
  Image,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { stepper } from '../../_styles/themes/default.components';

interface IMDStepperProps {
  styles?: IMDStepperStyle;
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  isInteger?: boolean;
  onChange?: (value: number) => void;
}

interface IMDStepperState {
  isMin: boolean;
  isMax: boolean;
  currentNum: number;
}

interface IMDStepperStyle {
  wrapper?: ViewStyle;
  button?: ViewStyle;
  buttonIcon?: ViewStyle;
  input?: TextStyle;
  disable?: any;
}

export const MDStepperStyles: IMDStepperStyle = {
  wrapper: {
    height: stepper.height,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: stepper.widthButton,
    height: stepper.height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stepper.fill,
    borderRadius: stepper.radiusButton,
  },
  buttonIcon: {
    width: stepper.widthIcon,
    height: stepper.widthIcon,
  },
  input: {
    width: stepper.widthInput,
    height: stepper.height,
    fontSize: stepper.inputFontSize,
    textAlign: 'center',
    backgroundColor: stepper.fill,
    color: stepper.color,
    marginLeft: stepper.marginLeftInput,
    marginRight: stepper.marginRightInput,
    padding: 0,
    borderRadius: stepper.radiusInput,
  },
  disable: {
    opacity: stepper.disabledOpacity,
  },
};

const styles = StyleSheet.create<IMDStepperStyle>(MDStepperStyles);

export default class MDStepper extends React.Component<
  IMDStepperProps,
  IMDStepperState
> {
  public static defaultProps = {
    styles,
    defaultValue: 0,
    value: 0,
    step: 1,
    min: -Number.MAX_VALUE,
    max: Number.MAX_VALUE,
    disabled: false,
    readOnly: false,
    isInteger: false,
  };

  constructor (props: IMDStepperProps) {
    super(props);
    this.state = {
      isMin: false,
      isMax: false,
      currentNum: this.getCurrentNum(props.value || props.defaultValue!),
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  public componentWillReceiveProps (props: IMDStepperProps) {
    if (props.value === this.state.currentNum) {
      return;
    }
    const value = this.getCurrentNum(props.value || props.defaultValue!);
    this.setState({
      currentNum: value,
      isMin: subtr(value, props.step!) <= props.min!,
      isMax: accAdd(value, props.step!) >= props.max!,
    });
  }

  public componentDidMount () {
    this.checkMinMax();
    this.checkStatus();
  }

  public render () {
    const _styles = this.props.styles || {};
    const { readOnly, disabled } = this.props;
    const { currentNum, isMin, isMax } = this.state;

    return (
      <View style={_styles.wrapper}>
        <TouchableOpacity
          onPress={this.reduce.bind(this)}
          disabled={disabled || isMin}
          activeOpacity={1}
        >
          <View style={[_styles.button]}>
            <Image
              style={[
                _styles.buttonIcon,
                disabled || isMin ? _styles.disable : {},
              ]}
              resizeMode='contain'
              source={require('../../assets/image/md_ic_stepper_sub.png')}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          style={[_styles.input, disabled ? _styles.disable : {}]}
          keyboardType='numeric'
          editable={!readOnly}
          underlineColorAndroid='transparent'
          value={currentNum.toString()}
          onChangeText={(text) => this.onChangeText(text)}
        />
        <TouchableOpacity
          onPress={this.add.bind(this)}
          disabled={disabled || isMax}
          activeOpacity={1}
        >
          <View style={[_styles.button]}>
            <Image
              style={[
                _styles.buttonIcon,
                disabled || isMax ? _styles.disable : {},
              ]}
              resizeMode='contain'
              source={require('../../assets/image/md_ic_stepper_add.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private reduce () {
    if (this.props.disabled) {
      return;
    }
    const currentNum = this.getCurrentNum(
      subtr(this.state.currentNum, this.props.step!)
    );
    this.setState((prevState: IMDStepperState, props: IMDStepperProps) => ({
      currentNum,
      isMin: subtr(prevState.currentNum, props.step!) <= props.min!,
      isMax: false,
    }));
    if (this.props.onChange) {
      this.props.onChange(currentNum);
    }
  }
  private add () {
    if (this.props.disabled) {
      return;
    }
    const currentNum = this.getCurrentNum(
      accAdd(this.state.currentNum, this.props.step!)
    );
    this.setState((prevState: IMDStepperState, props: IMDStepperProps) => ({
      currentNum,
      isMax: accAdd(prevState.currentNum, props.step!) >= props.max!,
      isMin: false,
    }));
    if (this.props.onChange) {
      this.props.onChange(currentNum);
    }
  }

  private formatNum (value: string | number): number {
    value = String(value).replace(/[^0-9.-]/g, '');
    const i: number =
      value === '' ? 0 : this.props.isInteger ? Math.floor(+value) : +value;
    return i;
  }

  private getCurrentNum (value: number): number {
    const i = Math.max(
      Math.min(this.props.max!, this.formatNum(value)),
      this.props.min!
    );
    return i;
  }

  private checkStatus () {
    this.setState((prevState: IMDStepperState, props: IMDStepperProps) => ({
      isMin: subtr(prevState.currentNum, props.step!) <= props.min!,
      isMax: accAdd(prevState.currentNum, props.step!) >= props.max!,
    }));
  }
  private checkMinMax (): boolean {
    if (this.props.min! > this.props.max!) {
      console.log('minNum is larger than maxNum');
    }
    return this.props.max! > this.props.min!;
  }

  private onChangeText (value: string) {
    const formatted = this.getCurrentNum(this.formatNum(value));
    this.setState((prevState: IMDStepperState, props: IMDStepperProps) => ({
      currentNum: formatted,
      isMin: subtr(formatted, props.step!) <= props.min!,
      isMax: accAdd(formatted, props.step!) >= props.max!,
    }));
    if (this.props.onChange) {
      this.props.onChange(formatted);
    }
  }
}

function subtr (num1: number, num2: number): number {
  const r1 = getDecimalNum(num1);
  const r2 = getDecimalNum(num2);
  const m = Math.pow(10, Math.max(r1, r2));
  const n = r1 >= r2 ? r1 : r2;
  return +((num1 * m - num2 * m) / m).toFixed(n);
}
function accAdd (num1: number, num2: number): number {
  const r1 = getDecimalNum(num1);
  const r2 = getDecimalNum(num2);
  const m = Math.pow(10, Math.max(r1, r2));
  return +((num1 * m + num2 * m) / m);
}
function getDecimalNum (num: number): number {
  try {
    return num.toString().split('.')[1].length;
  } catch (e) {
    return 0;
  }
}
