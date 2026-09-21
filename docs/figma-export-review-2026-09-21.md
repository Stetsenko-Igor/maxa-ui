# Figma token export review — 2026-09-21

## Synchronization completed locally

The analysis below records the pre-sync state. The following implementation supersedes its recommendations:

- User confirmed the page canvas must remain `#F5F6FA`. Restored `Primitives/Colors/Neutral/75` in the live Foundation file (`ODH3pmxkKyP8pAslgDb15s`) and rebound Light `background/bg-page` to it. Read-back verified both values. Created variable ID: `VariableID:1156:25529`; semantic ID preserved: `VariableID:58:18`.
- Synced dark info/background borders, Ghost text, Social Button transparency, border-invert, utility fg-gray, Avatar measurements, and all 53 scope differences into canonical sources and generated bundle. Runtime CSS and catalog data were updated.
- Four intermediate palette steps had no alias consumers in the live Foundation file. Inspection of bound variables and fills/strokes/effects on all 15 pages found no direct layer bindings. They were removed from both Figma and code after review: `Blue/550`, `Green/650`, `Green/750`, and `Red/550`. Other consuming Figma files were not audited.
- Preserved 25 historical legacy variables in Figma without introducing them into the active code API. Also excluded four explicitly deprecated roles: `action/action-destructive-subtle`, `action/action-destructive-subtle-hover`, `action/action-destructive-subtle-active`, `text/text-on-destructive`.
- Preserved accurate repository descriptions rather than copying mislabeled Figma descriptions. Thus the raw export and repository are intentionally not byte-for-byte identical.
- Comparison against the original, immutable September export now reports 88 entries: 38 value/presence entries (36 excluded legacy/deprecated mode entries plus two original page-background entries), zero scope differences, and 50 description differences. The two page-background entries have been corrected in live Figma since that export.
- Validation: 161 token tests passed; token audit passed; token build and 58-page catalog production build passed; generated references are current; independent review found no blockers.
- No commit, push, catalog deployment, or Figma library publication performed. Changes are in the current working branch; prepare a token-only commit separately from its existing 21 local commits before delivery.

### Ongoing sync rule

A fresh Figma export must be compared with both canonical JSON and runtime CSS before claiming catalog parity. Keep the product page canvas at `#F5F6FA`; never remove Neutral/75 simply because a stale export omits it. Legacy/deprecated inventory and descriptive metadata differences must be reported explicitly rather than treated as active runtime drift.

## Comparison baseline

Repository: https://github.com/Stetsenko-Igor/maxa-ui (classic design system).
Live GitHub main verified with git ls-remote: 825c7e672d3f12d7261aa018a7dd3e4e7b458002, commit dated 2026-08-28. This is a commit date, not a verified push timestamp.
Local HEAD: 03a69c0, branch refactor/maxa-theme-namespace, 21 commits beyond that baseline.
Export: docs/figma-exports/maxa-figma-export-2026-09-21.json.
The local and GitHub baseline Figma import bundles have zero semantic differences. Both yield the same export comparison.

## Findings

- 155 comparison entries: 61 value/presence entries, 53 scopes, 41 descriptions. No collection, mode, or type changes.
- 52 unique variable paths have value/presence changes: 42 added, 1 removed, 9 changed. Mode-specific entries count Light and Dark separately.
- Baseline: 1,644 variables; export: 1,685 variables. Value/presence changes affect approximately 3.2% of the baseline variable count, including additions; this is not a visual-impact percentage.
- Unchanged: Breakpoints, Spacing, Radius, Typography, Layout.
- Four new palette steps: Blue/550 #056DC9, Green/650 #25843E, Green/750 #206D35, Red/550 #C6140F.
- Neutral/75 #F5F6FA is absent. Light bg-page now points to Neutral/50 #FAFAFA. This conflicts with the documented production calibration; preserve the current mapping until product intent is reconciled.
- Dark bg-info-muted moves Blue/900 to Blue/800; bg-info-subtle moves Blue/950 to Blue/900. Dark primary and secondary borders swap Neutral/700 and Neutral/800 targets.
- Ghost button text changes from text-secondary to text-primary.
- Social Button default/hover/active backgrounds now alias the transparent Button/outline/bg instead of bg-surface. This reverses an explicit earlier decision to keep Social Button surface-filled.
- New semantic variables: destructive-subtle default/hover/active, border-invert, text-on-destructive, utility/fg-gray, and three legacy success-subtle variables.
- Component additions: six Avatar status measurements, Utility/fg-gray, and 22 Button/legacy variables. Legacy additions require usage review, not automatic public API restoration.
- Some exported descriptions are regressions: active described as hover, font size as text color, row background as cell background. Preserve accurate repository descriptions.
- Scopes affect Figma property pickers rather than runtime CSS values: Gray fills become restricted; Orange/Red/Yellow become unrestricted; Alert accent narrows to shape fills; Positive button backgrounds narrow to frame/shape fills.

