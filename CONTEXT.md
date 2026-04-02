# Project Context — Lalita Chavan Portfolio 2026

This file tracks conversation history, decisions made, and work remaining.
Update it at the end of every session.

---

## What has been built

### Design system (`src/design-system/`)

All four files complete:

- **`tokens.css`** — CSS custom properties on `:root`. Covers colors, typography, spacing, border radius, borders, animation durations/easings, layout, mascot, dots.
- **`tokens.js`** — JS exports matching `tokens.css` exactly. Named exports: `colors`, `typography`, `spacing`, `borderRadius`, `borders`, `animation`, `components`, `layout`. Also exports `getPanelTokens(color)` and `isLightPanel(color)` helpers.
- **`typography.css`** — Single Google Fonts `@import` for Geist (400/600/700) + Lora (400/400i/500i/700). Base reset, all type classes.
- **`components.css`** — Page layout, nav, hero grid layout, annotation clip-path wipe, accordion (desktop + mobile), panel label rotation, pill button, mascot.

### Scaffold

- `package.json` — React 18, Vite 5, Tailwind 3, autoprefixer, postcss
- `vite.config.js`, `postcss.config.js`
- `tailwind.config.js` — imports `tokens.js`, extends theme
- `index.html` — preconnect hints only
- `src/main.jsx`, `src/index.css`

### `src/HomePage.jsx`

**Nav**
- Wordmark: Geist semibold, clamp(14–18px), `--tracking-tight` (-1px), `--color-ink-muted`
- `isHome` prop on `Nav` — sets `aria-current="page"` on wordmark when on homepage
- Links: Geist 14px in a white rounded-rectangle container (`--radius-md`)
- Active link: bold + `ink-primary`, inactive: regular + `ink-muted`
- Hover: `translateY(-1px)` on non-active links and wordmark (disabled on active/home via `aria-current`)
- No background hover — cursor handles the interaction feedback
- Mobile: hamburger menu — white dropdown, X icon when open

**Hero**
- CSS Grid layout: 2 columns (`auto 1fr`), 2 rows, `row-gap: var(--space-4)`, `align-items: start`
- Explicit `gridColumn`/`gridRow` on every element to prevent auto-placement issues
- Line 1: Geist semibold, `--size-hero-line1` (clamp 32–52px), `-2px` tracking, `ink-primary`, `marginTop: var(--space-5)`
- Line 2: Lora regular, `--size-hero-line2` (clamp 28–46px), `-1px` tracking (`--tracking-tight`), `ink-tertiary`
- Brush stroke removed
- Annotation 1 (row 1, col 2): triggered by hovering line 1, `alignSelf: end` (bottom-aligns to line 1), `maxWidth: 440px`
- Annotation 2 (row 2, col 2): triggered by hovering line 2, `maxWidth: 440px`
- Annotations: Lora regular, clamp(15–18px), `--leading-snug` (1.3), `-0.5px` tracking, `ink-primary`
- "3+ years" and "7,000+ surgeons" semibold in annotation 1; "Claude Code" semibold in annotation 2
- Annotation reveal: `@keyframes annotation-wipe` — `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` (400ms, accordion easing). Hide: opacity fade 150ms.
- `useIsDesktop()` hook — `matchMedia('(min-width: 768px)')` prevents hover at narrow widths
- Mobile: single column grid, annotations always visible, no animation

**Accordion**
- 4 panels (left to right): Design system (orange), Usability study (magenta), Chatbot design (yellow), Mobile-first design (green)
- Default expanded: last panel (Mobile-first design, green)
- Stacked card look: panels overlap via `margin-left: calc(var(--accordion-radius) * -1)`, `z-index: index + 1`
- Collapsed panels: left corners rounded only (`var(--accordion-radius) 0 0 var(--accordion-radius)`)
- Expanded panel: all four corners rounded (`var(--accordion-radius)`)
- `borderRadius` applied to both outer `.accordion-panel` div AND `.panel-clip` div
- Panel labels: Geist semibold, clamp(20–36px), `-1px` tracking, bottom-aligned via JS `ResizeObserver`
- Label inside `.panel-clip` — clipped naturally at panel bounds (matches Figma)
- `overflow: hidden` on `.panel-clip` inside each panel (not accordion itself) — mascot can peek above
- Image column: 25%, content column: 75%
- Content right padding: `clamp(48px, 8vw, 140px)` — narrower text area
- Image: `width: 100%; height: auto` — no side clipping
- `PanelImage` uses `ResizeObserver` to center image when it fits, top-align when it overflows
- Desktop (≥1024px): top-aligned for dramatic crop; below 1024px: centered when fits
- `PanelLabel` component measures rendered text width via `ResizeObserver` to bottom-align all labels consistently
- Keyboard: Arrow Left/Right navigates, Enter/Space expands
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Mascot: last panel only, spring easing, hidden when expanded, hidden on mobile

