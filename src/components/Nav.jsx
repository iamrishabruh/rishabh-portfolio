const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#life', label: 'Life' },
  { href: '#music', label: 'Music' },
  { href: '#documents', label: 'Docs' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="Back to top">RC ✦</a>
        <nav className="nav__links" aria-label="Sections">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav__link">{label}</a>
          ))}
        </nav>
      </div>
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(5, 7, 15, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--line);
        }
        .nav__inner {
          max-width: 720px;
          margin: 0 auto;
          height: var(--nav-height);
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .nav__brand {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
        }
        .nav__brand:hover { color: var(--accent); }
        .nav__links {
          display: flex;
          gap: 1.1rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nav__links::-webkit-scrollbar { display: none; }
        .nav__link {
          font-size: 0.8125rem;
          color: var(--text-muted);
          white-space: nowrap;
          padding: 0.25rem 0;
        }
        .nav__link:hover { color: var(--text); }
        @media (max-width: 768px) {
          .nav__inner { padding: 0 1.25rem; }
          .nav__links { gap: 0.9rem; }
        }
      `}</style>
    </header>
  )
}
