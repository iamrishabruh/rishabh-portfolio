import { useRef, useState } from 'react'
import Reel from './Reel'

// Drop audio files into src/content/music/ and they show up here automatically.
// Prefix filenames with numbers (01-, 02-, …) to control the order;
// the rest of the filename becomes the track title.
const trackModules = import.meta.glob('../content/music/*.{mp3,m4a,wav,ogg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const TRACKS = Object.entries(trackModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({
    url,
    title:
      path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim() ||
      'Untitled',
  }))

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 1.5 L12 7 L3 12.5 Z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="2.5" y="1.5" width="3.4" height="11" rx="1" fill="currentColor" />
      <rect x="8.1" y="1.5" width="3.4" height="11" rx="1" fill="currentColor" />
    </svg>
  )
}

export default function MusicReel() {
  const audioRef = useRef(null)
  const [current, setCurrent] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = (i) => {
    const audio = audioRef.current
    if (!audio) return
    if (current === i) {
      if (playing) {
        audio.pause()
      } else {
        audio.play().catch(() => {})
      }
    } else {
      setCurrent(i)
      setProgress(0)
      audio.src = TRACKS[i].url
      audio.play().catch(() => {})
    }
  }

  const onTimeUpdate = () => {
    const audio = audioRef.current
    if (audio && audio.duration) setProgress(audio.currentTime / audio.duration)
  }

  return (
    <Reel title="Music" id="music">
      {TRACKS.length > 0 ? (
        TRACKS.map((track, i) => {
          const isCurrent = current === i
          return (
            <div key={track.url} className={`track ${isCurrent ? 'track--active' : ''}`}>
              <button
                type="button"
                className="track__play"
                onClick={() => toggle(i)}
                aria-label={`${isCurrent && playing ? 'Pause' : 'Play'} ${track.title}`}
              >
                {isCurrent && playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <p className="track__title">{track.title}</p>
              <div className="track__bar" aria-hidden="true">
                <div
                  className="track__bar-fill"
                  style={{ width: `${isCurrent ? Math.round(progress * 100) : 0}%` }}
                />
              </div>
            </div>
          )
        })
      ) : (
        <p className="track-empty">Snippets coming soon.</p>
      )}
      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          setProgress(0)
        }}
        onTimeUpdate={onTimeUpdate}
      />
      <style>{`
        .track {
          width: 230px;
          padding: 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.9rem;
          transition: border-color 0.2s ease;
        }
        .track--active { border-color: var(--accent); }
        .track__play {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--line);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(157, 184, 255, 0.08);
          transition: all 0.2s ease;
        }
        .track__play:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .track__title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          text-transform: capitalize;
        }
        .track__bar {
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: var(--line);
          overflow: hidden;
        }
        .track__bar-fill {
          height: 100%;
          background: var(--accent);
          transition: width 0.25s linear;
        }
        .track-empty {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-style: italic;
          padding: 1rem 0;
        }
      `}</style>
    </Reel>
  )
}
