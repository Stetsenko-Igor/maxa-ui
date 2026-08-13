---
"@maxa/tokens": patch
"@maxa/ui": patch
---

Sync Button v3 layout and colored action states with the reviewed Figma libraries.

Buttons now use symmetric outer padding plus an optical label wrapper, size-specific component
roles for internal gaps and Text padding, and the regular size height for icon-only dimensions. Link buttons hug their
visible label and icons with no outer or label padding. Loading stays fully opaque while blocking
interaction.

Primary, positive, and destructive actions share white on-color label/icon roles in both themes.
Their hover and active backgrounds use the published standard palette steps, darker in Light and
lighter in Dark. Redundant shared content, focus, icon-edge padding, and icon-only token families are
removed from the active contract; size-specific `gap` and `text-padding-x` remain as the editable Button layout contract.
