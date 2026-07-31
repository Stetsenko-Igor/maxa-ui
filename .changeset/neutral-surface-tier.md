---
"@maxa/tokens": patch
---

Add `bg-neutral-surface` back as a real neutral tier: neutral-50 in light, neutral-900 in
dark. Unlike the removed dead duplicate (which mirrored `bg-neutral-subtle`), this matches
the intent-family precedent where every `-surface` role sits at the 50 step. The importer
migration that renamed the old variable is removed — it never ran against any live file, so
the existing Figma variable keeps its ID and simply receives the new value on the next
import, while `bg-neutral-on-subtle`/`bg-neutral-on-muted` are created as new variables.
Final ladder: surface(50) → subtle(100) → on-subtle(200) → muted(200) → on-muted(300) →
strong(800).