## Verification and delivery boundary

- Existing diff utility normalizes alias syntax and color formatting, so equivalent serialization is not counted as a change.
- Diff utility tests: 34 passed using Vitest.
- All exported alias targets exist; this does not validate component bindings, rendered appearance, or contrast.
- No source tokens, component code, commits, or remote branches changed during review.
- Local branch also contains CSS delivery/theming changes, Breadcrumb and Tabs updates, color explorer, and navigation planning. A token-only update should be prepared from verified GitHub main rather than pushing the current branch wholesale.
- Export JSON is gitignored. A future integration must update canonical source JSON, generated bundle, relevant runtime CSS and references, then verify the intended Figma/repository differences.

## Exact normalized diff (repository → export)

### Color modes

```text
  + Dark/action/action-destructive-subtle: NEW in Figma ("{Primitives/Colors/Red/950}")
  + Dark/action/action-destructive-subtle-active: NEW in Figma ("{Primitives/Colors/Red/900}")
  + Dark/action/action-destructive-subtle-hover: NEW in Figma ("{Primitives/Colors/Red/950}")
  ~ Dark/background/bg-info-muted: "{Colors.Blue.900}" -> "{Primitives/Colors/Blue/800}"
  ~ Dark/background/bg-info-subtle: "{Colors.Blue.950}" -> "{Primitives/Colors/Blue/900}"
  + Dark/border/border-invert: NEW in Figma ("{Primitives/Colors/Neutral (alpha)/Black/100}")
  ~ Dark/border/border-primary: "{Colors.Neutral.700}" -> "{Primitives/Colors/Neutral/800}"
  ~ Dark/border/border-secondary: "{Colors.Neutral.800}" -> "{Primitives/Colors/Neutral/700}"
  + Dark/legacy/action-success-subtle: NEW in Figma ("{Primitives/Colors/Green/950}")
  + Dark/legacy/action-success-subtle-active: NEW in Figma ("{Primitives/Colors/Green/900}")
  + Dark/legacy/action-success-subtle-hover: NEW in Figma ("{Primitives/Colors/Green/950}")
  + Dark/text/text-on-destructive: NEW in Figma ("{Primitives/Colors/Base/Black}")
  + Dark/utility/fg-gray: NEW in Figma ("{Color modes/utility/text-gray}")
  + Light/action/action-destructive-subtle: NEW in Figma ("{Primitives/Colors/Red/50}")
  + Light/action/action-destructive-subtle-active: NEW in Figma ("{Primitives/Colors/Red/100}")
  + Light/action/action-destructive-subtle-hover: NEW in Figma ("{Primitives/Colors/Red/50}")
  ~ Light/background/bg-page: "{Colors.Neutral.75}" -> "{Primitives/Colors/Neutral/50}"
  + Light/border/border-invert: NEW in Figma ("{Primitives/Colors/Neutral (alpha)/White/100}")
  + Light/legacy/action-success-subtle: NEW in Figma ("{Primitives/Colors/Green/50}")
  + Light/legacy/action-success-subtle-active: NEW in Figma ("{Primitives/Colors/Green/100}")
  + Light/legacy/action-success-subtle-hover: NEW in Figma ("{Primitives/Colors/Green/50}")
  + Light/text/text-on-destructive: NEW in Figma ("{Primitives/Colors/Base/White}")
  + Light/utility/fg-gray: NEW in Figma ("{Color modes/utility/text-gray}")
```

### Component-based

