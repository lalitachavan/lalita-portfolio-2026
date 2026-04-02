import { useState, useRef, useEffect } from 'react'
import { colors, getPanelTokens, isLightPanel } from './design-system/tokens.js'


const DESKTOP_BREAKPOINT = '(min-width: 768px)'

// =============================================================
// NAV
// =============================================================

const navLinks = [
  { label: 'Home',     href: '/',        active: true  },
  { label: 'Projects', href: '/work',    active: false },
  { label: 'About',    href: '/about',   active: false },
  { label: 'Contact',  href: '/contact', active: false },
  { label: 'Resume',   href: '/resume',  active: false },
  { label: 'LinkedIN', href: 'https://linkedin.com/in/lalitachavan', active: false },
]

function Nav({ isHome = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav aria-label="Main navigation" className="nav-bar">
      {/* Wordmark */}
      <a href="/" className="nav-wordmark focus-light" aria-current={isHome ? 'page' : undefined}>
        Lalita Chavan
      </a>

      {/* Desktop links */}
      <ul className="nav-links">
        {navLinks.map(({ label, href, active }) => (
          <li key={label}>
            <a
              href={href}
              className="nav-link focus-light"
              aria-current={active ? 'page' : undefined}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontWeight: active ? 'var(--weight-bold)' : 'var(--weight-regular)',
                color: active ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger button — mobile only */}
      <button
        className="nav-hamburger focus-light"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? (
          /* X icon */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        ) : (
          /* Hamburger icon */
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="5" x2="17" y2="5" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="15" x2="17" y2="15" />
          </svg>
        )}
      </button>

      {/* Mobile menu — shown when open */}
      {menuOpen && (
        <ul className="nav-mobile-menu">
          {navLinks.map(({ label, href, active }) => (
            <li key={label}>
              <a
                href={href}
                className="nav-link focus-light"
                aria-current={active ? 'page' : undefined}
                style={{
                  fontWeight: active ? 'var(--weight-bold)' : 'var(--weight-regular)',
                  color: active ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

// =============================================================
// PANEL DATA
// =============================================================

const panels = [
  {
    id: 0,
    label: 'Design system',
    color: colors['panel-orange'],
    client: 'Royal Australasian College of Surgeons (RACS)',
    year: '2023',
    title: "Building the organization's first design system",
    description:
      'Typography, color tokens, components, and developer documentation built from scratch for a team of developers and stakeholders.',
    role: 'Design Systems Designer',
    tools: 'Figma, Storybook',
    caseStudyUrl: '/work/design-system',
    imageSrc: '/images/design-system-mockup.png',
  },
  {
    id: 1,
    label: 'Usability study',
    color: colors['panel-magenta'],
    client: 'Airpals',
    year: '2022',
    title: 'Usability testing for a logistics startup',
    description:
      'End-to-end usability research surfacing key friction points and delivering actionable design recommendations.',
    role: 'UX Researcher',
    tools: 'Maze, Figma',
    caseStudyUrl: '/work/airpals',
    imageSrc: '/images/airpals-mockup.png',
  },
  {
    id: 2,
    label: 'Chatbot design',
    color: colors['panel-yellow'],
    client: 'Travel AI',
    year: '2024',
    title: 'Conversational UI for an AI travel planner',
    description:
      'Designed intent mapping, response formatting, and error states for an AI-powered travel assistant.',
    role: 'Product Designer',
    tools: 'Figma, ChatGPT',
    caseStudyUrl: '/work/travel-ai',
    imageSrc: '/images/chatbot-mockup.png',
  },
  {
    id: 3,
    label: 'Mobile-first design',
    color: colors['panel-green'],
    client: 'Royal Australasian College of Surgeons (RACS)',
    year: '2020',
    title: 'Simplifying professional development activity logging and tracking for surgeons at RACS',
    description:
      'Reducing cognitive load for surgeons by simplifying navigation, surfacing unfinished tasks on the home screen, and creating a one-click path to key actions.',
    role: '0 > 1 UI/UX Designer, UX Researcher, Business Analyst',
    tools: 'Adobe XD, Adobe Illustrator',
    caseStudyUrl: '/work/racs',
    imageSrc: '/images/racs-mockup.png',
  },
]

// =============================================================
// HELPERS
// =============================================================

// getPanelTokens is imported from tokens.js — no local duplicate.

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// =============================================================
// HOOK
// =============================================================

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined'
      ? window.matchMedia(DESKTOP_BREAKPOINT).matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

// =============================================================
// MASCOT SVG
// =============================================================

function MascotSVG() {
  return (
    <svg
      width="40"
      height="36"
      viewBox="0 0 40 36"
      fill="none"
      stroke="var(--mascot-stroke)"
      strokeWidth="var(--mascot-stroke-width)"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="6,16 10,3 17,12"  />              {/* left ear  */}
      <polygon points="34,16 30,3 23,12" />              {/* right ear */}
      <circle cx="20" cy="22" r="13" />                  {/* head      */}
      <circle cx="15" cy="20" r="2" fill="var(--mascot-stroke)" stroke="none" /> {/* left eye  */}
      <circle cx="25" cy="20" r="2" fill="var(--mascot-stroke)" stroke="none" /> {/* right eye */}
      <path d="M 15,26 Q 20,30 25,26" />                 {/* smile     */}
    </svg>
  )
}

// =============================================================
// PANEL IMAGE (or placeholder)
// =============================================================

function PanelImage({ imageSrc, color }) {
  const wrapperRef = useRef(null)
  const imgRef     = useRef(null)
  const [fits, setFits] = useState(false)

  useEffect(() => {
    if (!imageSrc) return
    const wrapper = wrapperRef.current
    const img     = imgRef.current
    if (!wrapper || !img) return

    const check = () => {
      if (img.offsetHeight > 0) {
        setFits(img.offsetHeight <= wrapper.offsetHeight)
      }
    }

    const ro = new ResizeObserver(check)
    ro.observe(wrapper)
    img.addEventListener('load', check)
    check()

    return () => {
      ro.disconnect()
      img.removeEventListener('load', check)
    }
  }, [imageSrc])

  if (imageSrc) {
    return (
      <div
        ref={wrapperRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: fits ? 'center' : 'flex-start',
        }}
      >
        <img
          ref={imgRef}
          src={imageSrc}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    )
  }

  const gridColor = isLightPanel(color) ? 'rgba(26,26,26,0.1)' : 'rgba(255,255,255,0.1)'
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: hexToRgba(color, 0.8),
        backgroundImage: `
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    />
  )
}

// =============================================================
// PANEL LABEL — measures its own width to bottom-align all labels
// =============================================================

function PanelLabel({ text, color }) {
  const spanRef  = useRef(null)
  const [top, setTop] = useState(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const span = spanRef.current
    if (!span || !span.parentElement || !isDesktop) {
      setTop(null)
      return
    }

    const PADDING = 16 // px gap between label visual bottom and panel bottom edge

    const measure = () => {
      const W      = span.offsetWidth               // pre-rotation text width
      const panelH = span.parentElement.offsetHeight
      // transform: translateY(-50%) means CSS `top` = visual center y.
      // visual_bottom = top + W/2 → top = panelH - PADDING - W/2
      setTop(Math.max(0, panelH - PADDING - W / 2))
    }

    const ro = new ResizeObserver(measure)
    ro.observe(span.parentElement)
    measure()
    return () => ro.disconnect()
  }, [text, isDesktop])

  return (
    <span
      ref={spanRef}
      className="panel-label-rotated panel-label"
      style={{ color, ...(top !== null && { top: `${top}px` }) }}
    >
      {text}
    </span>
  )
}

// =============================================================
// ACCORDION
// =============================================================

function Accordion() {
  const [activePanel, setActivePanel] = useState(panels.length - 1)
  const tabRefs = useRef([])

  function handleKeyDown(e, index) {
    let next = null

    if      (e.key === 'ArrowRight')             next = (index + 1) % panels.length
    else if (e.key === 'ArrowLeft')              next = (index - 1 + panels.length) % panels.length
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActivePanel(index); return }
    else return

    e.preventDefault()
    setActivePanel(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Portfolio projects"
      className="accordion"
    >
      {panels.map((panel, index) => {
        const isExpanded = activePanel === panel.id
        const isLast     = index === panels.length - 1
        const tok        = getPanelTokens(panel.color)

        const clipRadius = isExpanded
          ? 'var(--accordion-radius)'
          : 'var(--accordion-radius) 0 0 var(--accordion-radius)'

        return (
          <div
            key={panel.id}
            role="tab"
            id={`panel-tab-${panel.id}`}
            aria-selected={isExpanded}
            aria-controls={`panel-content-${panel.id}`}
            tabIndex={isExpanded ? 0 : -1}
            ref={el => { tabRefs.current[index] = el }}
            className={`accordion-panel focus-dark ${isExpanded ? 'is-expanded' : ''}`}
            style={{ backgroundColor: panel.color, borderRadius: clipRadius, zIndex: index + 1 }}
            onClick={() => setActivePanel(panel.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >

            {/* ── Content clip (overflow:hidden lives here) ─────── */}
            <div className="panel-clip" style={{ borderRadius: clipRadius }}>
              <div className="panel-inner">

                {/* Left column: image */}
                <div className="panel-image-col">
                  <PanelImage
                    imageSrc={panel.imageSrc}
                    color={panel.color}
                  />
                </div>

                {/* Right column: text content — fades in on expand */}
                <div
                  role="tabpanel"
                  id={`panel-content-${panel.id}`}
                  aria-labelledby={`panel-tab-${panel.id}`}
                  className="accordion-panel-content panel-content-col"
                >
                  {/* Client + year — Lora medium italic */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'var(--size-panel-client)',
                    fontWeight: 'var(--weight-medium)',
                    letterSpacing: 'var(--tracking-tight)',
                    color: tok.text,
                  }}>
                    <span>{panel.client}</span>
                    <Dot color={tok.text} />
                    <span>{panel.year}</span>
                  </div>

                  {/* Project title */}
                  <h3 className="panel-title" style={{ color: tok.text, margin: 0, fontSize: 'var(--size-panel-title-lg)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-tight)' }}>
                    {panel.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-panel-desc-lg)', fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--tracking-snug)', color: tok.body, margin: 0, lineHeight: 'var(--leading-normal)' }}>
                    {panel.description}
                  </p>

                  {/* Role */}
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-panel-desc-lg)', fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--tracking-snug)', color: tok.body, margin: 0, lineHeight: 'var(--leading-normal)' }}>
                    <span style={{ fontWeight: 'var(--weight-bold)', color: tok.text }}>Role: </span>
                    {panel.role}
                  </p>

                  {/* Tools used */}
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--size-panel-desc-lg)', fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--tracking-snug)', color: tok.body, margin: 0, lineHeight: 'var(--leading-normal)' }}>
                    <span style={{ fontWeight: 'var(--weight-bold)', color: tok.text }}>Tools used: </span>
                    {panel.tools}
                  </p>

                  {/* View case study — cream pill */}
                  <a
                    href={panel.caseStudyUrl}
                    className="pill focus-dark"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'var(--size-panel-desc-lg)',
                      fontWeight: 'var(--weight-regular)',
                      letterSpacing: 'var(--tracking-tight)',
                      color: 'var(--color-ink-primary)',
                      background: 'var(--color-cream-base)',
                      border: 'none',
                      '--pill-hover-bg': 'var(--color-cream-dark)',
                      marginTop: 'var(--space-1)',
                      alignSelf: 'flex-start',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View full case study
                  </a>

                </div>

              </div>
            </div>

            {/* ── Rotated label (outside clip, bottom-aligned) ────── */}
            <PanelLabel text={panel.label} color={tok.text} />

            {/* ── Mascot (last panel only, when collapsed) ────────── */}
            {isLast && !isExpanded && (
              <div className="mascot" aria-hidden="true">
                <MascotSVG />
              </div>
            )}

          </div>
        )
      })}
    </div>
  )
}

// =============================================================
// HERO
// =============================================================

function Hero() {
  const isDesktop = useIsDesktop()
  const [isHovered, setIsHovered] = useState(false)
  useEffect(() => {
    if (!isDesktop) setIsHovered(false)
  }, [isDesktop])

  const annotation1Class = `annotation ${isHovered === 1 ? 'visible' : 'hidden'}`
  const annotation2Class = `annotation ${isHovered === 2 ? 'visible' : 'hidden'}`

  return (
    <section aria-label="Introduction" className="hero-section">

      {/* Row 1 col 1 — hero line 1 */}
      <p
        className="hero-line-1 hero-text-block"
        style={{ gridColumn: 1, gridRow: 1, marginTop: 'var(--space-5)' }}
        onMouseEnter={() => { if (isDesktop) setIsHovered(1) }}
        onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      >
        UX designer + Engineer
      </p>

      {/* Row 1 col 2 — annotation 1 */}
      <p
        className={annotation1Class}
        style={{ gridColumn: 2, gridRow: 1, maxWidth: '440px', marginTop: 'var(--space-5)', alignSelf: 'end' }}
      >
        <span style={{ fontWeight: 'var(--weight-semibold)' }}>3+ years</span> of experience owning end-to-end UX.{' '}
        Designed products used by <span style={{ fontWeight: 'var(--weight-semibold)' }}>7,000+ surgeons</span>.
      </p>

      {/* Row 2 col 1 — hero line 2 */}
      <p
        className="hero-line-2 hero-text-block"
        style={{ gridColumn: 1, gridRow: 2 }}
        onMouseEnter={() => { if (isDesktop) setIsHovered(2) }}
        onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      >
        Currently building with AI
      </p>

      {/* Row 2 col 2 — annotation 2 */}
      <p
        className={annotation2Class}
        style={{ gridColumn: 2, gridRow: 2, maxWidth: '440px' }}
      >
        Building a wedding guest list optimization tool using <span style={{ fontWeight: 'var(--weight-semibold)' }}>Claude Code</span>.
      </p>

    </section>
  )
}

// =============================================================
// FOOTER
// =============================================================

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-ink-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7 L12 13 L22 7" />
    </svg>
  )
}

function Footer() {
  return (
    <footer
      className="page-footer"
      style={{
        marginLeft: 'calc(var(--page-padding-x) * -1)',
        marginRight: 'calc(var(--page-padding-x) * -1)',
        paddingTop: 'var(--space-3)',
        paddingBottom: 'var(--space-3)',
        paddingLeft: 'var(--page-padding-x)',
        paddingRight: 'var(--page-padding-x)',
        borderTop: '1px solid var(--border-color-default)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left — email */}
      <a
        href="mailto:a4.lalita.chavan@gmail.com"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--size-body)',
          fontWeight: 'var(--weight-regular)',
          color: 'var(--color-ink-primary)',
          textDecoration: 'none',
        }}
        className="focus-light"
      >
        <MailIcon />
        a4.lalita.chavan@gmail.com
      </a>

      {/* Right — credits */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--size-caption)',
          color: 'var(--color-ink-secondary)',
        }}
      >
        <span>2026</span>
        <Dot />
        <span>Designed by Lalita</span>
        <Dot />
        <span>Built with Claude Code</span>
      </div>
    </footer>
  )
}

function Dot({ color = 'var(--color-ink-muted)' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: '4px',
        height: '4px',
        borderRadius: 'var(--radius-full)',
        background: color,
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  return (
    <main className="page-layout">
      <Nav isHome />
      <Hero />
      <div className="accordion-wrapper">
        <Accordion />
      </div>
      <Footer />
    </main>
  )
}
