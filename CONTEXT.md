# Project Context — Lalita Chavan Portfolio 2026

This file tracks conversation history, decisions made, and work remaining.
Update it at the end of every session.

---

## What has been built

### Design system (`src/design-system/`)

- **`tokens.css`** — CSS custom properties on `:root`. Covers colors, typography, spacing, border radius, borders, animation durations/easings, layout, mascot, dots. Includes `--nav-height: 64px` for fixed nav offset.
- **`tokens.js`** — JS exports matching `tokens.css`. Exports `colors`, `typography`, `spacing`, `borderRadius`, `borders`, `animation`, `components`, `layout`, `getPanelTokens(color)`, `isLightPanel(color)`.
- **`typography.css`** — Single Google Fonts `@import` for Geist (400/600/700) + Lora (400/400i/500i/700). Base reset, all type classes. Hero line 1: Geist regular, `padding-top: var(--space-6)`. Hero line 2: Lora regular, `padding-bottom: var(--space-2)`. Both have clamp font sizes. Letter-spacing on hero line 1 drops to -1px below 1200px viewport.
- **`components.css`** — Page layout, nav, hero grid layout, annotation clip-path wipe, accordion (desktop + mobile), panel label rotation, pill button, panel exit choreography CSS.

### Routing & Layout

- `src/main.jsx` — App entry: `BrowserRouter > PageTransitionProvider > CursorDot > Layout > Routes`. Routes: `/` → `HomePage`, `/work/:slug` → `CaseStudyPage`.
- `src/Layout.jsx` — Persistent nav across all routes. Uses `react-router-dom` `Link`. LinkedIn is external. Active state derived from `useLocation()`.
- `src/PageTransition.jsx` — Single WAAPI animation (Web Animations API) for panel-to-page transition. No React state — creates a DOM element directly, animates in one pass: horizontal fill (spring easing, 500ms) → vertical fill (ease-in-out, 800ms). After finish: navigate, keep overlay for 100ms then fade out (300ms) before removing.

### `src/HomePage.jsx`

**Hero**
- CSS Grid: 2 columns (`auto 1fr`), 2 rows, `row-gap: var(--space-2)`, `align-items: center`
- Line 1: Geist regular, clamp(24–36px), `-2px` tracking (drops to -1px below 1200px). No padding.
- Line 2: Lora regular, clamp(20–30px), `-1px` tracking, `ink-tertiary`. No padding.
- Annotations: Lora italic, clamp(14–16px), `--leading-snug`, `ink-secondary`, 3px `accent-brush` left bar. Center-aligned in their grid row (matches hero lines — no `align-self` override).
- Annotation reveal: `@keyframes annotation-wipe` clip-path wipe, 400ms. Mobile: always visible.

**Accordion**
- 4 panels: Design system (orange), Usability study (magenta), Chatbot design (yellow), Mobile-first design (green)
- Default expanded: last panel (green)
- Desktop height: 400px fixed. `margin-top: var(--hero-gap)` gap from hero, `margin-bottom: var(--space-10)` gap to footer.
- Stacked card overlap: `margin-left: calc(--accordion-radius * -1)`, `z-index: index + 1`
- All corners rounded on all panels (`var(--accordion-radius)`)
- `overflow: hidden` on `.panel-clip` inside each panel
- Image col: 25%, content col: 75%, content right padding: clamp(48–140px)
- Collapsed panel hover: `translateY(-3px)` + deeper shadow + white bar at top
- Collapsed panel press: `scale(0.98) translateY(-1px)`, 80ms snap
- Direction-aware image slide: `@keyframes image-slide-left/right` via `dir-left`/`dir-right` class on accordion. Class only added after first interaction (`hasInteracted` state) — prevents slide animation on page load. On page load image shows at full opacity immediately.
- Content stagger on expand: each child slides up 10px + fades, 60ms stagger, starts at 250ms delay
- `box-shadow: -4px 0 12px rgba(0,0,0,0.15)` on panels — depth between cards
- Two label components per panel: `PanelLabel` (collapsed, center) and `ExpandedPanelLabel` (expanded watermark, right edge). Both use `ResizeObserver` on parent + span for bottom-alignment, wrapped in `requestAnimationFrame` to catch clamp font-size changes on resize.
- "View full case study" button calls `expandToPage(panelEl, color, url)` from `usePageTransition()`

**Custom cursor**
- 16px dark dot, `position: fixed`, `pointer-events: none`, `z-index: 9999`
- Guarded by `(pointer: fine)`, event delegation on document
- Hover state: grows to 40px, white, `mix-blend-mode: difference`
- Expanded panel excluded from cursor grow
- Resets to default 16px size on route change (prevents stuck-enlarged state after navigation)

