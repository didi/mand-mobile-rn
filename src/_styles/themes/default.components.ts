import { default as base } from './default.basic';
import { innerScaleFont, innerScaleSize } from './responsive';

/*
 * components
 */

const MDComponentsThemes: { [key: string]: any } = {
  // button
  button: {
    primaryFill: base.colors.primary,
    defaultFill: base.colors.bgInverse,
    disabledFill: base.colors.bgDisabled,
    warningFill: base.colors.textError,

    primaryActiveFill: '#2A78DC',
    defaultActiveFill: base.colors.bg,
    warningActiveFill: '#E9424F',

    primaryPlainActiveFill: '#E1E9F6',
    defaultPlainActiveFill: 'rgba(0, 0, 0, .08)',
    warningPlainActiveFill: '#FAC3C6',

    defaultColor: base.colors.textBody,
    primaryColor: base.colors.textBaseInverse,
    disabledColor: base.colors.textBaseInverse,
    warningColor: base.colors.textBaseInverse,

    width: innerScaleSize(750),
    height: innerScaleSize(100),
    fontSize: base.fontSize.captionLarge,
    fontWeight: base.fontWeight.medium,

    smallWidth: innerScaleSize(264),
    smallHeight: innerScaleSize(64),
    smallFontSize: base.fontSize.bodyLarge,

    radius: base.radius.normal,
  },

  // actionBar
  actionBar: {
    width: '100%',
    height: innerScaleSize(100),
    paddingVertical: base.gapSize.vMid,
    paddingHorizontal: base.gapSize.hSuperLarge,
    buttonGap: innerScaleSize(22),
    slotHeight: innerScaleSize(100),
    zIndex: 100,
  },

  // actionSheet
  actionSheet: {
    height: innerScaleSize(120),
    paddingHorizontal: base.gapSize.hSuperLarge,
    color: base.colors.textBody,
    colorHighlight: base.colors.primary,
    colorCancel: base.colors.textMinor,
    fontSize: base.fontSize.captionNormal,
    bg: base.colors.bgInverse,
    disabledOpacity: base.opacity.disabled,
    cancelGapBg: base.colors.bgBase,
    zIndex: 1101,
  },

  // progress
  progress: {
    upperColor: '#4392F6',
    underColor: '#CCC',
    height: 5,
  },

  // agree
  agree: {
    fill: base.colors.primary,
    fillInverse: base.colors.bgDisabled,
    disabledOpacity: base.opacity.disabled,
  },

  // bill
  bill: {
    bg: base.colors.bgBase,
    paddingTop: innerScaleSize(28),
    paddingLeft: innerScaleSize(32),
    paddingBottom: innerScaleSize(8),
    nameFontSize: base.fontSize.captionLarge,
    nameColor: base.colors.textBody,
    noFontSize: base.fontSize.minorLarge,
    noColor: base.colors.textPlaceholder,
    height: innerScaleSize(18),
    neckPadding: innerScaleSize(10),
    conBottom: innerScaleSize(20),
    detailBottom: innerScaleSize(40),
    descriptionFontSize: base.fontSize.minorLarge,
    descriptionColor: base.colors.textCaption,
  },

  // captcha
  captcha: {
    zIndex: 1301,
    titleColor: base.colors.textBase,
    titleFontSize: base.fontSize.headingNormal,
    color: base.colors.textCaption,
    fontSize: base.fontSize.bodyLarge,
    footerFontSize: base.fontSize.minorLarge,
    errorColor: base.colors.textError,
    briefColor: base.colors.textCaption,
    countbtnGap: base.gapSize.hLarge,
    btnColor: base.colors.primary,
  },

  // cashier
  cashier: {
    bg: base.colors.bgInverse,
    chooseTitleFontSize: base.fontSize.bodyLarge, // - 支付标题
    chooseTitleColor: base.colors.textMinor,
    chooseAmountFontSize: innerScaleFont(80), // - 支付金额
    chooseAmountFontFamily: base.fontFamily.number,
    chooseAmountLineHeight: innerScaleSize(120),
    chooseAmountColor: base.colors.textBase,
    chooseDescribeFontSize: base.fontSize.minorNormal, // - 支付描述
    chooseDescribeColor: base.colors.textMinor,
    chooseChannelTitleFontSize: innerScaleFont(30), // - 支付渠道标题
    chooseChannelTitleColor: base.colors.textBody,
    chooseChannelTitleActionFontSize: base.fontSize.bodyLarge, // - 支付渠道动作标题
    chooseChannelTitleActionColor: base.colors.primary,
    chooseChannelDescFontSize: base.fontSize.minorLarge, // - 支付渠道备注
    chooseChannelDescColor: base.colors.textCaption,
    chooseChannelIconColor: base.colors.primary,
    chooseMoreFontSize: base.fontSize.minorLarge, // - 更多支付方式
    chooseMoreColor: base.colors.textMinor,
    resultContentHeight: innerScaleSize(550),
    resultTextFontSize: innerScaleFont(24),
    resultTextColor: base.colors.textMinor,
    loadingContentHeight: innerScaleSize(420),
  },

  // chart
  chart: {
    width: innerScaleSize(480),
    height: innerScaleSize(320),
    lineColor: '#ccc',
    pathColor: base.colors.primary,
    textColor: base.colors.textMinor,
    labelFontSize: innerScaleFont(22),
    valueFontSize: innerScaleFont(20),
  },

  // codebox
  codebox: {
    fontSize: innerScaleFont(50),
    width: innerScaleSize(66),
    height: innerScaleSize(70),
    gutter: innerScaleSize(18),
    borderWidth: base.borderWidth.base,
    borderColor: base.colors.borderElement,
    borderActiveColor: base.colors.textBase,
    color: base.colors.textBase,
    blinkColor: base.colors.textBase,
    dotColor: base.colors.textBase,
    holderSpace: base.gapSize.hSmall,
    disabledColor: base.colors.textDisabled,
  },

  // picker
  datePicker: {
    fontSize: base.fontSize.captionNormal,
    timeFontSize: base.fontSize.bodyLarge,
  },

  // dialog
  dialog: {
    width: innerScaleSize(606),
    radius: innerScaleSize(8),
    titleFontSize: innerScaleFont(40),
    titleColor: base.colors.textBase,
    textFontSize: base.fontSize.bodyLarge,
    textColor: base.colors.textMinor,
    height: innerScaleSize(100),
    fontSize: base.fontSize.captionLarge,
    borderColor: base.colors.borderBase,
    closeColor: base.colors.textCaption,
    highlightColor: base.colors.primary,
    iconSize: innerScaleFont(100),
    iconFill: base.colors.textCaption,
    closeWidth: innerScaleSize(30),
    actionFontSize: base.fontSize.captionLarge,
    actionColor: base.colors.textMinor,
    actionHightColor: base.colors.textHighlight,
    zIndex: 1500,
  },

  // overlay
  overlay: {
    bg: base.colors.bgInverse,
    zIndex: 1501,
  },

  // dropMenu
  dropMenu: {
    height: innerScaleSize(110),
    zIndex: 1200,
    bg: base.colors.bgInverse,
    borderColor: base.colors.borderBase,
    listBg: base.colors.bgInverse,
    highLightColor: base.colors.textHighlight,
    normalColor: base.colors.textMinor,
    fontSize: base.fontSize.captionNormal,
    fontWeight: base.fontWeight.medium,
    disabledOpacity: base.opacity.disabled,
  },

  // field
  field: {
    paddingHorizontal: base.gapSize.hSuperLarge,
    paddingVertical: base.gapSize.vSuperLarge,
    bgColor: base.colors.bgInverse,
    headerGap: base.gapSize.vLarge,
    footerGap: base.gapSize.vMid,
    titleColor: base.colors.textBase,
    titleFontSize: base.fontSize.captionLarge,
    titleFontWeight: base.fontWeight.normal,
    briefColor: base.colors.textCaption,
    briefFontSize: base.fontSize.bodyLarge,
    color: base.colors.textMinor,
    fontSize: base.fontSize.bodyLarge,
  },

  // item
  fieldItem: {
    minHeight: innerScaleSize(108),
    paddingVertical: innerScaleSize(30),
    titleWidth: innerScaleSize(160),
    titleGap: innerScaleSize(10),
    color: base.colors.textBase,
    fontSize: base.fontSize.captionNormal,
    fontWeight: base.fontWeight.medium,
    placeholderColor: base.colors.textPlaceholder,
    addonColor: base.colors.textCaption,
    addonFontSize: base.fontSize.bodyLarge,
    borderColor: base.colors.borderBase,
    childrenFontSize: base.fontSize.minorLarge,
  },

  // cellItem
  cellItem: {
    minHeight: innerScaleSize(100),
    paddingVertical: innerScaleSize(32),
    multilinesPaddingVertical: innerScaleSize(36),
    titleColor: base.colors.textBase,
    titleFontSize: base.fontSize.captionNormal,
    briefColor: base.colors.textCaption,
    briefFontSize: base.fontSize.minorLarge,
    rightColor: base.colors.textCaption,
    rightFontSize: base.fontSize.bodyLarge,
    borderColor: base.colors.borderBase,
  },

  // detailItem
  detailItem: {
    fontSize: base.fontSize.bodyLarge,
    titleColor: base.colors.textCaption,
    contentColor: base.colors.textBody,
    gap: base.gapSize.vSmall,
  },

  // icon
  icon: {
    smaller: innerScaleFont(20),
    small: innerScaleFont(24),
    medium: innerScaleFont(32),
    large: innerScaleFont(42),
  },

  // imageViewer
  imageViewer: {
    zIndex: 1001,
    indexFontSize: innerScaleFont(32),
    indexBottom: innerScaleSize(100),
  },

  // inputItem
  inputItem: {
    height: innerScaleSize(100),
    fontSize: base.fontSize.captionNormal,
    fontWeight: base.fontWeight.medium,
    titleLatentFontSize: base.fontSize.bodyNormal,
    fontSizeLarge: base.fontSize.headingLarge,
    fontSizeError: base.fontSize.minorLarge,
    fontSizeBrief: base.fontSize.minorLarge,
    color: base.colors.textBase,
    titleLatentColor: base.colors.textMinor,
    colorDisabled: base.opacity.disabled,
    colorError: base.colors.textError,
    colorBrief: base.colors.textMinor,
    placeholder: base.colors.textPlaceholder,
    placeholderHighlight: base.colors.primary,
    icon: base.colors.textPlaceholder, // - delete icon,
  },

  // slider
  slider: {
    height: innerScaleSize(120),
    progressBarHeight: innerScaleSize(5),
    bg: base.colors.bg,
    bgHandler: base.colors.primary,
    bgHandlerDisabled: 'rgba(47, 134, 246, 0.44)',
    circleBorderColor: base.colors.borderElement,
    circleBorderWidth: innerScaleSize(1),
    formatColor: base.colors.textMinor,
  },

  // landscape
  landscape: {
    width: innerScaleSize(540),
    radius: base.radius.normal,
    fullscreenBg: base.colors.bgInverse,
    zIndex: 1700,
  },

  // noticeBar
  noticeBar: {
    fill: 'rgba(89, 158, 248, .08)',
    fontSize: base.fontSize.bodyNormal,
    color: base.colors.primary,
    zIndex: 1301,
    borderRadius: innerScaleSize(32),
    height: innerScaleSize(64),
    paddingRight: innerScaleSize(12),
    fillWarning: '#FFEEEF',
    colorWarning: '#FF5B60',
    fillActivity: '#FFEDDE',
    colorActivity: '#FF843D',
  },

  // number-keyboard
  numberKeyboard: {
    width: '100%',
    height: innerScaleSize(428),
    bg: base.colors.bgBase,
    keyHeight: innerScaleSize(107),
    keyBg: base.colors.bgInverse,
    keyBgTap: base.colors.bgBase,
    keyConfirmBg: base.colors.primary,
    keyConfirmBgTap: '#2A78DC',
    keyFontSize: base.fontSize.headingMedium,
    keyFontWeight: base.fontWeight.medium,
    keyColor: base.colors.textBase,
    keyConfirmColor: base.colors.textBaseInverse,
    keyBordrColor: base.colors.borderBase,
    zIndex: 1302,
  },

  // picker
  picker: {
    paddingH: base.gapSize.hSuperLarge,
    fontSize: base.fontSize.captionNormal,
    disabledOpacity: 0.5,
    color: base.colors.textDisabled,
    colorActive: base.colors.textHighlight,
    fontWeightActive: base.fontWeight.medium,
    borderColor: base.colors.borderBase,
    zIndex: 1100,
  },

  // popup
  popup: {
    titleBarBg: base.colors.bgBase,
    titleBarHeight: innerScaleSize(120),
    titleBarHeightLarge: innerScaleSize(180),
    titleBarRadius: innerScaleSize(8),
    titleBarFontSizeButton: base.fontSize.captionLarge,
    titleBarFontWeightButton: base.fontWeight.medium,
    titleBarFontSizeTitle: innerScaleFont(40),
    titleBarFontSizeDescribe: base.fontSize.bodyLarge,
    titleBarColorTitle: base.colors.textBase,
    titleBarColorDescribe: base.colors.textCaption,
    titleBarColorButtonLeft: base.colors.textMinor,
    titleBarColorButtonRight: base.colors.textHighlight,
    maskBg: base.colors.mask,
    zIndex: 1000,
  },

  // radio
  radio: {
    color: base.colors.textHighlight,
    disabledColor: base.colors.textDisabled,
  },

  // check
  check: {
    color: base.colors.textHighlight,
    disabledColor: base.colors.textDisabled,
  },

  // checkbox
  checkbox: {
    color: base.colors.textBase,
    fontSize: base.fontSize.captionNormal,
    disabledColor: base.colors.textDisabled,
    activeColor: base.colors.primary,
    activeBorderColor: base.colors.primary,
    activeBg: `${base.colors.primary}0D`, // - alpha 5%
    borderColor: base.colors.borderElement,
    borderRadius: base.radius.normal,
  },

  // checklist
  checklist: {
    activeColor: base.colors.primary,
  },

  // resultPage
  resultPage: {
    imageSize: innerScaleSize(260),
    titleFontSize: base.fontSize.captionNormal,
    describeFontSize: base.fontSize.bodyLarge,
    titleColor: base.colors.textBase,
    describeColor: base.colors.textCaption,
  },

  // selector
  selector: {
    disabledOpacity: 0.2,
    activeColor: base.colors.primary,
    zIndex: 1102,
  },

  // stepper
  stepper: {
    fill: base.colors.bgBase,
    disabledOpacity: base.opacity.disabled,
    color: base.colors.textBase,
    fontSize: base.fontSize.bodyLarge,
    inputFontSize: base.fontSize.bodyNormal,
    height: innerScaleSize(50),
    widthButton: innerScaleSize(54),
    widthInput: innerScaleSize(68),
    radiusButton: 0,
    radiusInput: 0,
    marginLeftInput: innerScaleSize(4),
    marginRightInput: innerScaleSize(4),
    widthIcon: innerScaleSize(24),
  },

  // steps
  steps: {
    color: '#ccc',
    colorActive: base.colors.primary,
    borderSize: innerScaleSize(2),
    iconSize: innerScaleSize(32), // - icon size
    iconFontSize: innerScaleFont(32), // - icon size
    textColor: base.colors.textBody,
    descColor: base.colors.textCaption,
    textFontSize: base.fontSize.bodyLarge,
    textGapHorizontal: innerScaleSize(20),
    textGapVertical: innerScaleSize(40),
    descFontSize: base.fontSize.bodyNormal,
    transitionDelay: 150, // - .15s
  },

  // switches
  switchs: {
    fill: base.colors.primary,
    fillInverse: base.colors.bgDisabled,
    handleColor: '#FFF',
    itemColorDisabled: base.opacity.disabled,
    width: innerScaleSize(80),
    height: innerScaleSize(48),
    thumbWidth: innerScaleSize(40),
    thumbHeight: innerScaleSize(40),
    thumbRadius: innerScaleSize(20),
    thumbTop: innerScaleSize(4),
    thumbLeft: innerScaleSize(4),
    thumbX: innerScaleSize(36),
  },

  // swiper
  swiper: {
    indicatorFill: base.colors.primary,
  },

  // tabs
  tabs: {
    fontSize: base.fontSize.bodyLarge,
    textColor: base.colors.textMinor,
    fontWeight: base.fontWeight.medium,
    activeColor: base.colors.primary,
    disabledColor: base.colors.textDisabled,
    bg: base.colors.bgBase,
    height: innerScaleSize(80),
    inkHeight: innerScaleSize(3),
    offset: base.gapSize.hSuperLarge,
    itemGap: base.gapSize.hMid,
  },

  // picker
  tabPicker: {
    height: innerScaleSize(400),
    hGap: base.gapSize.hSuperLarge,
    bg: base.colors.bgInverse,
    zIndex: 1102,
  },

  // tag
  tag: {
    color: base.colors.primary,
    filletRadius: base.radius.normal,
    largeFontSize: base.fontSize.bodyNormal,
    smallFontSize: base.fontSize.minorNormal,
    tinyFontSize: innerScaleFont(12),
    viewHeight: {
      tiny: innerScaleSize(26.66667),
      small: innerScaleSize(40.66667),
      large: innerScaleSize(51.33333),
    },
  },

  // tip
  tip: {
    maxWidth: innerScaleSize(160),
    maxWidth2: innerScaleSize(100),
    color: base.colors.textBaseInverse,
    fontSize: base.fontSize.minorLarge,
    borderRadius: 1000,
    zIndex: 1303,
    bottom: -5,
    right: -4,
    rightWeb: -3,
    left: 4,
    marginLeft: -5,
    borderWidthL: 5,
    borderWidthR: 6,
    tipFill: 'rgba(74, 76, 91, 0.8)',
    tipTransp: 'transparent',
    boxShadow: '0 5px 20px rgba(0, 0, 0, .08)',
    fill: '#41485D',
    fillOpacity: 0.8,
    radius: 1000,
    paddingVertical: innerScaleSize(15),
    paddingHorizontal: innerScaleSize(32),
    paddingHorizontal2: innerScaleSize(60),
    closeSize: innerScaleSize(32),
    closeRight: innerScaleSize(16),
    closeTop: innerScaleSize(-13),
    marginTop: innerScaleSize(2),
  },

  // toast
  toast: {
    fill: 'rgba(65, 72, 93, .77)',
    fontSize: base.fontSize.bodyLarge,
    color: '#fff',
    radius: base.radius.normal,
    paddingVertical: innerScaleSize(20),
    paddingHorizontal: innerScaleSize(30),
    zIndex: 1600,
  },
};

