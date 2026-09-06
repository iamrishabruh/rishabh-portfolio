# QA record and release gate

## Checks executed while authoring

Repository source and immutable baseline were read through the connected GitHub tool. The new zero-dependency npm configuration installed successfully. JavaScript syntax and explicit content guards passed.

An initial static build and 11 Node tests passed in an isolated fixture workspace. Audio HTTP range handling also passed there. Subsequent code refinements require a fresh run against the committed tree; do not treat earlier fixture results as certification of this exact commit.

### Fixture limitation

Container networking could not clone/download the original binary assets. Local fixtures were explicitly synthetic image/audio/document bytes in a separate directory that is **not committed**. Those results establish code paths, link validation, and source-to-output handling, not actual HEIC decoding, portrait crops, genuine MP3 playback, or PDF validity. Fixture assets must never be deployed or presented as finished screenshots.

### Browser limitation

Local Chromium navigation to the preview returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Eight local browser checks were blocked, not passed. The axe-core scan was skipped because its engine was unavailable. No before/after screenshot, real-device test, Lighthouse score, or field performance number is claimed in this record.

## CI included

The GitHub Actions workflow builds the actual checkout with HEIF support and runs 11 content/preservation tests. Playwright then checks 13 normal routes at 320, 360, 390, 768, 1024, and 1440 pixels. It covers menu/keyboard/skip-link behavior, dialog focus restoration, audio error states, clipboard success/denial, old hashes, HTTP 404s, no-JavaScript content, reduced motion, and audio range requests. Its pinned axe engine scans relevant WCAG tags and records incomplete/manual-review results as well as violations. Actual screenshots and reports are uploaded when generated.

This file documents the authoring baseline. The PR's current check results are authoritative for execution against the committed tree. No CI success is asserted before observing it.

## Release gates

- Real-asset build and browser/axe checks must pass; inspect actual artifacts.
- Review real portrait/photo crops and replace generic image descriptions in `site/media-metadata.json`.
- Confirm preserved biography, titles, GPA, research relationship, dates, and external destinations.
- Check Safari/iOS audio, screen-reader navigation, zoom, and deployment-preview routing.
- Review a Netlify preview and keep the existing production branch on `main` until approval.

Targets, not measured results: mobile Lighthouse performance 95 or better where achievable; real-user p75 LCP <=2.5 seconds, INP <=200ms, CLS <=0.1. Field INP cannot be established by Lighthouse. No blanket production-readiness or accessibility-conformance claim is made.
