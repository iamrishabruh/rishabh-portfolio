const ENTRIES = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'M.S. Computer Science',
    note: '2025 – Present · 4.0 GPA',
  },
  {
    school: 'Georgia State University',
    degree: 'B.S. Computer Science',
    note: '2023 – 2025',
  },
  {
    school: 'University of Georgia',
    degree: 'Undergraduate coursework',
    note: '2022 – 2023',
  },
]

export default function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Education</h2>
      <ul className="edu">
        {ENTRIES.map((entry, i) => (
          <li key={entry.school} className="edu__item section-animate" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
            <div>
              <span className="edu__school">{entry.school}</span>
              <span className="edu__degree">{entry.degree}</span>
            </div>
            <span className="edu__note">{entry.note}</span>
          </li>
        ))}
      </ul>
      <style>{`
        .edu { list-style: none; }
        .edu__item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--line);
        }
        .edu__item:first-child { padding-top: 0; }
        .edu__item:last-child { border-bottom: none; }
        .edu__school {
          display: block;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text);
        }
        .edu__degree {
          display: block;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .edu__note {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .edu__item { flex-wrap: wrap; gap: 0.25rem 1rem; }
          .edu__note { white-space: normal; }
        }
      `}</style>
    </section>
  )
}
