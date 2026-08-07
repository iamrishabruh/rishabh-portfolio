export default function Hero() {
  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero__cosmic">
        <img
          className="hero__cosmic-img"
          src="/images/cosmic-cliffs-2k.png"
          srcSet="/images/cosmic-cliffs-1200.png 1200w, /images/cosmic-cliffs-2k.png 2000w"
          sizes="100vw"
          width={2000}
          height={1158}
          alt="Cosmic Cliffs in the Carina Nebula — infrared view from JWST NIRCam"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__cosmic-gradient" aria-hidden="true" />
        <div className="hero__cosmic-overlay" aria-hidden="true" />
        <div className="hero__cosmic-inner">
          <img
            className="hero__avatar"
            src="/images/headshot-640.jpg"
            srcSet="/images/headshot-320.jpg 320w, /images/headshot-640.jpg 640w"
            sizes="(max-width: 768px) 88px, 116px"
            width={640}
            height={640}
            alt="Rishabh Chouhan"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero__cosmic-text">
            <h1 className="hero__name">Rishabh Chouhan</h1>
            <p className="hero__title">Software Engineer · Builder · Entrepreneur</p>
          </div>
        </div>
      </div>
      <p className="hero__credit section-animate" style={{ animationDelay: '0.05s' }}>
        NASA / JWST — Cosmic Cliffs, Carina Nebula
      </p>
      <div className="hero__body">
        <div className="hero__highlights section-animate" style={{ animationDelay: '0.1s' }}>
          <span>Georgia Tech CS Masters Student</span>
          <span>AI Solutions @ Care Access</span>
          <span>CBA Lab Researcher</span>
        </div>
        <div className="hero__inner section-animate" style={{ animationDelay: '0.15s' }}>
          <p className="hero__bio">
            I want to research, design, and build software that reaches humans everywhere — from AI and automation to healthcare tools and full-stack products.
          </p>
          <div className="hero__contact">
            <a href="mailto:rchouhan.network@gmail.com">rchouhan.network@gmail.com</a>
            <span className="hero__dot">·</span>
            <a href="https://github.com/iamrishabruh" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="hero__dot">·</span>
            <a href="https://www.linkedin.com/in/chouhan-rishabh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="hero__dot">·</span>
            <a href="https://reachmindllc.com" target="_blank" rel="noopener noreferrer">Reachmind</a>
            <span className="hero__dot">·</span>
            <a href="#resume">Resume</a>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            <span className="hero__scroll-line" />
          </div>
        </div>
      </div>
      <style>{`
        .hero {
          border-bottom: 1px solid var(--line);
        }
        .hero__cosmic {
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          width: 100vw;
          min-height: min(52vh, 520px);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 2.5rem 1.5rem 3.5rem;
        }
        .hero__cosmic-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 42%;
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          image-rendering: auto;
        }
        .hero__cosmic-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(10, 12, 20, 0.2) 0%,
            rgba(26, 23, 20, 0.55) 45%,
            var(--bg) 100%
          );
          pointer-events: none;
        }
        .hero__cosmic-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.12) 0%,
            rgba(0, 0, 0, 0.28) 100%
          );
          pointer-events: none;
        }
        .hero__cosmic-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .hero__avatar {
          width: 116px;
          height: 116px;
          flex-shrink: 0;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(245, 240, 232, 0.55);
          box-shadow: 0 6px 28px rgba(0, 0, 0, 0.45);
        }
        .hero__cosmic-text {
          min-width: 0;
        }
        .hero__name {
          font-family: var(--font-display);
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 600;
          color: #f5f0e8;
          letter-spacing: 0.02em;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.45);
        }
        .hero__title {
          font-family: var(--font-mono);
          font-size: clamp(0.8125rem, 2.5vw, 0.875rem);
          color: rgba(245, 240, 232, 0.88);
          margin: 0;
          text-shadow: 0 1px 16px rgba(0, 0, 0, 0.4);
        }
        .hero__credit {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0;
          padding: 0.5rem 1rem 0;
          letter-spacing: 0.02em;
        }
        .hero__body {
          padding-top: 1.75rem;
          padding-bottom: 3rem;
        }
        .hero__highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .hero__bio {
          font-size: 1.125rem;
          max-width: 36em;
          margin-bottom: 1.5rem;
          color: var(--text);
        }
        .hero__contact {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .hero__contact a {
          color: var(--accent);
          transition: color 0.2s ease;
        }
        .hero__contact a:hover {
          color: var(--hover);
        }
        .hero__dot {
          margin: 0 0.5rem;
          color: var(--line);
        }
        .hero__scroll {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
        }
        .hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--line), transparent);
          border-radius: 1px;
        }
        @media (max-width: 768px) {
          .hero__cosmic {
            min-height: min(44vh, 380px);
            padding: 2rem 1rem 2.75rem;
          }
          .hero__cosmic-img { object-position: center 38%; }
          .hero__cosmic-inner { gap: 1rem; }
          .hero__avatar { width: 88px; height: 88px; }
          .hero__body { padding-top: 1.25rem; padding-bottom: 2.5rem; }
          .hero__highlights { gap: 0.4rem 0.75rem; margin-bottom: 1.25rem; font-size: 0.7rem; }
          .hero__bio { font-size: 1rem; margin-bottom: 1.25rem; }
          .hero__contact {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.25rem 0;
          }
          .hero__contact a {
            padding: 0.5rem 0.25rem 0.5rem 0;
            margin-right: 0.25rem;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
          }
          .hero__dot { margin: 0 0.35rem; }
          .hero__scroll { margin-top: 2rem; }
        }
        @media (max-width: 480px) {
          .hero__cosmic { min-height: 38vh; padding-bottom: 2.25rem; }
          .hero__avatar { width: 72px; height: 72px; }
          .hero__contact a { padding: 0.5rem 0.5rem 0.5rem 0; }
        }
      `}</style>
    </section>
  )
}
