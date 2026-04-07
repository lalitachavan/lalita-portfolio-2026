import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/work' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
  { label: 'Resume',   href: '/resume' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/lalitachavan', external: true },
]


function MouseTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    let color  = '#D0D535' // default: green panel (panel 3 is active on load)
    let drops  = []
    let lastX  = null, lastY = null, lastT = null
    let rafId

    const MIN_DIST  = 8
    const MAX_ALPHA = 0.65
    const FADE      = 0.013 // ~50 frames to vanish at 60fps

    const onPanelColor = (e) => { color = e.detail.color }

    const onMouseMove = (e) => {
      const x = e.clientX, y = e.clientY, t = performance.now()
      if (lastX !== null) {
        const dx = x - lastX, dy = y - lastY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist >= MIN_DIST) {
          const speed  = dist / ((t - lastT) || 1)       // px/ms
          const radius = Math.max(3, Math.min(20, speed * 8))
          drops.push({ x, y, radius, alpha: MAX_ALPHA, color })
          lastX = x; lastY = y; lastT = t
        }
      } else {
        lastX = x; lastY = y; lastT = t
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drops = drops.filter(d => d.alpha > 0)
      for (const d of drops) {
        const r = parseInt(d.color.slice(1, 3), 16)
        const g = parseInt(d.color.slice(3, 5), 16)
        const b = parseInt(d.color.slice(5, 7), 16)
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha.toFixed(3)})`
        ctx.fill()
        d.alpha -= FADE
      }
      rafId = requestAnimationFrame(draw)
    }

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    draw()
    window.addEventListener('mousemove',    onMouseMove)
    window.addEventListener('panel-color',  onPanelColor)
    window.addEventListener('resize',       onResize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove',   onMouseMove)
      window.removeEventListener('panel-color', onPanelColor)
      window.removeEventListener('resize',      onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={`site-layout${isHome ? ' site-layout--home' : ''}`}>
      <MouseTrail />
      <Nav isHome={isHome} />
      {children}
      <Footer />
    </div>
  )
}

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

function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: '4px',
        height: '4px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-ink-muted)',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}

function Footer() {
  return (
    <footer className="page-footer">
      {/* Left — email */}
      <a
        href="mailto:a4.lalita.chavan@gmail.com"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--size-footer-email)',
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
          fontSize: 'var(--size-footer-meta)',
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

function Nav({ isHome }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav aria-label="Main navigation" className="nav-bar">
      {/* Wordmark */}
      <Link to="/" className="nav-wordmark focus-light" aria-current={isHome ? 'page' : undefined}>
        Lalita Chavan
      </Link>

      {/* Desktop links */}
      <ul className="nav-links">
        {navLinks.map(({ label, href, external }) => {
          const isActive = isHome && label === 'Home'
          if (external) {
            return (
              <li key={label}>
                <a
                  href={href}
                  className="nav-link focus-light"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--weight-regular)',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {label}
                </a>
              </li>
            )
          }
          return (
            <li key={label}>
              <Link
                to={href}
                className="nav-link focus-light"
                aria-current={isActive ? 'page' : undefined}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: isActive ? 'var(--weight-bold)' : 'var(--weight-regular)',
                  color: isActive ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
                }}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Hamburger button — mobile only */}
      <button
        className="nav-hamburger focus-light"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="5" x2="17" y2="5" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="15" x2="17" y2="15" />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="nav-mobile-menu">
          {navLinks.map(({ label, href, external }) => {
            const isActive = isHome && label === 'Home'
            if (external) {
              return (
                <li key={label}>
                  <a href={href} className="nav-link focus-light" target="_blank" rel="noopener noreferrer"
                    style={{ fontWeight: 'var(--weight-regular)', color: 'var(--color-ink-muted)' }}
                    onClick={() => setMenuOpen(false)}
                  >{label}</a>
                </li>
              )
            }
            return (
              <li key={label}>
                <Link to={href} className="nav-link focus-light"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    fontWeight: isActive ? 'var(--weight-bold)' : 'var(--weight-regular)',
                    color: isActive ? 'var(--color-ink-primary)' : 'var(--color-ink-muted)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >{label}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </nav>
  )
}
