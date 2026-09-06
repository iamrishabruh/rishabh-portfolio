# Rishabh Chouhan — personal portfolio

An editorial, static-first portfolio for https://rishabhchouhan.netlify.app/. The homepage introduces the person; dedicated pages preserve the depth of the original site.

## Run

Use Node 22 and Python 3.10 or newer.

```sh
npm ci
python3 -m pip install -r requirements.txt
npm run lint
npm run build
npm test
npm run preview
```

Open http://127.0.0.1:4173. `npm run dev` rebuilds and starts the same preview server; after editing source, rebuild and refresh. It is intentionally not a hot-reloading SPA.

## Edit

- `site/content.mjs`: biography, experience, projects, research, education, honors, leadership, skills, document links, and repository snapshot.
- `site/pages.mjs`: shared layout and page templates.
- `site/styles.css`: design tokens, responsive styles, reduced-motion and print behavior.
- `site/client.js`: mobile menu, copy email, native audio coordination, accessible image dialog, old hash redirects.
- `site/media-metadata.json`: descriptions and captions keyed by original filename. Add precise visual descriptions before release; fallback labels are tracked for review.
- `src/content/portrait.jpg`: existing portrait.
- `src/content/photos/`: all original photos, including uppercase extensions and HEIC variants. The build generates responsive WebP derivatives without EXIF. Originals remain unchanged in Git and are not newly published as raw downloads.
- `src/content/music/`: original tracks. The build preserves their bytes.
- `public/documents/`: original PDFs. Their URLs and bytes stay unchanged.
- `tests/fixtures/merged-content.json`: substantive content and original asset Git hashes from merged commit `7122cf0`. Tests independently protect these facts and assets.
- `site/baseline.json`: the preservation baseline. Do not edit it just to silence a failed preservation check. When adding content, update the inventory and tests deliberately.

There are no browser GitHub API calls, frontend credentials, analytics services, or third-party font requests. The repository shelf is a dated public snapshot with a link to the current GitHub index, not a live or complete feed.

## Pages

`/`, `/work/`, `/research/`, `/life/`, `/about/`, `/archive/`, and seven `/work/[slug]/` overviews. Every page is pre-rendered. A real `404.html` handles unknown routes. Old section hashes have static fallback links and small progressive redirects.

## Browser QA

```sh
python3 -m pip install playwright==1.55.0
python3 -m playwright install chromium
npm run test:browser
```

The browser suite starts its own preview server and captures actual screenshots at 320, 360, 390, 768, 1024, and 1440 pixels. When a preview is already running, set `PORTFOLIO_TEST_ORIGIN=http://127.0.0.1:4173` to reuse it. Set `CHROMIUM_EXECUTABLE` to use an existing Chromium executable. To enable axe-core, install `axe-core@4.10.3` into a separate test-tools directory and set `AXE_SOURCE` to its `axe.min.js`. A missing engine is a reported skip, not a pass.

GitHub Actions builds the real repository assets, runs the tests, and uploads available reports as `portfolio-quality`. A green automated run does not replace visual review, screen-reader testing, or Core Web Vitals field data.

## Deployment

Netlify builds `dist/` using the committed configuration. Keep the production branch on `main`. Do not add an SPA fallback returning 200 for unknown URLs. Preview contexts are marked `noindex`; canonical metadata points to the public site. Merge only after the draft PR's real-asset build, browser checks, and visual/content review are complete.

## Architecture decision

This redesign deliberately replaces the old client-only React/Vite shell with a native Node static renderer and a small progressive-enhancement module. The benefit is meaningful HTML on every route without a client framework or hydration. Tradeoffs include string templates, rebuild-and-refresh development, and Python media tooling. Review `docs/ARCHITECTURE.md` before merging.

See `docs/SIMPLIFICATION_REVIEW.md` for the current merged-site audit and review scope, and `docs/AUDIT.md`, `docs/CONTENT_INVENTORY.md`, `docs/DESIGN_SYSTEM.md`, and `docs/QA.md` for implementation decisions and verification limits.