**Footer**
- `margin-top: var(--space-6)`, full-bleed border, email + credits

**Page layout**
- Desktop (≥1024px): `height: 100dvh`, `overflow: hidden`, flex column
- Tablet (768–1023px): scrolling, accordion pinned via `flex: 1`
- Mobile (≤767px): normal scroll

### `src/CaseStudyPage.jsx`

- Looks up project by slug from shared data, content from `src/data/case-studies/racs.js`
- Only RACS (`/work/racs`) has content — other slugs show "not found"
- Hero: panel color background fills full viewport height including behind the nav (no padding-top offset beyond `--nav-height`). Image left, content right (matches accordion layout).
- Hero content entrance: `cs-hero-revealed` class added at 420ms after mount (synced to overlay fade-out). Image and each text child stagger in via `translateY(12px)` + opacity, 60ms apart.
- Body: white background, max-width 800px, sections: impact stats, context, key insight callout, HMW problem, design approach, research methods cards, design decisions, reflection, footer nav.
- Uses `getPanelTokens()` for hero text colors.

### `src/PageTransition.jsx`

Single WAAPI animation — no React state, no phase switching:
1. Overlay div created directly on `document.body`
2. Starts at panel's bounding rect
3. Animates: panel rect → full width same height (spring) → full viewport (ease-in-out), total 1300ms
4. `onfinish`: navigate, wait 100ms, fade overlay out (300ms), remove element

### Data layer

- `src/data/projects.js` — `projects` array + `getProjectBySlug(slug)`. Each project: `id`, `slug`, `label`, `color`, `expandedLabelColor`, `client`, `year`, `title`, `description`, `role`, `tools`, `caseStudyUrl`, `imageSrc`.
- `src/data/case-studies/racs.js` — RACS content: hero, impact, context, keyInsight, problem, usersAndConstraints, myRole, designChallenges, tradeoffs, designHighlights, impactAndOutcomes, reflection.

### Nav

- `position: fixed`, transparent background, `padding` uses `--page-padding-x` to align with page content
- White pill container for nav links (unchanged)
- Page content offset by `--nav-height: 64px` via `calc()` in `padding-top` on `.page-layout` and `.cs-hero`
- `html, body { background: transparent }` — no white bleed behind fixed nav

### Layout (`src/Layout.jsx`)

- Wraps all pages in `.site-layout` (flex column, `min-height: 100dvh`)
- `.site-layout--home` on desktop: `height: 100dvh; overflow: hidden` — keeps home page non-scrolling
- `.page-layout` is now `flex: 1; overflow: hidden` — fills remaining space inside `.site-layout`
- `<Footer />` rendered here — persistent across all routes (like nav)
- Footer stacks vertically on mobile (<640px), horizontal `space-between` at 640px+
- Footer text uses clamp tokens: `--size-footer-email: clamp(12px, 1.1vw, 15px)`, `--size-footer-meta: clamp(11px, 0.9vw, 12px)`
- `Dot` component kept in `HomePage.jsx` (used with color prop in accordion panel client/year line)

### Mouse trail (`MouseTrail` in `src/Layout.jsx`)

- Canvas fixed full-viewport, `z-index: 0`, `pointer-events: none` — sits in background
- Draws fading circles at cursor positions as the mouse moves; circle radius scales with cursor speed (faster = larger, min 3px, max 10px / 20px diameter)
- Trail fades out over ~50 frames (alpha 0.65 → 0 at 0.013/frame)
- Circles painted in the currently expanded accordion panel's color
- Color communicated via `window` CustomEvent `panel-color` dispatched from `Accordion.selectPanel` and on mount
- Default color: `#D0D535` (green — panel 3 is active on load)
- Only rendered on the homepage (`/`) — not on case study or other pages

**Stacking context fixes in `src/index.css`** (required for background canvas):
- `body { background: var(--color-cream-base) }` — cream moved from `.page-layout` to body
- `.page-layout`, `.page-footer { background: transparent; position: relative; z-index: 1 }` — makes content sit above canvas
- `.nav-bar { z-index: 100 }` — nav was `position: fixed` with no z-index (auto), which placed it below the z-index: 1 page-layout and broke hover; explicit 100 fixes it

---

## Decisions made

