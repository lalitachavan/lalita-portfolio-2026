/**
 * Design Tokens — Lalita Chavan Portfolio
 *
 * Editorial, warm, typographically considered.
 * Use these in tailwind.config.js (theme.extend)
 * and for inline styles in components.
 *
 * RULES:
 *  - Never hardcode a hex in a component; use a token.
 *  - Font weights: 400, 600, 700 only.
 *    600 is reserved for accordion panel labels.
 *  - Panel colors are reserved for accordion panels.
 *  - accent-brush is reserved for the brush stroke SVG.
 *  - All transitions must be inside
 *    @media (prefers-reduced-motion: no-preference).
 *  - Always use :focus-visible, never :focus.
 */

// =============================================================
// COLORS
// =============================================================

export const colors = {
  // Base palette
  'cream-base':    '#F9F6F1', // page background only
  'cream-dark':    '#DFCEB6', // subtle surface variation
  'surface-white': '#FFFFFF', // UI surfaces only — not page backgrounds
  'ink-primary':   '#1A1A1A', // headlines, primary text
  'ink-secondary': '#444444', // body text
  'ink-tertiary':  '#535353', // annotations, captions
  'ink-muted':     '#666666', // placeholders, disabled
  'ink-light':     '#F9F6F1', // text on dark backgrounds

  // Accent — RESERVED for brush stroke SVG only
  'accent-brush':     '#D0D535',
  'accent-brush-rgb': '208, 213, 53', // for rgba() usage

  // Accordion panel identifiers
  // RESERVED: do not use for any other UI element
  'panel-orange':  '#C74B25', // Mobile-first design
  'panel-magenta': '#BD2569', // Usability study
  'panel-yellow':  '#F3BE37', // Chatbot design
  'panel-green':   '#D0D535', // Design system

  // Panel text — dark panels (orange, magenta)
  // WCAG AA: orange+white 4.52:1, magenta+white 5.18:1
  'panel-dark-text':       '#FFFFFF',
  'panel-dark-text-muted': 'rgba(255, 255, 255, 0.65)',
  'panel-dark-text-body':  'rgba(255, 255, 255, 0.85)',
  'panel-dark-border':     'rgba(255, 255, 255, 0.5)',
  'panel-dark-hover-bg':   'rgba(255, 255, 255, 0.15)',

  // Panel text — light panels (yellow, green)
  // WCAG AAA: yellow+ink 7.94:1, green+ink 7.21:1
  // Do NOT reduce muted opacity below 0.75
  'panel-light-text':       '#1A1A1A',
  'panel-light-text-muted': 'rgba(26, 26, 26, 0.75)',
  'panel-light-text-body':  'rgba(26, 26, 26, 0.88)',
  'panel-light-border':     'rgba(26, 26, 26, 0.35)',
  'panel-light-hover-bg':   'rgba(26, 26, 26, 0.08)',

  // Semantic
  'focus-ring': '#1A1A1A',
  'error':      '#C74B25', // mirrors panel-orange
  'success':    '#D0D535', // mirrors panel-green
}

// =============================================================
// PANEL TOKEN HELPER
// Call this in any component that renders an accordion panel.
// =============================================================

const LIGHT_PANEL_COLORS = new Set([
  colors['panel-yellow'],
  colors['panel-green'],
])

export const isLightPanel = (color) =>
  LIGHT_PANEL_COLORS.has(color)

export const getPanelTokens = (color) => {
  const light = isLightPanel(color)
  return {
    text:        light ? colors['panel-light-text']       : colors['panel-dark-text'],
    muted:       light ? colors['panel-light-text-muted'] : colors['panel-dark-text-muted'],
    body:        light ? colors['panel-light-text-body']  : colors['panel-dark-text-body'],
    border:      light ? colors['panel-light-border']     : colors['panel-dark-border'],
    hoverBg:     light ? colors['panel-light-hover-bg']   : colors['panel-dark-hover-bg'],
    dotActive:   light ? '#1A1A1A'                        : '#FFFFFF',
    dotInactive: light ? 'rgba(26, 26, 26, 0.25)'        : 'rgba(255, 255, 255, 0.3)',
    focusRing:   light ? '#1A1A1A'                        : '#FFFFFF',
  }
}

