---
phase: 01-dark-mode-and-accessibility-audit
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - scripts/audit-contrast.mjs
  - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
autonomous: true
requirements:
  - QUAL-01
  - QUAL-02
must_haves:
  truths:
    - "Executor can run one command that measures contrast for shipped component text, icon, border, and indicator pairs in light and dark themes."
    - "The audit covers Button, IconButton, Input, Select, DatePicker, Checkbox, Radio, and FormField."
    - "Every measured pair records foreground token, background token, theme, ratio, threshold, and pass/fail status."
  artifacts:
    - path: "scripts/audit-contrast.mjs"
      provides: "Deterministic WCAG contrast extraction and measurement command"
      exports: []
    - path: ".planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md"
      provides: "Baseline audit report with measured values before token fixes"
  key_links:
    - from: "scripts/audit-contrast.mjs"
      to: "packages/tokens/src/theme.css"
      via: "CSS import graph parsing"
      pattern: "theme\\.css"
    - from: "scripts/audit-contrast.mjs"
      to: "packages/ui/src/components"
      via: "explicit component contrast matrix for all shipped components"
      pattern: "Button|IconButton|Input|Select|DatePicker|Checkbox|Radio|FormField"
---

<objective>
Create the repeatable contrast audit harness for Phase 1.

Purpose: Phase 1 needs measured WCAG AA evidence, not visual inspection. The executor should add a committed script that resolves the existing token graph, evaluates both `:root` and `[data-theme="dark"]`, and writes a baseline report with actual ratios.

Output: `scripts/audit-contrast.mjs` and `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md`.
</objective>

<execution_context>
@/Users/igorstetsenko/.codex/get-shit-done/workflows/execute-plan.md
@/Users/igorstetsenko/.codex/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/STATE.md
@specs/README.md
@specs/foundations/color.md
@specs/tokens-reference.md
@packages/tokens/src/theme.css
@packages/tokens/src/primitives.css
@packages/tokens/src/themes/maxa.css
@packages/tokens/src/semantic.css
@packages/tokens/src/component-button.css
@packages/tokens/src/component-checkbox.css
@packages/tokens/src/component-input.css
@packages/tokens/src/component-radio.css
@packages/ui/src/components/button/button.css
@packages/ui/src/components/input/input.css
@packages/ui/src/components/select/select.css
@packages/ui/src/components/date-picker/date-picker.css
@packages/ui/src/components/checkbox/checkbox.css
@packages/ui/src/components/radio/radio.css
@packages/ui/src/components/form-field/form-field.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add token-resolving contrast audit script</name>
  <files>scripts/audit-contrast.mjs</files>
  <read_first>
    - package.json
    - specs/foundations/color.md
    - specs/tokens-reference.md
    - packages/tokens/src/theme.css
    - packages/tokens/src/primitives.css
    - packages/tokens/src/themes/maxa.css
    - packages/tokens/src/semantic.css
    - packages/tokens/src/component-button.css
    - packages/tokens/src/component-checkbox.css
    - packages/tokens/src/component-input.css
    - packages/tokens/src/component-radio.css
    - packages/ui/src/components/button/button.css
    - packages/ui/src/components/input/input.css
    - packages/ui/src/components/select/select.css
    - packages/ui/src/components/date-picker/date-picker.css
    - packages/ui/src/components/checkbox/checkbox.css
    - packages/ui/src/components/radio/radio.css
    - packages/ui/src/components/form-field/form-field.css
  </read_first>
  <action>
    Create `scripts/audit-contrast.mjs` as a Node 20 ESM script with no external dependencies.

    The script must:
    - Parse CSS custom properties from `packages/tokens/src/theme.css` by following its `@import` statements in order.
    - Resolve `@theme`, `:root`, and `[data-theme="dark"]` variables, including nested `var(--token)` aliases.
    - Support color values used in this repo: `#RGB`, `#RRGGBB`, `transparent`, `rgba(r, g, b, a)`, and `var(--token)`.
    - Treat `transparent` foregrounds/backgrounds as "not measurable" and skip only when the audited state is intentionally transparent, such as `--button-link-bg`.
    - Compute WCAG relative luminance and contrast ratio.
    - Include an explicit contrast matrix for all 8 shipped components:
      `Button`, `IconButton`, `Input`, `Select`, `DatePicker`, `Checkbox`, `Radio`, `FormField`.
    - Include text thresholds of `4.5` for normal text and non-text thresholds of `3.0` for icons, borders, focus indicators, checkbox marks, and radio dots.
    - Include Button/IconButton variants and states: primary, secondary, outline, ghost, link, success, danger; default, hover, active; plus disabled opacity as informational, not pass/fail unless a concrete computed alpha model is implemented.
    - Include form-control field states shared by Input/Select/DatePicker/FormField: default, placeholder, label, hint, error, success, disabled, readonly, icon, border, focus ring.
    - Include Checkbox and Radio states: default, hover border, checked mark/dot, error, disabled, label, helper.
    - Accept `--format markdown` and `--format json`.
    - Accept `--out <path>` and write the report there.
    - Exit with status `1` when any measured pair fails, after still writing the report.
    - Print a one-line summary like `Contrast audit: 126 checked, 0 failed, 8 skipped`.

    Use concrete pair names in the report, for example `Button primary text on bg`, `Input placeholder on field`, and `Checkbox checked mark on checked bg`. Do not modify component CSS in this task.
  </action>
  <verify>
    <automated>node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-audit.json || true</automated>
    <automated>node -e "const r=require('/tmp/maxa-contrast-audit.json'); const names=new Set(r.results.map(x=>x.component)); for (const n of ['Button','IconButton','Input','Select','DatePicker','Checkbox','Radio','FormField']) if (!names.has(n)) throw new Error('missing '+n); if (!r.results.every(x => typeof x.ratio === 'number' || x.skipped)) throw new Error('missing ratios'); console.log(r.summary)"</automated>
  </verify>
  <acceptance_criteria>
    - `grep -q "function contrastRatio" scripts/audit-contrast.mjs`
    - `grep -q "packages/tokens/src/theme.css" scripts/audit-contrast.mjs`
    - `grep -q "Button" scripts/audit-contrast.mjs && grep -q "FormField" scripts/audit-contrast.mjs`
    - `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-audit.json || true` writes valid JSON with `summary.checked`, `summary.failed`, and `results`.
  </acceptance_criteria>
  <done>The repo has a deterministic contrast audit command that measures all shipped components in light and dark token modes and reports failures with token names and ratios.</done>
