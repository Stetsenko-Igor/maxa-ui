# Visual QA Sweep — Phase 3 Component Layer Closeout

**Date:** 2026-06-11
**Scope:** All 40 shipped component doc pages under `/docs/components/*`
**Method:** Automated Playwright (chromium 1208) sweep against the docs dev server (`next dev`, port 3001), viewport 1280×900. Per page: load (networkidle), capture light theme, set `data-theme="dark"` and capture dark, verify the body surface token actually changes between themes, tab to the first focusable element and assert a visible focus ring, capture console/page errors. A focused second pass exercised the open-state of overlay components with real demo triggers (page chrome — Copy/Preview/Code/GitHub — excluded). Representative screenshots were also reviewed by eye.

Screenshots: `/tmp/maxa-qa/*.png` (light/dark per component + overlay open-states).

## Verdict

**PASS — 40/40 components.** No failures, no console/page errors, no dark-mode token gaps, focus rings present on first focusable elements. Component layer is clean enough to close Phase 3.

## Automated results

| Check | Result |
|-------|--------|
| Pages loaded (HTTP ok, no exceptions) | 40 / 40 ✅ |
| Console / page errors | 0 |
| Dark-mode surface token applied (body bg changes light→dark) | 40 / 40 ✅ |
| First-focusable visible focus ring | 40 / 40 ✅ |
| Overlay open-state rendered (both themes) | see below |

## Overlay open-state pass

Triggered real demo triggers and confirmed the open surface renders correctly in **both** light and dark themes:

| Overlay | Opened | Trigger | Note |
|---------|--------|---------|------|
| Dialog | ✅ | "Edit list settings" | `role="dialog"` surface |
| Alert Dialog | ✅ | "Delete List" | `role="alertdialog"` — destructive red action renders correctly (verified by eye) |
| Drawer | ✅ | "Edit package" | right-side panel; dark theming correct (dark surface, light text, primary action) |
| Dropdown Menu | ✅ | "Actions" | 6 menu surfaces (grouped items + separators) |
| Popover | ✅ | "Open popover" | 2 surfaces |
| Select | ✅ | "Newest" | custom listbox |
| MultiSelect | ✅ | chip field | chip remove + listbox |
| Tooltip | ✅ | "Hover me" | hover-triggered |
| Context Menu | ✅* | "Right click area" (div) | trigger is a non-button right-click region; demo renders correctly, open behavior covered by unit tests |

\* Context Menu's trigger is a region rather than a `<button>`, so the automated button-trigger heuristic skipped it; the page and trigger render correctly and interaction is covered by the passing component test suite.

## Token / contrast notes

- Dark mode applies on every page via `[data-theme="dark"]` overrides in `packages/tokens/src/themes/` — no page fell back to light surfaces.
- Overlay surfaces (dialog, drawer, dropdown, popover) pick up dark surface + border tokens correctly when opened under dark theme.
- No hardcoded-color or layering regressions observed. Token audit (`scripts/audit-tokens.mjs`) remains green and complements this visual pass.

## Conclusion (desktop)

No token fixes required at desktop. See the mobile sweep below for the one token fix and the touch-target follow-up.

---

# Mobile Sweep — 375×812 and 768×1024

**Date:** 2026-06-12
**Context:** Product team confirmed mobile/responsive is a first-class requirement. Same automated method as the desktop sweep, re-run at phone (375×812) and tablet (768×1024) viewports: 40 pages × 2 viewports × 2 themes = 160 captures, plus a focused overlay open-state pass at 375 and a touch-target audit.

## Verdict

**Layout: PASS 80/80.** Zero horizontal page overflow, zero console/page errors, dark mode applies everywhere at both viewports. Calendar grid, DataTable, Dialog, Drawer all fit 375px cleanly.

**One real bug found and fixed:** Toast viewport used a fixed `--toast-viewport-width: 360px` plus a 20px right offset, overflowing a 375px screen by 5px on the left. Fixed in `packages/tokens/src/component-toast.css` with `min(360px, calc(100vw - 2 * var(--spacing-5)))` — token-only change, verified live (viewport now sits at 20..355 on a 375px screen). Tokens reference regenerated; audit green.

**One false positive:** the overlay detector flagged a Dropdown Menu surface at x=691 — that element lives inside the horizontally scrollable code-example block, not the page flow. The actual open menu renders correctly within the viewport in both themes (verified by eye).

## Overlay open-state at 375px

| Overlay | Light | Dark | Fits viewport |
|---------|-------|------|---------------|
| Dialog | ✅ | ✅ | ✅ |
| Alert Dialog | ✅ | ✅ | ✅ |
| Drawer | ✅ | ✅ | ✅ |
| Dropdown Menu | ✅ | ✅ | ✅ (flag was a false positive) |
| Select | ✅ | ✅ | ✅ |
| MultiSelect | ✅ | ✅ | ✅ |
| Popover | ✅ | ✅ | ✅ |
| Toast | ✅ | ✅ | ✅ after token fix |

## Touch-target audit (follow-up work, not blocking closeout)

Measured rendered hit areas of interactive elements in demo previews at 375px. Two reference floors: WCAG 2.2 AA (2.5.8) requires **24×24px**; Apple HIG recommends **44×44pt** for touch.

**Meets WCAG AA, standard design-system sizing (no action):** Button md 36px / sm 28px / xs 24px height, IconButton 36/28/24, SegmentedControl 36, Tabs 38, Pagination 32, Calendar day cells 32, Select items 32–36, toolbar/menu triggers 36, SocialButton 40, DataTable row actions 28, Input steppers 28×34, Toast action 28. Breadcrumb links (20px text height) fall under the WCAG inline-text exception.

**Below the 24px AA floor — needs invisible hit-area expansion:**

| Component | Element | Measured | Suggested fix |
|-----------|---------|----------|---------------|
| Tag | remove (×) button | 14×14 | pseudo-element hit-area ≥24px (≥44 ideal) |
| DatePicker | calendar icon trigger | 16×16 | same |
| MultiSelect | chip remove button | 18×18 | same |
| Checkbox | input box | 20×20 | label already extends the click area; verify label-less usage, expand if needed |
| Radio | input box | 20×20 | same as Checkbox |
| Slider | thumb | 20×20 | expand thumb hit-area (Radix supports this via padding) |
| Toggle | switch | 36×20 | expand vertical hit-area to ≥24px |

Recommended approach: transparent `::after` hit-area expansion — zero visual change, no token or layout impact, one small CSS block per component. Scope ≈ half a day across 7 components + re-run of this audit. Tracked as a follow-up tranche (can ride along with the icons task).

## Working rule added for Phase 4

Every Phase 4 pattern spec must include a mandatory responsive-behavior section (recorded in `component-coverage-matrix.md`).

## Conclusion

Mobile layout layer is sound: one token bug found and fixed, everything else passes. Touch-target expansion is queued as a small follow-up tranche and does not block the Phase 3 closeout.
