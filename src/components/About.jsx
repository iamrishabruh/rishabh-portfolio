export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>About</h2>
      <p className="about__text section-animate" style={{ animationDelay: '0.15s' }}>
        I build AI systems for healthcare and operations — architecture, automation, and research.
        Based in Atlanta, GA.
      </p>
      <p className="about__text about__interests section-animate" style={{ animationDelay: '0.2s' }}>
        Off hours: singing, songwriting, the gym, football, video games, and traveling.
      </p>
      <style>{`
        .about__text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text);
          max-width: 60ch;
        }
        .about__interests { margin-top: 0.75rem; color: var(--text-muted); }
      `}</style>
    </section>
  )
}
