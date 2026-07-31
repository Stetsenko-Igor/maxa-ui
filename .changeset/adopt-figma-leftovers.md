---
"@maxa/tokens": patch
---

Adopt the remaining live-Figma variables into the repo: `feedback/{neutral,emphasize}/action`
and `action-hover` roles (all six intents now carry the full action set; blue-500/600 light,
blue-400/300 dark, matching the four status intents) with the corresponding
`Alert/color/{neutral,emphasize}/action(-hover)` component aliases, and `Table/fg`
(`fg-secondary`) for table icons and secondary foreground. Bundle: 1,656 variables. The
repo's per-group descriptions and scope inference intentionally supersede the live file's
copy-pasted "info" descriptions and extra STROKE_COLOR scopes — the next import normalizes
them. The `background/bg-gray-muted` orphan in the live file remains a documented leftover
for a later stale-variable pass.
