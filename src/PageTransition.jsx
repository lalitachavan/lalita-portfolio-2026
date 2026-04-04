import { createContext, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const TransitionContext = createContext(null)

export function usePageTransition() {
  return useContext(TransitionContext)
}

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()

  const expandToPage = useCallback((panelEl, color, targetUrl) => {
    const rect = panelEl.getBoundingClientRect()

    // Create overlay element directly — no React state, no phase switching
    const el = document.createElement('div')
    Object.assign(el.style, {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      background: color,
      borderRadius: 'var(--accordion-radius)',
      pointerEvents: 'none',
      zIndex: '10000',
    })
    document.body.appendChild(el)

    // Single continuous animation: horizontal fill → vertical fill
    // Per-keyframe easing: spring for h-phase, ease-in-out for v-phase
    const anim = el.animate(
      [
        {
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          borderRadius: 'var(--accordion-radius)',
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
        {
          top: `${rect.top}px`,
          left: '0px',
          width: '100vw',
          height: `${rect.height}px`,
          borderRadius: '0px',
          offset: 0.38,
          easing: 'cubic-bezier(0.4, 0, 0.15, 1)',
        },
        {
          top: '0px',
          left: '0px',
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
        },
      ],
      { duration: 1300, fill: 'forwards' }
    )

    anim.onfinish = () => {
      navigate(targetUrl)
      // Wait for React to render and paint the new route before fading out
      setTimeout(() => {
        el.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 300, easing: 'ease-out', fill: 'forwards' }
        ).onfinish = () => el.remove()
      }, 100)
    }
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ expandToPage }}>
      {children}
    </TransitionContext.Provider>
  )
}