function customComponentsThemes () {
  // @ts-ignore
  const themes = global.MD_CUSTOM_COMPONENTS_THEMES;
  if (!themes) {
    return;
  }

  for (const key in themes) {
    if (themes.hasOwnProperty(key) && MDComponentsThemes.hasOwnProperty(key)) {
      MDComponentsThemes[key] = {
        ...MDComponentsThemes[key],
        ...themes[key],
      };
    }
  }
}

customComponentsThemes();

export let button = MDComponentsThemes.button;
export let actionBar = MDComponentsThemes.actionBar;
export let actionSheet = MDComponentsThemes.actionSheet;
export let progress = MDComponentsThemes.progress;
export let agree = MDComponentsThemes.agree;
export let bill = MDComponentsThemes.bill;
export let captcha = MDComponentsThemes.captcha;
export let cashier = MDComponentsThemes.cashier;
export let chart = MDComponentsThemes.chart;
export let codebox = MDComponentsThemes.codebox;
export let datePicker = MDComponentsThemes.datePicker;
export let dialog = MDComponentsThemes.dialog;
export let overlay = MDComponentsThemes.overlay;
export let dropMenu = MDComponentsThemes.dropMenu;
export let field = MDComponentsThemes.field;
export let fieldItem = MDComponentsThemes.fieldItem;
export let cellItem = MDComponentsThemes.cellItem;
export let detailItem = MDComponentsThemes.detailItem;
export let icon = MDComponentsThemes.icon;
export let imageViewer = MDComponentsThemes.imageViewer;
export let inputItem = MDComponentsThemes.inputItem;
export let slider = MDComponentsThemes.slider;
export let landscape = MDComponentsThemes.landscape;
export let noticeBar = MDComponentsThemes.noticeBar;
export let numberKeyboard = MDComponentsThemes.numberKeyboard;
export let picker = MDComponentsThemes.picker;
export let popup = MDComponentsThemes.popup;
export let radio = MDComponentsThemes.radio;
export let check = MDComponentsThemes.check;
export let checkbox = MDComponentsThemes.checkbox;
export let checklist = MDComponentsThemes.checklist;
export let resultPage = MDComponentsThemes.resultPage;
export let selector = MDComponentsThemes.selector;
export let stepper = MDComponentsThemes.stepper;
export let steps = MDComponentsThemes.steps;
export let switchs = MDComponentsThemes.switchs;
export let swiper = MDComponentsThemes.swiper;
export let tabs = MDComponentsThemes.tabs;
export let tabPicker = MDComponentsThemes.tabPicker;
export let tag = MDComponentsThemes.tag;
export let viewHeight = MDComponentsThemes.viewHeight;
export let tip = MDComponentsThemes.tip;
export let toast = MDComponentsThemes.toast;
