---
"@maxa/tokens": patch
---

Add `$description` to Figma token variables so the "How to use this variable" field is populated in Figma. The build now carries a mode-independent descriptions map per collection into `import-bundle.json`, and the MAXA Token Importer plugin applies it. Semantic color tokens (95) get spec-sourced descriptions; component tokens (1035) get path-derived descriptions. Also adds migration-map entries to the importer so the 2026-07 color rename (fg-positive→fg-success, action-negative→action-destructive, Button variant danger→destructive, etc.) renames existing Figma variables in place, preserving their IDs and bindings.
