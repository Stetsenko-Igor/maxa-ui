# Avatar System Synchronization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Synchronize the current Avatar and Avatar Label contract from Figma through tokens, React, canonical documentation, visual baselines, and deployed docs.

**Architecture:** Keep Avatar body decisions in the existing component-based token layer, let Avatar Label inherit the nested Avatar and use semantic link tokens directly, and retain Avatar Group only as a deprecated compatibility export. Make canonical specs and the docs catalog the agent-discoverable public contract.

**Tech Stack:** Figma Plugin API, DTCG token JSON, CSS custom properties, React 19, Radix Avatar, TypeScript, Vitest, Testing Library, Next.js static export, Playwright, GitHub Actions, Netlify.

---

### Task 1: Synchronize Figma Avatar bindings

**Figma:**
- Modify: Avatar set `818:774`
- Validate: Avatar Label set `867:374`

- [ ] Create or reuse `Avatar/layout/border-width = 1` in `Component-based` with `STROKE_FLOAT` scope and `var(--avatar-border-width)` Web syntax.
- [ ] Add Web syntax to `Avatar/surface/border` and preserve its semantic alias.
- [ ] Bind every Avatar `Container` stroke color and stroke weight to component tokens.
- [ ] Verify all circle and square radius bindings.
- [ ] Update Avatar and Avatar Label descriptions.
- [ ] Verify 180 Avatar containers and 20 Avatar Label variants, then capture screenshots.

### Task 2: Synchronize token artifacts

**Files:**
- Modify: `packages/tokens/figma/component-avatar.json`
- Modify: `packages/tokens/src/component-avatar.css`
- Test: `packages/tokens/src/index.test.ts`
- Generate: `packages/tokens/figma/import-bundle.json`
- Generate: `specs/tokens-reference.md`

- [ ] Add failing assertions for the 1 px border-width token and synchronized import bundle.
- [ ] Add the DTCG token and CSS value.
- [ ] Run the bundle and reference generators.
- [ ] Run token audit and token package tests.

### Task 3: Align Avatar React API

**Files:**
- Test: `packages/ui/src/components/avatar/avatar.test.tsx`
- Modify: `packages/ui/src/components/avatar/avatar.tsx`
- Modify: `packages/ui/src/components/avatar/avatar.css`
- Modify: `packages/ui/src/components/avatar/index.ts`

- [ ] Add failing tests for the neutral default and newly supported appearances.
- [ ] Change the default presentation to neutral.
- [ ] Add the missing Figma appearance hues and CSS mappings.
- [ ] Deprecate Avatar Group through JSDoc without removing exports.
- [ ] Run targeted Avatar tests.

### Task 4: Implement Avatar Label with TDD

**Files:**
- Create: `packages/ui/src/components/avatar-label/avatar-label.test.tsx`
- Create: `packages/ui/src/components/avatar-label/avatar-label.tsx`
- Create: `packages/ui/src/components/avatar-label/avatar-label.css`
- Create: `packages/ui/src/components/avatar-label/index.ts`
- Modify: `packages/ui/src/index.ts`

- [ ] Write failing tests for static and link semantics, content, size propagation, attributes, and ref forwarding.
- [ ] Implement the component with `div`/`a` rendering and semantic state tokens.
- [ ] Export component and public types.
- [ ] Run targeted and package-level UI tests.

### Task 5: Update canonical specs and docs catalog

**Files:**
- Modify: `specs/components/avatar.md`
- Create: `specs/components/avatar-label.md`
- Modify: `specs/foundations/radius.md`
- Create: `apps/docs/app/docs/components/avatar-label/page.tsx`
- Create: `apps/docs/app/docs/components/avatar-label/avatar-label-default-preview.tsx`
- Modify: Avatar docs, component catalog, sidebar, and radius foundation docs

- [ ] Document the canonical Avatar and Avatar Label contracts.
- [ ] Add Avatar Label examples, props, token usage, accessibility, and profile-link behavior.
- [ ] Remove Avatar Group from recommended public docs.
- [ ] Add Avatar Label to catalog and navigation.
- [ ] Build the docs app.

### Task 6: Update agent knowledge and repository status

**Files:**
- Modify: `README.md`
- Modify: `AGENT.md`
- Modify: `.knowledge/Design System — Current State.md`
- Modify: `.knowledge/Component-based Tokens.md`
- Modify: package documentation as needed

- [ ] Update component count and live documentation links.
- [ ] Record canonical Figma node IDs, token decisions, implementation status, and Avatar Group compatibility policy.
- [ ] Ensure MCP discovers Avatar Label as an implemented canonical component and add a regression test.

### Task 7: Visual and full verification

- [ ] Run formatting, typecheck, lint, unit tests, token audits, and docs build.
- [ ] Update Playwright visual baselines for intentional catalog/layout changes.
- [ ] Run visual regression again and confirm green.
- [ ] Inspect screenshots for Avatar and Avatar Label in light and dark modes.
- [ ] Run `git diff --check` and review the final diff against this contract.

### Task 8: Publish and verify

- [ ] Commit atomic changes on the feature branch.
- [ ] Fast-forward the local `main` branch and push to GitHub.
- [ ] Monitor CI, visual regression, and GitHub Pages workflows.
- [ ] Deploy the static docs export to the existing `maxa-ui` Netlify site.
- [ ] Verify the live Avatar and Avatar Label pages on Netlify and GitHub Pages.
