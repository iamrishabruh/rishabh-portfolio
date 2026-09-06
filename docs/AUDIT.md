# Implementation audit

Baseline: `iamrishabruh/rishabh-portfolio` at `afffe4be43b0f4067c907c53c7e2335d7bd2c670`.

| Priority | Source-confirmed baseline | Implementation |
|---|---|---|
| High | Hero rotates professional titles | Stable introduction, large name, clear work/contact actions |
| High | Entire composition constrained to 720px | 1280px composition with separate narrow reading measures |
| High | Many equally weighted homepage sections | Curated homepage plus work, research, life, about, archive |
| High | Research has one paragraph and no primary navigation entry | Dedicated page and navigation, explicit exploratory status |
| High | Kept summarized only as “Leading engineering.” | Product/role overview without invented metrics or detailed proof |
| High | Browser service accepts VITE_GITHUB_TOKEN | Token/API path removed; public dated snapshot replaces feed |
| High | Lowercase-only image glob omits uppercase and HEIC files | Case-insensitive inventory and build-time HEIF decoding; explicit failures |
| Medium | Large original images and filename labels | Responsive WebP, intrinsic dimensions, description review queue |
| Medium | Hidden horizontal mobile navigation | Native disclosure, keyboard/Escape behavior |
| Medium | Audio errors swallowed | Native seeking/volume, one audio element, visible error/retry |
| Medium | Empty React root and incomplete sharing metadata | Static HTML, canonical/OG/Twitter/Person metadata, social PNG |
| Medium | Node 18 and no repeatable QA scripts | Node 22, syntax/content guards, preservation tests, browser CI |

## Not established

No deployed GitHub secret was verified. The previous code pathway is not proof that a token was configured. The owner should rotate any token previously included in a public frontend build. No credentials were inspected or printed.

The user identified this repository as the website's source. Netlify project settings, branch association, and parity between a live deploy and a particular SHA were not independently verified.

No field performance score, Lighthouse result, WCAG conformance, employer endorsement, or research validation is claimed.

## Content review

Existing titles, dates, GPA, research affiliation/advisor, honors, and leadership are preserved from source, not independently revalidated. Confirm their current accuracy. Nexus Lite's repository was unavailable in the earlier audit; its project and original reference remain. Other legacy source URLs are preserved rather than rewritten on an inferred identity match.

Kept and project pages are honest overviews, not fabricated evidence-heavy case studies. Add approved artifacts and measured results when available. Replace generic photo descriptions after visual inspection; `dist/build-report.json` identifies them. Existing public PDFs should be reviewed for personal information before any decision to expand their distribution.
