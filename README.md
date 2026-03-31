# Lalita Chavan — Portfolio 2026

Personal UX portfolio website. Editorial, warm, typographically considered — designed to feel like a well-designed print magazine.

---

## Tech stack

- **React 18** — functional components and hooks
- **Vite 5** — dev server and build tool
- **Tailwind CSS 3** — layout and spacing utilities
- **CSS custom properties** — design tokens for colors, typography, animation
- **Google Fonts** — Geist (400, 600, 700) + Lora (400, 400 italic, 700) via a single `@import` in `typography.css`
- No animation libraries — CSS transitions and keyframes only

## Design system

All design decisions live in `src/design-system/`. Nothing is hardcoded in components.

```
src/design-system/
  tokens.css       CSS custom properties (:root)
  tokens.js        JS exports for Tailwind config + inline styles
  typography.css   Google Fonts import, base type styles, type classes
  components.css   Brush stroke, annotations, accordion, mascot, pills
```

`tailwind.config.js` extends the Tailwind theme using values from `tokens.js`.

## Project structure

```
src/
  design-system/   Token and component CSS files
  HomePage.jsx     All page components (Hero, Accordion, Nav)
  index.css        Imports design-system CSS, then Tailwind layers
  main.jsx         React entry point
index.html         Preconnect hints for Google Fonts
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Design references

- Figma: [Portfolio website revamp](https://www.figma.com/design/u5DHQrKg29poV1FVXyTmIM/Portfolio-website-revamp)
- Design system tokens: `src/design-system/tokens.css`

## Key design rules

1. Never hardcode a color hex in a component — always reference a token
2. Font weights: 400, 600, 700 only — 600 is reserved for accordion panel labels
3. All transitions inside `@media (prefers-reduced-motion: no-preference)`
4. `:focus-visible` only, never `:focus`
5. Panel colors are reserved for accordion panels only
6. Page background is cream (`#F9F6F1`) only — no white sections
