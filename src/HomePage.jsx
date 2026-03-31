import { useState, useRef, useEffect } from 'react'
import { colors, getPanelTokens, isLightPanel } from './design-system/tokens.js'

const BRUSH_PATH = 'M 4,8 C 50,2 100,14 150,8 C 180,3 205,11 220,7'
const BRUSH_FALLBACK_LENGTH = 230
const DESKTOP_BREAKPOINT = '(min-width: 768px)'

// =============================================================
// NAV
// =============================================================

const navLinks = [
  { label: 'Home',     href: '/',        active: true  },
  { label: 'Work',     href: '/work',    active: false },
  { label: 'About',    href: '/about',   active: false },
  { label: 'Contact',  href: '/contact', active: false },
  { label: 'Resume',   href: '/resume',  active: false },
  { label: 'LinkedIN', href: 'https://linkedin.com/in/lalitachavan', active: false },
]

function Nav() {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 'var(--space-10)',
      }}
    >
      {/* Wordmark */}
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--size-wordmark)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--color-ink-muted)',
          letterSpacing: 'var(--tracking-tight)',
          textDecoration: 'none',
        }}
      >
        Lalita Chavan
      </a>

      {/* Links */}
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map(({ label, href, active }) => (
          <li key={label}>
            <a
              href={href}
              className="nav-link focus-light"
              aria-current={active ? 'page' : undefined}
              style={{
                fontWeight: active
                  ? 'var(--weight-semibold)'
                  : 'var(--weight-regular)',
                color: active
                  ? 'var(--color-ink-primary)'
                  : 'var(--color-ink-secondary)',
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// =============================================================
// PANEL DATA
// =============================================================

const panels = [
  {
    id: 0,
    label: 'Mobile-first design',
    color: colors['panel-orange'],
    tag: 'RACS · 2023',
    title: 'Simplifying CPD tracking for surgeons',
    description:
      "Redesigned compliance tracking for 7,000+ surgeons. Reduced logging time with a mobile-first dashboard and the organization's first digital style guide.",
    caseStudyUrl: '/work/racs',
    imageSrc: '/images/racs-mockup.png',
  },
  {
    id: 1,
    label: 'Usability study',
    color: colors['panel-magenta'],
    tag: 'Airpals · 2022',
    title: 'Usability testing for a logistics startup',
    description:
      'End-to-end usability research surfacing key friction points and delivering actionable design recommendations.',
    caseStudyUrl: '/work/airpals',
    imageSrc: '/images/airpals-mockup.png',
  },
  {
    id: 2,
    label: 'Chatbot design',
    color: colors['panel-yellow'],
    tag: 'Travel AI · 2024',
    title: 'Conversational UI for an AI travel planner',
    description:
      'Designed intent mapping, response formatting, and error states for an AI-powered travel assistant.',
    caseStudyUrl: '/work/travel-ai',
    imageSrc: '/images/chatbot-mockup.png',
  },
  {
    id: 3,
    label: 'Design system',
    color: colors['panel-green'],
    tag: 'RACS · 2023',
    title: "Building the organization's first design system",
    description:
      'Typography, color tokens, components, and developer documentation built from scratch for a team of developers and stakeholders.',
    caseStudyUrl: '/work/design-system',
    imageSrc: '/images/design-system-mockup.png',
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
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
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
// ACCORDION
// =============================================================

function Accordion() {
  const [activePanel, setActivePanel] = useState(0)
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
        const isFirst    = index === 0
        const isLast     = index === panels.length - 1
        const tok        = getPanelTokens(panel.color)

        // Rounded corners on first/last panel only — handled on
        // .panel-clip so the mascot (outside the clip) can peek above.
        const clipRadius = isFirst
          ? 'var(--accordion-radius) 0 0 var(--accordion-radius)'
          : isLast
            ? '0 var(--accordion-radius) var(--accordion-radius) 0'
            : '0'

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
            style={{ backgroundColor: panel.color }}
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
                  {/* Project tag */}
                  <span
                    className="panel-tag"
                    style={{ color: tok.muted }}
                  >
                    {panel.tag}
                  </span>

                  {/* Project title */}
                  <h3
                    className="panel-title"
                    style={{ color: tok.text, margin: 0 }}
                  >
                    {panel.title}
                  </h3>

                  {/* Project description */}
                  <p
                    className="panel-desc"
                    style={{ color: tok.body, margin: 0 }}
                  >
                    {panel.description}
                  </p>

                  {/* View case study — pill link */}
                  <a
                    href={panel.caseStudyUrl}
                    className="pill focus-dark"
                    style={{
                      color: tok.text,
                      borderColor: tok.border,
                      '--pill-hover-bg': tok.hoverBg,
                      marginTop: 'var(--space-1)',
                      alignSelf: 'flex-start',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View case study
                  </a>

                  {/* Navigation dots */}
                  <div className="nav-dots" role="presentation">
                    {panels.map((p) => (
                      <button
                        key={p.id}
                        className={`nav-dot ${activePanel === p.id ? 'is-active' : ''}`}
                        style={{
                          background: activePanel === p.id
                            ? tok.dotActive
                            : tok.dotInactive,
                        }}
                        aria-label={`View ${p.label}`}
                        onClick={(e) => { e.stopPropagation(); setActivePanel(p.id) }}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Rotated label (outside clip, always legible) ───── */}
            <span
              className="panel-label-rotated panel-label"
              style={{ color: tok.text }}
            >
              {panel.label}
            </span>

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
  const brushPathRef = useRef(null)
  const [brushLength, setBrushLength] = useState(BRUSH_FALLBACK_LENGTH)

  useEffect(() => {
    if (brushPathRef.current) {
      setBrushLength(Math.ceil(brushPathRef.current.getTotalLength()))
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) setIsHovered(false)
  }, [isDesktop])

  const brushClass      = `brush-stroke ${isHovered ? 'visible' : 'hidden'}`
  const annotationClass = `annotation ${isHovered ? 'visible' : 'hidden'}`

  return (
    <section aria-label="Introduction" className="hero-section">

      {/* Left column — headline + hover trigger */}
      <div
        className="hero-text-block"
        onMouseEnter={() => { if (isDesktop) setIsHovered(true) }}
        onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      >
        <p className="hero-line-1" style={{ marginBottom: 'var(--space-2)' }}>
          UX designer + Engineer
        </p>

        <div className="hero-line-2-wrapper">
          <p className="hero-line-2">Currently building with AI.</p>

          <svg
            aria-hidden="true"
            className="brush-svg"
            width="220"
            height="20"
            viewBox="0 0 220 20"
            style={{ '--brush-length': brushLength }}
          >
            <path
              ref={brushPathRef}
              className={brushClass}
              d={BRUSH_PATH}
              stroke="var(--color-accent-brush)"
              strokeOpacity="0.75"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Right column — annotations (revealed on hover) */}
      <div className="hero-annotations">
        <p className={annotationClass}>
          3+ years of experience owning end-to-end UX.{' '}
          Designed products used by 7,000+ surgeons.
        </p>
        <p className={annotationClass}>
          Building a wedding guest list optimization tool using Claude Code.
        </p>
      </div>

    </section>
  )
}

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  return (
    <main
      style={{
        background: 'var(--color-cream-base)',
        minHeight: '100dvh',
        paddingTop: 'var(--page-padding-top)',
        paddingLeft: 'var(--page-padding-x)',
        paddingRight: 'var(--page-padding-x)',
      }}
    >
      <Nav />
      <Hero />
      <Accordion />
    </main>
  )
}
