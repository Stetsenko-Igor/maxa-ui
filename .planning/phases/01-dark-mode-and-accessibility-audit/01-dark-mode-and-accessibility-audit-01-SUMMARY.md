---
phase: 01-dark-mode-and-accessibility-audit
plan: 01
subsystem: testing
tags: [accessibility, contrast, tokens, wcag, audit]

requires: []
provides:
  - Repeatable contrast audit script for MAXA token/component pairs
  - Baseline measured contrast report for all eight shipped components
affects: [phase-01-dark-mode-and-accessibility-audit, phase-02-component-surface-extension]

tech-stack:
  added: []
  patterns:
    - Node 20 ESM script with no external dependencies
    - Token graph resolution from CSS imports plus Figma primitive fallback palette

key-files:
  created:
    - scripts/audit-contrast.mjs
    - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
  modified: []

key-decisions:
  - "Default decorative borders are recorded as informational, while text, focus, checked, error, and icon pairs are measured as blocking WCAG evidence."
  - "Fallback palette values for blue/green/red/yellow/orange come from packages/tokens/figma/primitives.json because semantic.css references them but runtime CSS does not define them directly."

patterns-established:
  - "Contrast audit reports include theme, component, pair, foreground token, background token, ratio, threshold, and result."

requirements-completed: [QUAL-01, QUAL-02]

duration: 20min
completed: 2026-05-18
---

# Phase 1: Dark Mode + Accessibility Audit Plan 01 Summary

**Repeatable WCAG contrast audit harness with baseline evidence for all eight shipped components**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-18T11:30:00+0200
- **Completed:** 2026-05-18T11:50:00+0200
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added `scripts/audit-contrast.mjs` with CSS import parsing, token alias resolution, WCAG contrast calculation, Markdown/JSON output, and non-zero exit on measured failures.
- Covered Button, IconButton, Input, Select, DatePicker, Checkbox, Radio, and FormField.
- Wrote baseline report to `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md`.

## Task Commits

No atomic commits were created during execution because `.planning/` entered this run as an uncommitted bootstrap. Changes are ready to commit together after Phase 1 review.

## Files Created/Modified

- `scripts/audit-contrast.mjs` - Deterministic contrast audit script.
- `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md` - Baseline report showing 192 checked pairs, 35 failures, and 20 skipped informational pairs before fixes.

## Decisions Made

- Disabled text and subtle decorative borders are tracked as informational/skipped rather than blocking failures, matching WCAG exemptions and the existing School A surface model.
- The script pulls missing color primitive values from Figma primitives when semantic CSS references color scales that are not emitted in runtime CSS.

## Deviations from Plan

None for Plan 01.

## Issues Encountered

- `semantic.css` references blue/green/red/orange/yellow primitive tokens that are not defined in runtime CSS. The audit script resolves these from `packages/tokens/figma/primitives.json` so measured evidence still maps to the token source of truth.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 02 can consume the baseline report and fix the measured failures through token-level changes.

---
*Phase: 01-dark-mode-and-accessibility-audit*
*Completed: 2026-05-18*
