# Content — drop your stuff here

Everything in this folder is picked up automatically at build time. Add a file,
commit, push — it appears on the site. No code changes needed.

## Portrait (hero photo)

Save your headshot as `portrait.jpg` (or `.png` / `.webp`) directly in this folder:

```
src/content/portrait.jpg
```

Until then, the hero shows an "RC" monogram.

## Photos (the "Life" reel)

Drop images into `photos/`. Supported: jpg, jpeg, png, webp, gif, svg.

- Order is alphabetical — prefix with numbers to control it: `01-hike.jpg`, `02-concert.jpg`
- The placeholder SVGs in there now are just to show the layout — delete them when
  you add real photos.

## Music (the "Music" reel)

Drop audio files into `music/`. Supported: mp3, m4a, wav, ogg.

- The filename becomes the track title: `03-late-night-demo.mp3` → "late night demo"
- Number prefixes control order and are stripped from the title.
- The placeholder tones in there now are generated sine-wave pads — replace them
  with your own snippets.
