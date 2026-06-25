# Adopting maxa-ui — one-pager for developers

How to pull the MAXA design system into the product. No need to drop Bootstrap or
rewrite anything; this layers in and migrates page by page.

## 1. Install

```bash
npm i @maxa/ui @maxa/tokens
```

- `@maxa/ui` — React components (Radix deps install automatically).
- `@maxa/tokens` — the CSS-variable token layer (colors, spacing, radius, typography).
- Distributed as private package(s) — same flow you already use for your private dep.

## 2. Load the tokens once (app root)

```ts
import "@maxa/tokens/theme.css" // primitives + semantic + component tokens + dark mode
```

This defines all `--color-*`, `--spacing-*`, `--radius-*`, typography variables on
`:root`. It is plain CSS custom properties — it coexists with Bootstrap and your
global styles (namespaced variables, low collision risk; verify global resets at
first integration).

Fonts are **not** bundled — load Montserrat (body) yourself via Google Fonts or
self-hosted, same as today.

## 3. Use components

```tsx
import { Button, Dialog, DataTable } from "@maxa/ui"
```

- Each component pulls in its own CSS automatically (side-effect import) — no separate
  stylesheet wiring per component.
- Unused component JS tree-shakes out via named imports; only the components you
  import ship their CSS.
- Props are documented per component in `specs/components/<name>.md` (the API contract).

## 4. React 17 (must-read)

The product is on React 17; the package currently targets React 18+
(`React.useId`). We will ship a compat fix on our side before you integrate:
- ponyfill `useId` (fallback to a stable counter when absent)
- widen `peerDependencies` to `>=17`

Do not integrate component code until that lands — it's a small fix (~a day), not a
redesign. Track in `.planning/integration-notes.md`.

## 5. Dark mode bridge

Your product toggles dark mode by adding a CSS class. Our tokens key off the
`data-theme` attribute on `<html>`. Bridge: set the attribute alongside your class.

```js
// wherever you currently toggle the dark class:
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
```

(Or we ship a class-based token variant if you prefer not to touch the toggle.)

## 6. Migration approach

- Drop components into `shared/ui` — FSD makes this natural.
- Migrate **page by page**; no big-bang. Take the approved component instead of
  re-building from Figma.
- Bootstrap helper classes (grid, spacing) keep working alongside; replace
  gradually where a maxa-ui component already covers it.

## 7. Component stability

Before adopting, check the **Component Stability Sheet** — 23 components are stable
and safe now; 10 are mid-API-change (hold); 7 may get minor prop renames pre-v1.
See `component-stability.md`.