```text
  + Default/Avatar/layout/status-border-width: NEW in Figma (2)
  + Default/Avatar/layout/status-offset: NEW in Figma (0)
  + Default/Avatar/layout/status-size-lg: NEW in Figma (12)
  + Default/Avatar/layout/status-size-sm: NEW in Figma (8)
  + Default/Avatar/layout/status-size-xl: NEW in Figma (14)
  + Default/Avatar/layout/status-size-xs: NEW in Figma (6)
  ~ Default/Button/ghost/text: "{Color modes/text/text-secondary}" -> "{Color modes/text/text-primary}"
  + Default/Button/legacy/content/success-text-active: NEW in Figma ("{Color modes/text/text-on-color}")
  + Default/Button/legacy/content/success-text-hover: NEW in Figma ("{Color modes/text/text-on-color}")
  + Default/Button/legacy/focus/destructive-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/ghost-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/link-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/outline-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/secondary-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/success-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/focus/warning-border: NEW in Figma ("{Color modes/Effects/Focus rings/focus-ring}")
  + Default/Button/legacy/stray/size-lg-fg: NEW in Figma ("{Color modes/foreground/fg-on-color}")
  + Default/Button/legacy/v2/icon-only/lg/size: NEW in Figma (48)
  + Default/Button/legacy/v2/icon-only/md/size: NEW in Figma (36)
  + Default/Button/legacy/v2/icon-only/sm/size: NEW in Figma (28)
  + Default/Button/legacy/v2/icon-only/xs/size: NEW in Figma (24)
  + Default/Button/legacy/v2/size/lg/gap: NEW in Figma ("{Spacing/spacing-md}")
  + Default/Button/legacy/v2/size/lg/padding-x: NEW in Figma ("{Spacing/spacing-3xl}")
  + Default/Button/legacy/v2/size/md/gap: NEW in Figma ("{Spacing/spacing-md}")
  + Default/Button/legacy/v2/size/md/padding-x: NEW in Figma ("{Spacing/spacing-xl}")
  + Default/Button/legacy/v2/size/sm/gap: NEW in Figma ("{Spacing/spacing-sm}")
  + Default/Button/legacy/v2/size/sm/padding-x: NEW in Figma (10)
  + Default/Button/legacy/v2/size/xs/gap: NEW in Figma ("{Spacing/spacing-xs}")
  + Default/Button/legacy/v2/size/xs/padding-x: NEW in Figma ("{Spacing/spacing-md}")
  ~ Default/Social Button/bg: "{Color modes/background/bg-surface}" -> "{Component-based/Button/outline/bg}"
  ~ Default/Social Button/bg-active: "{Color modes/background/bg-surface}" -> "{Component-based/Button/outline/bg}"
  ~ Default/Social Button/bg-hover: "{Color modes/background/bg-surface}" -> "{Component-based/Button/outline/bg}"
  + Default/Utility/fg-gray: NEW in Figma ("{Color modes/utility/fg-gray}")
  ~ Alert/color/emphasize/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Alert/color/error/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Alert/color/info/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Alert/color/neutral/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Alert/color/success/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Alert/color/warning/accent: scopes ["ALL_FILLS"] -> ["SHAPE_FILL"]
  ~ Button/positive/bg: scopes ["ALL_FILLS"] -> ["FRAME_FILL","SHAPE_FILL"]
  ~ Button/positive/bg-active: scopes ["ALL_FILLS"] -> ["FRAME_FILL","SHAPE_FILL"]
  ~ Button/positive/bg-hover: scopes ["ALL_FILLS"] -> ["FRAME_FILL","SHAPE_FILL"]
  ~ Button/destructive/fg: description "Button, destructive: white icon color in every theme and state." -> "Foreground color for Destructive button icons. Always uses the on-color role."
  ~ Button/destructive/text: description "Button, destructive: white label color in every theme and state." -> "Text color for the Destructive button. Always uses the on-color role."
  ~ Button/outline/border-active: description "Button, outline: border (active state)." -> "Button, outline: border (hover state)."
  ~ Button/positive/bg: description "Button, positive: background." -> "Background color for the Positive button."
  ~ Button/positive/bg-active: description "Button, positive: background (active state)." -> "Active background color for the Positive button."
  ~ Button/positive/bg-hover: description "Button, positive: background (hover state)." -> "Hover background color for the Positive button."
  ~ Button/positive/border: description "Button, positive: border." -> "Border color for the Positive button."
  ~ Button/positive/border-hover: description "Button, positive: border (hover state)." -> "Hover border color for the Positive button."
  ~ Button/positive/fg: description "Button, positive: white icon color in every theme and state." -> "Foreground color for Positive button icons. Always uses the on-color role."
  ~ Button/positive/text: description "Button, positive: white label color in every theme and state." -> "Text color for the Positive button. Always uses the on-color role."
  ~ Button/primary/fg: description "Button, primary: white icon color in every theme and state." -> "Foreground color for Primary button icons. Always uses the on-color role."
  ~ Button/primary/text: description "Button, primary: white label color in every theme and state." -> "Text color for the Primary button. Always uses the on-color role."
  ~ Button/size/lg/gap: description "Button, size lg: gap between icon slots and the text container." -> "Button v3 LG gap between an icon and the Text padding container: 4px."
  ~ Button/size/lg/icon-size: description "Button, size lg: icon size." -> "Button, size lg: icon color size."
  ~ Button/size/lg/padding-x: description "Button, size lg: symmetric root padding." -> "Button v3 outer horizontal padding for LG: 20px."
  ~ Button/size/lg/text: description "Button, size lg: font size." -> "Button, size lg: text color."
  ~ Button/size/lg/text-padding-x: description "Button, size lg: horizontal padding inside the text container." -> "Button v3 LG horizontal padding inside the Text padding container: 4px."
  ~ Button/size/lg/weight: description "Button, size lg: font weight." -> "Button, size lg: weight."
  ~ Button/size/md/gap: description "Button, size md: gap between icon slots and the text container." -> "Button v3 MD gap between an icon and the Text padding container: 6px."
  ~ Button/size/md/icon-size: description "Button, size md: icon size." -> "Button, size md: icon color size."
  ~ Button/size/md/padding-x: description "Button, size md: symmetric root padding." -> "Button v3 outer horizontal padding for MD: 14px."
  ~ Button/size/md/text: description "Button, size md: font size." -> "Button, size md: text color."
  ~ Button/size/md/text-padding-x: description "Button, size md: horizontal padding inside the text container." -> "Button v3 MD horizontal padding inside the Text padding container: 2px."
  ~ Button/size/md/weight: description "Button, size md: font weight." -> "Button, size md: weight."
  ~ Button/size/sm/gap: description "Button, size sm: gap between icon slots and the text container." -> "Button v3 SM gap between an icon and the Text padding container: 4px."
  ~ Button/size/sm/icon-size: description "Button, size sm: icon size." -> "Button, size sm: icon color size."
  ~ Button/size/sm/padding-x: description "Button, size sm: symmetric root padding." -> "Button v3 outer horizontal padding for SM: 8px."
  ~ Button/size/sm/text: description "Button, size sm: font size." -> "Button, size sm: text color."
  ~ Button/size/sm/text-padding-x: description "Button, size sm: horizontal padding inside the text container." -> "Button v3 SM horizontal padding inside the Text padding container: 2px."
  ~ Button/size/sm/weight: description "Button, size sm: font weight." -> "Button, size sm: weight."
  ~ Button/size/xs/gap: description "Button, size xs: gap between icon slots and the text container." -> "Button v3 XS gap between an icon and the Text padding container: 2px."
  ~ Button/size/xs/icon-size: description "Button, size xs: icon size." -> "Button, size xs: icon color size."
  ~ Button/size/xs/padding-x: description "Button, size xs: symmetric root padding." -> "Button v3 outer horizontal padding for XS: 6px."
  ~ Button/size/xs/text: description "Button, size xs: font size." -> "Button, size xs: text color."
  ~ Button/size/xs/text-padding-x: description "Button, size xs: horizontal padding inside the text container." -> "Button v3 XS horizontal padding inside the Text padding container: 2px."
  ~ Button/size/xs/weight: description "Button, size xs: font weight." -> "Button, size xs: weight."
  ~ Table/fg-disabled: description "Table: disabled icon foreground." -> "Table: sort icon."
  ~ Table/footer-text-caption: description "Table: supporting footer text." -> "Table: footer text."
  ~ Table/row-bg: description "Table: default row background." -> "Table: cell bg."
  ~ Table/row-bg-striped: description "Table: striped row background." -> "Table: cell bg."
```

