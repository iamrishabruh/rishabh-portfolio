# Design system

A quiet editorial layout built from clear type, thin rules, real photography, and one accent. The name pairs a system sans serif with italic Georgia; work appears as readable rows rather than decorative product panels.

## Shared rules

- Paper `#faf9f6`, ink `#252722`, secondary text `#60635a`, divider `#d9dacf`, accent `#a33e25`.
- Maximum width 1240px; fluid gutters 22–88px. Sections use 56–96px spacing; reading width stays within 62 characters.
- Main body 18px, supporting prose 16px, controls 14px, secondary metadata 12px. Text uses relative units and wraps at enlarged sizes.
- Plain page titles: Work, Research, Life, About, Archive. Section numbers are secondary to descriptive headings.
- Open lists and dividers group content. A lightly tinted music player is the only regular inset surface.
- Original portrait and photos provide the imagery. The full gallery preserves intrinsic photo proportions; homepage selections use editorial crops with an obvious full-image viewer.

## Interactions

Work, Research, Life, About, and Archive appear in both desktop and mobile navigation. Work, Life, About, and Archive have local section links. Existing routes and incoming section links remain usable.

The mobile menu is a native disclosure. Escape restores focus to its trigger, choosing a link closes it, and short screens can scroll the menu. Native audio provides playback, seeking, and volume; a single player coordinates the Life track list. The compact homepage player uses its native controls without a duplicate track button.

Home and Life photos use the same native modal dialog, with Escape, a close button, original-image link, and focus restoration. Without JavaScript, photos open as images and the music catalog has file links. Email has a direct link plus copy success/failure feedback.

Motion is limited to short underline and arrow transitions, disabled for reduced motion. The site does not depend on animation to expose content. No fonts, rendering dependencies, or media assets were added.
