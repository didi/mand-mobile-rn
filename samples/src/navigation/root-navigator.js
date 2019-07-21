import { createStackNavigator, createAppContainer } from 'react-navigation'
import { HomeScreen } from '../screen/home'
import { IconScreen } from '../screen/basic/icon'
import { ButtonScreen } from '../screen/basic/button'
import { AmountScreen } from '../screen/business/amount'
import { AgreeScreen } from '../screen/form/agree'
import { RefreshControlScreen } from '../screen/gesture/refresh-control'
import { PopupScreen } from '../screen/feedback/popup'
import { FieldScreen } from '../screen/form/field'
import { DoughnutScreen } from '../screen/basic/doughnut'
import { TagScreen } from '../screen/basic/tag'
import { StepperScreen } from '../screen/basic/stepper'
import { DetailItemScreen } from '../screen/basic/detail-item'
import { ResultPageScreen } from '../screen/business/result-page'
import { BillScreen } from '../screen/business/bill'
import { WaterMarkScreen } from '../screen/business/water-mark'
import { CellItemScreen } from '../screen/basic/cell-item'
import { SwitchScreen } from '../screen/form/switch'
import { ProgressScreen } from '../screen/basic/progress'
import { NumberKeyboardScreen } from '../screen/form/number-keyboard'
import { ActionBarScreen } from '../screen/basic/action-bar'
import { ImagePickerScreen } from '../screen/feedback/image-picker'
import { SliderScreen } from '../screen/form/slider'
import { LandscapeScreen } from '../screen/feedback/landscape'
import { TipScreen } from '../screen/feedback/tip'
import { CheckScreen } from '../screen/form/check'
import { ToastScreen } from '../screen/feedback/toast'
import { RadioScreen } from '../screen/form/radio'
import { CodeBoxScreen } from '../screen/form/code-box'
import { CashierScreen } from '../screen/business/cashier'
import { DropMenuScreen } from '../screen/basic/drop-menu'
import { InputItemScreen } from '../screen/form/input-item'
import { NormalInputItemScreen } from '../screen/form/input-item/normal'
import { BusinessInputItemScreen } from '../screen/form/input-item/business'
import { ControlInputItemScreen } from '../screen/form/input-item/control'
import { FloatInputItemScreen } from '../screen/form/input-item/float'
import { ErrorInputItemScreen } from '../screen/form/input-item/error'
import { LargeSizeInputItemScreen } from '../screen/form/input-item/large-size'
import { ChartScreen } from '../screen/business/chart'
import { ActionSheetScreen } from '../screen/feedback/action-sheet'
import { NoticeBarScreen } from '../screen/basic/notice-bar'
import { TabBarScreen } from '../screen/basic/tab-bar'
import { TabsScreen } from '../screen/basic/tabs'
import { TabPickerScreen } from '../screen/feedback/tab-picker'
import { ActivityIndicatorScreen } from '../screen/basic/activity-indicator'
import { StepsScreen } from '../screen/basic/steps'
import { CaptchaScreen } from '../screen/business/captcha'
import { SwiperScreen } from '../screen/basic/swiper'
import { SwiperHScreen } from '../screen/basic/swiper/horizontal'
import { SwiperVScreen } from '../screen/basic/swiper/vertical'
import { SwiperFadeScreen } from '../screen/basic/swiper/fade'
import { SwiperMulitScreen } from '../screen/basic/swiper/mulit'
import { SelectorScreen } from '../screen/feedback/selector'
import { PickerScreen } from '../screen/feedback/picker'
import { DialogScreen } from '../screen/feedback/dialog'
import { ShadowScreen } from '../screen/basic/shadow'
import { DatePickerScreen } from '../screen/feedback/date-picker'
import { ImageViewerScreen } from '../screen/basic/image-viewer'
/* @init<%import { ${componentName}Screen } from '../screen/${componentType}/${componentKebabName}';%> */

