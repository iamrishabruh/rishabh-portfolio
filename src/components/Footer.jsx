export default function Footer() {
  return (
    <section id="contact" className="section footer">
      <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>Contact</h2>
      <p className="footer__line section-animate" style={{ animationDelay: '0.15s' }}>
        Atlanta, GA · Open to ideas worth building.
      </p>
      <div className="footer__links section-animate" style={{ animationDelay: '0.2s' }}>
        <a href="mailto:rchouhan.network@gmail.com">rchouhan.network@gmail.com</a>
        <a href="https://github.com/iamrishabruh" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/chouhan-rishabh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://reachmindllc.com" target="_blank" rel="noopener noreferrer">Reachmind</a>
        <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
      </div>
      <style>{`
        .footer { padding-bottom: 5rem; }
        .footer__line {
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .footer__links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .footer__links a {
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--text);
          background: var(--bg-card);
          transition: all 0.2s ease;
        }
        .footer__links a:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .footer__links a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}
