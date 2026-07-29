const HONORS = [
  "President's List — GSU (Spring 2025, Fall 2024)",
  "Dean's List — GSU (Summer 2024, Spring 2024)",
  'AP Capstone Diploma · AP Scholar with Distinction',
  '35/36 ACT',
  'Recognized by Kaiser Permanente leadership for internship performance',
  'HOSA State Leadership Conference — 2nd, Medical Terminology (2020)',
]

const LEADERSHIP = [
  'Mensa — 20s/30s Coordinator, community events',
  'FBLA (2015 – 2025) — 500+ service hours · 1st in State, Computer Problem Solving (2021) · 2nd in State, Computer Applications (2021) · 2nd in State, Desktop Publishing (2019) · 4th in State, Keyboarding Applications II (2019)',
  'Finance & Investment Club — Founder (2019 – 2022)',
  'AI FinTech Club — Founder (2024 – 2025)',
]

function List({ heading, items }) {
  return (
    <div className="recog__group">
      <h3 className="recog__heading">{heading}</h3>
      <ul className="recog__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Recognition() {
  return (
    <section id="honors" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Honors & Leadership</h2>
      <div className="recog section-animate" style={{ animationDelay: '0.15s' }}>
        <List heading="Honors" items={HONORS} />
        <List heading="Leadership" items={LEADERSHIP} />
      </div>
      <style>{`
        .recog {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .recog__heading {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .recog__list {
          list-style: none;
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text);
        }
        .recog__list li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.5rem;
        }
        .recog__list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          font-size: 0.6rem;
          top: 0.35em;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .recog { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>
    </section>
  )
}