**Expanded panel content:**
- Client + year: Lora medium italic (500), clamp(13–20px), `--tracking-tight`, dot separator
- Title: Geist semibold, clamp(16–24px), `--tracking-tight`
- Description: Geist regular, clamp(13–20px), `--tracking-snug` (-0.5px)
- Role/Tools: same as description
- CTA pill: Lora regular italic, clamp(13–20px), `--tracking-tight`, cream background, 44px min-height
- Pill hover: `box-shadow` lift + `translateY(-1px)`

**Custom cursor (`src/main.jsx`)**
- 16px dark dot, `position: fixed`, `pointer-events: none`
- Framer-style positioning: `translate(-50%, -50%) translate3d(x, y, 0)` — centering baked into transform, no margin changes
- Follows mouse via `mousemove`, hides on `mouseleave`
- Hover state on `a`, `button`, `[role="tab"]`, `[role="button"]`, `.hero-line-1`, `.hero-line-2`: grows to 40px, white with `mix-blend-mode: difference`
- Expanded accordion panel (`is-expanded`) excluded from cursor growth
- Two-layer cursor hiding: inline style `!important` on `<html>` + `* { cursor: none !important; }` stylesheet
- CSS transition on width/height/background for smooth scale

**Footer**
- Always pinned to bottom via `margin-top: auto` on `.page-footer`
- Border bleeds full width via negative margins
- Left: mail icon + email, `ink-primary`
- Right: "2026 · Designed by Lalita · Built with Claude Code", `ink-secondary`

**Page layout**
- Desktop (≥1024px): `height: 100dvh`, `overflow: hidden`, flex column — above the fold
- Tablet (768–1023px): scrolling, tighter vertical rhythm, accordion pinned to bottom via `flex: 1` on wrapper
- Below 768px: normal scrolling

---

## Decisions made

| Decision | Rationale |
|---|---|
| Google Fonts for both Geist + Lora | User confirmed — single `@import` |
| Nav font size 14px | User decision after testing 16px |
| Wordmark: clamp(14–18px), semibold, -1px tracking | Confirmed from Figma |
| Wordmark color: `ink-muted` | Figma shows #717171 — closest token |
| `overflow: hidden` on `.panel-clip` | Allows mascot to escape panel bounds |
| `useIsDesktop()` JS hook | Prevents hover animations at narrow browser widths |
| `getPanelTokens()` takes color hex | Color is single source of truth |
| Default expanded panel: last (index 3) | Per user request |
| No nav dots in expanded panel | Removed per user request |
| Nav links in rounded-rectangle container | User changed from pill to rounded-rect |
| Full-bleed footer border | Negative margins cancel page padding |
| Above-fold layout desktop only | Mobile/tablet scrolls normally |
| Panel labels bottom-aligned via JS | Consistent visual baseline across all label lengths |
| Custom cursor replaces nav hover background | Cursor IS the hover interaction |
| `mix-blend-mode: difference` on cursor grow | Text remains readable through expanded cursor |
| Hero annotations split per line | Line 1 → annotation 1, line 2 → annotation 2 |
| `isHome` prop on Nav | Enables per-page wordmark hover control without hardcoding |
| No translate on active nav link or home wordmark | Active items shouldn't suggest clickability |
| Hero grid layout with explicit placement | Flex columns caused alignment issues; grid with `align-items: start` prevents layout shift |
| Annotation reveal: `@keyframes` clip-path wipe | CSS transitions unreliable from hidden state; keyframes always play fresh |
| Brush stroke removed | Per user request |
| Hero line 2: Lora regular, clamp(28–46px), -1px tracking, ink-tertiary | Per user request — subtler than line 1 |
| Annotation font: clamp(15–18px), line-height 1.3, ink-primary | Reduced from 20px; tighter line-height prevents row height shift in grid |
| Semibold keywords in annotations | "3+ years", "7,000+ surgeons", "Claude Code" — editorial emphasis |
| Stacked card accordion: negative margin overlap | Creates layered card look without gaps between panels |
| Collapsed panels: left corners only rounded | Reinforces stacked card metaphor |
| Framer-style cursor: `translate(-50%, -50%) translate3d()` | Centering in transform eliminates margin changes during grow/shrink |
| Two-layer cursor hiding | Inline `!important` on `<html>` + stylesheet for maximum specificity |
| Content column right padding: clamp(48–140px) | Narrower text area for better readability |
| `--hero-gap` reduced to clamp(24–48px) | Was clamp(48–96px) — too much space between hero and accordion |

---

## Remaining work

- Real mockup images for panels 1 (Design system), 2 (Airpals), 3 (Chatbot) — only RACS image added so far
- Mobile accordion layout polish
- No routing yet (nav links are plain `<a>` hrefs)
- Case study pages not built

---

## How to run

```bash
npm install
npm run dev   # → http://localhost:5173 (or next available port)
```
