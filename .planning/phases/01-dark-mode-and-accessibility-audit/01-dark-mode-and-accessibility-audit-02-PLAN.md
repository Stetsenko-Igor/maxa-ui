---
phase: 01-dark-mode-and-accessibility-audit
plan: 02
type: execute
wave: 2
depends_on:
  - 01-dark-mode-and-accessibility-audit-01
files_modified:
  - packages/tokens/src/themes/maxa.css
  - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md
autonomous: true
requirements:
  - QUAL-01
  - QUAL-02
must_haves:
  truths:
    - "Every measured light-theme component pair passes WCAG AA: text >= 4.5:1 and non-text >= 3:1."
    - "Every measured dark-theme component pair passes WCAG AA: text >= 4.5:1 and non-text >= 3:1."
    - "Any failing brand-dependent pairs are corrected through dark/light MAXA theme token overrides only, not component-local dark selectors."
    - "The final audit report contains measured ratios and shows zero failing pairs."
  artifacts:
    - path: "packages/tokens/src/themes/maxa.css"
      provides: "MAXA brand primitive overrides used to correct brand-dependent contrast failures"
    - path: ".planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md"
      provides: "Final passing audit evidence with measured values"
  key_links:
    - from: "packages/tokens/src/themes/maxa.css"
      to: "scripts/audit-contrast.mjs"
      via: "resolved brand primitive values"
      pattern: "--color-brand-"
    - from: ".planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md"
      to: "QUAL-01, QUAL-02"
      via: "zero failures in light and dark reports"
      pattern: "0 failed|No failures measured"
---

<objective>
Close contrast failures and commit the final measured audit report.

Purpose: Phase 1 is complete only when the contrast audit passes in both light and dark mode and the evidence lives under the phase directory.

Output: Token corrections in `packages/tokens/src/themes/maxa.css` if needed, plus `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`.
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
@.planning/phases/01-dark-mode-and-accessibility-audit/01-dark-mode-and-accessibility-audit-01-SUMMARY.md
@.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
@scripts/audit-contrast.mjs
@specs/README.md
@specs/foundations/color.md
@specs/tokens-reference.md
@packages/tokens/src/themes/maxa.css
@packages/tokens/src/semantic.css
@packages/tokens/src/theme.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix failing theme contrast pairs through MAXA token overrides</name>
  <files>packages/tokens/src/themes/maxa.css</files>
  <read_first>
    - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
    - scripts/audit-contrast.mjs
    - specs/foundations/color.md
    - specs/tokens-reference.md
    - packages/tokens/src/themes/maxa.css
    - packages/tokens/src/semantic.css
  </read_first>
  <action>
    Run:
    `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-before-fix.json || true`

    Inspect `/tmp/maxa-contrast-before-fix.json` and the baseline report. For each failing pair:
    - If the failure uses a `--color-brand-*` primitive directly or indirectly, adjust only the relevant light or dark brand primitive value in `packages/tokens/src/themes/maxa.css`.
    - Preserve the existing 50..950 brand scale ordering and keep comments in English.
    - Do not add dark selectors to component CSS.
    - Do not hardcode values in `packages/ui/src/components/**`.
    - Do not edit `packages/tokens/src/semantic.css` unless the audit proves a failure is impossible to fix via `themes/maxa.css`; if that happens, stop and write the blocker in the plan summary instead of silently changing semantic token architecture.

    After each token adjustment, rerun:
    `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-after-fix.json`

    The final command must exit `0`. If the baseline already has zero failures, leave `packages/tokens/src/themes/maxa.css` unchanged and proceed to the final report.
  </action>
  <verify>
    <automated>node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-after-fix.json</automated>
    <automated>node -e "const r=require('/tmp/maxa-contrast-after-fix.json'); if (r.summary.failed !== 0) throw new Error('contrast failures remain: '+r.summary.failed); console.log(r.summary)"</automated>
    <automated>node scripts/audit-tokens.mjs</automated>
  </verify>
  <acceptance_criteria>
    - `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-after-fix.json` exits 0.
    - `node -e "const r=require('/tmp/maxa-contrast-after-fix.json'); if (r.summary.failed !== 0) process.exit(1)"` exits 0.
    - `node scripts/audit-tokens.mjs` exits 0.
    - `grep -q "\\[data-theme=\\"dark\\"\\]" packages/tokens/src/themes/maxa.css`
  </acceptance_criteria>
  <done>All measurable component contrast pairs pass in both themes, with any brand-dependent corrections isolated to `packages/tokens/src/themes/maxa.css`.</done>