// =============================================================
// TYPOGRAPHY
// =============================================================

export const typography = {
  fontFamily: {
    sans:  ['"Geist"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
    serif: ['"Lora"', '"Times New Roman"', 'serif'],
  },

  fontSize: {
    'hero-line1':   ['clamp(32px, 4vw, 52px)',   { lineHeight: '1.15' }],
    'hero-line2':   ['clamp(30px, 3.8vw, 50px)', { lineHeight: '1.15' }],
    'annotation':   ['clamp(13px, 1.2vw, 15px)', { lineHeight: '1.6'  }],
    'nav':          ['14px', { lineHeight: '1.6' }],
    'wordmark':     ['18px', { lineHeight: '1'   }],
    'panel-label':  ['14px', { lineHeight: '1'   }],
    'panel-tag':    ['11px', { lineHeight: '1'   }],
    'panel-title':  ['clamp(16px, 1.8vw, 20px)', { lineHeight: '1.3'  }],
    'panel-desc':   ['13px', { lineHeight: '1.6' }],
    'panel-client':   ['20px', { lineHeight: '1.4' }],
    'panel-title-lg': ['24px', { lineHeight: '1.3' }],
    'panel-desc-lg':  ['20px', { lineHeight: '1.6' }],
    'panel-cta':    ['12px', { lineHeight: '1'   }],
    'body':         ['15px', { lineHeight: '1.6' }],
    'caption':      ['12px', { lineHeight: '1.6' }],
    'label':        ['11px', { lineHeight: '1'   }],
  },

  fontWeight: {
    regular:  '400',
    medium:   '500', // Lora italic client line only
    semibold: '600', // Geist accordion panel labels only
    bold:     '700',
  },

  lineHeight: {
    tight:   '1.15', // hero headlines
    snug:    '1.3',  // panel titles
    normal:  '1.6',  // body, annotations
    relaxed: '1.7',  // long-form prose
  },

  letterSpacing: {
    normal:        '0',
    snug:          '-0.5px',  // panel description
    tight:         '-1px',    // wordmark, panel title
    wide:          '0.04em',
    wider:         '0.07em',  // uppercase tags
    'panel-label': '-0.07em', // Geist semibold rotated labels only
  },
}

// =============================================================
// SPACING
// =============================================================

export const spacing = {
  // Base scale — unit: 4px
  '1':  '4px',
  '2':  '8px',
  '3':  '12px',
  '4':  '16px',
  '5':  '20px',
  '6':  '24px',
  '8':  '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',

  // Page layout
  'page-x':   'clamp(24px, 5vw, 80px)',
  'page-top': 'clamp(24px, 4vw, 48px)',
  'hero-gap': 'clamp(48px, 6vw, 96px)',

  // Hero internals
  'hero-headline-gap':   '8px',
  'hero-annotation-gap': '12px',
  'hero-column-gap':     'clamp(40px, 5vw, 80px)',

  // Accordion
  'accordion-height':            '340px',
  'accordion-collapsed-w':       '60px',
  'accordion-hover-w':           '72px',
  'accordion-radius':            '16px',
  'accordion-padding':           '24px',
  'accordion-image-col-w':      '25%',
  'accordion-content-col-w':    '75%',
  'panel-label-bottom':          '16px',
  'accordion-collapsed-h-mobile': '56px',
}

// =============================================================
// BORDER RADIUS
// =============================================================

export const borderRadius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  full: '9999px',
}

// =============================================================
// BORDERS
// =============================================================

