import { useRef } from 'react'

// Full-bleed horizontal scroller with snap + arrow controls.
// Left padding lines the first item up with the page column.
export default function Reel({ title, id, children }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' })
  }

  return (
    <section id={id} className="section reel-section">
      <div className="reel-section__header">
        <h2 className="section-title section-animate" style={{ animationDelay: '0.1s' }}>{title}</h2>
        <div className="reel-section__arrows section-animate" style={{ animationDelay: '0.1s' }}>
          <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} back`}>←</button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} forward`}>→</button>
        </div>
      </div>
      <div className="reel section-animate" style={{ animationDelay: '0.15s' }}>
        <div className="reel__track" ref={trackRef} tabIndex={0} aria-label={title}>
          {children}
        </div>
      </div>
      <style>{`
        .reel-section__header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
        }
        .reel-section__arrows { display: flex; gap: 0.4rem; }
        .reel-section__arrows button {
          width: 34px;
          height: 34px;
          border: 1px solid var(--line);
          border-radius: 50%;
          color: var(--text-muted);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          background: var(--bg-card);
        }
        .reel-section__arrows button:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .reel {
          width: 100vw;
          margin-left: calc(50% - 50vw);
        }
        .reel__track {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x proximity;
          padding: 0.25rem calc(max((100vw - 720px) / 2, 0px) + 1.5rem) 0.75rem;
          scroll-padding-left: calc(max((100vw - 720px) / 2, 0px) + 1.5rem);
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .reel__track::-webkit-scrollbar { display: none; }
        .reel__track > * { scroll-snap-align: start; flex-shrink: 0; }
        @media (max-width: 768px) {
          .reel-section__arrows { display: none; }
          .reel__track {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            scroll-padding-left: 1.25rem;
          }
        }
      `}</style>
    </section>
  )
}
