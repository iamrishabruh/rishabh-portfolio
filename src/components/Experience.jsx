const ENTRIES = [
  {
    role: 'AI Solutions Architect',
    company: 'Care Access',
    duration: 'Jul 2025 – Present',
    summary: 'End-to-end automation and data systems across the org.',
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
    role: 'Chief Engineering Officer',
    company: 'Kept',
    duration: 'Current',
    summary: 'Leading engineering.',
    bullets: [],
  },
  {
    role: 'Founding Software Engineer',
    company: 'Skincentric',
    duration: 'Dec 2024 – Mar 2025',
    summary: 'Rebuilt a Flutter skincare app at startup pace.',
    bullets: [
      'Refactored Flutter skincare app to Dart; improved maintainability/scalability',
      'Component rewrites to reduce technical debt + standardize architecture',
      'Automated testing + QA workflows to reduce regressions',
    ],
  },
  {
    role: 'Mobile Software Engineering Intern',
    company: 'Kaiser Permanente',
    duration: 'Jun 2023 – Sep 2023',
    summary: 'Swift/SwiftUI drug-interaction proof of concept.',
    bullets: [
      'Swift/SwiftUI drug interaction POC integrating external clinical APIs',
      'Modular architecture (UI/networking/data separation)',
      'XCTest unit/UI tests',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Work</h2>
      <div className="xp">
        {ENTRIES.map((entry, i) => (
          <article key={entry.company} className="xp__entry section-animate" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
            <div className="xp__header">
              <div>
                <h3 className="xp__role">{entry.role}</h3>
                <p className="xp__company">{entry.company}</p>
              </div>
              <span className="xp__date">{entry.duration}</span>
            </div>
            <p className="xp__summary">{entry.summary}</p>
            {entry.bullets.length > 0 && (
              <details className="xp__details">
                <summary>More</summary>
                <ul className="xp__bullets">
                  {entry.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </details>
            )}
          </article>
        ))}
      </div>
      <p className="xp__other section-animate" style={{ animationDelay: '0.4s' }}>
        Before all that: barista, grill cook, server, deli manager, tutor.
      </p>
      <style>{`
        .xp__entry {
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--line);
        }
        .xp__entry:first-child { padding-top: 0; }
        .xp__entry:last-child { border-bottom: none; }
        .xp__header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
        }
        .xp__role {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text);
        }
        .xp__company {
          font-size: 0.875rem;
          color: var(--accent);
          margin-top: 0.1rem;
        }
        .xp__date {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .xp__summary {
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
          max-width: 55ch;
        }
        .xp__details { margin-top: 0.5rem; }
        .xp__details summary {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          user-select: none;
        }
        .xp__details summary:hover { color: var(--accent); }
        .xp__bullets {
          list-style: none;
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text);
          margin-top: 0.6rem;
        }
        .xp__bullets li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.35rem;
        }
        .xp__bullets li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--text-muted);
        }
        .xp__other {
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: var(--text-muted);
          font-style: italic;
        }
        @media (max-width: 768px) {
          .xp__header { flex-wrap: wrap; gap: 0.25rem 0.75rem; }
          .xp__date { white-space: normal; }
        }
      `}</style>
    </section>
  )
}
