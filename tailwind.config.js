/** @type {import('tailwindcss').Config} */

import tokens from './src/design-system/tokens.js'

const { colors, typography, spacing, borderRadius, borders, animation, layout } = tokens

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    // Replace Tailwind defaults entirely for these
    screens: {
      sm:  layout.breakpoints.mobile,   // 640px
      md:  layout.breakpoints.tablet,   // 768px
      lg:  layout.breakpoints.desktop,  // 1024px
      xl:  layout.breakpoints.wide,     // 1280px
    },

    fontFamily: {
      sans:  typography.fontFamily.sans,
      serif: typography.fontFamily.serif,
    },

    fontWeight: {
      regular:  typography.fontWeight.regular,   // 400
      semibold: typography.fontWeight.semibold,  // 600
      bold:     typography.fontWeight.bold,      // 700
    },

    lineHeight: {
      tight:   typography.lineHeight.tight,    // 1.15
      snug:    typography.lineHeight.snug,     // 1.3
      normal:  typography.lineHeight.normal,   // 1.6
      relaxed: typography.lineHeight.relaxed,  // 1.7
    },

    letterSpacing: {
      normal:        typography.letterSpacing.normal,        // 0
      wide:          typography.letterSpacing.wide,          // 0.04em
      wider:         typography.letterSpacing.wider,         // 0.07em
      'panel-label': typography.letterSpacing['panel-label'], // -0.07em
    },

    borderRadius: {
      sm:   borderRadius.sm,   // 4px
      md:   borderRadius.md,   // 8px
      lg:   borderRadius.lg,   // 12px
      xl:   borderRadius.xl,   // 16px
      full: borderRadius.full, // 9999px
    },

    extend: {
      // Colors
      colors: {
        // Base palette
        cream: {
          base: colors['cream-base'],
          dark: colors['cream-dark'],
        },
        ink: {
          primary:   colors['ink-primary'],
          secondary: colors['ink-secondary'],
          tertiary:  colors['ink-tertiary'],
          muted:     colors['ink-muted'],
          light:     colors['ink-light'],
        },
        accent: {
          brush: colors['accent-brush'],
        },
        // Accordion panel identifiers — reserved
        panel: {
          orange:  colors['panel-orange'],
          magenta: colors['panel-magenta'],
          yellow:  colors['panel-yellow'],
          green:   colors['panel-green'],
        },
        // Semantic
        'focus-ring': colors['focus-ring'],
        error:        colors['error'],
        success:      colors['success'],
      },

      // Font sizes — includes clamp() values
      fontSize: {
        ...typography.fontSize,
      },

      // Spacing — token scale + named layout values
      spacing: {
        ...spacing,
      },

      // Border widths
      borderWidth: {
        thin:    borders.width.thin,    // 0.5px
        DEFAULT: borders.width.default, // 1px
        medium:  borders.width.medium,  // 1.5px
        thick:   borders.width.thick,   // 2px
      },

      // Border colors
      borderColor: {
        DEFAULT: borders.color.default,
        subtle:  borders.color.subtle,
        strong:  borders.color.strong,
      },

      // Max widths
      maxWidth: {
        content: layout.maxContentWidth, // 1280px
        'hero-right': layout.heroRightMaxW, // 380px
      },

      // Transition durations
      transitionDuration: {
        fast:      animation.duration.fast,      // 150ms
        DEFAULT:   animation.duration.default,   // 250ms
        slow:      animation.duration.slow,      // 400ms
        accordion: animation.duration.accordion, // 500ms
      },

      // Transition timing functions
      transitionTimingFunction: {
        DEFAULT:   animation.easing.default,   // ease-out
        accordion: animation.easing.accordion, // cubic-bezier(0.77,0,0.175,1)
        spring:    animation.easing.spring,    // cubic-bezier(0.34,1.56,0.64,1)
      },

      // Z-index
      zIndex: {
        mascot: String(10),
      },
    },
  },

  plugins: [],
}