### Primitives

```text
  + Value/Colors/Blue/550: NEW in Figma ("#056dc9")
  + Value/Colors/Green/650: NEW in Figma ("#25843e")
  + Value/Colors/Green/750: NEW in Figma ("#206d35")
  - Value/Colors/Neutral/75: REMOVED in Figma (was "#F5F6FA")
  + Value/Colors/Red/550: NEW in Figma ("#c6140f")
  ~ Colors/Gray/100: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/200: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/300: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/400: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/50: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/500: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/600: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/700: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/800: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/900: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Gray/950: scopes [] -> ["ALL_FILLS"]
  ~ Colors/Orange/100: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/200: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/300: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/400: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/50: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/500: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/600: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/700: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/800: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/900: scopes ["ALL_FILLS"] -> []
  ~ Colors/Orange/950: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/100: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/200: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/300: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/400: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/50: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/500: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/600: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/700: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/800: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/900: scopes ["ALL_FILLS"] -> []
  ~ Colors/Red/950: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/100: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/200: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/300: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/400: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/50: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/500: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/600: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/700: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/800: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/900: scopes ["ALL_FILLS"] -> []
  ~ Colors/Yellow/950: scopes ["ALL_FILLS"] -> []
  ~ Colors/Neutral/450: description "" -> "Intermediate neutral step for balanced pressed states; approved value #C9C9C9."
```
