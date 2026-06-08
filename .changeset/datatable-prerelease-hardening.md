---
"@maxa/ui": minor
"@maxa/tokens": minor
"@maxa/icons": patch
"@maxa/hooks": patch
"@maxa/cli": patch
"@maxa/mcp": patch
---

Add DataTable as the client-side data display layer on top of Table. Includes sorting, row selection, pagination, loading skeleton rows, empty states, component tokens, Figma variable files, docs, specs, and tests.

Prepare UI and token packages for future npm distribution by switching package exports to built `dist` entries, preserving CSS side effects, cleaning stale build output before each package build, copying CSS assets into `dist`, and widening React peer compatibility to React 18 and 19.
