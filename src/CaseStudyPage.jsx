import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProjectBySlug } from './data/projects.js'
import { getPanelTokens } from './design-system/tokens.js'
import './case-study.css'

// Case study content indexed by slug
import racsContent from './data/case-studies/racs.js'

const caseStudyContent = {
  racs: racsContent,
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProjectBySlug(slug)
  const content = caseStudyContent[slug]

  if (!project || !content) {
    return (
      <main className="cs-not-found">
        <p>Case study not found.</p>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Back to home</a>
      </main>
    )
  }

  const tok = getPanelTokens(project.color)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    // Delay matches overlay fade-out (100ms nav + 300ms fade = ~400ms)
    const t = setTimeout(() => setRevealed(true), 420)
    return () => clearTimeout(t)
  }, [])

  return (
    <article className="cs-page">

      {/* ============ HERO ============ */}
      <section
        className="cs-hero"
        style={{ backgroundColor: project.color }}
      >
        <div className="cs-hero-inner">
          <div className={`cs-hero-content${revealed ? ' cs-hero-revealed' : ''}`}>
            {/* Image left — matches accordion panel layout */}
            {project.imageSrc && (
              <div className="cs-hero-image">
                <img src={project.imageSrc} alt="" />
              </div>
            )}

            {/* Content right */}
            <div className="cs-hero-text">
              <p className="cs-hero-client" style={{ color: tok.body }}>
                {project.client} &middot; {project.year}
              </p>
              <h1 className="cs-hero-title" style={{ color: tok.text }}>
                {content.hero.headline}
              </h1>
              <p className="cs-hero-hook" style={{ color: tok.body }}>
                {content.hero.hook}
              </p>

              <div className="cs-hero-meta" style={{ borderColor: tok.border }}>
                <div>
                  <span className="cs-meta-label" style={{ color: tok.muted }}>Role</span>
                  <span className="cs-meta-value" style={{ color: tok.text }}>{content.hero.role}</span>
                </div>
                <div>
                  <span className="cs-meta-label" style={{ color: tok.muted }}>Team</span>
                  {content.hero.team.map((m, i) => (
                    <span key={i} className="cs-meta-value" style={{ color: tok.text }}>{m}</span>
                  ))}
                </div>
                <div>
                  <span className="cs-meta-label" style={{ color: tok.muted }}>Tools</span>
                  <span className="cs-meta-value" style={{ color: tok.text }}>{content.hero.tools}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BODY ============ */}
      <div className="cs-body">

        {/* Impact Snapshot */}
        <section className="cs-section cs-impact">
          <div className="cs-impact-grid">
            {content.impact.stats.map((stat, i) => (
              <div key={i} className="cs-stat">
                <span className="cs-stat-value">{stat.value}</span>
                <span className="cs-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Context */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.context.heading}</h2>
          <p className="cs-body-text">{content.context.body}</p>
        </section>

        {/* Key Insight */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.keyInsight.heading}</h2>
          <blockquote className="cs-callout" style={{ borderColor: project.color }}>
            {content.keyInsight.body}
          </blockquote>
          <p className="cs-body-text">{content.keyInsight.supporting}</p>
        </section>

        {/* Problem */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.problem.heading}</h2>
          <p className="cs-hmw" style={{ color: project.color }}>
            {content.problem.statement}
          </p>
          <p className="cs-body-text">{content.problem.body}</p>
        </section>

        {/* Users & Constraints */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.usersAndConstraints.heading}</h2>
          <p className="cs-body-text">{content.usersAndConstraints.body}</p>
        </section>

        {/* My Role / Design Approach */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.myRole.heading}</h2>
          <p className="cs-body-text">{content.myRole.body}</p>
          <ol className="cs-ordered-list">
            {content.myRole.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="cs-body-text cs-principle">{content.myRole.principle}</p>
        </section>

        {/* Design Challenges — Research Methods */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.designChallenges.heading}</h2>
          <div className="cs-methods-grid">
            {content.designChallenges.methods.map((method, i) => (
              <div key={i} className="cs-method-card">
                <span className="cs-method-icon">{method.icon}</span>
                <h3 className="cs-method-name">{method.name}</h3>
                <p className="cs-method-detail">{method.detail}</p>
                <p className="cs-method-why">{method.why}</p>
              </div>
            ))}
          </div>
          <p className="cs-body-text">{content.designChallenges.insightsIntro}</p>
          <ul className="cs-list">
            {content.designChallenges.insights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Key Design Decisions / Tradeoffs */}
        <section className="cs-section">
          <h2 className="cs-heading">{content.tradeoffs.heading}</h2>
          <div className="cs-decisions">
            {content.tradeoffs.decisions.map((d, i) => (
              <div key={i} className="cs-decision">
                <h3 className="cs-decision-title">
                  <span className="cs-decision-number" style={{ color: project.color }}>{i + 1}.</span>
                  {' '}{d.title}
                </h3>
                <p className="cs-body-text">{d.body}</p>
                <ul className="cs-list">
                  {d.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                {d.note && <p className="cs-body-text cs-principle">{d.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="cs-section cs-reflection">
          <h2 className="cs-heading">{content.reflection.heading}</h2>
          <div className="cs-learnings">
            {content.reflection.items.map((item, i) => (
              <div key={i} className="cs-learning">
                <p className="cs-body-text">
                  <strong>{item.bold}</strong>{' '}
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <nav className="cs-footer-nav">
          <button
            className="cs-back-bottom"
            onClick={() => navigate('/')}
          >
            &larr; Back to all projects
          </button>
        </nav>

      </div>
    </article>
  )
}