| Decision | Rationale |
|---|---|
| Google Fonts for Geist + Lora | Single `@import` |
| Nav `position: fixed`, transparent | Floats over page — cream shows on home, panel color shows on case study |
| `--nav-height: 64px` offset on page content | Prevents content hiding under fixed nav |
| `html { background: transparent }`, `body { background: cream-base }` | Cream moved to body so canvas at z-index: 0 shows through transparent page-layout |
| Nav links white pill retained | Only the nav bar background is transparent, not the pill |
| WAAPI for page transition | No React state / phase switching = no jank at phase boundary |
| Overlay stays after navigate, fades out | Prevents flash of homepage during React route render |
| Two-phase expansion: horizontal then vertical | Natural "panel growing to fill page" feel |
| Hero content entrance at 420ms | Synced to overlay fade (100ms + 300ms); content appears as color fills |
| `hasInteracted` state on accordion | Prevents image slide animation on page load — only fires after first click |
| Image visible on load without animation | `:not(.dir-left):not(.dir-right)` rule shows image at full opacity immediately |
| `ResizeObserver` on span + parent | Catches clamp font-size changes during resize, not just panel height changes |
| `requestAnimationFrame` wrap on measure | Reads dimensions after browser layout pass completes on resize |
| Accordion `max-height: 400px`, `margin-top: auto` | Caps accordion size; pushes it toward footer |
| Hero+accordion grouped via `::before` flex spacer on `.page-layout` | `::before { flex: 1 }` absorbs free space above hero, pushing hero+accordion as a group toward the lower portion of viewport. Accordion has explicit `height: 400px` since `height: 100%` needs a defined parent height. |
| Hero line 1 letter-spacing -1px below 1200px | Smaller font size needs less aggressive tracking |
| Hero grid `align-items: center`, no `align-self` on annotations | Both hero lines and annotations center in their row — removed `align-self: end` as it caused misalignment when annotation wrapped |
| Collapsed panels: all corners rounded | Per user request |
| Direction-aware image slide via `@keyframes` | `dir-left`/`dir-right` class — keyframes always start from correct position |
| Panel `box-shadow: -4px 0 12px` | Left-facing shadow gives depth between overlapping cards |
| Two label elements per panel | Separate collapsed + expanded labels — no transition needed |
| Per-panel `expandedLabelColor` at 40% opacity | Hue-matched muted watermark |
| Content stagger on expand | 60ms stagger, 250ms base delay, slide up 10px + fade |
| Shared `Layout.jsx` with persistent nav | Nav survives route changes |
| Case study hero image left, content right | Matches accordion panel layout — smooth visual continuity |
| Hero sections stagger in at mount | Mirrors accordion expand animation for consistency |
| Footer moved to `Layout.jsx` | Persistent on all pages — same pattern as nav |
| `.site-layout` wrapper with `--home` modifier | Desktop home needs `height: 100dvh; overflow: hidden`; other pages scroll freely |
| Footer responsive stacking at 640px | Mobile: column layout. 640px+: space-between row |
| `Dot` kept local in `HomePage.jsx` | Used with `color` prop in accordion — Layout's `Dot` is fixed cream color only |

---

## Future plans

### Vertical stacked cards (accordion redesign)

Replace horizontal accordion with vertically stacked cards for better accessibility.

**Layout change**
- `.accordion` switches from `flex-direction: row` to `flex-direction: column`
- Overlap switches from `margin-left: negative` to `margin-top: negative`
- `box-shadow` flips from left-facing to top-facing
- Remove fixed `height: 400px` on `.accordion-wrapper` — natural height + `max-height` safety valve

**Collapsed card**
- Full width, fixed height (~60px)
- Label sits horizontally: project name left, category tag right — no more rotated label
- Remove `PanelLabel` with `ResizeObserver` — replace with simple flexbox header
- Keep `ExpandedPanelLabel` watermark (right edge, works vertically as-is)

**Expanded card**
- Grows in height via `flex: 1` (same mechanic as current, just vertical)
- Image left / content right layout unchanged
- Content stagger animation unchanged

**Keyboard nav**
- Arrow Left/Right → Arrow Up/Down

**What stays untouched**
- All panel content, colors, tokens
- `PanelImage`, image slide animation, `hasInteracted` gate
- `expandToPage` page transition
- ARIA roles (`tablist`, `tab`, `tabpanel`)

---

## Remaining work

- Real mockup images for panels 0 (Design system), 1 (Airpals), 2 (Chatbot) — only RACS image added
- Case study content for Airpals, Travel AI, Design System
- Mobile accordion layout polish
- About, Contact, Resume, Projects pages (nav links currently go nowhere)
- Favicon, OG meta tags

---

## How to run

```bash
npm install
npm run dev   # → http://localhost:5175 (or next available port)
```
