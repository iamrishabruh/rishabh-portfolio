import { useEffect, useRef, useState } from 'react'

// Drop a portrait at src/content/portrait.jpg (or .png/.webp) and it appears here.
const portraitModules = import.meta.glob('../content/portrait.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const PORTRAIT = Object.values(portraitModules)[0] || null

const ROLES = [
  'AI Solutions Architect at Care Access',
  'M.S. Computer Science at Georgia Tech',
  'Chief Engineering Officer at Kept',
  'CBA Lab researcher — state-aware artificial pancreas loops',
]

const ROTATE_MS = 3400
const FADE_MS = 400

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [reduced, setReduced] = useState(false)
  const fadeTimeout = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(prefersReduced)
    if (prefersReduced) return undefined
    const interval = setInterval(() => {
      setVisible(false)
      fadeTimeout.current = setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length)
        setVisible(true)
      }, FADE_MS)
    }, ROTATE_MS)
    return () => {
      clearInterval(interval)
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current)
    }
  }, [])

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__portrait section-animate">
        {PORTRAIT ? (
          <img src={PORTRAIT} alt="Rishabh Chouhan" width={132} height={132} />
        ) : (
          <span className="hero__initials" aria-hidden="true">RC</span>
        )}
      </div>
      <h1 className="hero__name section-animate" style={{ animationDelay: '0.05s' }}>
        Rishabh Chouhan
      </h1>
      {reduced ? (
        <ul className="hero__roles-static section-animate" style={{ animationDelay: '0.1s' }}>
          {ROLES.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      ) : (
        <p
          className={`hero__role ${visible ? 'hero__role--in' : 'hero__role--out'} section-animate`}
          style={{ animationDelay: '0.1s' }}
          aria-live="polite"
        >
          {ROLES[index]}
        </p>
      )}
      <p className="hero__family section-animate" style={{ animationDelay: '0.15s' }}>
        Also a son, a brother, and a friend to many.
      </p>
      <div className="hero__links section-animate" style={{ animationDelay: '0.2s' }}>
        <a href="https://github.com/iamrishabruh" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/chouhan-rishabh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        <a href="mailto:rchouhan.network@gmail.com">Email</a>
      </div>
      <style>{`
        .hero {
          position: relative;
          min-height: calc(88vh - var(--nav-height));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 0 3rem;
          border-bottom: 1px solid var(--line);
          scroll-margin-top: var(--nav-height);
        }
        .hero__glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(640px, 90vw);
          height: min(640px, 90vw);
          background: radial-gradient(circle, rgba(157, 184, 255, 0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero__portrait {
          width: 132px;
          height: 132px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.75rem;
          border: 1px solid var(--line);
          box-shadow: 0 0 48px rgba(157, 184, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
        }
        .hero__portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero__initials {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .hero__name {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 7vw, 3.5rem);
          font-weight: 700;
          letter-spacing: 0.01em;
          color: var(--text);
          margin-bottom: 0.9rem;
        }
        .hero__role {
          font-family: var(--font-mono);
          font-size: clamp(0.8125rem, 2.5vw, 0.9375rem);
          color: var(--accent);
          min-height: 2.6em;
          max-width: 34em;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity ${FADE_MS}ms ease;
        }
        .hero__role--in { opacity: 1; }
        .hero__role--out { opacity: 0; }
        .hero__roles-static {
          list-style: none;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--accent);
          line-height: 2;
        }
        .hero__family {
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
        }
        .hero__links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 2.25rem;
        }
        .hero__links a {
          font-size: 0.875rem;
          padding: 0.55rem 1.15rem;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--text);
          background: var(--bg-card);
          transition: all 0.2s ease;
        }
        .hero__links a:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        @media (max-width: 768px) {
          .hero { min-height: calc(80vh - var(--nav-height)); padding: 3rem 0 2.5rem; }
          .hero__portrait { width: 112px; height: 112px; margin-bottom: 1.5rem; }
          .hero__links { gap: 0.6rem; }
          .hero__links a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}
