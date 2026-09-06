# Verification — editorial simplification

Verified locally on September 6, 2026 against the real checkout and its original assets, using Node 24.18.1, Python 3.14, Playwright 1.55.0 / Chromium, and axe-core 4.10.3. This record replaces the fixture-only authoring limitations of the earlier redesign; it does not claim those earlier checks were real-asset verification.

## Passed

- JavaScript syntax and content guards (`npm run lint`).
- Full production build: 14 static HTML pages, 31 photo/format variants, seven songs, 18 PDFs.
- All 13 content tests, with no skips. These cover every original media blob against merged commit `7122cf0`, factual content, rendered project/research detail, original document/audio output, internal links/fragments, metadata, legacy links, and absence of browser runtime dependencies.
- All 14 browser tests, with no skips. Coverage includes 13 routes at six widths (320, 360, 390, 768, 1024, 1440px), keyboard/mobile navigation, skip link, homepage and gallery dialog focus restoration, user-initiated audio and visible errors, clipboard success/denial, real 404, no-JavaScript pages/media, reduced motion, audio range requests, section links, expanded responsibilities, 200% text enlargement at 768px, and a 568×320 mobile menu.
- All 31 gallery image renditions decoded successfully in Chromium.
- axe scanned 13 routes with WCAG 2 A/AA, 2.1 AA and 2.2 AA tags: zero reported violations. One `color-contrast` result on Life remains incomplete for manual judgment; an incomplete result is not a pass.
- `git diff --check`.

A text-enlargement issue in Archive and Care Access was found and fixed with intrinsic-size and word-wrapping rules. The clipboard test used an evaluation path blocked by the existing CSP; it now uses Playwright locator assertions, with no relaxation of production headers.

## Visual review

Actual screenshots were generated from the production output. The homepage was inspected at desktop and mobile sizes, along with representative Work, Research, Life, About, and Archive views. Before/after first-viewport captures are in `docs/review/`. The full browser run also generates homepage screenshots at all six widths and interior first-view screenshots at 390px and 1440px under `qa-output/`.

At 1440×1000, the homepage main region changed from 326 to 224 visible words (about 31% fewer) and from about 4452 to 3433 CSS pixels in height (about 23% shorter). Both measurements use Chromium `main.innerText` and the main element's bounding rectangle with the same viewport; these are content/layout comparisons, not performance scores. Full factual details remain on the inner pages.

## Reproduce

Use the README's setup/build/test steps. Install the pinned axe engine separately and set `AXE_SOURCE` so the scan does not skip. To reuse an already running preview, set `PORTFOLIO_TEST_ORIGIN=http://127.0.0.1:4173`; otherwise the browser suite starts and stops its own server. GitHub Actions independently runs the same real-asset build, tests, and screenshot/report upload on the PR.

## Limits and review notes

This is Chromium testing, not real-device Safari/iOS or screen-reader testing, complete WCAG certification, or measured real-user performance. The inherited generic photo descriptions still need the owner's captions; no locations, identities, or stories were invented. Existing biographical details, research status, historical repository availability, and the unlinked Databricks certification were preserved rather than independently reverified.

Review the PR preview before authorizing a merge. A successful PR build does not itself authorize a production release.
