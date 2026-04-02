import { StrictMode, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './HomePage'

// Module-level: runs once before React, never cleaned up
// Inline style with !important on <html> is the highest possible CSS priority
document.documentElement.style.setProperty('cursor', 'none', 'important')

const cursorStyle = document.createElement('style')
cursorStyle.textContent = '* { cursor: none !important; }'
document.head.appendChild(cursorStyle)

const INTERACTIVE = 'a, button, [role="tab"], [role="button"], .hero-line-1, .hero-line-2'

function CursorDot() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let x = -100, y = -100

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.opacity = '1'
      dot.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`
    }

    const grow = (e) => {
      if (e.currentTarget.classList.contains('is-expanded')) return
      dot.style.width = '40px'
      dot.style.height = '40px'
      dot.style.mixBlendMode = 'difference'
      dot.style.background = '#ffffff'
    }

    const shrink = () => {
      dot.style.width = '16px'
      dot.style.height = '16px'
      dot.style.mixBlendMode = 'normal'
      dot.style.background = 'var(--color-ink-primary)'
    }

    const hide = () => { dot.style.opacity = '0' }

    document.querySelectorAll(INTERACTIVE).forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.querySelectorAll(INTERACTIVE).forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

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
    <CursorDot />
    <HomePage />
  </StrictMode>
)
