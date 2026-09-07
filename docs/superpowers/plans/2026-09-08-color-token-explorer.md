# Color Token Explorer Implementation Plan

Approved by Igor after reviewing the local Colors page and the Overview / Explore / Reference proposal. Local only; no deployment or external writes.

**Goal:** Help designers, developers and other reviewers understand how real MAXA color tokens flow into components, and experiment without changing the system.

**Architecture:** Generate dependency and CSS-consumer data from the existing native CSS source. Embed a client explorer in the Colors page with the existing documentation typography, navigation and component library. Re-declare the complete token set on the preview boundary before applying a local selected-token override, avoiding inherited alias resolution errors. No portalled previews in the first version.

**Tech Stack:** Existing Next.js, React, MAXA components, plain CSS, build-time Node generator, Playwright.

## Tasks

- [x] Generate explorer JSON including source/layer, light/dark values, forward references and CSS consumers. Test multi-step aliases, dark differences, cycles and source consumers; add freshness checking.
- [x] Build search/filter token inspector, readable labels, dependency chain, direct/indirect dependents and component documentation links. Label CSS usage as library references rather than product-screen evidence.
- [x] Add real Button/Input/Alert examples with selection in both directions, selected-impact highlighting, local Light/Dark, color trial and reset. Token changes must never reach document root, source files or Figma.
- [x] Integrate Overview/Explore/Reference using existing Tabs and doc layout; replace right TOC only in Explore. Keep existing reference sections available. Replace stale neutral usage metadata with generated links.
- [x] Verify generator, typecheck, lint, production/static builds, actual browser interaction, keyboard and mobile layout, color propagation/isolation/reset, and independent correctness/security/plan-fit review.
- [x] Keep local preview available and commit the finished feature on its separate branch.

## Boundaries

Use existing MAXA components and tokens, no new product UI patterns. Editorial explanatory prose and curated preview recipes are allowed; dependency relationships and colors come from source CSS. Preview changes are experiments, not theme publishing. Unsupported color expressions remain explicitly unresolved in data. No new Tailwind adapter or framework integrations.
