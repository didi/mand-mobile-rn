import { innerScaleFont, innerScaleSize, onePixcel } from './responsive';

/*
 * GLOBAL COLOR
 */
const MDThemeStyleVaribles: { [key: string]: any } = {
  colors: {
    // brand color
    primary: '#2F86F6', // 品牌色

    // text color
    textBase: '#111A34', // 重要信息，如一级标题
    textBaseInverse: '#FFF',
    textBody: '#41485D', // 普通信息，如正文主要内容
    textMinor: '#666f83', // 次要信息，如利益点、摘要
    textCaption: '#858B9C', // 辅助信息，如列表内容描述
    textDisabled: '#C5CAD5', // 禁用状态
    textPlaceholder: '#C5CAD5', // 默认提示输入
    textHighlight: '#2F86F6', // 高亮状态
    textWarn: '#FF7D41', // 利益点，警告提示
    textError: '#FF5257', // 强提示报错
    textLink: '#5878B4', // 文字链接

    // border & bg
    borderBase: '#E2E4EA', // 条目边框
    borderElement: '#C5CAD5', // 元素边框，如按钮
    bg: '#FFF',
    bgBase: '#F9FAFB', // 元素，容器背景
    bgInverse: '#FFF',
    bgDisabled: '#C5CAD5', // 禁用元素背景
    bgTap: 'rgba(0, 0, 0, .08)', // 条目点击态
    mask: 'rgba(37, 38, 45, .7)', // 弹窗蒙层
  },

  /*
   * GLOBAL SIZE
   */
  // text size
  fontSize: {
    headingLarge: innerScaleFont(60),
    headingMedium: innerScaleFont(52),
    headingNormal: innerScaleFont(44),
    captionLarge: innerScaleFont(36),
    captionNormal: innerScaleFont(32),
    bodyLarge: innerScaleFont(28),
    bodyNormal: innerScaleFont(26),
    minorLarge: innerScaleFont(24),
    minorNormal: innerScaleFont(20),
  },

  fontWeight: {
    light: '300',
    normal: 'normal',
    medium: '500',
    semibold: '600',
    bolder: '700',
    bold: 'bold',
  },

  // font family
  fontFamily: {
    normal:
      '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif',
    number: 'DIDIFD-Medium',
  },

  // radius size
  radius: {
    normal: innerScaleSize(4),
    circle: 50,
  },

  // border size
  borderWidth: {
    base: onePixcel(),
  },

  // gap size
  gapSize: {
    hXSmall: innerScaleSize(8),
    hSmall: innerScaleSize(12),
    hMid: innerScaleSize(20),
    hLarge: innerScaleSize(32),
    hSuperLarge: innerScaleSize(40),
    vXSmall: innerScaleSize(8),
    vSmall: innerScaleSize(12),
    vMid: innerScaleSize(20),
    vLarge: innerScaleSize(32),
    vSuperLarge: innerScaleSize(40),
  },

  /*
   * GLOBAL OTHER
   */

  // opacity
  opacity: {
    disabled: 0.3, // opacity of disabled button, switch, agree
  },
};

function customThemes () {
  // @ts-ignore
  const themes = global.MD_CUSTOM_THEMES;

  if (!themes) {
    return;
  }

  for (const key in themes) {
    if (
      themes.hasOwnProperty(key) &&
      MDThemeStyleVaribles.hasOwnProperty(key)
    ) {
      MDThemeStyleVaribles[key] = {
        ...MDThemeStyleVaribles[key],
        ...themes[key],
      };
    }
  }
}

customThemes();

export default { ...MDThemeStyleVaribles };