const rootRoutesConfig = {
  Home: {
    screen: HomeScreen,
  },
  Icon: {
    screen: IconScreen,
  },
  Button: {
    screen: ButtonScreen,
  },
  Amount: {
    screen: AmountScreen,
  },
  Agree: {
    screen: AgreeScreen,
  },
  RefreshControl: {
    screen: RefreshControlScreen,
  },
  Popup: {
    screen: PopupScreen,
  },
  Field: {
    screen: FieldScreen,
  },
  Doughnut: {
    screen: DoughnutScreen,
  },
  Tag: {
    screen: TagScreen,
  },
  Stepper: {
    screen: StepperScreen,
  },
  DetailItem: {
    screen: DetailItemScreen,
  },
  NumberKeyboard: {
    screen: NumberKeyboardScreen,
  },
  ResultPage: {
    screen: ResultPageScreen,
  },
  Bill: {
    screen: BillScreen,
  },
  WaterMark: {
    screen: WaterMarkScreen,
  },
  CellItem: {
    screen: CellItemScreen,
  },
  Switch: {
    screen: SwitchScreen,
  },
  Progress: {
    screen: ProgressScreen,
  },
  InputItem: {
    screen: InputItemScreen,
  },
  ActionBar: {
    screen: ActionBarScreen,
  },
  Slider: {
    screen: SliderScreen,
  },
  ImagePicker: {
    screen: ImagePickerScreen,
  },
  Landscape: {
    screen: LandscapeScreen,
  },
  Tip: {
    screen: TipScreen,
  },
  Check: {
    screen: CheckScreen,
  },
  Toast: {
    screen: ToastScreen,
  },
  Radio: {
    screen: RadioScreen,
  },
  CodeBox: {
    screen: CodeBoxScreen,
  },
  Cashier: {
    screen: CashierScreen,
  },
  DropMenu: {
    screen: DropMenuScreen,
  },
  NormalInput: {
    screen: NormalInputItemScreen,
  },
  BussinessInput: {
    screen: BusinessInputItemScreen,
  },
  ControlInput: {
    screen: ControlInputItemScreen,
  },
  FloatInput: {
    screen: FloatInputItemScreen,
  },
  ErrorInput: {
    screen: ErrorInputItemScreen,
  },
  LargeSizeInput: {
    screen: LargeSizeInputItemScreen,
  },
  Chart: {
    screen: ChartScreen,
  },
  NoticeBar: {
    screen: NoticeBarScreen,
  },
  TabBar: { screen: TabBarScreen },
  Tabs: { screen: TabsScreen },
  TabPicker: { screen: TabPickerScreen },
  ActivityIndicator: {
    screen: ActivityIndicatorScreen,
  },
  Steps: {
    screen: StepsScreen,
  },
  Captcha: {
    screen: CaptchaScreen,
  },
  Swiper: {
    screen: SwiperScreen,
  },
  SwiperH: {
    screen: SwiperHScreen,
  },
  SwiperV: {
    screen: SwiperVScreen,
  },
  SwiperFade: {
    screen: SwiperFadeScreen,
  },
  SwiperMulit: {
    screen: SwiperMulitScreen,
  },
  ActionSheet: {
    screen: ActionSheetScreen,
  },
  Selector: {
    screen: SelectorScreen,
  },
  Picker: { screen: PickerScreen },
  Dialog: { screen: DialogScreen },
  Shadow: { screen: ShadowScreen },
  DatePicker: { screen: DatePickerScreen },
  ImageViewer: { screen: ImageViewerScreen },
  /* @init<%  ${componentName}: { screen: ${componentName}Screen },%> */
}

export default createAppContainer(
  createStackNavigator(rootRoutesConfig, {
    initialRouteName: 'Home',
    navigationOptions: {
      title: 'Mand Mobile RN',
      gesturesEnabled: true,
    },
    headerMode: 'screen',
  }),
)
