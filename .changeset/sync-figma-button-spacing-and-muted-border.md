---
"@maxa/tokens": patch
"@maxa/ui": patch
---

Sync Button v3 layout and colored action states with the reviewed Figma libraries.

Buttons now use symmetric outer padding plus an optical label wrapper, direct global spacing
for internal gaps, and the regular size height for icon-only dimensions. Link buttons hug their
visible label and icons with no outer or label padding. Loading stays fully opaque while blocking
interaction.

Primary, success, and destructive actions share white on-color label/icon roles in both themes.
Their hover and active backgrounds use compact, opposite-direction light/dark ramps with verified
WCAG AA contrast. Redundant per-variant content, focus, gap, icon-padding, and icon-only tokens are
removed from the active contract; published Figma identities remain hidden under `Button/legacy/*`.
