export default function Research() {
  return (
    <section id="research" className="section">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Research</h2>
      <p className="research__text section-animate" style={{ animationDelay: '0.15s' }}>
        <strong>CBA Lab, Georgia Tech</strong> — advised by Dr. Thomas Plötz.
        Exploring the benefits of state-aware processing in artificial pancreas loops.
      </p>
      <style>{`
        .research__text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text);
          max-width: 60ch;
        }
        .research__text strong {
          font-weight: 600;
        }
      `}</style>
    </section>
  )
}