</task>

<task type="auto">
  <name>Task 2: Commit the baseline measured audit report</name>
  <files>.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md</files>
  <read_first>
    - scripts/audit-contrast.mjs
    - .planning/ROADMAP.md
    - .planning/REQUIREMENTS.md
  </read_first>
  <action>
    Run:
    `node scripts/audit-contrast.mjs --format markdown --out .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md || true`

    The report must be human-readable Markdown and include:
    - Title: `# Phase 1 Contrast Audit Baseline`
    - Date line using the current execution date.
    - Summary table with checked, passed, failed, skipped counts.
    - Separate sections for `Light theme` and `Dark theme`.
    - A table for each theme with columns: Component, Pair, Foreground token, Background token, Ratio, Threshold, Result.
    - A `Failures` section listing exact failing pairs. If there are no failures, write `No failures measured.`
    - A `Skipped` section for intentionally transparent or non-measurable pairs, with a reason for each skip.

    Keep the report under `.planning/phases/01-dark-mode-and-accessibility-audit/`. Do not update tokens in this plan.
  </action>
  <verify>
    <automated>test -s .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md</automated>
    <automated>grep -q "# Phase 1 Contrast Audit Baseline" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md</automated>
    <automated>grep -q "Light theme" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md && grep -q "Dark theme" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md</automated>
  </verify>
  <acceptance_criteria>
    - `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md` exists and is non-empty.
    - `grep -q "Ratio" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md`
    - `grep -q "Threshold" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md`
    - `grep -q "Failures" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md`
  </acceptance_criteria>
  <done>Baseline measured contrast evidence is committed for both light and dark themes, even if failures remain for the next plan.</done>
</task>

</tasks>

<verification>
Run:

```bash
node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-audit.json || true
node -e "const r=require('/tmp/maxa-contrast-audit.json'); if (!r.results.length) throw new Error('no results'); console.log(r.summary)"
test -s .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
```
</verification>

<success_criteria>
- Automated contrast extraction exists and runs from the repo root.
- All 8 shipped components are present in the audit result set.
- The baseline report records measured ratios for light and dark themes.
- Failures, if any, are explicit enough for Plan 02 to fix without re-discovery.
</success_criteria>

<output>
After completion, create `.planning/phases/01-dark-mode-and-accessibility-audit/01-dark-mode-and-accessibility-audit-01-SUMMARY.md`.
</output>
