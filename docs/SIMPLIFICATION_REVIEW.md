# Portfolio simplification review

## Audited baseline

This change starts at the actual merged `main`, `7122cf01c659a97819cc7ba30615cb5219b25145` (PR #2), rather than the earlier React portfolio. The baseline was cloned and built with its real assets. Its rendered homepage was captured at 1440px and 390px. The public homepage URL was also requested; the web reader returned no readable body, so that response alone was not used to certify the live deployment.

The merged site already had 14 static HTML pages, dedicated Work/Research/Life/About/Archive destinations, responsive images, native media controls, and preservation checks. This PR retains that architecture and delivery configuration.

## Findings and changes

1. **Indirect page titles made browsing harder.** Headlines such as “Ideas, put to work,” “Better questions. More context,” and “The supporting material” are replaced by direct destination names. Short introductions explain what is there.
2. **Work panels repeated the same idea several times.** Kept and Care Access appeared as large colored typographic artwork, caption headlines, role labels, and later explanations. They now use one linked row each: organization, role, plain description, arrow.
3. **Abstract language competed with actual substance.** Repeated positioning paragraphs and interface explanations are trimmed. Project introductions explain their purpose; their original technical descriptions, focus, source references, and status remain on the detail pages.
4. **The visual system used too many surface treatments.** A shared paper/ink/accent palette replaces green and blue feature panels. Consistent rules, a restrained type scale, and a staggered photo selection give the homepage its character.
5. **Deep content needed more obvious entry points.** Archive is now a first-class navigation destination. Local section links lead to projects, experience, repositories, music, photos, education, honors, and skills.
6. **Some interactions were inconsistent or redundant.** Homepage photos now use the gallery dialog. The compact music player no longer repeats its native play control as a one-item track list. The mobile menu closes when a link is chosen and scrolls in short viewports.
7. **Original preservation checks could miss an edited source asset.** A new immutable fixture records the merged factual content and Git blob IDs. Tests compare the originals to that baseline as well as checking generated output.

## Preservation

All existing routes and fragments remain. Four roles, five projects and their seven overview pages, research affiliation/advisor/question/status, three education entries, six honors, four leadership entries, 16 skills, earlier jobs, public repository references, contact destinations, and all document labels remain represented.

The portrait, all 31 photo/format variants, seven songs, and 18 PDFs remain unchanged. The gallery displays all variants, including images that had shared filename stems; this change does not deduplicate them. The résumé and document URLs remain stable. The existing media conversion, social image, metadata, security headers, and Netlify configuration remain in place.

The content baseline is `tests/fixtures/merged-content.json`. Presentation copy may change; baseline facts and original assets may not silently disappear. New facts or assets should be added deliberately with a corresponding inventory review, not by refreshing the fixture to bypass a failure.

## Review scope

See `QA.md` for executed verification and limits. This is a review branch and pull request. It does not authorize a merge or production release.