</task>

<task type="auto">
  <name>Task 2: Write final passing audit report</name>
  <files>.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md</files>
  <read_first>
    - scripts/audit-contrast.mjs
    - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-baseline.md
    - packages/tokens/src/themes/maxa.css
  </read_first>
  <action>
    Run:
    `node scripts/audit-contrast.mjs --format markdown --out .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`

    Ensure the report includes:
    - Title: `# Phase 1 Contrast Audit Final`
    - Summary table with checked, passed, failed, skipped counts.
    - A statement that `QUAL-01` and `QUAL-02` are satisfied only if failed count is `0`.
    - Separate `Light theme` and `Dark theme` sections.
    - Tables with Component, Pair, Foreground token, Background token, Ratio, Threshold, Result.
    - `Failures` section containing exactly `No failures measured.` when the script passes.
    - `Token changes` section summarizing changed `--color-brand-*` values, or `No token changes required.` if no token file changed.
  </action>
  <verify>
    <automated>test -s .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md</automated>
    <automated>grep -q "# Phase 1 Contrast Audit Final" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md</automated>
    <automated>grep -q "No failures measured." .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md</automated>
  </verify>
  <acceptance_criteria>
    - `.planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md` exists and is non-empty.
    - `grep -q "QUAL-01" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`
    - `grep -q "QUAL-02" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`
    - `grep -q "Light theme" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md && grep -q "Dark theme" .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`
    - `grep -q "No failures measured." .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md`
  </acceptance_criteria>
  <done>Final audit evidence is committed under the phase directory with measured values and no failures.</done>
</task>

<task type="auto">
  <name>Task 3: Run release-quality verification</name>
  <files>scripts/audit-contrast.mjs, packages/tokens/src/themes/maxa.css, .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md</files>
  <read_first>
    - package.json
    - scripts/audit-contrast.mjs
    - packages/tokens/src/themes/maxa.css
    - .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md
  </read_first>
  <action>
    Run these commands from the repo root:
    - `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-final.json`
    - `node scripts/audit-tokens.mjs`
    - `pnpm typecheck`
    - `pnpm test`

    Do not run `pnpm format` unless files fail formatting in a way that blocks verification. Record command outcomes in the plan summary.
  </action>
  <verify>
    <automated>node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-final.json</automated>
    <automated>node scripts/audit-tokens.mjs</automated>
    <automated>pnpm typecheck</automated>
    <automated>pnpm test</automated>
  </verify>
  <acceptance_criteria>
    - `node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-final.json` exits 0.
    - `node scripts/audit-tokens.mjs` exits 0.
    - `pnpm typecheck` exits 0.
    - `pnpm test` exits 0.
  </acceptance_criteria>
  <done>The contrast audit, token audit, typecheck, and test suite are all green after any token changes.</done>
</task>

</tasks>

<verification>
Run:

```bash
node scripts/audit-contrast.mjs --format json --out /tmp/maxa-contrast-final.json
node scripts/audit-tokens.mjs
pnpm typecheck
pnpm test
test -s .planning/phases/01-dark-mode-and-accessibility-audit/contrast-audit-final.md
```
</verification>

<success_criteria>
- `QUAL-01` is satisfied: dark theme contrast has zero measured failures.
- `QUAL-02` is satisfied: light theme contrast has zero measured failures.
- Any brand-dependent fixes live in `packages/tokens/src/themes/maxa.css`.
- Final measured report exists under `.planning/phases/01-dark-mode-and-accessibility-audit/`.
- No component CSS contains theme-specific dark-mode selectors.
</success_criteria>

<output>
After completion, create `.planning/phases/01-dark-mode-and-accessibility-audit/01-dark-mode-and-accessibility-audit-02-SUMMARY.md`.
</output>
