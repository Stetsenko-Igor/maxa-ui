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

Removed `bg-neutral-on-subtle` from the ladder — it was a value-duplicate of
`bg-neutral-muted` (neutral-200/700) with zero consumers; anything that would have used it
should use `bg-neutral-muted`. The `BackgroundColorToken` union gains `neutral-surface` and
`neutral-on-muted` and drops `neutral-on-subtle`. Final ladder: surface(50) → subtle(100) →
muted(200) → on-muted(300) → strong(800). The live-Figma `bg-neutral-on-subtle` variable
(created by today's import) joins `bg-gray-muted` as a documented orphan for the stale pass.
