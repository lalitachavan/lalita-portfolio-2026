import { useState, useRef, useEffect } from 'react'
import { getPanelTokens, isLightPanel } from './design-system/tokens.js'
import { projects } from './data/projects.js'
import { usePageTransition } from './PageTransition'


const DESKTOP_BREAKPOINT = '(min-width: 768px)'


// =============================================================
// PANEL DATA
// =============================================================

// Panel data sourced from shared projects — accordion references `panels` throughout
const panels = projects

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
// PANEL LABEL — single element that slides from center (collapsed)
// to right edge (expanded) while transitioning color
// =============================================================

// =============================================================
// PANEL LABEL — collapsed center label
// =============================================================

function PanelLabel({ text, color }) {
  const spanRef = useRef(null)
  const [top, setTop] = useState(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const span = spanRef.current
    if (!span || !span.parentElement || !isDesktop) { setTop(null); return }

    const PADDING = 16
    const measure = () => {
      requestAnimationFrame(() => {
        const W = span.offsetWidth
        const panelH = span.parentElement.offsetHeight
        setTop(Math.max(0, panelH - PADDING - W / 2))
      })
    }

    const ro = new ResizeObserver(measure)
    ro.observe(span.parentElement)
    ro.observe(span)
    measure()
    return () => ro.disconnect()
  }, [text, isDesktop])

  return (
    <span
      ref={spanRef}
      className="panel-label-collapsed panel-label"
      style={{ color, ...(top !== null && { top: `${top}px` }) }}
    >
      {text}
    </span>
  )
}

// =============================================================
// EXPANDED PANEL LABEL — bottom-right watermark
// =============================================================

function ExpandedPanelLabel({ text, color }) {
  const spanRef = useRef(null)
  const [top, setTop] = useState(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const span = spanRef.current
    if (!span || !span.parentElement || !isDesktop) { setTop(null); return }

    const PADDING = 16
    const measure = () => {
      requestAnimationFrame(() => {
        const W = span.offsetWidth
        const panelH = span.parentElement.offsetHeight
        setTop(Math.max(0, panelH - PADDING - W / 2))
      })
    }

    const ro = new ResizeObserver(measure)
    ro.observe(span.parentElement)
    ro.observe(span)
    measure()
    return () => ro.disconnect()
  }, [text, isDesktop])

  return (
    <span
      ref={spanRef}
      className="panel-label-expanded panel-label"
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
  const { expandToPage } = usePageTransition()
  const [activePanel, setActivePanel] = useState(panels.length - 1)
  const prevPanelRef = useRef(panels.length - 1)
  const [direction, setDirection] = useState('left')
  const [hasInteracted, setHasInteracted] = useState(false)
  const tabRefs = useRef([])

  // Broadcast initial color on mount
  useEffect(() => {
    const initial = panels.find(p => p.id === panels.length - 1)
    if (initial) window.dispatchEvent(new CustomEvent('panel-color', { detail: { color: initial.color } }))
  }, [])

  function selectPanel(nextId) {
    setHasInteracted(true)
    setDirection(nextId > prevPanelRef.current ? 'right' : 'left')
    prevPanelRef.current = nextId
    setActivePanel(nextId)
    const panel = panels.find(p => p.id === nextId)
    if (panel) window.dispatchEvent(new CustomEvent('panel-color', { detail: { color: panel.color } }))
  }

  function handleKeyDown(e, index) {
    let next = null

    if      (e.key === 'ArrowRight')             next = (index + 1) % panels.length
    else if (e.key === 'ArrowLeft')              next = (index - 1 + panels.length) % panels.length
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectPanel(index); return }
    else return

    e.preventDefault()
    selectPanel(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Portfolio projects"
      className={`accordion${hasInteracted ? ` dir-${direction}` : ''}`}
    >
      {panels.map((panel, index) => {
        const isExpanded = activePanel === panel.id
        const tok        = getPanelTokens(panel.color)
        const clipRadius = 'var(--accordion-radius)'

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
            onClick={() => selectPanel(panel.id)}
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
                  <button
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
                    onClick={(e) => {
                      e.stopPropagation()
                      const panelEl = e.currentTarget.closest('.accordion-panel')
                      expandToPage(panelEl, panel.color, panel.caseStudyUrl)
                    }}
                  >
                    View full case study
                  </button>

                </div>

              </div>
            </div>

            {/* ── Collapsed label — fades out on expand ── */}
            <PanelLabel text={panel.label} color={tok.text} />

            {/* ── Expanded watermark — fades in on expand ── */}
            <ExpandedPanelLabel text={panel.label} color={panel.expandedLabelColor} />


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
        style={{ gridColumn: 1, gridRow: 1 }}
        onMouseEnter={() => { if (isDesktop) setIsHovered(1) }}
        onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      >
        UX designer + Engineer
      </p>

      {/* Row 1 col 2 — annotation 1: pull quote with accent bar */}
      <div
        className={annotation1Class}
        style={{
          gridColumn: 2, gridRow: 1, maxWidth: '440px',
          display: 'flex', gap: 'var(--space-4)',
        }}
      >
        <div style={{
          width: '3px',
          flexShrink: 0,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-accent-brush)',
        }} />
        <p className="annotation" style={{
          opacity: 1, pointerEvents: 'auto',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'var(--size-annotation)',
          lineHeight: 'var(--leading-snug)',
          letterSpacing: 'var(--tracking-snug)',
          color: 'var(--color-ink-secondary)',
        }}>
          <span style={{ fontWeight: 'var(--weight-semibold)', fontStyle: 'normal' }}>3+ years</span> of experience owning end-to-end UX and designing for <span style={{ fontWeight: 'var(--weight-semibold)', fontStyle: 'normal' }}>7,000+ surgeons</span>.
        </p>
      </div>

      {/* Row 2 col 1 — hero line 2 */}
      <p
        className="hero-line-2 hero-text-block"
        style={{ gridColumn: 1, gridRow: 2 }}
        onMouseEnter={() => { if (isDesktop) setIsHovered(2) }}
        onMouseLeave={() => { if (isDesktop) setIsHovered(false) }}
      >
        Currently building with AI
      </p>

      {/* Row 2 col 2 — annotation 2: pull quote with accent bar */}
      <div
        className={annotation2Class}
        style={{
          gridColumn: 2, gridRow: 2, maxWidth: '440px',
          display: 'flex', gap: 'var(--space-4)',
        }}
      >
        <div style={{
          width: '3px',
          flexShrink: 0,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-accent-brush)',
        }} />
        <p className="annotation" style={{
          opacity: 1, pointerEvents: 'auto',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'var(--size-annotation)',
          lineHeight: 'var(--leading-snug)',
          letterSpacing: 'var(--tracking-snug)',
          color: 'var(--color-ink-secondary)',
        }}>
          Building a wedding guest list optimization tool using <span style={{ fontWeight: 'var(--weight-semibold)', fontStyle: 'normal' }}>Claude Code</span>.
        </p>
      </div>

    </section>
  )
}

// =============================================================
// HELPERS
// =============================================================

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
// EXIT CONTROLS — dev panel for choreographing the transition
// =============================================================

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  return (
    <main className="page-layout">
      <Hero />
      <div className="accordion-wrapper">
        <Accordion />
      </div>
    </main>
  )
}
