export type MDPopupTrans =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'bounce'
  | 'punch'
  | 'zoom'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right';

export type MDPopupPos = 'center' | 'top' | 'bottom' | 'left' | 'right';

export const PosToTrans = {
  center: 'fade',
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-right',
  right: 'slide-left',
};

export const TransToAnim = {
  fade: {
    in: 'fadeIn',
    out: 'fadeOut',
  },
  'fade-up': {
    in: 'fadeInUp',
    out: 'fadeOutDown',
  },
  'fade-down': {
    in: 'fadeInDown',
    out: 'fadeOutUp',
  },
  'fade-left': {
    in: 'fadeInLeft',
    out: 'fadeOutRight',
  },
  'fade-right': {
    in: 'fadeInRight',
    out: 'fadeOutLeft',
  },
  bounce: {
    in: 'bounceIn',
    out: 'bounceOut',
  },
  punch: {
    // todo
    in: 'zoomIn',
    out: 'zoomOut',
  },
  zoom: {
    in: 'zoomIn',
    out: 'zoomOut',
  },
  'slide-up': {
    in: 'slideInUp',
    out: 'slideOutDown',
  },
  'slide-down': {
    in: 'slideInDown',
    out: 'slideOutUp',
  },
  'slide-left': {
    in: 'slideInLeft',
    out: 'slideOutLeft',
  },
  'slide-right': {
    in: 'slideInRight',
    out: 'slideOutRight',
  },
};
