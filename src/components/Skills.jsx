const SKILLS = [
  'Python', 'Java', 'Swift', 'TypeScript', 'JavaScript', 'C++', 'Rust',
  'React', 'Node.js', 'REST APIs', 'Git',
  'AI/ML', 'RLHF', 'iOS', 'Healthcare Tech', 'Full-Stack',
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Skills</h2>
      <div className="skills section-animate" style={{ animationDelay: '0.15s' }}>
        {SKILLS.map((skill) => (
          <span key={skill} className="skills__tag">{skill}</span>
        ))}
      </div>
      <style>{`
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .skills__tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          padding: 0.35rem 0.7rem;
          background: var(--bg-card);
          color: var(--text);
          border: 1px solid var(--line);
          border-radius: 999px;
        }
      `}</style>
    </section>
  )
}
