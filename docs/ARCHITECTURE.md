# Architecture decision: pre-rendered editorial pages

## Decision

Replace the client-only React/Vite shell with a native Node static renderer and progressive browser JavaScript. No new frontend framework is introduced. This is an intentional departure from the audit's initial preference to retain React/Vite and must be reviewed explicitly before merging.

## Concrete benefits

All routes, biography, links, documents, project content, gallery links, and native audio controls exist in the initial HTML and remain useful without JavaScript. No hydration or client router is needed. There are zero npm runtime dependencies; the Node build uses the standard library. A small optional module handles only behavior that needs JavaScript. Python/Pillow and pillow-heif process media at build time, never in the visitor's browser.

## Tradeoffs

Templates are escaped JavaScript strings rather than JSX. Development uses rebuild-and-refresh rather than Vite hot reload. The media pipeline requires Python in addition to Node. This fits a content-centric personal website, not necessarily a future interactive application. A future interactive feature can be an isolated island without making the entire biography depend on it.

## Boundaries

No external fetch is required to render the site. The repository shelf is a dated public snapshot. Build failures do not become fake empty states. Raw photos remain untouched in the repository; generated display images omit EXIF/GPS. Existing public PDFs and audio remain byte-for-byte unchanged.

The replaced application code is retained in Git history at `afffe4be43b0f4067c907c53c7e2335d7bd2c670`. The existing `src/content` tree is preserved. No original photo, music, or PDF blob is modified by the redesign.
