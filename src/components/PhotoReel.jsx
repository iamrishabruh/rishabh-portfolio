import Reel from './Reel'

// Drop images into src/content/photos/ and they show up here automatically.
// Prefix filenames with numbers (01-, 02-, …) to control the order.
const photoModules = import.meta.glob('../content/photos/*.{jpg,jpeg,png,webp,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const PHOTOS = Object.entries(photoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({
    url,
    name: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' '),
  }))

export default function PhotoReel() {
  return (
    <Reel title="Life" id="life">
      {PHOTOS.length > 0 ? (
        PHOTOS.map((photo) => (
          <figure key={photo.url} className="photo">
            <img src={photo.url} alt={photo.name} loading="lazy" />
          </figure>
        ))
      ) : (
        <p className="photo-empty">Photos coming soon.</p>
      )}
      <style>{`
        .photo {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--bg-card);
        }
        .photo img {
          height: 320px;
          width: auto;
          max-width: none;
          display: block;
        }
        .photo-empty {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-style: italic;
          padding: 1rem 0;
        }
        @media (max-width: 768px) {
          .photo img { height: 240px; }
        }
      `}</style>
    </Reel>
  )
}
