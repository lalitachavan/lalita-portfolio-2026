import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Projects', href: '/work' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
  { label: 'Resume',   href: '/resume' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/lalitachavan', external: true },
]

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Nav isHome={isHome} />
      {children}
    </>
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
