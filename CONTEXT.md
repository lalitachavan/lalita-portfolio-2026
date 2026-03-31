# Project Context — Lalita Chavan Portfolio 2026

This file tracks conversation history, decisions made, and work remaining.
Update it at the end of every session.

---

## What has been built

### Design system (`src/design-system/`)

All four files complete:

- **`tokens.css`** — CSS custom properties on `:root`. Covers colors, typography, spacing, border radius, borders, animation durations/easings, layout, mascot, dots. Fonts loaded via `typography.css` — only preconnect hints in `index.html`.
- **`tokens.js`** — JS exports matching `tokens.css` exactly. Named exports: `colors`, `typography`, `spacing`, `borderRadius`, `borders`, `animation`, `components`, `layout`. Also exports `getPanelTokens(color)` and `isLightPanel(color)` helpers. Default export used in `tailwind.config.js`.
- **`typography.css`** — Single Google Fonts `@import` for Geist (400/600/700) + Lora (400/400i/500i/700). Base reset, all type classes.
- **`components.css`** — Page layout, nav, hero layout, brush stroke animation, annotation reveal, accordion (desktop + mobile), panel label rotation, pill button, mascot.

### Scaffold

- `package.json` — React 18, Vite 5, Tailwind 3, autoprefixer, postcss
- `vite.config.js`, `postcss.config.js`
- `tailwind.config.js` — imports `tokens.js`, extends theme
- `index.html` — preconnect hints only
- `src/main.jsx`, `src/index.css`

### `src/HomePage.jsx`

**Nav**
- Wordmark: Geist semibold, 18px, `--tracking-tight` (-1px), `--color-ink-muted`
- Links: Geist 14px in a white rounded-rectangle container (`--radius-md`)
- Active link: bold + `ink-primary`, inactive: regular + `ink-muted`
- Hover: subtle `rgba(26,26,26,0.06)` background on each link
- Mobile: hamburger menu — white dropdown, X icon when open

**Hero**
- Two-column flex layout (left: headline, right: annotations)
- Line 1: Geist bold, `--size-hero-line1` (clamp 32–52px)
- Line 2: Lora regular, `--size-hero-line2` (clamp 30–50px)
- Brush stroke: SVG path, `stroke-dashoffset` animation, measured via `getTotalLength()`
- Annotations: Lora, fade in on hover with 80ms delay
- `useIsDesktop()` hook — `matchMedia('(min-width: 768px)')` prevents hover at narrow widths
- Mobile: single column, annotations always visible, brush always drawn

**Accordion**
- 4 panels (left to right): Design system (orange), Usability study (magenta), Chatbot design (yellow), Mobile-first design (green)
- Default expanded: last panel (Mobile-first design, green)
- Panel colors from `colors['panel-*']` tokens — no hardcoded hex
- `getPanelTokens(panel.color)` from `tokens.js` for all text/border/hover colors
- Desktop: horizontal flex, width transition 500ms accordion easing
- `overflow: hidden` on `.panel-clip` inside each panel (not accordion itself) — mascot can peek above
- Border radius on first/last panel only via `.panel-clip`
- Image column: 25%, content column: 75%
- Image: `object-fit: cover`, `object-position: top center`
- Image padding: `--accordion-image-padding-top` top + `--accordion-content-padding-x` left only
- Content padding: `--accordion-content-padding-y` top/bottom, `--accordion-content-padding-x` left, `--accordion-content-padding-x-right` right
- Keyboard: Arrow Left/Right navigates, Enter/Space expands
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Mascot: last panel only, spring easing, hidden when expanded, hidden on mobile

**Expanded panel content (matches Figma):**
- Client + year: Lora medium italic (500), 20px, `--tracking-tight`, `ink-primary` color, dot separator between client and year
- Title: Geist semibold, 24px (`--size-panel-title-lg`), `--tracking-tight`
- Description: Geist regular, 20px (`--size-panel-desc-lg`), `--tracking-snug` (-0.5px)
- Role: same as description, bold label + regular value
- Tools used: same as description, bold label + regular value
- CTA pill: Lora regular italic, 20px, `--tracking-tight`, cream background (`--color-cream-base`), `--touch-target` min-height (44px), `--pill-padding-x`/`--pill-padding-y`
- No navigation dots (removed)

**Footer**
- Always pinned to bottom via `margin-top: auto` on `.page-footer`
- Border bleeds full width via negative margins
- Left: mail icon + email, `ink-primary`
- Right: "2026 · Designed by Lalita · Built with Claude Code", `ink-secondary`, dot separators
- Reduced height via `space-3` padding

**Page layout**
- Desktop (≥1024px): `height: 100dvh`, `overflow: hidden`, flex column — everything above the fold
- Below 1024px: normal scrolling
- Accordion fills remaining height via `.accordion-wrapper { flex: 1; min-height: 0 }`

---

## Decisions made

| Decision | Rationale |
|---|---|
| Google Fonts for both Geist + Lora | User confirmed — single `@import` |
| Nav font size 14px | User decision after testing 16px |
| Wordmark: 18px, semibold, -1px tracking | Confirmed from Figma |
| Wordmark color: `ink-muted` | Figma shows #717171 — closest token |
| "Engineer" stays ink-primary | Figma color was a mistake per user |
| `overflow: hidden` on `.panel-clip` | Allows mascot to escape panel bounds |
| `useIsDesktop()` JS hook | Prevents hover animations at narrow browser widths |
| `getPanelTokens()` takes color hex | Color is single source of truth, `isLight` derived internally |
| No `isLight` field in panel data | Redundant with `isLightPanel(color)` |
| Two-column flex for accordion image | Scales better than absolute positioning at all breakpoints |
| Default expanded panel: last (index 3) | Per user request |
| Lora weight 500 added | For client line in expanded panel — Figma spec |
| No nav dots in expanded panel | Removed per user request |
| Nav links in rounded-rectangle container | User changed from pill to rounded-rect |
| Full-bleed footer border | Negative margins cancel page padding |
| Above-fold layout desktop only | Mobile/tablet scrolls normally |

---

## New tokens added (since last commit)

- `--color-surface-white: #FFFFFF` — UI surfaces (nav container, mobile menu)
- `--size-wordmark: 18px` — wordmark only
- `--tracking-tight: -1px` — wordmark, panel title, client line, pill
- `--tracking-snug: -0.5px` — panel description, role, tools
- `--size-panel-client: 20px` — client/year line
- `--size-panel-title-lg: 24px` — expanded panel title
- `--size-panel-desc-lg: 20px` — description, role, tools, pill text
- `--weight-medium: 500` — Lora italic client line only
- `--accordion-image-col-w: 25%` / `--accordion-content-col-w: 75%`
- `--accordion-content-padding-x` / `--accordion-content-padding-x-right` / `--accordion-content-padding-y`
- `--accordion-image-padding-top: var(--space-4)`
- `--touch-target: 44px` — accessible min button height
- `--pill-padding-x: var(--space-8)` / `--pill-padding-y: var(--space-4)`

---

## Remaining work

- Real mockup images for panels 1 (Airpals), 2 (Chatbot), 3 (Design system) — only RACS image added so far
- Mobile accordion layout polish
- No routing yet (nav links are plain `<a>` hrefs)
- Case study pages not built

---

## How to run

```bash
npm install
npm run dev   # → http://localhost:5173 (or next available port)
```
