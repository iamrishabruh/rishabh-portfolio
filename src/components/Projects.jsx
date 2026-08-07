import GitHubProjects from './GitHubProjects'

const FEATURED = [
  {
    title: 'Diatrend',
    description: 'AI-driven CGM trajectory prediction — PyTorch, TabTransformer/GNN, FastAPI.',
    repo: 'https://github.com/iamrishabruh/Diatrend-ML',
  },
  {
    title: 'Nexus Lite',
    description: 'Cross-platform mobile health tracker — React Native Expo + FastAPI.',
    repo: 'https://github.com/iamrishabruh/Nexus-Lite',
  },
  {
    title: 'Bennington',
    description: 'Stock backtesting + ML trading platform — Python, Docker, Cloud Run.',
    repo: 'https://github.com/iamrishabruh/Bennington',
  },
  {
    title: 'Differential Learning',
    description: 'Federated learning with differential privacy — DPAdam, gradient clustering.',
    repo: 'https://github.com/iamrishabruh/Differential-Learning',
  },
  {
    title: 'Drug Interaction Checker',
    description: 'Swift/SwiftUI clinical API proof of concept — XCTest, CI.',
    repo: 'https://github.com/iamrishabruh/Drug-Interaction-Checker',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Projects</h2>
      <div className="projects-grid">
        {FEATURED.map((project, i) => (
          <a
            key={project.title}
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card section-animate"
            style={{ animationDelay: `${0.15 + i * 0.05}s` }}
          >
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>
            <span className="project-card__cta">GitHub →</span>
          </a>
        ))}
      </div>
      <details className="projects-all section-animate" style={{ animationDelay: '0.4s' }}>
        <summary>All repositories</summary>
        <GitHubProjects />
      </details>
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .project-card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 1.25rem;
          color: var(--text);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          color: var(--text);
        }
        .project-card__title {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }
        .project-card__desc {
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--text-muted);
          margin-bottom: 0.6rem;
        }
        .project-card__cta {
          font-size: 0.8125rem;
          color: var(--accent);
        }
        .projects-all { margin-top: 1.5rem; }
        .projects-all summary {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          user-select: none;
        }
        .projects-all summary:hover { color: var(--accent); }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
