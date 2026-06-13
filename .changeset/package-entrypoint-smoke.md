---
"@maxa/cli": patch
"@maxa/mcp": patch
"@maxa/tokens": patch
"@maxa/ui": patch
---

Harden published package entrypoints.

Relative ESM imports in built package files now resolve with explicit `.js` entrypoints, CLI/MCP bin builds preserve executable mode, and the root verification flow includes a package smoke test that checks built and packed entrypoints, bin targets, and packed manifests for leaked `workspace:` dependencies.
