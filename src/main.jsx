import { StrictMode, useRef, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import HomePage from './HomePage'
import CaseStudyPage from './CaseStudyPage'
import Layout from './Layout'
import { PageTransitionProvider } from './PageTransition'

const INTERACTIVE = 'a, button, [role="tab"], [role="button"], .hero-line-1, .hero-line-2'

function CursorDot() {
  const dotRef = useRef(null)
  const location = useLocation()
  const [hasFinePointer, setHasFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )

  // Track pointer capability changes (e.g. docking a tablet)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const handler = (e) => setHasFinePointer(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Reset dot size on route change (cursor may be stuck enlarged from a hovered link)
  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    dot.style.width = '16px'
    dot.style.height = '16px'
    dot.style.mixBlendMode = 'normal'
    dot.style.background = 'var(--color-ink-primary)'
  }, [location.pathname])

  // Hide system cursor only when fine pointer is available
  useEffect(() => {
    if (!hasFinePointer) return

    const style = document.createElement('style')
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)

    return () => { style.remove() }
  }, [hasFinePointer])

  // Cursor movement + interactive hover via event delegation
  useEffect(() => {
    const dot = dotRef.current
    if (!dot || !hasFinePointer) return

    let x = -100, y = -100

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.opacity = '1'
      dot.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`
    }

    const hide = () => { dot.style.opacity = '0' }

    // Event delegation — works even after React re-renders
    const onOver = (e) => {
      const interactive = e.target.closest(INTERACTIVE)
      if (!interactive || interactive.classList.contains('is-expanded')) return
      dot.style.width = '40px'
      dot.style.height = '40px'
      dot.style.mixBlendMode = 'difference'
      dot.style.background = '#ffffff'
    }

    const onOut = (e) => {
      const interactive = e.target.closest(INTERACTIVE)
      if (!interactive) return
      // Only shrink if we're actually leaving the interactive element
      if (interactive.contains(e.relatedTarget)) return
      dot.style.width = '16px'
      dot.style.height = '16px'
      dot.style.mixBlendMode = 'normal'
      dot.style.background = 'var(--color-ink-primary)'
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [hasFinePointer])

  if (!hasFinePointer) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: 'var(--color-ink-primary)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transform: 'translate(-50%, -50%) translate3d(-100px, -100px, 0)',
        transition: 'width 200ms ease, height 200ms ease, background 200ms ease',
      }}
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransitionProvider>
        <CursorDot />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
          </Routes>
        </Layout>
      </PageTransitionProvider>
    </BrowserRouter>
  </StrictMode>
)
