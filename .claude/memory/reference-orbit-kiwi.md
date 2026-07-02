---
name: Orbit Design System (Kiwi.com)
description: Reference design system (Kiwi.com Orbit) — ~80 React components, monorepo, benchmark for MAXA UI
type: reference
---

**Source:** https://github.com/kiwicom/orbit
**Date:** 2026-07-02
**Category:** resources
**Tags:** design-system, component-library, react, reference, kiwi, orbit

Kiwi.com's open-source Orbit: a Lerna monorepo shipping `@kiwicom/orbit-components` +
`@kiwicom/orbit-tailwind-preset`, docs at orbit.kiwi with Storybook + Playroom, ~80
components mixing generic UI primitives and travel-domain composites, plus icons/illustrations,
TypeScript, RTL, and `OrbitProvider` theming.

**Key points:**
- Monorepo (Lerna): components lib + Tailwind preset package.
- DX to steal: Playroom live playground, Tailwind preset (≈ our Phase 7 `@maxa/tailwind`),
  provider theming + RTL, icon/illustration separation (validates `@maxa/icons`).
- Generic-vs-domain boundary: Orbit keeps domain composites (Itinerary, Seat, CarrierLogo) in
  the same lib — a data point for our `@maxa/ui` vs product-pattern split
  (`.planning/legacy-fsd-component-migration-matrix.md`).
- README template: Mission / Installation / Usage / Documentation / TypeScript / Tailwind /
  Contributing / Feedback / About.
- Badges: flat-square shields.io row; downloads/minzip/maintenance need a PUBLIC npm package
  (MAXA not yet published there) — use npm-independent subset for now.
- Benchmark: ~80 components vs MAXA's 40 (intentionally product-scoped), alongside Untitled
  UI / shadcn in `.planning/component-coverage-matrix.md`.
- Full note: `~/.claude/knowledge/resources/2026-07-02-orbit-kiwi-design-system.md`
