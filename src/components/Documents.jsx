// All paths under /documents/ — files live in public/documents/
const GROUPS = [
  {
    title: 'Resume',
    items: [{ label: 'Resume (PDF)', path: '/documents/resume.pdf' }],
  },
  {
    title: 'Academic awards',
    items: [
      { label: "President's List — Spring 2025", path: '/documents/Spring2025PresidentsList.pdf' },
      { label: "President's List — Fall 2024", path: '/documents/Fall2024PresidentsList.pdf' },
      { label: "Dean's List — Summer 2024", path: '/documents/Summer2024DeansList.pdf' },
      { label: "Dean's List — Spring 2024", path: '/documents/Spring2024DeansList.pdf' },
      { label: 'AP Capstone Diploma, AP Scholar with Distinction', path: '/documents/APCapstoneDiploma.pdf' },
    ],
  },
  {
    title: 'Certifications',
    items: [
      { label: 'Generative AI Engineering with Databricks', path: null },
      { label: 'Spring Boot 2.0 Essential Training', path: '/documents/spring-boot-certificate.pdf' },
      { label: 'Practical Database Design & SQL Querying', path: '/documents/database-design-certificate.pdf' },
      { label: 'PowerPoint 2016: Presentation Design & Delivery', path: '/documents/powerpoint-certificate.pdf' },
      { label: 'Word 2016: Document Creation & Collaboration', path: '/documents/word-certificate.pdf' },
      { label: 'Excel 2016: Data Analysis & Presentation', path: '/documents/excel-certificate.pdf' },
      { label: 'HIPAA Business Associate', path: '/documents/hipaa-certificate.pdf' },
      { label: 'Research Skills Certificate', path: '/documents/research-skills-certification.pdf' },
      { label: 'Student Health Clinic — Health Privacy', path: '/documents/health-privacy-certificate.pdf' },
      { label: 'Biosafety Certificate', path: '/documents/biosafety-certificate.pdf' },
    ],
  },
  {
    title: 'Recommendations',
    items: [
      { label: 'Dr. Murray Patterson — Algorithms (GSU)', path: '/documents/algorithms-recommendation.pdf' },
      { label: 'Dr. Roya Hosseini — Operating Systems (GSU)', path: '/documents/os-recommendation.pdf' },
      { label: 'Laura Wilson — Principal, South Forsyth High School', path: '/documents/principal-recommendation.pdf' },
    ],
  },
]

export default function Documents() {
  return (
    <section id="documents" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Docs</h2>
      <div className="docs section-animate" style={{ animationDelay: '0.15s' }}>
        {GROUPS.map((group) => (
          <div key={group.title} className="docs__group">
            <h3 className="docs__heading">{group.title}</h3>
            <ul className="docs__list">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.path ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.label} <span className="docs__dl">↓</span>
                    </a>
                  ) : (
                    <span className="docs__plain">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`
        .docs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem 2rem;
        }
        .docs__heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
        }
        .docs__list {
          list-style: none;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .docs__list li { padding: 0.25rem 0; }
        .docs__list a { color: var(--text); }
        .docs__list a:hover { color: var(--accent); }
        .docs__dl { color: var(--text-muted); font-size: 0.8em; }
        .docs__plain { color: var(--text-muted); }
        @media (max-width: 768px) {
          .docs { grid-template-columns: 1fr; gap: 1.5rem; }
          .docs__list li { padding: 0.4rem 0; }
        }
      `}</style>
    </section>
  )
}
