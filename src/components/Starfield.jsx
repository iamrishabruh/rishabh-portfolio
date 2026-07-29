import { useEffect, useRef } from 'react'

// Full-page twinkling starfield, fixed behind all content.
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = null
    let stars = []
    let w = 0
    let h = 0

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(280, Math.floor((w * h) / 6000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.35,
        base: Math.random() * 0.45 + 0.2,
        amp: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.02 + 0.004,
      }))
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#dbe4ff'
      for (const s of stars) {
        const alpha = reduced
          ? s.base
          : Math.max(0, s.base + Math.sin((t / 1000) * s.speed + s.phase) * s.amp)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (!reduced) {
          s.y += s.drift
          if (s.y > h + 2) {
            s.y = -2
            s.x = Math.random() * w
          }
        }
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      init()
      if (reduced) draw(0)
    }

    init()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
      <style>{`
        .starfield {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
