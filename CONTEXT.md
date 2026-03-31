# Project Context — Lalita Chavan Portfolio 2026

This file tracks conversation history, decisions made, and work remaining.
Update it at the end of every session.

---

## What has been built

### Design system (`src/design-system/`)

All four files complete:

- **`tokens.css`** — CSS custom properties on `:root`. Covers colors, typography, spacing, border radius, borders, animation durations/easings, layout, mascot, dots. Fonts loaded via `typography.css` — no `<link>` in `index.html` (only preconnect hints there).
- **`tokens.js`** — JS exports matching `tokens.css` exactly. Named exports: `colors`, `typography`, `spacing`, `borderRadius`, `borders`, `animation`, `components`, `layout`. Also exports `getPanelTokens(color)` and `isLightPanel(color)` helpers. Default export used in `tailwind.config.js`.
- **`typography.css`** — Single Google Fonts `@import` for Geist (400/600/700) + Lora (400/400i/700). Base reset, all type classes: `.hero-line-1`, `.hero-line-2`, `.annotation`, `.nav-link`, `.tag`, `.label`, `.caption`, `.panel-title`, `.panel-desc`, `.panel-tag`, `.panel-label`, `.pill`.
- **`components.css`** — `.focus-light`/`.focus-dark`, hero layout, brush stroke animation, annotation reveal, accordion (desktop + mobile), panel label rotation, nav dots, pill button, mascot peek animation.

### Scaffold

- `package.json` — React 18, Vite 5, Tailwind 3, autoprefixer, postcss
- `vite.config.js` — `@vitejs/plugin-react`
- `postcss.config.js`
- `tailwind.config.js` — imports `tokens.js`, extends theme. `screens`, `fontFamily`, `fontWeight`, `lineHeight`, `letterSpacing`, `borderRadius` replace Tailwind defaults. Colors, spacing, font sizes, borders, transitions in `extend`.
- `index.html` — preconnect hints only (no font `<link>`, fonts loaded via CSS `@import`)
- `src/main.jsx`, `src/index.css` (imports design-system CSS then Tailwind layers)

### `src/HomePage.jsx`

Components built:

**Nav**
- Wordmark: Geist semibold, 18px, `--tracking-tight` (-1px), `--color-ink-muted`
- Links: Geist, 16px, active = semibold + ink-primary, inactive = regular + ink-secondary
- `focus-light` focus ring

**Hero**
- Two-column flex layout (left: headline block, right: annotations)
- Line 1: Geist bold, `--size-hero-line1` (clamp 32–52px)
- Line 2: Lora regular, `--size-hero-line2` (clamp 30–50px)
- Brush stroke: SVG path, `stroke-dashoffset` animation, path length measured via `getTotalLength()` on mount
- Annotations: Lora, fade in on hover with 80ms delay
- `useIsDesktop()` hook — `matchMedia('(min-width: 768px)')` with resize listener. Hover only fires on desktop. Resets `isHovered` if window shrinks to mobile while hovered.
- Mobile: single column, annotations always visible, brush always drawn

**Accordion**
- 4 panels: orange (Mobile-first), magenta (Usability), yellow (Chatbot), green (Design system)
- Panel colors pulled from `colors['panel-*']` tokens — no hardcoded hex
- `getPanelTokens(panel.color)` from `tokens.js` for all text/border/hover colors
- `isLightPanel(color)` used in `PanelImage` placeholder
- Desktop: horizontal flex, width transition 500ms accordion easing
- Hover on collapsed panel expands to 72px
- `overflow: hidden` on `.panel-clip` inside each panel (not on accordion itself) so mascot can peek above
- Border radius applied per first/last panel on `.panel-clip`
- Expanded panel: two columns — left (image/placeholder), right (content)
- Content fade: opacity 0→1, 300ms, 250ms delay after panel opens
- Rotated label: outside `.panel-clip`, fades out when expanded
- Keyboard: Arrow Left/Right navigates and expands, Enter/Space expands focused tab
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- Mascot: last panel only, hidden when that panel is expanded, peeks above panel top edge, lifts 8px on hover with spring easing
- Mobile: vertical stack, `max-height` transition, label horizontal not rotated, mascot hidden

---

## Decisions made

| Decision | Rationale |
|---|---|
| Google Fonts for both Geist + Lora | User confirmed — single `@import`, no npm package needed |
| Nav font size 16px | Matches Figma (spec said 14px, Figma showed 16px) |
| Wordmark: 18px, semibold, -1px tracking | Confirmed from Figma |
| Wordmark color: `ink-muted` | Figma shows #717171 — closest token is `--color-ink-muted` (#666666) |
| "Engineer" stays ink-primary (not #444) | Figma color was a mistake per user |
| `overflow: hidden` on `.panel-clip`, not `.accordion-panel` | Allows mascot to escape panel bounds |
| `useIsDesktop()` JS hook for breakpoint | Prevents hover animations at narrow browser widths (not just touch devices) |
| `getPanelTokens()` takes color hex, not isLight boolean | Color is single source of truth — `isLight` derived internally |
| No `isLight` field in panel data array | Removed — redundant with `isLightPanel(color)` |

---

## Remaining work

### Accordion expanded panel content — needs Figma update
Current content: tag, title, description, pill CTA, dots.
Figma shows richer layout:
- Client + year in **Lora italic** at top (e.g. *"Royal Australasian College of Surgeons (RACS)  2020"*)
- Bold title
- Description paragraph
- **Role:** label (bold) + value (regular) on same line
- **Tools used:** label (bold) + value (regular) on same line
- "View full case study" pill has **cream background** (`var(--color-cream-base)`), not transparent

Panel data needs new fields: `client`, `year`, `role`, `tools`.

### Footer
Not yet built. Figma shows:
- Left: mail icon + `a4.lalita.chavan@gmail.com` in Geist Mono
- Right: `2026 · Designed by Lalita · Built with` in Geist Mono
- Thin top border
- Note: "Built with" may need a logo/link (Claude Code? Figma?)

### Other
- Real mockup images (`/images/*.png`) not yet added — placeholder grid shown
- No routing yet (nav links are plain `<a>` hrefs)

---

## Token notes

- `--tracking-tight: -1px` — wordmark only
- `--tracking-panel-label: -0.07em` — rotated accordion labels only
- `--size-wordmark: 18px` — separate from `--size-nav: 16px`
- `accent-brush` and `panel-green` share `#D0D535` — different semantic tokens
- `cream-base` and `ink-light` share `#F9F6F1` — different semantic tokens
- Light panels (yellow, green) → `panel-light-*` tokens via `getPanelTokens()`
- Dark panels (orange, magenta) → `panel-dark-*` tokens via `getPanelTokens()`
- Do NOT reduce `panel-light-text-muted` opacity below 0.75 (WCAG AA requirement)

---

## How to run

```bash
npm install
npm run dev   # → http://localhost:5173 (or next available port)
```
