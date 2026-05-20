const ENTRIES = [
  {
    role: 'AI Driven Marketing Operations Analyst',
    company: 'Care Access',
    note: null,
    duration: 'Jul 2025 – Present, Remote',
    bullets: [
      'End-to-end automation systems integrating Monday.com, Slack, Google Workspace, Microsoft Graph, Databricks, Microsoft Fabric',
      'Replaced manual processes with auditable automation pipelines (logging/diagnostics/state tracking)',
      'Dynamic Monday.com workflows (board relations, people columns, form ingestion) for event creation + staffing + study updates',
      'Slack orchestration (channel creation, invites, formatted summaries, mobile-safe rendering)',
      'Secure data engineering pipelines (normalized lookup tables, dedup mappings, curated views via Fabric GraphQL APIs)',
      'Privacy-preserving joins with SHA-256 hashing + secret peppering',
      'Migration to GitHub-based SDLC (repo structure, env-scoped secrets, versioning, deployment practices)',
      'Runbooks + cross-functional bridge across ops/security/data/engineering',
    ],
  },
  {
    role: 'Founding Software Engineer (1099)',
    company: 'Skincentric',
    note: null,
    duration: 'Dec 2024 – Mar 2025, Remote',
    bullets: [
      'Refactored Flutter skincare app to Dart; improved maintainability/scalability',
      'Component rewrites to reduce technical debt + standardize architecture',
      'Automated testing + QA workflows to reduce regressions',
      'Debugging + documentation in startup pace',
    ],
  },
  {
    role: 'Mobile Software Engineering Intern',
    company: 'Kaiser Permanente',
    note: null,
    duration: 'Jun 2023 – Sep 2023, Buckhead, GA',
    bullets: [
      'Swift/SwiftUI drug interaction POC integrating external clinical APIs',
      'Modular architecture (UI/networking/data separation)',
      'XCTest unit/UI tests',
      'Collaboration on debugging/refactoring/maintainability',
    ],
  },
]

const OTHER_JOBS = [
  { role: 'Barista', company: 'Starbucks' },
  { role: 'Grill cook', company: "Freddy's" },
  { role: 'Server + delivery', company: 'Mangia' },
  { role: 'Deli manager', company: 'Walmart' },
  { role: 'Tutor', company: 'Kumon' },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Experience</h2>
      <div className="timeline">
        {ENTRIES.map((entry, i) => (
          <article key={i} className="timeline__entry section-animate" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
            <div className="timeline__line" />
            <div className="timeline__content">
              <div className="timeline__header">
                <div>
                  <h3 className="timeline__role">{entry.role}</h3>
                  {(entry.company || entry.note) && (
                    <p className="timeline__meta">
                      {entry.company}
                      {entry.company && entry.note && ' · '}
                      {entry.note && `(${entry.note})`}
                    </p>
                  )}
                </div>
                {(entry.duration) && (
                  <span className="timeline__date">{entry.duration}</span>
                )}
              </div>
              <ul className="timeline__bullets">
                {entry.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="other-experience section-animate" style={{ animationDelay: '0.5s' }}>
        <h3 className="other-experience__title">Other experience</h3>
        <ul className="other-experience__list">
          {OTHER_JOBS.map((job, i) => (
            <li key={i}><span className="other-experience__role">{job.role}</span>, {job.company}</li>
          ))}
        </ul>
      </div>
      <style>{`
        .timeline { position: relative; }
        .timeline__entry {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }
        .timeline__entry:last-child { margin-bottom: 0; }
        .timeline__line {
          position: absolute;
          left: 0;
          top: 0.25rem;
          bottom: -2rem;
          width: 1px;
          background: var(--line);
        }
        .timeline__entry:last-child .timeline__line { bottom: 0; height: 1.5rem; }
        .timeline__content { padding-bottom: 0.25rem; }
        .timeline__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .timeline__role {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text);
        }
        .timeline__meta {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }
        .timeline__date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .timeline__bullets {
          list-style: none;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--text);
        }
        .timeline__bullets li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.35rem;
        }
        .timeline__bullets li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--line);
        }
        .other-experience { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
        .other-experience__title {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .other-experience__list {
          list-style: none;
          font-size: 0.9375rem;
          color: var(--text-muted);
          line-height: 1.8;
        }
        .other-experience__role { color: var(--text); font-weight: 500; }
        @media (max-width: 768px) {
          .timeline__entry {
            padding-left: 1.25rem;
            margin-bottom: 1.75rem;
          }
          .timeline__header { flex-wrap: wrap; gap: 0.35rem; }
          .timeline__date { white-space: normal; }
          .timeline__role { font-size: 1.125rem; }
          .timeline__bullets li { margin-bottom: 0.5rem; }
          .other-experience { margin-top: 2rem; padding-top: 1.25rem; }
        }
        @media (max-width: 480px) {
          .timeline__entry { padding-left: 1rem; margin-bottom: 1.5rem; }
        }
      `}</style>
    </section>
  )
}
