# Product Integration Notes

Last updated: 2026-06-16
Source: developer Q&A (asked 2026-06-12, answered 2026-06-16)

## Product stack (confirmed by dev team)

- React **17** (started on 15), pure SPA, no framework, no SSR — all client-rendered.
- TypeScript ~99% (a couple of legacy files left, being removed).
- Styling, three layers:
  1. legacy global classes
  2. CSS modules
  3. customized **Bootstrap** as helper classes (spacing, grid) — NOT Tailwind.
- New screens are mostly composed from existing `shared/ui` components + Bootstrap
  helpers; modifiers added via CSS modules or by extending shared components.
- **FSD architecture** in progress (not fully migrated). Components live in
  `shared/ui`; a custom Storybook is being assembled as the catalog.
- Global styles exist; most conflicts are in the old admin area, being rewritten.
- Dark theme: toggled by **adding a CSS class**, implemented with **CSS variables**.
- Dependencies mostly public npm; one private package added recently. No monorepo
  yet (likely soon — bundle already large).
- They use AI assistants, mainly **Claude**, and already have skills (codestyle-focused).

## Decisions triggered

| Topic | Decision |
|---|---|
| Phase 7 Tailwind adapter | **Cancelled.** No Tailwind in product. Do not build. |
| Refactor DS to match their stack | **No.** Their stack is mid-migration (FSD, monorepo coming, Storybook forming). Matching today's state = matching a state they're leaving. Keep the clean plan; add a thin compat layer instead. |
| Audit P1s (F5, F9) | Continue as planned. |

## Integration checklist (our side)

- [ ] **React 17 support (blocker).** `React.useId()` is React 18+. Used in:
  - `packages/hooks/src/use-field-id.ts`
  - `packages/hooks/src/use-label-ids.ts`
  - `drawer`, `dialog`, `progress`, `slider` components
  Fix: ponyfill `useId` (fall back to a stable counter when `React.useId` is
  undefined). Widen peerDeps from `^18 || ^19` to `>=17` in `packages/ui` and
  `packages/hooks`.
- [ ] **Verify Radix supports React 17.** Current Radix 1.1.x deps may have moved
  to React 18 peer ranges — confirm before promising compatibility.
- [ ] **Dark-mode bridge.** Our tokens key off `[data-theme="dark"]`; product uses
  a CSS class. Either document a one-line bridge (set the attribute alongside their
  class) or ship a class-based token variant. Their theming is already CSS-variable
  based, so the bridge is trivial.
- [ ] **Bundle size / tree-shaking.** Team already worries about bundle size.
  Ensure per-component import paths and side-effect-free packaging.
- [ ] **Bootstrap coexistence check.** Low risk (our tokens are namespaced custom
  properties), but verify global reset / `:root` collisions at first integration.
- [ ] **AI design-system skill.** They use Claude with codestyle skills. Ship a
  MAXA DS skill so generated code uses our tokens/components by default.

## Why adoption is low-friction for them

- Tokens are CSS variables → drop in, coexist with Bootstrap, no build change.
- Components are framework-agnostic, no Tailwind dependency → no build-system trauma.
- `shared/ui` + FSD + Storybook is exactly our target shape → components drop in,
  page-by-page migration is native to FSD, our components can populate their catalog.
- Main gate is React 17 (above), which is a small fix not a redesign.

## Open follow-up questions for the dev team (batch 1)

1. Bundler — CRA / webpack / Vite / custom? (determines delivery format, CSS import, tree-shaking)
2. CSS import — can they consume prebuilt CSS from an npm package, or CSS modules only?
3. Radix UI — already in the stack anywhere? (our components depend on it)
4. Pilot — willing to trial one component (e.g. Button) or one screen for integration?

Batch 2 (after pilot): Storybook hosting of MAXA components, MAXA AI skill alongside
their codestyle skills, `shared/ui` ownership, bundle-size budget for per-component imports.
