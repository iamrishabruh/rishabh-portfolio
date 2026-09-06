# Content preservation inventory

Baseline: `afffe4be43b0f4067c907c53c7e2335d7bd2c670`. No original media or public document blob is removed or overwritten.

| Original source | New destination | Preservation |
|---|---|---|
| Hero / About | `/`, `/about/` | Name, location, family line, interests, email, GitHub, LinkedIn, résumé; static introduction replaces role rotation |
| Experience | `/work/#experience`, role pages | Four roles, dates, summaries, 14 detailed bullets, earlier service/tutoring work |
| Research | `/research/` | Affiliation, advisor, research direction; exploratory status explicit |
| Projects | `/work/#projects`, five detail pages | All five titles, descriptions, original source references; unavailable Nexus Lite disclosed |
| GitHub feed | `/work/#repositories` | Labeled public snapshot and current GitHub index; no private repositories included |
| Photos | `/life/#photos`, homepage selection | All 31 files/variants; originals unchanged in Git, optimized derivatives for display |
| Music | `/life/#music`, homepage selection | All seven files unchanged; native player and error feedback |
| Education | `/about/#education` | All three original entries and notes |
| Recognition | `/about/#honors` | Six honors and four leadership entries |
| Skills | `/about/#skills` | All 16 skills |
| Documents | `/archive/#documents` | 19 labels, including unlinked Databricks certification; all 18 PDFs |
| Footer | Global footer | Email, location, GitHub, LinkedIn, Reachmind, résumé, contact invitation |

## File-level source of truth

`site/baseline.json` explicitly enumerates every original photo, song, and PDF filename. The media builder fails if an enumerated original is missing. The content tests reconcile the enumerated set with generated images, compare source hashes, compare audio/PDF source and output bytes, and verify all internal links.

Photo source folder: `src/content/photos/`, including `.JPG`, `.PNG`, `.HEIC`, and `.jpg` variants. Same-stem HEIC/JPEG files are not assumed identical or silently deduplicated. Display derivatives omit metadata; raw originals are not newly exposed as downloads.

Music: `AP.mp3`, `ATL.mp3`, `Curvin.mp3`, `DA.mp3`, `FYM.mp3`, `Just Fall.mp3`, `Unlock It.mp3`.

Public documents retain their exact `/documents/` paths: `APCapstoneDiploma.pdf`, `Fall2024PresidentsList.pdf`, `Spring2024DeansList.pdf`, `Spring2025PresidentsList.pdf`, `Summer2024DeansList.pdf`, `algorithms-recommendation.pdf`, `biosafety-certificate.pdf`, `database-design-certificate.pdf`, `excel-certificate.pdf`, `health-privacy-certificate.pdf`, `hipaa-certificate.pdf`, `os-recommendation.pdf`, `powerpoint-certificate.pdf`, `principal-recommendation.pdf`, `research-skills-certification.pdf`, `resume.pdf`, `spring-boot-certificate.pdf`, `word-certificate.pdf`.

## Existing bookmarks

Root `#top`, `#about`, `#research`, `#life`, and `#contact` still exist. Other original hashes have static fallback links and optional redirects: `#experience`, `#projects`, `#music`, `#education`, `#honors`, `#skills`, and `#documents`.

## Review status

Original factual text is mapped from source, not independently credential-verified. Photo descriptions remain generic until visually reviewed. See `QA.md` for the distinction between fixture-based authoring checks and verification against actual repository assets.

## Simplification review baseline

The current redesign is based on merged commit `7122cf0`. All destinations above are retained. `tests/fixtures/merged-content.json` freezes its substantive data and original asset Git blob IDs. Project preview sentences are additive; the original descriptions, focus, status, and repository references remain on their detail pages. No original photo, song, document, or portrait bytes were changed.