export const borders = {
  width: {
    thin:    '0.5px',
    default: '1px',
    medium:  '1.5px',
    thick:   '2px',
  },
  color: {
    default: 'rgba(0, 0, 0, 0.12)',
    subtle:  'rgba(0, 0, 0, 0.06)',
    strong:  'rgba(0, 0, 0, 0.25)',
  },
}

// =============================================================
// ANIMATION
// =============================================================

export const animation = {
  duration: {
    fast:      '150ms',
    default:   '250ms',
    slow:      '400ms',
    accordion: '500ms',
  },

  easing: {
    default:   'ease-out',
    accordion: 'cubic-bezier(0.77, 0, 0.175, 1)',
    spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)', // mascot only
  },

  // Annotation reveal
  annotation: {
    transition: 'opacity 250ms ease-out, transform 250ms ease-out',
    hidden:     { opacity: 0, transform: 'translateY(4px)' },
    visible:    { opacity: 1, transform: 'translateY(0)' },
    delay:      '80ms',
  },

  // Brush stroke (stroke-dashoffset driven)
  brush: {
    duration: '300ms',
    easing:   'ease-out',
    property: 'stroke-dashoffset',
  },

  // Accordion
  panel: {
    transition: 'width 500ms cubic-bezier(0.77, 0, 0.175, 1)',
  },
  content: {
    transition: 'opacity 300ms ease-out',
    delay:      '250ms',
  },

  // Mascot
  mascot: {
    transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    default:    'translateY(0)',
    hover:      'translateY(-8px)',
  },
}

// =============================================================
// COMPONENTS
// =============================================================

export const components = {
  nav: {
    bg:           'transparent',
    text:         colors['ink-secondary'],
    textActive:   colors['ink-primary'],
    font:         'sans',
    size:         '14px',
    weight:       '400',
    weightActive: '600',
    tracking:     '0.04em',
  },

  pill: {
    dark: {
      border:   '1.5px solid rgba(255, 255, 255, 0.5)',
      color:    '#FFFFFF',
      radius:   '9999px',
      padding:  '6px 16px',
      font:     'serif',
      size:     '12px',
      weight:   '700',
      hoverBg:  'rgba(255, 255, 255, 0.15)',
    },
    light: {
      border:   '1.5px solid rgba(26, 26, 26, 0.35)',
      color:    '#1A1A1A',
      radius:   '9999px',
      padding:  '6px 16px',
      font:     'serif',
      size:     '12px',
      weight:   '700',
      hoverBg:  'rgba(26, 26, 26, 0.08)',
    },
  },

  dot: {
    size:          '8px',
    radius:        '9999px',
    inactiveDark:  'rgba(255, 255, 255, 0.3)',
    activeDark:    '#FFFFFF',
    inactiveLight: 'rgba(26, 26, 26, 0.25)',
    activeLight:   '#1A1A1A',
    transition:    'background 200ms ease-out, transform 200ms ease-out',
    activeScale:   'scale(1.3)',
  },

  focus: {
    outline:      '3px solid #1A1A1A',
    offsetInner:  '-4px', // dark panel backgrounds
    offsetOuter:  '3px',  // cream background
  },

  panelLabel: {
    font:      'sans',
    size:      '14px',
    weight:    '600',
    tracking:  '-0.07em',
    colorDark: '#FFFFFF',
    colorLight:'#1A1A1A',
    rotation:  'rotate(-90deg)',
  },

  mascot: {
    stroke:      '#1A1A1A',
    strokeWidth: '1.5px',
    fill:        'none',
    zIndex:      10,
  },
}

// =============================================================
// LAYOUT
// =============================================================

export const layout = {
  breakpoints: {
    mobile:  '640px',
    tablet:  '768px',
    desktop: '1024px',
    wide:    '1280px',
  },
  maxContentWidth: '1280px',
  heroRightMaxW:   '380px',
}

// =============================================================
// DEFAULT EXPORT (use in tailwind.config.js)
// =============================================================

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  borders,
  animation,
  components,
  layout,
}
